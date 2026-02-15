# Live Media

Represents a collection of live video IG Media on an IG User.

---

## Operations

### Reading
`GET /<IG_USER_ID>/live_media`

Get a collection of live video IG Media currently being broadcast by an IG User.

#### Limitations
- **Active Only**: Only live video IG Media being **broadcast at the time of the request** will be returned.

#### Time-based Pagination
This endpoint supports time-based pagination. You can include `since` and `until` query-string parameters with Unix timestamps or `strtotime` data values to define a specific time range.

---

## Requirements

| Requirement | Description |
|-------------|-------------|
| **Access Tokens** | User Access Token. |
| **Permissions** | `instagram_basic`, `pages_read_engagement`. |

> [!IMPORTANT]
> If the app user was granted a role via the Business Manager on the Page, you will also need `ads_management` or `ads_read`.

---

## Request Syntax

```bash
GET https://graph.facebook.com/v24.0/<IG_USER_ID>/live_media
  ?access_token=<USER_TOKEN>
  &fields=<LIST_OF_FIELDS>
  &since=<UNIX_TIMESTAMP>
  &until=<UNIX_TIMESTAMP>
```

### Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| **`access_token`** | Yes | App user's User access token. |
| **`fields`** | No | Comma-separated list of IG Media fields. |
| **`since`** | No | Unix timestamp for the start of the time range. |
| **`until`** | No | Unix timestamp for the end of the time range. |

---

## Sample Request
```bash
curl -X GET \
  'https://graph.facebook.com/v24.0/<IG_USER_ID>/live_media?fields=id,media_type,media_product_type,owner,username,comments&access_token=<TOKEN>'
```

### Sample Response
```json
{
  "data": [
    {
      "id": "90010498116233",
      "media_type": "BROADCAST",
      "media_product_type": "LIVE",
      "owner": {
        "id": "17841405822304914"
      },
      "username": "jayposiris",
      "comments": {
        "data": [
          {
            "hidden": false,
            "id": "17907364514064687",
            "text": "@jayposiris",
            "timestamp": "2021-08-17T21:23:07+0000",
            "username": "bztest0316_11"
          }
        ]
      }
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
