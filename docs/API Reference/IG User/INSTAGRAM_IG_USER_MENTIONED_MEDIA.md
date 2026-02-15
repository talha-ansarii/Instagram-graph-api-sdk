# Mentioned Media

Returns data on an IG Media in which an IG User has been @mentioned in a caption by another Instagram user.

---

## Operations

### Reading
`GET /<IG_USER_ID>?fields=mentioned_media.media_id(<MEDIA_ID>){<FIELDS>}`

Retrieves details for a specific media object where the user was mentioned in the caption. The `<MEDIA_ID>` is typically obtained from a Webhook notification.

#### Limitations
- **Stories**: Mentions on Stories are **not supported**.
- **Tagged Photos**: Commenting on photos in which you were tagged is **not supported**.
- **Privacy**: Webhooks will **not be sent** if the media was created by a private account.

---

## Requirements

| Requirement | Description |
|-------------|-------------|
| **Access Tokens** | User Access Token. |
| **Permissions** | `instagram_basic`, `instagram_manage_comments`, `pages_read_engagement`. |
| **Page Tasks** | App user needs `MANAGE`, `CREATE_CONTENT`, or `MODERATE` tasks on the linked Page. |

> [!IMPORTANT]
> If the token is via Business Manager, one of the following is also required: `ads_management` or `ads_read`.

---

## Response Fields

| Field Name | Description |
|------------|-------------|
| **`id`** | ID of the IG Media. |
| **`caption`** | The caption text. *Note: Leading '@' symbols are stripped unless the app user created the media.* |
| **`media_type`** | `CAROUSEL_ALBUM`, `IMAGE`, `STORY`, or `VIDEO`. |
| **`media_url`** | URL of the published media. |
| **`timestamp`** | ISO 8601 formatted creation date. |
| **`username`** | Username of the creator. |
| **`like_count`** | Count of likes (omitted if hidden by owner). |
| **`comments_count`**| Total number of comments. |
| **`comments`** | List of comments (supports expansion). |
| **`owner`** | ID of the creator (only if the app user created the media). |

---

## Sample Request
```bash
curl -X GET \
  'https://graph.facebook.com/v24.0/<IG_USER_ID>?fields=mentioned_media.media_id(<MEDIA_ID>){caption,media_type,id}&access_token=<TOKEN>'
```

### Sample Response
```json
{
  "mentioned_media": {
    "caption": "metricsaurus headquarters!",
    "media_type": "IMAGE",
    "id": "17873440459141021"
  },
  "id": "<IG_USER_ID>"
}
```

---

## Pagination

If using field expansion for an edge that supports pagination (like `comments`):
- **Manual Construction**: The response includes `before` and `after` cursors but **not** `previous` or `next` URL fields. You must construct pagination query strings manually.

---

## Operations Not Supported
- **Creating**: Not supported.
- **Updating**: Not supported.
- **Deleting**: Not supported.
