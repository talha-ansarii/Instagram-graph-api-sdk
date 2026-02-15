# Business Discovery

The `business_discovery` field allows you to get data about other Instagram Business or Creator IG Users.

> [!NOTE]
> This feature is available for the **Instagram API with Facebook Login**.

---

## Operations

### Reading
`GET /<IG_USER_ID>?fields=business_discovery.username(<USERNAME>)`

Returns data about another Instagram Business or Creator IG User. Perform this request on the Instagram professional account making the query, identifying the targeted business with the `username` parameter.

#### Limitations
- **Age-Gated**: Data about age-gated Instagram accounts will not be returned.

#### Parameters
- **`<USERNAME>`** (required): The username of the targeted Instagram Business or Creator account.

---

## Requirements

### Permissions
A Facebook User access token with:
- `instagram_basic`
- `instagram_manage_insights`
- `pages_read_engagement`

> [!IMPORTANT]
> If the token is via Business Manager, one of the following is also required: `ads_management` or `ads_read`.

---

## Field Expansion

You can use field expansion to get public fields on the targeted IG User (e.g., `followers_count`, `media_count`). Refer to the [IG User Reference](INSTAGRAM_IG_USER.md) for a full list of public fields.

### Sample Request: Get Followers and Media Counts
```bash
GET graph.facebook.com/v24.0/<YOUR_IG_USER_ID>
  ?fields=business_discovery.username(bluebottle){followers_count,media_count}
  &access_token=<TOKEN>
```

### Sample Response
```json
{
  "business_discovery": {
    "followers_count": 267788,
    "media_count": 1205,
    "id": "17841401441775531"
  },
  "id": "<YOUR_IG_USER_ID>"
}
```

---

## Accessing Edges

You can also access the `/media` edge on the targeted IG User and specify fields/metrics for each media object.

### Sample Request: Get Media Edge
```bash
GET graph.facebook.com/v24.0/<YOUR_IG_USER_ID>
  ?fields=business_discovery.username(bluebottle){followers_count,media_count,media}
```

---

## Pagination

The `/media` edge supports cursor-based pagination. 

> [!IMPORTANT]
> **Manual Cursor Construction**: Unlike standard pagination, the response does **not** include `previous` or `next` URL fields. You must use the `before` and `after` cursors to construct your own query strings manually to page through the data.

### Sample Request: Media with Metrics
```bash
GET graph.facebook.com/v24.0/<YOUR_IG_USER_ID>
  ?fields=business_discovery.username(bluebottle){media{comments_count,like_count,view_count}}
```

### Sample Response with Paging
```json
{
  "business_discovery": {
    "media": {
      "data": [
        {
          "comments_count": 50,
          "like_count": 5837,
          "view_count": 7757,
          "id": "17858843269216389"
        }
      ],
      "paging": {
        "cursors": {
          "after": "NTAyYmE4..."
        }
      }
    },
    "id": "17841401441775531"
  },
  "id": "<YOUR_IG_USER_ID>"
}
```

---

## Operations Not Supported
- **Creating**: Not supported.
- **Updating**: Not supported.
- **Deleting**: Not supported.
