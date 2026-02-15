# Instagram Graph API - Webhook Notification Payloads

## Overview
This reference guide details the JSON payload structures for Instagram webhook notifications. The syntax varies slightly depending on whether your app implements **Business Login for Instagram** or **Facebook Login for Business**.

---

## 1. Important Update: Post Shares (Nov 2025)
**Effective Date:** November 3, 2025
**Transition Period Ends:** February 1, 2026

When an Instagram post is shared to your app user's Direct Messages, the payload will now include a new attachment type: `ig_post`.

### Dual Attachment Payload (Transition Phase)
During the transition, both `share` (deprecated) and `ig_post` (new) attachments will be sent.

```json
{
  "object": "instagram",
  "entry": [
    {
      "time": 1761287298065,
      "id": "{PAGE_ID}",
      "messaging": [
        {
          "sender": { "id": "{SENDER_ID}" },
          "recipient": { "id": "{PAGE_ID}" },
          "timestamp": 1761287294014,
          "message": {
            "mid": "{MESSAGE_ID}",
            "attachments": [
              {
                "type": "share",
                "payload": {
                  "ig_post_media_id": "18139494541428835",
                  "title": "Post Caption...",
                  "url": "[https://lookaside.fbsbx.com/](https://lookaside.fbsbx.com/)..."
                }
              },
              {
                "type": "ig_post",
                "payload": {
                  "ig_post_media_id": "18139494541428835",
                  "title": "Post Caption...",
                  "url": "[https://lookaside.fbsbx.com/](https://lookaside.fbsbx.com/)..."
                }
              }
            ]
          }
        }
      ]
    }
  ]
}

```

---

## 2. Business Login for Instagram (Payloads)

These payloads apply if your users log in using their Instagram credentials.

### Common Structure

All notifications follow this wrapper:

```json
[
  {
    "object": "instagram",
    "entry": [
      {
        "id": "<YOUR_APP_USERS_INSTAGRAM_ACCOUNT_ID>",
        "time": <TIME_META_SENT_NOTIFICATION>,
        "messaging": [] // OR "changes": []
      }
    ]
  }
]

```

### Comments & Live Comments

Notification when a user comments on your media.

* **Field:** `comments` or `live_comments`

```json
{
  "field": "comments",
  "value": {
    "id": "<COMMENT_ID>",
    "from": {
      "id": "<INSTAGRAM_SCOPED_USER_ID>",
      "username": "<USERNAME>"
    },
    "text": "<COMMENT_TEXT>",
    "media": {
      "id": "<MEDIA_ID>",
      "media_product_type": "<MEDIA_PRODUCT_TYPE>"
    }
  }
}

```

### Messaging (Direct Messages)

Notification when a user sends a DM.

**Standard Text Message:**

```json
{
  "messaging": [
    {
      "sender": { "id": "<SENDER_ID>" },
      "recipient": { "id": "<RECIPIENT_ID>" },
      "timestamp": <TIMESTAMP>,
      "message": {
        "mid": "<MESSAGE_ID>",
        "text": "Hello World",
        "is_deleted": false, // True if user un-sent the message
        "is_echo": false,    // True if your app sent the message
        "reply_to": { "mid": "<PARENT_MESSAGE_ID>" } // If it's a reply
      }
    }
  ]
}

```

**Message Reactions:**
User reacts to a message (e.g., "Love" heart).

```json
{
  "reaction": {
    "mid": "<MESSAGE_ID>",
    "action": "react", // or "unreact"
    "reaction": "love",
    "emoji": "\u2764\uFE0F"
  }
}

```

**Messaging Postbacks (Buttons):**
User clicks a "Get Started" button or Icebreaker.

```json
{
  "postback": {
    "mid": "<MESSAGE_ID>",
    "title": "Get Started",
    "payload": "USER_CLICKED_GET_STARTED"
  }
}

```

**Messaging Seen (Read Receipt):**
User reads a message.

```json
{
  "read": {
    "mid": "<MESSAGE_ID>"
  }
}

```

**Message Edit:**
User edits a previously sent message.

```json
{
  "message_edit": {
    "mid": "<MESSAGE_ID>",
    "text": "<NEW_EDITED_TEXT>",
    "num_edit": 1
  }
}

```

---

## 3. Facebook Login for Business (Payloads)

These payloads apply if your users log in via Facebook Login (linking a Page).

### Comments

Note the slightly different structure compared to Instagram Login.

```json
{
  "field": "comments",
  "value": {
    "from": {
      "id": "<IG_SCOPED_ID>",
      "username": "<USERNAME>"
    },
    "comment_id": "<COMMENT_ID>",
    "parent_id": "<PARENT_ID>", // If reply to another comment
    "text": "<COMMENT_TEXT>",
    "media": {
      "id": "<MEDIA_ID>",
      "ad_id": "<AD_ID>", // If comment is on an Ad
      "media_product_type": "FEED"
    }
  }
}

```

### Mentions

Notification when your account is @mentioned in media or comments.

**Mention on Media:**

```json
{
  "field": "mentions",
  "value": {
    "media_id": "<MEDIA_ID_WHERE_MENTIONED>"
  }
}

```

**Mention in Comment:**

```json
{
  "field": "mentions",
  "value": {
    "comment_id": "<COMMENT_ID_WHERE_MENTIONED>",
    "media_id": "<MEDIA_ID_OF_POST>"
  }
}

```

### Story Insights

Metrics for stories (impressions, reach, etc.). Only available for the first 24 hours.

```json
{
  "field": "story_insights",
  "value": {
    "media_id": "<STORY_MEDIA_ID>",
    "exits": 12,
    "impressions": 450,
    "reach": 400,
    "replies": 5,
    "taps_forward": 100,
    "taps_back": 20
  }
}

```

---

## ID Mapping Table

Confused about `sender.id` vs `recipient.id`? Use this cheat sheet.

| Action | `sender.id` | `recipient.id` |
| --- | --- | --- |
| **User sends YOU a message** | Instagram User's ID (Scoped) | Your Professional Account ID |
| **YOU send User a message** | Your Professional Account ID | Instagram User's ID (Scoped) |

```

