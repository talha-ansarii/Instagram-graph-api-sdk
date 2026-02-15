---
sidebar_position: 4
---

# Installation

Install the SDK and make your first API call.

## Install the Package

```bash
npm install instagram-graph-api-sdk
```

Or with other package managers:

```bash
# Yarn
yarn add instagram-graph-api-sdk

# pnpm
pnpm add instagram-graph-api-sdk
```

## Basic Usage

```typescript
import { InstagramClient } from 'instagram-graph-api-sdk';

// Create client with your access token
const client = new InstagramClient({
  accessToken: process.env.INSTAGRAM_ACCESS_TOKEN!,
});

// Get your profile
const profile = await client.users.getProfile();
console.log(`Hello, @${profile.username}!`);
```

## With Environment Variables

Create a `.env` file:

```bash
INSTAGRAM_ACCESS_TOKEN=your_token_here
```

Then use `dotenv`:

```typescript
import 'dotenv/config';
import { InstagramClient } from 'instagram-graph-api-sdk';

const client = new InstagramClient({
  accessToken: process.env.INSTAGRAM_ACCESS_TOKEN!,
});
```

## Available Modules

The SDK is organized into modules, all accessible from the client:

```typescript
const client = new InstagramClient({ accessToken: '...' });

// Authentication & tokens
client.auth.me()
client.auth.refreshToken()

// User profile & media
client.users.getProfile()
client.users.getMedia()
client.users.getStories()

// Media operations
client.media.get(mediaId)
client.media.getComments(mediaId)

// Content publishing
client.publishing.createImageContainer(options)
client.publishing.publish(containerId)

// Messaging
client.messaging.sendText(recipientId, text)
client.conversations.list()

// Comments
client.comments.reply(commentId, text)
client.comments.hide(commentId)

// Insights
client.insights.getAccountInsights(options)
client.insights.getMediaInsights(mediaId, options)
```

## Type Safety

The SDK is fully typed. Your IDE will autocomplete all methods and parameters:

```typescript
// Full autocomplete for fields
const profile = await client.users.getProfile({
  fields: ['id', 'username', 'biography', 'followers_count'],
});

// Type-safe responses
profile.username // string
profile.followers_count // number | undefined
```

## Error Handling

```typescript
import { InstagramClient, isRateLimitError } from 'instagram-graph-api-sdk';

try {
  const profile = await client.users.getProfile();
} catch (error) {
  if (isRateLimitError(error)) {
    console.log('Rate limited! Wait before retrying.');
  }
}
```

## Next Steps

- [OAuth Flow](/authentication/oauth-overview) - Implement user authentication
- [Publishing Content](/guides/publishing) - Post images and videos
- [Messaging](/guides/messaging) - Send and receive DMs
