---
sidebar_position: 4
---

# Comment Moderation

Manage comments on your posts.

## Get Comments

```typescript
const comments = await client.media.getComments(mediaId, {
  limit: 20,
});

comments.data.forEach(comment => {
  console.log(`@${comment.username}: ${comment.text}`);
});
```

## Reply to Comment

```typescript
await client.comments.reply(commentId, 'Thanks for your feedback! 🙏');
```

## Hide/Unhide Comment

```typescript
// Hide a comment (only you can see it)
await client.comments.hide(commentId, true);

// Unhide
await client.comments.hide(commentId, false);
```

## Delete Comment

```typescript
await client.comments.delete(commentId);
```

:::warning Permanent Action
Deleting a comment cannot be undone.
:::

## Get Replies to a Comment

```typescript
const replies = await client.comments.getReplies(commentId);

replies.data.forEach(reply => {
  console.log(`  ↳ @${reply.username}: ${reply.text}`);
});
```

## Comment Fields

Available fields when fetching comments:

```typescript
const comments = await client.media.getComments(mediaId, {
  fields: [
    'id',
    'text',
    'username',
    'timestamp',
    'like_count',
    'hidden',
    'replies',
  ],
});
```

## Automation Example

Auto-reply to comments containing certain keywords:

```typescript
const comments = await client.media.getComments(mediaId);

for (const comment of comments.data) {
  const text = comment.text.toLowerCase();
  
  if (text.includes('price') || text.includes('cost')) {
    await client.comments.reply(
      comment.id,
      'Check the link in our bio for pricing! 💰'
    );
  }
  
  if (text.includes('spam') || text.includes('fake')) {
    await client.comments.hide(comment.id, true);
  }
}
```

:::tip Webhooks
For real-time comment notifications, set up Webhooks instead of polling.
:::
