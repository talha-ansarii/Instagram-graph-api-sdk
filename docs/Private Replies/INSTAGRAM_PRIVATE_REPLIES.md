# Send a Private Reply to a Commenter

This document shows you how to programmatically send a private reply to a person who commented on your app user's Instagram professional post, reel, story, Live, or ad post.

## How It Works

1. **User Comments**: An Instagram user comments on your app user's Instagram professional post, reel, story, Live, or ad post.
2. **Webhook Triggered**: A webhook event is triggered and Meta sends your server a notification with information about the comment.
3. **Private Response**: Your app uses the comment's ID to send a private response directly to the Instagram user. 
    - This reply appears in the person's **Inbox** if they follow the Instagram professional account.
    - It appears in the **Request folder** if they do not follow the account.
4. **Time Window**: Your app can send this private reply within **7 days** of the creation time of the comment (except for Instagram Live, which must be during the broadcast). The message includes a link to the commented post.

## Requirements

This guide assumes you have read the Instagram Platform Overview and implemented the needed components for using this API, such as a Meta login flow and a webhooks server to receive notifications.

### Comparison of Login Flows

| Feature | Instagram API with Instagram Login | Instagram API with Facebook Login |
|---------|------------------------------------|-----------------------------------|
| **Access Tokens** | Instagram User access token | Facebook Page access token |
| **Host URL** | `graph.instagram.com` | `graph.facebook.com` |
| **Login Type** | Business Login for Instagram | Facebook Login for Business |
| **Permissions** | `instagram_business_basic`, `instagram_business_manage_comments` | `instagram_basic`, `instagram_manage_comments`, `pages_read_engagement` |
| **Webhooks** | `comments`, `live_comments` | `comments`, `live_comments` |

> [!NOTE]
| If the app user was granted a role on the Page connected to your app user's Instagram professional account via the Business Manager, your app will also need `ads_management` and `ads_read`.

---

## Limitations

- **Quantity**: Only one message can be sent to the commenter.
- **Timing**: The message must be sent within **7 days** of the comment.
- **Instagram Live**: Private replies can ONLY be sent during the live broadcast. Once the broadcast ends, private replies cannot be sent.
- **Follow-ups**: Follow-up messages can only be sent if the recipient responds, and must be sent within 24 hours of that response.

---

## Send a Private Reply

To send a private reply, send a `POST` request to the `/<APP_USERS_IG_ID>/messages` endpoint.

### Sample Request

```bash
curl -i -X POST "https://<HOST_URL>/v24.0/<APP_USERS_IG_ID>/messages" \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer <ACCESS_TOKEN>" \
     -d '{
             "recipient":{ 
                 "comment_id": "<COMMENT_ID>" 
             },
             "message": { 
                 "text": "<PRIVATE_REPLY_MESSAGE_TEXT>" 
             }
         }'
```

#### Success Response

```json
{
  "recipient_id": "526...",   
  "message_id": "aWdfZ..."    
}
```
