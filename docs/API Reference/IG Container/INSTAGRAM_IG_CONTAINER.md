# Instagram (IG) Container

Represents a media container for publishing an Instagram media object.

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
> If the app user was granted a role via the Business Manager on the Page connected to the targeted IG User, one of the following permissions is also required: `ads_management` or `ads_read`.

---

## Operations

### Reading
`GET /<IG_CONTAINER_ID>?fields=<LIST_OF_FIELDS>`

Get fields and edges on an IG Container.

#### Fields

| Field Name | Description |
|------------|-------------|
| `id` | Instagram Container ID. |
| `status_code` | The container's publishing status. (See Status Codes below). |
| `status` | Publishing status description. If `status_code` is `ERROR`, this value will be an error subcode. |
| `copyright_check_status` | Metadata for copyright violation checks (for videos). |

#### Copyright Check Status Fields
Used to determine if an uploaded video violates copyright.
- **`matches_found`**: `true` (violating) or `false` (no violation).
- **`status`**: `completed`, `error`, `in_progress`, or `not_started`.

#### Status Codes (`status_code`)
- **`EXPIRED`**: Container was not published within 24 hours.
- **`ERROR`**: Failed to complete the publishing process.
- **`FINISHED`**: Media object is ready to be published.
- **`IN_PROGRESS`**: Metadata is still being processed.
- **`PUBLISHED`**: Media object has been successfully published.

#### Example Request
```bash
curl -X GET \
  'https://graph.instagram.com/v24.0/<IG_CONTAINER_ID>?fields=status_code&access_token=<ACCESS_TOKEN>'
```

#### Sample Response
```json
{
  "status_code": "FINISHED",
  "id": "17889615691921648"
}
```

---

### Operations Not Supported
- **Creating**: Not supported via direct POST on this node.
- **Updating**: Not supported.
- **Deleting**: Not supported.
