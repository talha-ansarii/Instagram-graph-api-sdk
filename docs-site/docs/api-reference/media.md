---
sidebar_position: 5
---

# MediaApi

Media retrieval and operations.

## get()

```typescript
const media = await client.media.get(mediaId, {
  fields: ['id', 'caption', 'media_type', 'permalink'],
});
```

## getComments()

```typescript
const comments = await client.media.getComments(mediaId, {
  limit: 50,
});
```

## getChildren()

Get carousel children.

```typescript
const children = await client.media.getChildren(mediaId);
```
