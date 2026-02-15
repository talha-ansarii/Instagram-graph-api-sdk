---
sidebar_position: 3
---

# SDK OAuth Implementation

Complete example of implementing OAuth with the SDK.

## Full Implementation

Here's a complete Next.js example:

### Route: Initiate Login

```typescript
// app/api/instagram/login/route.ts
import { InstagramOAuth } from 'instagram-graph-api-sdk';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import crypto from 'crypto';

export async function GET() {
  // Generate CSRF state
  const state = crypto.randomUUID();
  
  // Store state in cookie for verification
  cookies().set('instagram_oauth_state', state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 600, // 10 minutes
  });

  // Build authorization URL
  const authUrl = InstagramOAuth.buildAuthorizationUrl({
    clientId: process.env.INSTAGRAM_APP_ID!,
    redirectUri: `${process.env.NEXT_PUBLIC_URL}/api/instagram/callback`,
    scopes: InstagramOAuth.getDefaultScopes(),
    state,
  });

  redirect(authUrl);
}
```

### Route: Handle Callback

```typescript
// app/api/instagram/callback/route.ts
import { InstagramOAuth, InstagramClient } from 'instagram-graph-api-sdk';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(request: Request) {
  const url = new URL(request.url);
  
  // Parse callback parameters
  const { code, state, error } = InstagramOAuth.parseCallback(url.toString());

  // Handle denial
  if (error) {
    redirect('/login?error=access_denied');
  }

  // Verify CSRF state
  const savedState = cookies().get('instagram_oauth_state')?.value;
  if (state !== savedState) {
    redirect('/login?error=csrf_failed');
  }

  try {
    // Exchange code for tokens
    const tokens = await InstagramOAuth.exchangeCodeForToken({
      clientId: process.env.INSTAGRAM_APP_ID!,
      clientSecret: process.env.INSTAGRAM_APP_SECRET!,
      redirectUri: `${process.env.NEXT_PUBLIC_URL}/api/instagram/callback`,
      code: code!,
    });

    // Get user profile
    const client = new InstagramClient({
      accessToken: tokens.access_token,
    });
    const profile = await client.users.getProfile({
      fields: ['id', 'username', 'profile_picture_url'],
    });

    // Save to database
    await saveUser({
      instagramId: tokens.user_id,
      username: profile.username,
      accessToken: tokens.access_token,
      expiresAt: new Date(Date.now() + tokens.expires_in * 1000),
    });

    // Clean up state cookie
    cookies().delete('instagram_oauth_state');

    redirect('/dashboard?connected=true');
  } catch (err) {
    console.error('OAuth error:', err);
    redirect('/login?error=token_exchange_failed');
  }
}
```

### Environment Variables

```bash
# .env.local
INSTAGRAM_APP_ID=your_app_id
INSTAGRAM_APP_SECRET=your_app_secret
NEXT_PUBLIC_URL=http://localhost:3000
```

## Express.js Example

```typescript
import express from 'express';
import { InstagramOAuth, InstagramClient } from 'instagram-graph-api-sdk';
import crypto from 'crypto';

const app = express();

// Store states (use Redis in production)
const states = new Map<string, number>();

app.get('/auth/instagram', (req, res) => {
  const state = crypto.randomUUID();
  states.set(state, Date.now());

  const authUrl = InstagramOAuth.buildAuthorizationUrl({
    clientId: process.env.INSTAGRAM_APP_ID!,
    redirectUri: `${process.env.APP_URL}/auth/instagram/callback`,
    scopes: InstagramOAuth.getDefaultScopes(),
    state,
  });

  res.redirect(authUrl);
});

app.get('/auth/instagram/callback', async (req, res) => {
  const { code, state, error } = InstagramOAuth.parseCallback(
    `${req.protocol}://${req.get('host')}${req.originalUrl}`
  );

  if (error || !states.has(state!)) {
    return res.redirect('/login?error=auth_failed');
  }

  states.delete(state!);

  const tokens = await InstagramOAuth.exchangeCodeForToken({
    clientId: process.env.INSTAGRAM_APP_ID!,
    clientSecret: process.env.INSTAGRAM_APP_SECRET!,
    redirectUri: `${process.env.APP_URL}/auth/instagram/callback`,
    code: code!,
  });

  // Save tokens and redirect
  req.session.accessToken = tokens.access_token;
  res.redirect('/dashboard');
});
```

## Scopes Reference

```typescript
// Default scopes (most common use case)
InstagramOAuth.getDefaultScopes()
// Returns: ['instagram_business_basic', 'instagram_business_manage_messages', 
//           'instagram_business_manage_comments', 'instagram_business_content_publish']

// All available scopes
InstagramOAuth.getAllScopes()
// Also includes: 'instagram_business_manage_insights'

// Custom scopes
InstagramOAuth.buildAuthorizationUrl({
  // ...
  scopes: ['instagram_business_basic'], // Only basic read access
});
```
