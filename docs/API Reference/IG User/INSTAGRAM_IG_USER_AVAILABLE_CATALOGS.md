# Available Catalogs

Represents a collection of product catalogs in an IG User's Instagram Shop. For complete usage details, see the [Product Tagging](https://developers.facebook.com/docs/instagram-api/guides/product-tagging) guide.

> [!NOTE]
> This feature is available for the **Instagram API with Facebook Login**.

---

## Operations

### Reading
`GET /<IG_USER_ID>/available_catalogs`

Get the product catalog in an IG User's Instagram Shop.

#### Limitations
- **Accounts**: Instagram Creator accounts are **not supported**.
- **Media**: Stories, Instagram TV, Reels, Live, and Mentions are **not supported**.
- **Single Catalog**: Only returns data on a single catalog because Instagram Shops are limited to one.
- **Partners**: Collaborative catalogs (shopping partner or affiliate creator catalogs) are **not supported**.

---

## Requirements

| Requirement | Description |
|-------------|-------------|
| **Access Tokens** | User Access Token. |
| **Business Roles** | App user must be an **admin** on the Business Manager owning the Instagram Shop. |
| **Instagram Shop** | IG User must have an **approved Shop** with a product catalog. |
| **Permissions** | `catalog_management`, `instagram_basic`, `instagram_shopping_tag_products`. |

> [!IMPORTANT]
> If the app user was granted a role via Business Manager on the Page, you will also need `ads_management` or `ads_read`.

---

## Request Syntax

```bash
GET https://graph.facebook.com/v24.0/<IG_USER_ID>/available_catalogs
  ?fields=<LIST_OF_FIELDS>
  &access_token=<ACCESS_TOKEN>
```

### Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| **`access_token`** | Yes | App user's User access token. |
| **`fields`** | No | Comma-separated list of catalog fields. |

---

## Response Fields

| Field Name | Description |
|------------|-------------|
| **`catalog_id`** | Catalog ID. |
| **`catalog_name`** | Catalog name. |
| **`shop_name`** | Shop name. |
| **`product_count`** | Total number of products in the catalog. |

### Sample Response

```json
{
  "data": [
    {
      "catalog_id": "960179311066902",
      "catalog_name": "Jay's Favorite Snacks",
      "shop_name": "Jay's Bespoke",
      "product_count": 11
    }
  ]
}
```

---

## Operations Not Supported
- **Creating**: Not supported.
- **Updating**: Not supported.
- **Deleting**: Not supported.
