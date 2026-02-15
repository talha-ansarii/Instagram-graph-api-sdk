---
sidebar_position: 3
---

# Environment Variables

This page explains how to get and configure the environment variables needed for the SDK.

## Required Variables

Create a `.env` file in your project root:

```bash
# Instagram API Credentials
INSTAGRAM_APP_ID=your_app_id_here
INSTAGRAM_APP_SECRET=your_app_secret_here
INSTAGRAM_ACCESS_TOKEN=your_access_token_here

# Your app URL (for OAuth redirect)
APP_URL=http://localhost:3000
```

## Getting Your Credentials

### App ID & App Secret

1. Go to [Meta App Dashboard](https://developers.facebook.com/apps/)
2. Select your app
3. Go to **Instagram** → **API setup with Instagram Login**
4. Under **Business login settings**, copy:
   - **Instagram App ID**
   - **Instagram App Secret** (click "Show")

### Access Token (For Testing)

**Option A: Generate via Dashboard (Recommended for testing)**

1. In Meta App Dashboard, go to **Instagram** → **API setup with Instagram Login**
2. Click **Generate token** next to your Instagram account
3. Log in to Instagram when prompted
4. Copy the generated token

This token is **long-lived (60 days)**.

**Option B: Implement OAuth Flow (Production)**

For production apps, you'll implement the full OAuth flow. See [OAuth Overview](/authentication/oauth-overview).

## Security Best Practices

:::danger Never Commit Secrets
- Add `.env` to your `.gitignore`
- Never commit tokens or secrets to version control
- Use environment variables in deployment
:::

### Example `.gitignore`

```gitignore
# Environment variables
.env
.env.local
.env.*.local
```

## Verifying Your Setup

Create a test file to verify your credentials:

```typescript
import 'dotenv/config';
import { InstagramClient } from 'instagram-graph-api-sdk';

const client = new InstagramClient({
  accessToken: process.env.INSTAGRAM_ACCESS_TOKEN!,
});

async function test() {
  const profile = await client.users.getProfile();
  console.log(`✅ Connected as @${profile.username}`);
}

test().catch(console.error);
```

Run it:

```bash
npx tsx test.ts
```

If you see your username, you're all set!

## Next Step

[Install the SDK →](/getting-started/installation)
