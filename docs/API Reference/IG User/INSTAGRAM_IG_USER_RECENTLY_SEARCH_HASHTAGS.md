# Recently Searched Hashtags

This edge allows you to determine the IG Hashtags that an IG User has queried for within the last 7 days.

---

## Operations

### Reading
`GET /<IG_USER_ID>/recently_searched_hashtags`

Get the hashtags that an IG User has queried using the [IG Hashtags](../IG%20Hashtag/INSTAGRAM_IG_HASHTAG.md) endpoint within the last 7 days.

#### Query Usage & Limits
- **Hashtag Limit**: IG Users can query a maximum of **30 unique hashtags** within a rolling 7-day period.
- **Counting**: A queried hashtag counts against the limit as soon as it is queried. Subsequent queries on the *same* hashtag within that 7-day window do not count toward the limit again.

#### Limitations
- **Emojis**: Hashtag queries containing emojis are **not supported**.
- **Pagination**: The API returns **25 results** per page by default. Use the `limit` parameter to request up to **30 results** (`limit=30`).

---

## Requirements

| Requirement | Description |
|-------------|-------------|
| **Features** | **Instagram Public Content Access**. |
| **Permissions** | `instagram_basic`. |
| **Token Type** | Facebook User access token. |

> [!IMPORTANT]
> If the token is via Business Manager, one of the following is also required: `ads_management`, `ads_read`, or `pages_read_engagement`.

---

## Request Syntax

```bash
GET https://graph.facebook.com/v24.0/<IG_USER_ID>/recently_searched_hashtags
  ?limit=<LIMIT>
  &access_token=<ACCESS_TOKEN>
```

### Parameters
| Parameter | Required | Description |
|-----------|----------|-------------|
| **`limit`** | No | Number of results per page (max 30). |
| **`access_token`** | Yes | App user's Facebook User access token. |

---

## Sample Request
```bash
curl -X GET \
  'https://graph.facebook.com/v24.0/<IG_USER_ID>/recently_searched_hashtags?limit=30&access_token=<TOKEN>'
```

### Sample Response
```json
{
  "data": [
    {
      "id": "17841562906103814"
    },
    {
      "id": "17841563587120501"
    }
  ],
  "paging": {
    "cursors": {
      "before": "...",
      "after": "..."
    }
  }
}
```

---

## Operations Not Supported
- **Creating**: Not supported.
- **Updating**: Not supported.
- **Deleting**: Not supported.
