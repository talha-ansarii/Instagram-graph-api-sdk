# IG Hashtag Top Media

Represents a collection of the most popular photo and video IG Media objects that have been tagged with a hashtag.

> [!NOTE]
> **Popularity Methodology**: Popularity is determined by a mix of views and viewer interaction, using the same methodology as the top posts search on `www.instagram.com`.
> Available for the **Instagram API with Facebook Login**.

---

## Operations

### Reading
`GET /<IG_HASHTAG_ID>/top_media?user_id=<IG_USER_ID>&fields=<LIST_OF_FIELDS>`

Returns the most popular photo and video IG Media objects that have been tagged with the hashtag.

#### Limitations
- **Visibility**: Only returns **public** photos and videos.
- **Ads**: Will NOT return promoted, boosted, or ad media.
- **Pagination**: Max **50 results** per page. Only returns an `after` cursor. The `after` cursor value is static for each page but used for fetching the next set.
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
> If the token is via Business Manager, one of the following is also required: `ads_management`, `business_management`, or `pages_read_engagement`.

---

## Parameters

### Query String Parameters

| Parameter | Description |
|-----------|-------------|
| **`user_id`** | (Required) The ID of the Instagram Business or Creator Account performing the query. |
| **`fields`** | A comma-separated list of fields you want returned. |

### Returnable Fields

| Field Name | Description |
|------------|-------------|
| `caption` | The caption for the media object. |
| `children` | Media objects in a carousel album (Albums only). |
| `comments_count`| Number of comments on the media object. |
| `id` | The ID for the media object. |
| `like_count` | Number of likes (omitted if hidden by owner). |
| `media_type` | `CAROUSEL_ALBUM`, `IMAGE`, or `VIDEO`. |
| `media_url` | The URL for the media object (not returned for Albums). |
| `permalink` | The permalink for the media object. |
| `timestamp` | ISO 8601 timestamp for when it was published. |

---

## Sample Request
```bash
GET graph.facebook.com/v24.0/<IG_HASHTAG_ID>/top_media
  ?user_id=<IG_USER_ID>
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
