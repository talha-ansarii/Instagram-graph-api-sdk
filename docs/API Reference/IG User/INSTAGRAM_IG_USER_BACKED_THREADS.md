# Instagram-Backed Threads User

Represents a Threads account backed by an Instagram account. 

> [!WARNING]
> **Management Limitation**: You **cannot** log into Instagram-backed Threads accounts to manage posts. These accounts are specifically designed for running ads on Threads.

---

## Requirements

### Permissions
A Facebook User access token with:
- `instagram_basic`
- `threads_business_basic`
- `pages_read_engagement`

> [!IMPORTANT]
> - **Page Role**: Requires at least an **Advertiser** role on the linked Page (Manager or Content Creator also work), or appropriate roles in a connected business account.
> - **Ads Identity**: To use this ID for Threads ads, ensure the Instagram account has a proper ads identity setup (Business-claimed or Page-connected).

### Token Type
Requires a **Facebook User access token**.

---

## Operations

### Creating
`POST /<IG_USER_ID>/instagram_backed_threads_user`

Create an Instagram-backed Threads account specifically for running ads on Threads.

#### Limitations
- **Mapping**: An Instagram account can have only **one** Instagram-backed Threads account. Verify if one exists before creating.

#### Sample Request
```bash
curl -X POST \
  -F "access_token=<ACCESS_TOKEN>" \
  "https://graph.facebook.com/v24.0/<IG_USER_ID>/instagram_backed_threads_user"
```

#### Sample Response
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

### Reading
`GET /<IG_USER_ID>/instagram_backed_threads_user`

Retrieve the ID of the Instagram-backed Threads account.

#### Sample Request
```bash
curl -G \
  -d "access_token=<ACCESS_TOKEN>" \
  -d "fields=threads_user_id" \
  "https://graph.facebook.com/v24.0/<IG_USER_ID>/instagram_backed_threads_user"
```

#### Sample Response
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
- **Updating**: Not supported.
- **Deleting**: Not supported.
