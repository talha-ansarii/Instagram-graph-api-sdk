# Children

Represents a collection of IG Media objects on an album IG Media.

---

## Requirements

### Comparison of Login Flows

| Feature | Instagram API with Instagram Login | Instagram API with Facebook Login |
|---------|------------------------------------|-----------------------------------|
| **Access Tokens** | Instagram User user access token | Facebook User access token |
| **Host URL** | `graph.instagram.com` | `graph.facebook.com` |
| **Login Type** | Business Login for Instagram | Facebook Login for Business |
| **Permissions** | `instagram_business_basic` | `instagram_basic`, `pages_read_engagement` |

> [!NOTE]
> If the app user was granted a role via the Business Manager on the Page connected to the targeted IG User, you will also need one of: `ads_management` or `ads_read`.

---

## Operations

### Reading
`GET /<IG_MEDIA_ID>/children`

Returns a list of IG Media objects on an album IG Media object.

#### Limitations
- **Fields**: Some fields, such as `permalink`, cannot be used on photos within albums (children).

---

## Sample Request
```bash
curl -X GET \
  "https://graph.facebook.com/v24.0/<IG_MEDIA_ID>/children?access_token=<ACCESS_TOKEN>"
```

## Sample Response
```json
{
  "data": [
    {
      "id": "17880997618081620"
    },
    {
      "id": "17871527143187462"
    }
  ]
}
```

---

## Operations Not Supported
- **Creating**: Not supported. (To create an album, use the [IG Container](../IG%20Container/INSTAGRAM_IG_CONTAINER.md) and [IG Media](INSTAGRAM_IG_MEDIA.md) publishing workflow).
- **Updating**: Not supported.
- **Deleting**: Not supported. (To delete media inside a carousel, the entire album must be deleted. Individual deletion of children is not supported).
