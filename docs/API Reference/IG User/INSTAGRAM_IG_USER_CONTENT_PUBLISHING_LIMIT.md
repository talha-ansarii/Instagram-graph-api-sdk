# Content Publishing Limit

Represents an IG User's current content publishing usage against their daily quota. For complete publishing steps, see the [Content Publishing](../../Publish%20Content/INSTAGRAM_CONTENT_PUBLISHING.md) guide.

---

## Requirements

### Comparison of Login Flows

| Feature | Instagram API with Instagram Login | Instagram API with Facebook Login |
|---------|------------------------------------|-----------------------------------|
| **Access Tokens** | Instagram User access token | Facebook User access token |
| **Host URL** | `graph.instagram.com` | `graph.facebook.com` |
| **Login Type** | Business Login for Instagram | Facebook Login for Business |
| **Permissions** | `instagram_business_basic`, `instagram_business_content_publish` | `instagram_basic`, `instagram_content_publish`, `pages_read_engagement` |

> [!NOTE]
> If the app user was granted a role via Business Manager on the Page, you will also need `ads_management` or `ads_read`.

---

## Operations

### Reading
`GET /<IG_USER_ID>/content_publishing_limit`

Get the number of times an IG User has published an IG Container within a specific 24-hour period.

#### Query String Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| **`access_token`** | Required | The app user's User Access Token. |
| **`since`** | Optional | Unix timestamp (no older than 24 hours). |
| **`fields`** | Optional | Comma-separated list of fields. Defaults to `quota_usage`. |

---

## Response Fields

### `config` (Object)
Returns the configuration for the publishing quota:
- **`quota_total`**: The maximum number of containers (currently **50**).
- **`quota_duration`**: The calculation period in seconds (currently **86400** or 24 hours).

### `quota_usage` (Integer)
The number of times the account has published since the `since` timestamp or within the last 24 hours.

---

## Sample Request
```bash
curl -X GET \
  'https://graph.facebook.com/v24.0/<IG_USER_ID>/content_publishing_limit?fields=quota_usage,config&since=1609969714&access_token=<TOKEN>'
```

## Sample Response
```json
{
  "data": [
    {
      "quota_usage": 2,
      "config": {
        "quota_total": 50,
        "quota_duration": 86400
      }
    }
  ]
}
```

---

## Operations Not Supported
- **Creating**: Not supported.
- **Updating**: Not supported.
- **Deleting**: Not supported.
