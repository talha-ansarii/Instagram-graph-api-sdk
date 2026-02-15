# Media Publish

The final step in the [Content Publishing](../../Publish%20Content/INSTAGRAM_CONTENT_PUBLISHING.md) flow. This operation publishes an IG Container that has been successfully uploaded.

---

## Operations

### Creating
`POST /<IG_USER_ID>/media_publish`

Publish an IG Container object on an Instagram Business IG User.

#### Limitations
- **Rate Limit**: An Instagram professional account can only publish **50 posts within a rolling 24-hour period**.
- **Authorization**: Requires Page Publishing Authorization (PPA) and 2FA where applicable on the connected Facebook Page.

---

## Requirements

| Requirement | Description |
|-------------|-------------|
| **Access Tokens** | User Access Token. |
| **Permissions** | `instagram_basic`, `instagram_content_publish`. |
| **Page Tasks** | The app user must have **MANAGE** or **CREATE_CONTENT** tasks on the linked Page. |

> [!IMPORTANT]
> - **Ads Roles**: If the app user was granted a role via Business Manager, you may also need `ads_management` or `ads_read`.
> - **Product Tagging**: Requires an admin role on the Business Manager owning the Shop, and permissions for `catalog_management` and `instagram_shopping_tag_products`.

---

## Request Syntax

```bash
POST https://graph.facebook.com/v24.0/<IG_USER_ID>/media_publish
  ?creation_id=<IG_CONTAINER_ID>
  &access_token=<ACCESS_TOKEN>
```

### Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| **`creation_id`** | Yes | The ID of the IG Container to be published. |
| **`access_token`** | Yes | App user's User access token. |

---

## Sample Request
```bash
curl -X POST \
  "https://graph.facebook.com/v24.0/17841405822304914/media_publish?creation_id=17889455560051444&access_token=<TOKEN>"
```

### Sample Response
On success, the API returns the permanent ID of the published media.
```json
{
  "id": "17920238422030506"
}
```

---

## Operations Not Supported
- **Reading**: Not supported (use the `/media` edge to read published posts).
- **Updating**: Not supported.
- **Deleting**: Not supported.
