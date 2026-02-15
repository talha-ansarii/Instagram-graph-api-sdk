---
sidebar_position: 2
---

# InstagramClient

The main SDK client that provides access to all API modules.

## Constructor

```typescript
import { InstagramClient } from 'instagram-graph-api-sdk';

const client = new InstagramClient({
  accessToken: 'your-access-token',
  apiVersion: 'v22.0', // optional, defaults to latest
});
```

### Options

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `accessToken` | `string` | Yes | Instagram access token |
| `apiVersion` | `string` | No | API version (default: `v22.0`) |

## Properties

### auth

Token management methods.

```typescript
client.auth.me(fields?)
client.auth.refreshToken()
```

### users

User profile and media.

```typescript
client.users.getProfile(options?)
client.users.getMedia(options?)
client.users.getStories()
client.users.getContentPublishingLimit()
```

### media

Media operations.

```typescript
client.media.get(mediaId, options?)
client.media.getComments(mediaId, options?)
client.media.getChildren(mediaId)
```

### publishing

Content publishing.

```typescript
client.publishing.createImageContainer(options)
client.publishing.createVideoContainer(options)
client.publishing.createCarouselContainer(options)
client.publishing.getContainerStatus(containerId)
client.publishing.publish(containerId)
```

### messaging

Direct messaging.

```typescript
client.messaging.sendText(recipientId, text, options?)
client.messaging.sendMedia(recipientId, options)
client.messaging.sendQuickReplies(recipientId, options)
client.messaging.sendGenericTemplate(recipientId, options)
client.messaging.sendPrivateReply(commentId, message)
```

### conversations

Conversation management.

```typescript
client.conversations.list(options?)
client.conversations.getMessages(conversationId)
client.conversations.getMessage(messageId)
```

### comments

Comment moderation.

```typescript
client.comments.get(commentId)
client.comments.reply(commentId, text)
client.comments.hide(commentId, hide)
client.comments.delete(commentId)
client.comments.getReplies(commentId)
```

### insights

Analytics.

```typescript
client.insights.getAccountInsights(options)
client.insights.getMediaInsights(mediaId, options)
```

## Methods

### getUserId()

Get the Instagram User ID for the current token.

```typescript
const userId = await client.getUserId();
```

### setAccessToken()

Update the access token.

```typescript
client.setAccessToken(newToken);
```
