---
sidebar_position: 10
---

# WebhooksApi

Manage webhook subscriptions and utilities.

## Methods

### subscribe()

Subscribe your app to receive notifications for specific fields.

```typescript
const result = await client.webhooks.subscribe(['messages', 'comments']);
console.log(result.success); // true
```

### unsubscribe()

Unsubscribe your app from all fields (or specific ones if supported).

```typescript
// Unsubscribe from everything
await client.webhooks.unsubscribe();
```

### getSubscribedFields()

Get the list of fields your app is currently subscribed to.

```typescript
const response = await client.webhooks.getSubscribedFields();
console.log(response.data[0].subscribed_fields);
// ['messages', 'comments']
```

## Utilities

Static utilities for handling incoming webhook requests.

### InstagramWebhooks.verifySignature()

Verify the `X-Hub-Signature-256` header.

```typescript
import { InstagramWebhooks } from 'instagram-graph-api-sdk';

const isValid = InstagramWebhooks.verifySignature(
  rawRequestBody, // string
  signatureHeader, // 'sha256=...'
  appSecret
);
```

### InstagramWebhooks.parsePayload()

Type-safe parser for webhook payloads.

```typescript
const payload = InstagramWebhooks.parsePayload(jsonBody);

// payload is structured as:
// {
//   object: 'instagram',
//   entry: [{ ... }]
// }
```
