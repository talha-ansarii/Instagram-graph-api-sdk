---
sidebar_position: 7
---

# MessagingApi

Direct messaging operations.

## sendText()

```typescript
await client.messaging.sendText(recipientId, 'Hello!', {
  humanAgent: true, // optional, extends window to 7 days
});
```

## sendMedia()

```typescript
await client.messaging.sendMedia(recipientId, {
  type: 'image', // or 'video', 'audio'
  url: 'https://example.com/image.jpg',
});
```

## sendQuickReplies()

```typescript
await client.messaging.sendQuickReplies(recipientId, {
  text: 'Choose an option:',
  replies: [
    { content_type: 'text', title: 'Option 1', payload: 'opt1' },
  ],
});
```

## sendGenericTemplate()

```typescript
await client.messaging.sendGenericTemplate(recipientId, {
  elements: [{ title: 'Item', subtitle: '$10' }],
});
```

## sendPrivateReply()

```typescript
await client.messaging.sendPrivateReply(commentId, 'Thanks!');
```

## reactToMessage()

```typescript
await client.messaging.reactToMessage(recipientId, messageId, 'love');
```

## sendTypingIndicator()

```typescript
await client.messaging.sendTypingIndicator(recipientId, true);
```
