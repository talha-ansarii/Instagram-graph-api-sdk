# Instagram Graph API - Generic Templates (Carousels)

## Overview
The **Generic Template** allows you to send structured messages that include an image, text, and buttons. By adding multiple objects to the `elements` array, you can create a **horizontally scrollable carousel** (up to 10 items).



### Limitations
* **Platform:** This feature is currently **not available on desktop**.
* **Elements:** Maximum **10 elements** (cards) per message.
* **Buttons:** Maximum **3 buttons** per element.
* **Text Limits:** Title and Subtitle are limited to **80 characters** each.

---

## Sending a Generic Template
**Endpoint:** `POST /{ig-id}/messages`

To send a template, you must set the `attachment` type to `template` and `template_type` to `generic`.

### Request (cURL)
```bash
curl -X POST "[https://graph.instagram.com/v24.0/](https://graph.instagram.com/v24.0/){ig-id}/messages" \
  -H "Authorization: Bearer {access-token}" \
  -H "Content-Type: application/json" \
  -d '{
        "recipient":{
          "id":"{igsid}"
        },
        "message":{
          "attachment":{
            "type":"template",
            "payload":{
              "template_type":"generic",
              "elements":[
                {
                  "title":"Welcome to Our Store",
                  "image_url":"[https://example.com/image1.jpg](https://example.com/image1.jpg)",
                  "subtitle":"Best deals in town.",
                  "default_action": {
                    "type": "web_url",
                    "url": "[https://example.com/store](https://example.com/store)"
                  },
                  "buttons":[
                    {
                      "type":"web_url",
                      "url":"[https://example.com/store](https://example.com/store)",
                      "title":"Shop Now"
                    },
                    {
                      "type":"postback",
                      "title":"Contact Support",
                      "payload":"SUPPORT_PAYLOAD"
                    }              
                  ]      
                },
                {
                   "title":"Second Item in Carousel",
                   "image_url":"[https://example.com/image2.jpg](https://example.com/image2.jpg)",
                   "buttons": [ ... ]
                }
              ]
            }
          }
        }
      }'

```

### Response

```json
{
  "recipient_id": "1254477777772919",
  "message_id": "AG5Hz2Uq7tuwNEhXfYYKj8mJEM..."
}

```

---

## Payload Structure

### Message Attachment

| Property | Value | Description |
| --- | --- | --- |
| `type` | `template` | **Required.** |
| `payload` | Object | The template definition. |

### Template Payload

| Property | Value | Description |
| --- | --- | --- |
| `template_type` | `generic` | **Required.** |
| `elements` | Array | Array of objects describing the cards. **Max 10.** |

### Element Object (The Card)

At least one property must be set in addition to `title`.

| Property | Type | Description | Constraints |
| --- | --- | --- | --- |
| `title` | String | **Required.** Main header. | Max 80 chars. |
| `subtitle` | String | Optional. Description text. | Max 80 chars. |
| `image_url` | String | Optional. Main image. | Valid URL. |
| `default_action` | Object | Optional. Action when user taps the card itself (not a button). | Same structure as URL button. |
| `buttons` | Array | Optional. List of buttons. | Max 3 buttons per element. |

### Supported Button Types

Only `web_url` and `postback` buttons are supported in Generic Templates.

1. **Web URL:** Opens a website.
```json
{ "type": "web_url", "url": "https://...", "title": "Visit Website" }

```


2. **Postback:** Sends a payload to your webhook (invisible to user).
```json
{ "type": "postback", "title": "Start Chat", "payload": "START_CHAT_PAYLOAD" }

```


