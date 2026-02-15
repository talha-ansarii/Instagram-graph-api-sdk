# IG Hashtag Recent Media

Represents a collection of the most recently published photo and video IG Media objects that have been tagged with a specific hashtag.

> [!NOTE]
> This endpoint is available for the **Instagram API with Facebook Login**.

---

## Operations

### Reading
`GET /<IG_HASHTAG_ID>/recent_media?user_id=<USER_ID>&fields=<LIST_OF_FIELDS>`

Returns a list of the most recently published photo and video IG Media objects published with a specific hashtag.

#### Limitations
- **Visibility**: Only returns **public** photos and videos.
- **Recency**: Only returns media objects published within **24 hours** of the query execution.
- **Ads**: Will NOT return promoted, boosted, or ad media.
- **Pagination**: Max **50 results** per page. Only returns an `after` cursor (no `before` cursor). The `after` cursor value stays the same for each page but is used to fetch the next set.
- **Order**: Responses are not guaranteed to be in strictly chronological order.
- **Volume**: Max **30 unique hashtags** within a 7-day period.
- **Privacy**: You **cannot** request the `username` field on returned media objects.

---

## Requirements

| Requirement | Description |
|-------------|-------------|
| **Features** | Instagram Public Content Access |
| **Permissions** | `instagram_basic` |
| **Tokens** | A User access token of a Facebook User approved for tasks on the connected Page. |

> [!IMPORTANT]
> If the token is via Business Manager, one of the following is also required: `ads_management`, `business_management`, or `read_pages_engagement`.

---

## Parameters

### Query String Parameters

| Parameter | Description |
|-----------|-------------|
| **`user_id`** | (Required) The ID for the person querying the data. |
| **`fields`** | A comma-separated list of fields on the media object. |

### Available Fields

| Field Name | Description |
|------------|-------------|
| `id` | The ID for the media object. |
| `caption` | The caption for the media object. |
| `media_type` | `CAROUSEL_ALBUM`, `IMAGE`, or `VIDEO`. |
| `media_url` | The URL for the media object (not returned for Carousels). |
| `permalink` | The permalink for the media object. |
| `timestamp` | ISO 8601 timestamp for when it was published. |
| `comments_count`| Number of comments on the media object. |
| `like_count` | Number of likes (omitted if hidden by owner). |
| `children` | Media objects in a carousel album, if applicable. |

---

## Sample Request
```bash
GET graph.facebook.com/v24.0/<IG_HASHTAG_ID>/recent_media
  ?user_id=<USER_ID>
  &fields=id,media_type,comments_count,like_count
```

## Sample Response
```json
{
  "data": [
    {
      "id": "17880997618081620",
      "media_type": "IMAGE",
      "comments_count": 84,
      "like_count": 177
    },
    {
      "id": "17871527143187462",
      "media_type": "IMAGE",
      "comments_count": 24,
      "like_count": 57
    }
  ],
  "paging": {
    "cursors": {
      "after": "NTAyYmE4..."
    },
    "next": "https://graph.facebook.com/..."
  }
}
```

---

## Operations Not Supported
- **Creating**: Not supported.
- **Updating**: Not supported.
- **Deleting**: Not supported.
