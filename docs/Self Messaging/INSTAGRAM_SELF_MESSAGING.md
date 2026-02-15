# Self Messaging

Self Messaging enables a single Instagram Professional account to act as both a business and an Instagram user, eliminating the need for two separate accounts when testing message previews or automation. This helps showcase messaging automation previews to your newly onboarded business users.

Since the business is messaging itself, the **24-hour response window does not apply**.

## Availability and Limitations

- **Onboarding Flows**: Available for IG business users onboarded via both *Instagram API with Instagram Login* and *Instagram API with Facebook Login*.
- **Quick Replies**: Currently **not supported** for self messaging.

---

## Requirements

- An Instagram Professional account connected to your app.
- Business Messaging API access.
- Webhooks configured for message events.

---

## Step 1: Onboard the IG Professional Account

This guide assumes you have read the Instagram Platform Overview and implemented the needed components (Meta login, webhooks server, etc.).

### Comparison of Login Flows

| Feature | Instagram API with Instagram Login | Instagram API with Facebook Login |
|---------|------------------------------------|-----------------------------------|
| **Access Tokens** | Instagram User access token | Facebook Page access token |
| **Host URL** | `graph.instagram.com` | `graph.facebook.com` |
| **Permissions (Messaging)** | `instagram_business_basic`, `instagram_business_manage_messages` | `instagram_business_basic`, `instagram_business_manage_messages` |
| **Permissions (Comments)** | `instagram_business_basic`, `instagram_business_manage_comments` | `instagram_basic`, `instagram_manage_comments`, `pages_read_engagement` |
| **Webhooks (Messaging)** | `messages` | `messages` |
| **Webhooks (Comments)** | `comments`, `live_comments` | `comments`, `live_comments` |

---

## Step 2: Set Up Webhooks

Set up the webhook to listen for message and postback events.

When an Instagram Professional account sends a message to itself in the Instagram app, an **echo webhook** is triggered. A value of `is_self: true` indicates it is a self message.

### Example Echo Webhook

```json
{
  "object": "instagram",
  "entry": [
    {
      "id": "<YOUR_APP_USERS_IG_USER_ID>",
      "time": 1569262486134,
      "messaging": [
        {
          "sender": { "id": "<YOUR_APP_USERS_IG_USER_ID>" },
          "recipient": { "id": "<INSTAGRAM_SCOPED_ID>" },
          "timestamp": 1569262485349,
          "message": {
            "mid": "<MESSAGE_ID>",
            "text": "<MESSAGE_TEXT>",
            "is_echo": true,
            "is_self": true
          }
        }
      ]
    }
  ]
}
```

---

## Step 3: Send a Self Message

Use the recipient ID received from the webhook to send a message to self via the API.

### Example Request

```bash
curl -X POST "https://graph.facebook.com/v24.0/<INSTAGRAM_SCOPED_ID>/messages" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <ACCESS_TOKEN>" \
  -d '{
        "message": {
          "text": "Hello from your IG Pro account!"
        }
      }'
```

On success, your app receives a confirmation with the message ID: `{"id": "<MESSAGE_ID>"}`.

---

## Postback and Comment Webhooks

### Example Postback Webhook
When the Instagram Professional user clicks a CTA button or interacts with a message, a postback webhook is generated with `"is_self": true`.

```json
{
  "object": "instagram",
  "entry": [
    {
      "id": "45202218377435",
      "messaging": [
        {
          "sender": { "id": "<YOUR_APP_USERS_IG_USER_ID>" },
          "recipient": { "id": "<INSTAGRAM_SCOPED_ID>" },
          "is_self": true,
          "postback": {
            "title": "Start Chatting",
            "payload": "DEVELOPER_DEFINED_PAYLOAD"
          }
        }
      ]
    }
  ]
}
```

### Example Comment Webhook
When an Instagram Professional user comments on their own post, a comments webhook is generated with `self_ig_scoped_id`.

```json
{
  "object": "instagram",
  "entry": [
    {
      "id": "<YOUR_ACCOUNT_ID>",
      "changes": [
        {
          "field": "comments",
          "value": {
            "from": {
              "id": "<YOUR_ACCOUNT_ID>",
              "username": "<USERNAME>",
              "self_ig_scoped_id": "<YOUR_SCOPED_ID>"
            },
            "id": "<COMMENT_ID>",
            "text": "<COMMENT_TEXT>"
          }
        }
      ]
    }
  ]
}
```
