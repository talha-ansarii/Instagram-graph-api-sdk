# Instagram Graph API - Button Template

## Overview
The **Button Template** allows you to send a message that contains text and up to **three attached buttons**. This is useful for offering distinct choices without the visual complexity of a Generic Template (Carousel).



### Button Types
1.  **URL Button:** Opens a web page in the in-app browser.
2.  **Postback Button:** Sends a hidden payload string to your webhook via the `messaging_postbacks` event.

### Constraints
* **Max Buttons:** Up to 3 buttons.
* **Text Limit:** Up to 640 characters.
* **Encoding:** Text must be UTF-8.

---

## Sending a Button Template
**Endpoint:** `POST /{ig-id}/messages`

To send a button template, set the `attachment` type to `template` and `template_type` to `button`.

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
                   "template_type":"button",
                   "text":"Do you want to confirm your subscription?",
                   "buttons":[
                     {  
                       "type":"web_url",
                       "url":"[https://example.com/subscription](https://example.com/subscription)",
                       "title":"View Details"
                     },
                     {  
                       "type":"postback",
                       "payload":"CONFIRM_SUBSCRIPTION_YES",
                       "title":"Yes, Confirm"
                     },
                     {  
                       "type":"postback",
                       "payload":"CONFIRM_SUBSCRIPTION_NO",
                       "title":"No, Cancel"
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

| Property | Type | Description |
| --- | --- | --- |
| `template_type` | String | Must be set to `button`. |
| `text` | String | Text to display above buttons (Max 640 chars). |
| `buttons` | Array | Array of button objects (Min 1, Max 3). |

### Button Object

| Property | Type | Description |
| --- | --- | --- |
| `type` | String | `web_url` or `postback`. |
| `title` | String | The button label. |
| `url` | String | **Required for `web_url`.** The website URL. |
| `payload` | String | **Required for `postback`.** The string sent to your webhook. |

```
