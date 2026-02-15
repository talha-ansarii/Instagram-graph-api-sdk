---
sidebar_position: 6
---

# Webhooks

Receive real-time notifications for Instagram events.

## What are Webhooks?

Instead of polling the API, Meta sends HTTPS requests to your server when events occur:
- New comments on your posts
- Direct messages received
- @mentions
- Message reactions

## Prerequisites

- ✅ **HTTPS endpoint** with valid SSL certificate
- ✅ **App must be Live** (not in Development mode)
- ✅ Advanced Access for `comments` field

---

## Setting Up Webhooks

### Step 1: Create Your Endpoint

Your endpoint must handle two types of requests:

#### Verification (GET)

When you configure webhooks, Meta verifies your endpoint:

```typescript
// Example: Next.js API route
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  // Verify the token matches your secret
  if (mode === 'subscribe' && token === process.env.WEBHOOK_VERIFY_TOKEN) {
    console.log('Webhook verified!');
    return new NextResponse(challenge, { status: 200 });
  }
  
  return new NextResponse('Forbidden', { status: 403 });
}
```

#### Event Notifications (POST)

Handle incoming events:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  const body = await request.text();
  
  // Verify signature (IMPORTANT!)
  const signature = request.headers.get('X-Hub-Signature-256');
  const expectedSignature = 'sha256=' + crypto
    .createHmac('sha256', process.env.INSTAGRAM_APP_SECRET!)
    .update(body)
    .digest('hex');
    
  if (signature !== expectedSignature) {
    return new NextResponse('Invalid signature', { status: 401 });
  }

  const data = JSON.parse(body);
  
  // Process the event
  for (const entry of data.entry) {
    // Handle messages
    if (entry.messaging) {
      for (const event of entry.messaging) {
        if (event.message) {
          console.log('New message:', event.message.text);
        }
      }
    }
    
    // Handle comments
    if (entry.changes) {
      for (const change of entry.changes) {
        if (change.field === 'comments') {
          console.log('New comment:', change.value.text);
        }
      }
    }
  }

  return new NextResponse('OK', { status: 200 });
}
```

### Step 2: Configure in App Dashboard

1. Go to **App Dashboard** → **Webhooks**
2. Select **Instagram**
3. Enter your webhook URL
4. Enter your verify token
5. Click **Verify and Save**

### Step 3: Subscribe to Events

```bash
curl -X POST \
  "https://graph.instagram.com/v22.0/{account-id}/subscribed_apps" \
  -F "subscribed_fields=messages,comments" \
  -F "access_token={access-token}"
```

### Step 4: Using the SDK (Easier!)

The SDK provides built-in utilities for verification and parsing.

#### Verify Signature

```typescript
import { InstagramWebhooks } from 'instagram-graph-api-sdk';

// In your POST handler:
const isValid = InstagramWebhooks.verifySignature(
  rawBody, 
  signatureHeader, 
  process.env.INSTAGRAM_APP_SECRET
);

if (!isValid) return new NextResponse('Unauthorized', { status: 401 });
```

#### Parse Payload

```typescript
try {
  const payload = InstagramWebhooks.parsePayload(JSON.parse(rawBody));
  
  if (payload.entry[0].changes) {
    // Handle changes (comments, etc.)
  }
} catch (e) {
  console.error('Invalid payload');
}
```

#### Manage Subscriptions

```typescript
// Subscribe to events
await client.webhooks.subscribe(['messages', 'comments']);

// List subscriptions
const subs = await client.webhooks.getSubscribedFields();

// Unsubscribe
await client.webhooks.unsubscribe();
```

---

## Available Webhook Events

| Field | Description | Permission |
|-------|-------------|------------|
| `messages` | Direct messages | `instagram_business_manage_messages` |
| `comments` | Post comments | `instagram_business_manage_comments` |
| `live_comments` | Live video comments | `instagram_business_manage_comments` |
| `message_reactions` | Reactions to messages | `instagram_business_manage_messages` |
| `messaging_seen` | Read receipts | `instagram_business_manage_messages` |

---

## Payload Examples

### New Message

```json
{
  "object": "instagram",
  "entry": [{
    "id": "123456789",
    "time": 1234567890,
    "messaging": [{
      "sender": { "id": "sender_igsid" },
      "recipient": { "id": "your_account_id" },
      "timestamp": 1234567890,
      "message": {
        "mid": "message_id",
        "text": "Hello!"
      }
    }]
  }]
}
```

### New Comment

```json
{
  "object": "instagram",
  "entry": [{
    "id": "123456789",
    "time": 1234567890,
    "changes": [{
      "field": "comments",
      "value": {
        "id": "comment_id",
        "text": "Nice post!",
        "from": {
          "id": "user_igsid",
          "username": "commenter"
        },
        "media": {
          "id": "media_id"
        }
      }
    }]
  }]
}
```

### Message Reaction

```json
{
  "messaging": [{
    "sender": { "id": "sender_igsid" },
    "reaction": {
      "mid": "message_id",
      "action": "react",
      "reaction": "love",
      "emoji": "❤️"
    }
  }]
}
```

---

## Security Best Practices

:::danger Always Verify Signatures
Never process webhook payloads without verifying the `X-Hub-Signature-256` header. This prevents attackers from sending fake events.
:::

:::tip Respond Quickly
Return `200 OK` immediately, then process events asynchronously. Meta will retry if your endpoint is slow.
:::

## Testing

1. Use the **Test** button in App Dashboard → Webhooks
2. Send a DM to your connected Instagram account
3. Check your server logs for the payload
