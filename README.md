# Instagram Graph API SDK

Type-safe TypeScript SDK for Instagram Graph API with Instagram Login.

## Installation

```bash
npm install instagram-graph-api-sdk
```

## Quick Start

```typescript
import { InstagramClient } from 'instagram-graph-api-sdk';

const client = new InstagramClient({
  accessToken: 'your-access-token',
  apiVersion: 'v22.0', // optional, defaults to v22.0
});

// Get user profile
const profile = await client.users.getProfile({
  fields: ['id', 'username', 'followers_count'],
});
console.log(profile);
```

## Features

- 🔒 **Type-safe**: Full TypeScript support with comprehensive type definitions
- 📦 **Class-based**: Clean, intuitive API with organized modules
- 🔧 **Maintainable**: Centralized endpoint definitions for easy updates
- ⚡ **Modern**: ESM and CommonJS support, async/await throughout

## API Modules

| Module | Description |
|--------|-------------|
| `InstagramOAuth` | OAuth flow (static methods, no token needed) |
| `client.auth` | Token management and user info |
| `client.users` | Profile, media, stories, insights |
| `client.media` | Get media, children, comments |
| `client.publishing` | Publish images, videos, reels, stories, carousels |
| `client.messaging` | Send messages, templates, quick replies |
| `client.conversations` | List conversations, get messages |
| `client.comments` | Comment moderation (hide, delete, reply) |
| `client.hashtags` | Search hashtags, get media |
| `client.insights` | Account and media analytics |
| `client.welcomeFlows` | Welcome message flows |
| `client.messengerProfile` | Ice breakers, persistent menu |
| `client.oembed` | Embed Instagram content |

## OAuth Flow (Instagram Business Login)

The SDK handles the complete OAuth flow for Instagram Business Login.

### Step 1: Build Authorization URL

```typescript
import { InstagramOAuth } from 'instagram-graph-api-sdk';

// Build the URL to redirect users to
const authUrl = InstagramOAuth.buildAuthorizationUrl({
  clientId: process.env.INSTAGRAM_APP_ID!,
  redirectUri: `${process.env.APP_URL}/api/instagram/callback`,
  scopes: [
    'instagram_business_basic',
    'instagram_business_manage_messages',
    'instagram_business_manage_comments',
    'instagram_business_content_publish',
  ],
  state: crypto.randomUUID(), // CSRF protection
});

// Redirect user to authUrl
```

### Step 2: Handle Callback & Exchange Token

```typescript
import { InstagramOAuth, InstagramClient } from 'instagram-graph-api-sdk';

// In your callback handler
const { code, state, error } = InstagramOAuth.parseCallback(request.url);

if (error) {
  // User denied access
  console.log('OAuth error:', error);
  return;
}

// Exchange code for long-lived token (60 days)
const tokens = await InstagramOAuth.exchangeCodeForToken({
  clientId: process.env.INSTAGRAM_APP_ID!,
  clientSecret: process.env.INSTAGRAM_APP_SECRET!,
  code: code!,
  redirectUri: `${process.env.APP_URL}/api/instagram/callback`,
});

// Store in your database
await db.instagramAccount.create({
  userId: currentUser.id,
  accessToken: tokens.access_token,
  igUserId: tokens.user_id,
  expiresAt: new Date(Date.now() + tokens.expires_in * 1000),
});
```

### Step 3: Use the Client

```typescript
// Create client with stored token
const client = new InstagramClient({
  accessToken: storedAccount.accessToken,
});

// Make API calls
const profile = await client.users.getProfile();
await client.publishing.createImageContainer({...});
```

### Multi-User Support

The SDK is designed for multi-user apps. Each user has their own token:

```typescript
async function getClientForUser(userId: string) {
  const account = await db.instagramAccount.findUnique({ where: { userId } });
  return new InstagramClient({ accessToken: account.accessToken });
}

// Use for specific user
const client = await getClientForUser(userId);
const media = await client.users.getMedia();
```

## Usage Examples

### Get User Media

```typescript
const media = await client.users.getMedia({
  limit: 10,
  fields: ['id', 'caption', 'media_type', 'permalink'],
});

for (const item of media.data) {
  console.log(item.permalink);
}
```

### Publish a Reel

```typescript
// Create video container
const container = await client.publishing.createVideoContainer({
  video_url: 'https://example.com/video.mp4',
  media_type: 'REELS',
  caption: 'Check out this reel! 🎬',
});

// Wait for processing and publish
const result = await client.publishing.waitAndPublish(container.id);
console.log('Published:', result.id);
```

### Send a Message

```typescript
// Send text message
await client.messaging.sendText(recipientId, 'Hello from the SDK!');

// Send image
await client.messaging.sendMedia(recipientId, {
  type: 'image',
  url: 'https://example.com/image.jpg',
});

// Send quick replies
await client.messaging.sendQuickReplies(recipientId, {
  text: 'What would you like to do?',
  replies: [
    { content_type: 'text', title: 'View Products', payload: 'VIEW_PRODUCTS' },
    { content_type: 'text', title: 'Contact Us', payload: 'CONTACT' },
  ],
});
```

### Comment Moderation

```typescript
// Get comments on media
const comments = await client.media.getComments(mediaId, { limit: 20 });

// Hide a spam comment
await client.comments.hide(commentId);

// Reply to a comment
await client.comments.reply(commentId, { message: 'Thanks for your comment!' });

// Send private reply to comment
await client.messaging.sendPrivateReply(commentId, 'Hi, let me help you!');
```

### Ice Breakers

```typescript
// Set ice breaker questions
await client.messengerProfile.setIceBreakers([
  {
    call_to_actions: [
      { question: 'What are your hours?', payload: 'HOURS' },
      { question: 'Where are you located?', payload: 'LOCATION' },
      { question: 'How can I order?', payload: 'ORDER' },
    ],
  },
]);
```

### Get Insights

```typescript
// Account insights
const insights = await client.insights.getAccountInsights({
  metric: ['impressions', 'reach', 'profile_views'],
  period: 'day',
});

// Media insights
const mediaInsights = await client.insights.getMediaInsights(mediaId, {
  metric: ['engagement', 'impressions', 'reach'],
});
```

## Error Handling

```typescript
import {
  InstagramAPIError,
  AuthenticationError,
  RateLimitError,
  isRateLimitError,
} from 'instagram-graph-api-sdk';

try {
  const profile = await client.users.getProfile();
} catch (error) {
  if (isRateLimitError(error)) {
    console.log('Rate limited, retry after:', error.retryAfter);
  } else if (error instanceof AuthenticationError) {
    console.log('Token expired, refresh needed');
  } else if (error instanceof InstagramAPIError) {
    console.log('API error:', error.message, error.code);
  }
}
```

## Configuration

```typescript
const client = new InstagramClient({
  accessToken: 'your-access-token',
  apiVersion: 'v22.0',  // API version (default: v22.0)
  timeout: 30000,       // Request timeout in ms (default: 30000)
});

// Update token later
client.setAccessToken('new-access-token');
```

## Requirements

- Node.js 18+
- Instagram Professional Account (Business or Creator)
- Instagram Business Login configured

## License

Licensed under the [Apache License 2.0](LICENSE). See the [LICENSE](LICENSE) file for details.
