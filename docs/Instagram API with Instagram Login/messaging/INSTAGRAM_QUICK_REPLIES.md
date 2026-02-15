# Instagram Graph API - Quick Replies

## Overview
Quick Replies provide a way to present a set of up to **13 buttons** in-conversation. When a user taps a button, the buttons are dismissed, and the title of the tapped button is posted to the conversation as a message.



### Constraints
* **Max Buttons:** 13
* **Max Characters:** 20 characters per button (Truncated if longer).
* **Format:** Plain text only (No images in buttons).
* **Platform:** Not supported on Desktop (Mobile only).

---

## Sending Quick Replies
To send quick replies, you must set the `messaging_type` to `RESPONSE`.

**Endpoint:** `POST /{ig-id}/messages`

### Request Payload
The `quick_replies` array contains objects defining each button.

```bash
curl -X POST "[https://graph.instagram.com/v24.0/](https://graph.instagram.com/v24.0/){ig-id}/messages" \
     -H "Authorization: Bearer {access-token}" \
     -H "Content-Type: application/json" \
     -d '{
            "recipient": {
                "id": "{igsid}"
            },
            "messaging_type": "RESPONSE",
            "message": {
                "text": "Choose an option below:",
                "quick_replies": [
                    {
                      "content_type": "text",
                      "title": "Order Status",
                      "payload": "ORDER_STATUS_PAYLOAD"
                    },
                    {
                      "content_type": "text",
                      "title": "Talk to Human",
                      "payload": "HUMAN_AGENT_PAYLOAD"
                    }
               ]
            }
         }'

```

### Key Parameters

| Parameter | Value | Description |
| --- | --- | --- |
| `messaging_type` | `RESPONSE` | **Required** for Quick Replies. |
| `content_type` | `text` | Currently the only supported type. |
| `title` | String | The button label (Max 20 chars). |
| `payload` | String | Hidden data sent back to your webhook when clicked. |

---

## Handling the User Response (Webhook)

When a user taps a Quick Reply, your webhook receives a `messages` event.

* **Trigger:** User taps a button.
* **Visual:** The button title appears as a user message in the chat.
* **Data:** The `payload` you defined is returned in the `quick_reply` object.

### Sample Webhook Payload

```json
{
  "object": "instagram",
  "entry": [
    {
      "id": "{ig-id}",
      "time": 1502905976963,
      "messaging": [
        {
          "sender": { "id": "{igsid}" },
          "recipient": { "id": "{ig-id}" },
          "timestamp": 1502905976377,
          "message": {
            "mid": "{message-id}",
            "text": "Order Status", // The title of the button clicked
            "quick_reply": {
              "payload": "ORDER_STATUS_PAYLOAD" // The hidden payload you sent
            }
          }
        }
      ]
    }
  ]
}

```

### Agent Logic

1. Check if incoming message has a `quick_reply` field.
2. If yes, read the `payload` (e.g., `ORDER_STATUS_PAYLOAD`) rather than the `text` to determine the user's intent.
