---
sidebar_position: 4
---

# UsersApi

User profile and media operations.

## getProfile()

```typescript
const profile = await client.users.getProfile({
  fields: ['id', 'username', 'biography', 'followers_count'],
});
```

## getMedia()

```typescript
const media = await client.users.getMedia({
  limit: 20,
  fields: ['id', 'caption', 'media_type'],
  after: 'cursor',
});
```

## getStories()

```typescript
const stories = await client.users.getStories();
```

## getContentPublishingLimit()

```typescript
const limit = await client.users.getContentPublishingLimit();
```
