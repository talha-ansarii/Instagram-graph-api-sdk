# IG Hashtag Search

This root edge allows you to get IG Hashtag IDs.

> [!NOTE]
> This endpoint is available for the **Instagram API with Facebook Login**.

---

## Operations

### Reading
`GET /ig_hashtag_search?user_id=<USER_ID>&q=<QUERY_STRING>`

Returns the ID of an IG Hashtag. IDs are both **static** and **global** (e.g., the ID for `#bluebottle` will always be `17843857450040591` for all apps and users).

#### Query String Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| `user_id` | Yes | The ID of the IG User performing the request. |
| `q` | Yes | The hashtag name to query. |

#### Limitations
- **Volume**: You can query a maximum of **30 unique hashtags** within a 7-day period.
- **Sensitivity**: Generic errors are returned for hashtags deemed sensitive or offensive.

---

## Requirements

| Requirement | Description |
|-------------|-------------|
| **Features** | Instagram Public Content Access |
| **Permissions** | `instagram_basic` |
| **Tokens** | Facebook User access token approved for tasks on the connected Page. |

> [!IMPORTANT]
> If the token is via Business Manager, one of the following is also required: `ads_management`, `business_management`, or `pages_read_engagement`.

---

## Sample Request
```bash
curl -X GET \
 "https://graph.facebook.com/v24.0/ig_hashtag_search?user_id=<USER_ID>&q=bluebottle&access_token=<ACCESS_TOKEN>"
```

## Sample Response
```json
{
    "data": [
        {
            "id": "17843857450040591"
        }
    ]
}
```

---

## Operations Not Supported
- **Creating**: Not supported.
- **Updating**: Not supported.
- **Deleting**: Not supported.
