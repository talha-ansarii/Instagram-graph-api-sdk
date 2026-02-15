# Mentioned Comment

Returns data on an IG Comment in which an IG User has been @mentioned by another Instagram user.

---

## Operations

### Reading
`GET /<IG_USER_ID>?fields=mentioned_comment.comment_id(<COMMENT_ID>){<FIELDS>}`

Retrieves details for a specific comment where the user was mentioned. The `<COMMENT_ID>` is typically obtained from a Webhook notification.

#### Limitations
- **Disabled Comments**: This endpoint will return an error if comments have been disabled on the media object where the mention occurred.

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
| **`id`** | ID of the IG Comment. |
| **`text`** | Text content of the comment. |
| **`timestamp`** | ISO 8601 formatted creation date. |
| **`like_count`** | Number of likes on the comment. |
| **`media`** | ID of the IG Media where the comment was made. Supports **Field Expansion**. |

---

## Field Expansion

You can expand the `media` field to get additional data on the parent media object.

### Sample Field Expansion Request
```bash
curl -X GET \
  'https://graph.facebook.com/v24.0/<IG_USER_ID>?fields=mentioned_comment.comment_id(<COMMENT_ID>){timestamp,like_count,text,media{id,media_url}}&access_token=<TOKEN>'
```

### Sample Response
```json
{
  "mentioned_comment": {
    "timestamp": "2017-05-03T16:09:08+0000",
    "like_count": 185,
    "text": "Shout out to @metricsaurus",
    "id": "17873440459141021",
    "media": {
      "id": "17895695668004550",
      "media_url": "https://scont..."
    }
  },
  "id": "<IG_USER_ID>"
}
```

---

## Pagination

If using field expansion for an edge that supports pagination:
- **Manual Construction**: The response includes `before` and `after` cursors but **not** `previous` or `next` URL fields. You must construct pagination query strings manually.

---

## Operations Not Supported
- **Creating**: Not supported (use the [Mentions](INSTAGRAM_IG_USER_MENTIONS.md) guide to reply).
- **Updating**: Not supported.
- **Deleting**: Not supported.
