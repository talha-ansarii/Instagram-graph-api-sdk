# Mentions

This edge allows you to create an IG Comment on an IG Comment or captioned IG Media object that an IG User has been @mentioned in by another Instagram user.

---

## Operations

### 1. Replying to a Captioned IG Media Object
`POST /<IG_USER_ID>/mentions?media_id=<MEDIA_ID>&message=<MESSAGE>`

Creates an IG Comment on an IG Media object in which an IG User has been @mentioned in a caption.

#### Query String Parameters
| Parameter | Required | Description |
|-----------|----------|-------------|
| **`media_id`** | Yes | The media ID (typically obtained from a Webhook notification payload). |
| **`message`** | Yes | The text content of the reply. |

#### Sample Request
```bash
curl -i -X POST \
 -d "media_id=17920112008063024" \
 -d "message=Thanks%20for%20the%20dinosaur!" \
 -d "access_token=<TOKEN>" \
 "https://graph.facebook.com/v24.0/<IG_USER_ID>/mentions"
```

---

### 2. Replying to a Comment
`POST /<IG_USER_ID>/mentions?media_id=<MEDIA_ID>&comment_id=<COMMENT_ID>&message=<MESSAGE>`

Creates an IG Comment on an IG Comment in which an IG User has been @mentioned.

#### Query String Parameters
| Parameter | Required | Description |
|-----------|----------|-------------|
| **`media_id`** | Yes | The media ID from the Webhook payload. |
| **`comment_id`**| Yes | The comment ID from the Webhook payload. |
| **`message`** | Yes | The text content of the reply. |

#### Sample Request
```bash
curl -i -X POST \
 -d "media_id=17920112008063024" \
 -d "comment_id=17918718562020960" \
 -d "message=Hope%20you%20enjoy%20your%20new%20T-Rex!" \
 -d "access_token=<TOKEN>" \
 "https://graph.facebook.com/v24.0/<IG_USER_ID>/mentions"
```

---

## Limitations
- **Stories**: Mentions on Stories are **not supported**.
- **Self-Tagging**: Commenting on photos in which you were tagged is **not supported**.
- **Privacy**: Webhooks will **not be sent** if the media was created by a private account.

---

## Requirements

### Permissions
A Facebook User access token with:
- `instagram_basic`
- `instagram_manage_comments`
- `pages_read_engagement`
- `pages_show_list` (Required for replying to comments)

> [!IMPORTANT]
> If the token is via Business Manager, one of the following is also required: `ads_management` or `ads_read`.

---

## Sample Response
```json
{
  "id": "17846319838228163"
}
```

---

## Operations Not Supported
- **Reading**: Not supported.
- **Updating**: Not supported.
- **Deleting**: Not supported.
