# Comment Moderation

This guide shows you how to get comments, reply to comments, delete comments, hide/unhide comments, and disable/enable comments on Instagram Media owned by your app users using the Instagram Platform.

> [!NOTE]
> In this guide we will be using Instagram user and Instagram professional account interchangeably. An Instagram User object represents your app user's Instagram professional account.

## Requirements

This guide assumes you have read the Instagram Platform Overview and implemented the needed components for using this API, such as a Meta login flow and a webhooks server to receive notifications.

You will need the following:

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

### Access Level

- **Advanced Access**: If your app serves Instagram professional accounts you don't own or manage.
- **Standard Access**: If your app serves Instagram professional accounts you own or manage and have added to your app in the App Dashboard.

---

## Endpoints

- `GET /<IG_MEDIA_ID>/comments` — Get comments on an IG Media.
- `GET /<IG_COMMENT_ID>/replies` — Get replies on an IG Comment.
- `POST /<IG_COMMENT_ID>/replies` — Reply to an IG Comment.
- `POST /<IG_COMMENT_ID>` — Hide/unhide an IG Comment.
- `POST /<IG_MEDIA_ID>` — Disable/enable comments on an IG Media.
- `DELETE /<IG_COMMENT_ID>` — Delete an IG Comment.

---

## Get Comments

There are two ways to get comments on published Instagram media: an API query or a webhook notification.

> [!TIP]
> We strongly recommend using webhooks to prevent rate limiting.

### API Request

To get all the comments on a published Instagram media object, send a `GET` request to the `/<IG_MEDIA_ID>/comments` endpoint.

```bash
curl -X GET "https://<HOST_URL>/v24.0/<IG_MEDIA_ID>/comments"
```

#### Sample Response

```json
{
  "data": [
    {
      "timestamp": "2017-08-31T19:16:02+0000",
      "text": "This is awesome!",
      "id": "17870913679156914"
    },
    {
      "timestamp": "2017-08-31T19:16:02+0000",
      "text": "Amazing!",
      "id": "17870913679156914"
    }
  ]
}
```

### Webhooks

When the `comments` or `live_comments` event is triggered your webhooks server receives a notification.

> [!IMPORTANT]
> When hosting an Instagram Live story, make sure your server can handle the increased load of notifications triggered by `live_comments` events.

#### Facebook Login for Business Payload

```json
[
  {
    "object": "instagram",
    "entry": [
      {
        "id": "<YOUR_APP_USERS_INSTAGRAM_ACCOUNT_ID>",
        "time": <TIME_META_SENT_THIS_NOTIFICATION>,
        "changes": [
          {
            "field": "comments",
            "value": {
              "from": {
                "id": "<INSTAGRAM_USER_SCOPED_ID>",
                "username": "<INSTAGRAM_USER_USERNAME>"
              },
              "comment_id": "<COMMENT_ID>",
              "parent_id": "<PARENT_COMMENT_ID>",
              "text": "<TEXT_ID>",
              "media": {
                "id": "<MEDIA_ID>",
                "ad_id": "<AD_ID>",
                "media_product_type": "<MEDIA_PRODUCT_ID>"
              }
            }
          }
        ]
      }
    ]
  }
]
```

#### Business Login for Instagram Payload

```json
[
  {
    "object": "instagram",
    "entry": [
      {
        "id": "<YOUR_APP_USERS_INSTAGRAM_ACCOUNT_ID>",
        "time": <TIME_META_SENT_THIS_NOTIFICATION>,
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
    ]
  }
]
```

---

## Reply to a Comment

To reply to a comment, send a `POST` request to the `/<IG_COMMENT_ID>/replies` endpoint.

### Sample Request

```bash
curl -X POST "https://<HOST_URL>/v24.0/<IG_COMMENT_ID>/replies" \
     -H "Content-Type: application/json" \
     -d '{
           "message":"Thanks for sharing!"
         }'
```

On success, your app receives a JSON response with the comment ID for your reply: `{"id": "17873440459141029"}`.

> [!TIP]
> If your app user has a lot of comments to reply to, you can batch the replies into a single request.
