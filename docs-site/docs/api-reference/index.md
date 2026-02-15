---
sidebar_position: 1
sidebar_label: Overview
---

# API Reference

Complete reference for all SDK classes, methods, and types.

## Main Classes

| Class | Description |
|-------|-------------|
| [`InstagramClient`](/api-reference/client) | Main SDK client with all API modules |
| [`InstagramOAuth`](/api-reference/oauth) | OAuth flow utilities (static methods) |

## API Modules

All modules are accessed via the `InstagramClient` instance:

```typescript
const client = new InstagramClient({ accessToken: '...' });

client.auth        // AuthApi
client.users       // UsersApi
client.media       // MediaApi
client.publishing  // PublishingApi
client.messaging   // MessagingApi
client.comments    // CommentsApi
client.insights    // InsightsApi
client.conversations // ConversationsApi
```

| Module | Description | Reference |
|--------|-------------|-----------|
| `auth` | Token management | [AuthApi](/api-reference/client#auth) |
| `users` | User profiles & media | [UsersApi](/api-reference/users) |
| `media` | Media operations | [MediaApi](/api-reference/media) |
| `publishing` | Content publishing | [PublishingApi](/api-reference/publishing) |
| `messaging` | Direct messages | [MessagingApi](/api-reference/messaging) |
| `comments` | Comment moderation | [CommentsApi](/api-reference/comments) |
| `insights` | Analytics | [InsightsApi](/api-reference/insights) |
| `webhooks` | Subscriptions & Utils | [WebhooksApi](/api-reference/webhooks) |
| `conversations` | Conversation list | [MessagingApi](/api-reference/messaging) |

## Error Classes

```typescript
import {
  InstagramAPIError,
  AuthenticationError,
  RateLimitError,
  ValidationError,
  NetworkError,
} from 'instagram-graph-api-sdk';
```

## Type Helpers

```typescript
import {
  isInstagramAPIError,
  isAuthenticationError,
  isRateLimitError,
  isValidationError,
} from 'instagram-graph-api-sdk';
```

## Auto-Generated Reference

For the complete auto-generated API reference with all types and interfaces, see the [generated docs](../../docs/api-reference/README.md).
