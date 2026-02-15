# Instagram Graph API - Sending Messages

## Overview
This guide details how to send messages to Instagram users from your professional account.



### ⚠️ Critical Constraints
* **24-Hour Window:** You can only message a user **after** they initiate the conversation. You have **24 hours** to respond to any message they send.
* **Initiation:** You cannot cold-message users. The conversation *must* begin with an incoming message from the user (via Feed, Story, etc.).
* **Group Messaging:** Not supported. Conversations are strictly 1-on-1.

---

## Supported Media Types & Specs

| Media Type | Supported Formats | Max Size |
| :--- | :--- | :--- |
| **Audio** | `aac`, `m4a`, `wav`, `mp4` | 25MB |
| **Image** | `png`, `jpeg` | 8MB |
| **Video** | `mp4`, `ogg`, `avi`, `mov`, `webm` | 25MB |
| **File** | `pdf` | 25MB |
| **Text** | UTF-8 (Max 1000 bytes) | N/A |

---

## Sending Text Messages
**Endpoint:** `POST /{ig-id}/messages`

```bash
curl -X POST "[https://graph.instagram.com/v24.0/](https://graph.instagram.com/v24.0/){ig-id}/messages" \
     -H "Authorization: Bearer {access-token}" \
     -H "Content-Type: application/json" \
     -d '{
           "recipient": { "id": "{igsid}" },
           "message": { "text": "Hello World" }
        }'

```

---

## Sending Media (Images, Video, Audio, File)

### Single Image

```bash
curl -X POST "[https://graph.instagram.com/v24.0/](https://graph.instagram.com/v24.0/){ig-id}/messages" \
     -H "Authorization: Bearer {access-token}" \
     -H "Content-Type: application/json" \
     -d '{
           "recipient": { "id": "{igsid}" },
           "message": {
             "attachments": {
               "type": "image", 
               "payload": { "url": "[https://example.com/image.jpg](https://example.com/image.jpg)" }
             }
           }
         }'

```

### Multi-Image (Beta)

*Note: This feature is rolling out. Ensure your app handles error subcode `2534068` (Feature not available).*

```bash
curl -X POST "[https://graph.instagram.com/v24.0/](https://graph.instagram.com/v24.0/){ig-id}/messages" \
     -H "Authorization: Bearer {access-token}" \
     -H "Content-Type: application/json" \
     -d '{
           "recipient": { "id": "{igsid}" },
           "message": {
              "attachments": [
                 { "type": "image", "payload": { "url": "{url-1}" } },
                 { "type": "image", "payload": { "url": "{url-2}" } }
              ]
           }
         }'

```

### Audio / Video / File

Change the `"type"` field to `"audio"`, `"video"`, or `"file"`.

```bash
curl -X POST "[https://graph.instagram.com/v24.0/](https://graph.instagram.com/v24.0/){ig-id}/messages" \
     -H "Authorization: Bearer {access-token}" \
     -H "Content-Type: application/json" \
     -d '{
           "recipient": { "id": "{igsid}" },
           "message": {
              "attachment": {
               "type": "video", 
               "payload": { "url": "[https://example.com/video.mp4](https://example.com/video.mp4)" }
             }
          }
        }'

```

---

## Sending Stickers (Like Heart)

Send the specific "Like" heart sticker.

```bash
curl -X POST "[https://graph.instagram.com/v24.0/](https://graph.instagram.com/v24.0/){ig-id}/messages" \
     -H "Authorization: Bearer {access-token}" \
     -H "Content-Type: application/json" \
     -d '{
           "recipient": { "id": "{igsid}" },
           "message": {
              "attachment": { "type": "like_heart" }
            }
         }'

```

---

## Message Reactions

### Add Reaction

React to a specific message ID with an emoji.

```bash
curl -X POST "[https://graph.instagram.com/v24.0/](https://graph.instagram.com/v24.0/){ig-id}/messages" \
     -H "Authorization: Bearer {access-token}" \
     -H "Content-Type: application/json" \
     -d '{
           "recipient": { "id": "{igsid}" },
           "sender_action": "react",
           "payload": {
             "message_id": "{message-id-to-react-to}",
             "reaction": "❤️" 
           }
         }'

```

### Remove Reaction

Set `sender_action` to `unreact` and omit the emoji.

```bash
curl -X POST "[https://graph.instagram.com/v24.0/](https://graph.instagram.com/v24.0/){ig-id}/messages" \
     -H "Authorization: Bearer {access-token}" \
     -H "Content-Type: application/json" \
     -d '{
           "recipient": { "id": "{igsid}" },
           "sender_action": "unreact",
           "payload": {
             "message_id": "{message-id-to-unreact}"
           }
         }'

```

---

## Sending Published Posts (Media Share)

Share an Instagram post owned by the business account into the chat.

```bash
curl -X POST "[https://graph.instagram.com/v24.0/](https://graph.instagram.com/v24.0/){ig-id}/messages" \
     -H "Authorization: Bearer {access-token}" \
     -H "Content-Type: application/json" \
     -d '{
           "recipient": { "id": "{igsid}" },
           "message": {
              "attachment": {
                "type": "MEDIA_SHARE",
                "payload": { "id": "{post-id}" }
              }
           }
        }'

```

---

## Automated Experiences & Disclosure

If you use a bot, you **must** disclose this to the user.

* **Requirement:** Disclose at the start of the conversation or after a significant lapse.
* **Examples:** "I am an automated chatbot," "You are talking to a bot."
* **Specific Markets:** California and German markets have strict laws regarding this disclosure.

```

