# Tags

Represents a collection of IG Media objects in which your app user's Instagram professional account has been tagged by another Instagram user.

---

## Operations

### Reading
`GET /<IG_USER_ID>/tags`

Returns a list of IG Media objects in which the IG User has been tagged.

#### Limitations
- **Privacy**: Private IG Media objects will **not** be returned.

---

## Requirements

| Requirement | Description |
|-------------|-------------|
| **Access Tokens** | User Access Token. |
| **Permissions** | `instagram_basic`, `instagram_manage_comments`, `pages_read_engagement`. |

> [!IMPORTANT]
> If the token is via Business Manager, one of the following is also required: `ads_management` or `ads_read`.

---

## Request Syntax

```bash
GET https://graph.facebook.com/v24.0/<IG_USER_ID>/tags
  ?fields=<LIST_OF_FIELDS>
  &access_token=<TOKEN>
```

### Parameters
| Parameter | Required | Description |
|-----------|----------|-------------|
| **`access_token`** | Yes | App user's Instagram User access token. |
| **`fields`** | No | Comma-separated list of IG Media fields or edges. |

---

## Sample Request
```bash
curl -X GET \
  'https://graph.facebook.com/v24.0/17841405822304914/tags?fields=id,username&access_token=<TOKEN>'
```

### Sample Response
```json
{
  "data": [
    {
      "id": "18038...",
      "username": "keldo..."
    },
    {
      "id": "17930...",
      "username": "ashla..."
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

## Pagination
This edge supports cursor-based pagination.
- **Manual Construction**: The response includes `before` and `after` cursors but **not** `previous` or `next` URL fields. You must construct pagination query strings manually.

---

## Operations Not Supported
- **Creating**: Not supported.
- **Updating**: Not supported.
- **Deleting**: Not supported.
