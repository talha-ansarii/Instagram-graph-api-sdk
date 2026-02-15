---
sidebar_position: 8
---

# CommentsApi

Comment moderation operations.

## get()

```typescript
const comment = await client.comments.get(commentId);
```

## reply()

```typescript
await client.comments.reply(commentId, 'Thanks!');
```

## hide()

```typescript
await client.comments.hide(commentId, true);  // hide
await client.comments.hide(commentId, false); // unhide
```

## delete()

```typescript
await client.comments.delete(commentId);
```

## getReplies()

```typescript
const replies = await client.comments.getReplies(commentId);
```
