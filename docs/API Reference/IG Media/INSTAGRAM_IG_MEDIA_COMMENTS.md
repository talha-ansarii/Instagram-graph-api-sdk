# Comments

Represents a collection of IG Comments on an IG Media object.

---

## Non-Organic Comments
Comments on Ads containing IG Media (i.e., **non-organic comments**) are of a different type and are **not supported** by this endpoint. 
To manage non-organic comments:
1. Use the **Marketing API**.
2. Request the Ad's `effective_instagram_media_id`.
3. Query the returned ID's `/comments` edge.
4. Refer to the Marketing API's [Post Moderation](https://developers.facebook.com/docs/marketing-api/guides/post-moderation) guide.

---

## Requirements

### Comparison of Login Flows

| Feature | Instagram API with Instagram Login | Instagram API with Facebook Login |
|---------|------------------------------------|-----------------------------------|
| **Access Tokens** | Instagram User access token | Facebook User access token |
| **Host URL** | `graph.instagram.com` | `graph.facebook.com` |
| **Login Type** | Business Login for Instagram | Facebook Login for Business |
| **Permissions** | `instagram_business_basic`, `instagram_business_manage_comments` | `instagram_basic`, `instagram_manage_comments`, `pages_read_engagement` |

> [!NOTE]
> If the app user was granted a role via the Business Manager on the Page connected to the targeted IG User, you will also need one of: `ads_management` or `ads_read`.

---

## Operations

### Creating a Comment on a Media Object
`POST /<IG_MEDIA_ID>/comments?message=<MESSAGE_CONTENT>`

Creates an IG Comment on an IG Media object.

#### Parameters
- **`message`** (required): The text to be included in the comment.

#### Limitations
- **Live Video**: Comments on live video IG Media are **not supported**.

#### Example Request
```bash
curl -X POST \
  "https://graph.facebook.com/v24.0/<IG_MEDIA_ID>/comments?message=This%20is%20awesome!&access_token=<ACCESS_TOKEN>"
```

#### Example Response
```json
{
  "id": "17870913679156914"
}
```

---

### Reading Comments on a Media Object
`GET /<IG_MEDIA_ID>/comments`

Returns a list of top-level IG Comments on an IG Media object.

#### Limitations
- **Ordering**: 
  - API v3.1 or older: Chronological order.
  - API v3.2+: **Reverse chronological** order.
- **Nesting**: Returns **only top-level** comments. Replies are excluded unless specifically requested via field expansion (`fields=replies`).
- **Paging**: Returns a maximum of **50 comments** per query.
- **Filtering**: Comments cannot be filtered by timestamp.

#### Permissions
Requires an access token from the user who created the IG Media object, with:
- `instagram_basic`
- `instagram_manage_comments`
- *(If via Business Manager)*: `ads_management` or `ads_read`.

#### Sample Request
```bash
curl -X GET \
  "https://graph.instagram.com/v24.0/<IG_MEDIA_ID>/comments?access_token=<ACCESS_TOKEN>"
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
      "timestamp": "2017-08-31T18:10:30+0000",
      "text": "*Sniff*",
      "id": "17873440459141021"
    }
  ]
}
```

---

## Operations Not Supported
- **Updating**: This operation is **not supported**.
- **Deleting**: This operation is **not supported** via this collection endpoint. (To delete a specific comment, use the [IG Comment](../IG%20Comment/INSTAGRAM_IG_COMMENT.md) node).
