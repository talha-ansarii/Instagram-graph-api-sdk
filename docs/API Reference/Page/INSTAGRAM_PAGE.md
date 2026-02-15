# Page

Represents a Facebook Page. In the context of the Instagram Graph API, this node is primarily used to identify the Instagram Business Account connected to a specific Facebook Page.

---

## Operations

### Reading
`GET /<PAGE_ID>?fields=instagram_business_account`

Returns the ID of the Instagram Business Account connected to the Facebook Page.

#### Permissions
A Facebook User access token with:
- `instagram_basic`
- `pages_show_list`

> [!IMPORTANT]
> If the token is via Business Manager, one of the following is also required: `ads_management` or `ads_read`.

---

## Request Syntax

```bash
GET https://graph.facebook.com/v24.0/<PAGE_ID>
  ?fields=instagram_business_account
  &access_token=<TOKEN>
```

---

## Sample Request
```bash
curl -X GET \
  "https://graph.facebook.com/v24.0/<PAGE_ID>?fields=instagram_business_account&access_token=<TOKEN>"
```

### Sample Response
```json
{
  "instagram_business_account": {
    "id": "17841405822304914"
  },
  "id": "134895793791914"
}
```

---

## Operations Not Supported
- **Creating**: Not supported.
- **Updating**: Not supported.
- **Deleting**: Not supported.
