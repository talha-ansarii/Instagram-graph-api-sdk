# Connected Threads User

Represents a Threads account connected to an Instagram account.

---

## Requirements

### Permissions
A Facebook User access token with:
- `instagram_basic`
- `threads_business_basic`
- `pages_read_engagement`

> [!IMPORTANT]
> - **Page Role**: You must have at least an **Advertiser** role on the linked Page (Manager or Content Creator also work), or the Instagram account must be connected to a business account where you have appropriate roles.
> - **Ads Identity**: To use this ID for Threads ads, ensure the Instagram account has a proper ads identity setup (Business-claimed or Page-connected).

### Token Type
Requires a **Facebook User access token**.

---

## Operations

### Reading
`GET /<IG_USER_ID>/connected_threads_user`

Retrieves the Threads account ID connected to a valid Instagram account.

#### Limitations
- **Mapping**: An Instagram account can have only **one** connected Threads account.
- **Verification**: Always verify if a connection exists before attempting to use it for ads or other integrations.

---

## Sample Request

```bash
curl -X GET \
  "https://graph.facebook.com/v24.0/<IG_USER_ID>/connected_threads_user?fields=threads_user_id&access_token=<TOKEN>"
```

### Response Fields

| Field Name | Description |
|------------|-------------|
| **`threads_user_id`** | The unique ID for the connected Threads account. |

### Sample Response

```json
{
  "data": [
    {
      "threads_user_id": "<THREADS_USER_ID>"
    }
  ]
}
```

---

## Operations Not Supported
- **Creating**: Not supported.
- **Updating**: Not supported.
- **Deleting**: Not supported.
