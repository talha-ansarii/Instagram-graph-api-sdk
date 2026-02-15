---
sidebar_position: 3
---

# Messaging

Send and receive Instagram Direct Messages.

## Important: Messaging Rules

:::warning 24-Hour Window
You can only message users who have messaged you first, within the last 24 hours.
:::

:::info Human Agent Tag
For customer service, you can use the `HUMAN_AGENT` tag to extend the window to 7 days.
:::

## List Conversations

```typescript
const conversations = await client.conversations.list({
  limit: 10,
});

conversations.data.forEach(conv => {
  console.log('Conversation ID:', conv.id);
  console.log('Updated:', conv.updated_time);
});
```

## Get Messages

```typescript
const messages = await client.conversations.getMessages(conversationId);

messages.messages.data.forEach(msg => {
  console.log(`[${msg.from}]: ${msg.message}`);
});
```

## Send Text Message

```typescript
await client.messaging.sendText(
  recipientIgsid,  // Instagram-scoped User ID
  'Hello! Thanks for reaching out.'
);
```

### With Human Agent Tag

```typescript
await client.messaging.sendText(
  recipientIgsid,
  'Our team will follow up shortly.',
  { humanAgent: true }  // Extends window to 7 days
);
```

## Send Media

```typescript
// Send an image
await client.messaging.sendMedia(recipientIgsid, {
  type: 'image',
  url: 'https://example.com/image.jpg',
});

// Send a video
await client.messaging.sendMedia(recipientIgsid, {
  type: 'video',
  url: 'https://example.com/video.mp4',
});
```

## Send Quick Replies

```typescript
await client.messaging.sendQuickReplies(recipientIgsid, {
  text: 'How can I help you?',
  replies: [
    { content_type: 'text', title: 'Order Status', payload: 'order_status' },
    { content_type: 'text', title: 'Return Item', payload: 'return' },
    { content_type: 'text', title: 'Talk to Human', payload: 'human' },
  ],
});
```

## Send Templates

### Generic Template (Carousel)

```typescript
await client.messaging.sendGenericTemplate(recipientIgsid, {
  elements: [
    {
      title: 'Product Name',
      subtitle: '$29.99',
      image_url: 'https://example.com/product.jpg',
      buttons: [
        { type: 'web_url', url: 'https://shop.com/product', title: 'View' },
      ],
    },
  ],
});
```

### Button Template

```typescript
await client.messaging.sendButtonTemplate(recipientIgsid, {
  text: 'What would you like to do?',
  buttons: [
    { type: 'web_url', url: 'https://example.com', title: 'Visit Website' },
    { type: 'postback', title: 'Start Over', payload: 'restart' },
  ],
});
```

## Private Reply to Comment

Reply privately to someone who commented:

```typescript
await client.messaging.sendPrivateReply(
  commentId,
  'Thanks for your comment! Check your DM.'
);
```

## React to Message

```typescript
// React with emoji
await client.messaging.reactToMessage(
  recipientIgsid,
  messageId,
  'love'  // love, like, laugh, wow, sad, angry
);

// Remove reaction
await client.messaging.unreactToMessage(recipientIgsid, messageId);
```

## Typing Indicator

```typescript
// Show typing
await client.messaging.sendTypingIndicator(recipientIgsid, true);

// Simulate typing...
await new Promise(r => setTimeout(r, 2000));

// Send message (typing auto-stops)
await client.messaging.sendText(recipientIgsid, 'Here is your answer!');
```
