# Catalog Product Search

Represents products and product variants that match a given search string in an IG User's Instagram Shop product catalog. For complete usage details, see the [Product Tagging](https://developers.facebook.com/docs/instagram-api/guides/product-tagging) guide.

> [!NOTE]
> This feature is available for the **Instagram Graph API with Facebook Login**.

---

## Operations

### Reading
`GET /<IG_USER_ID>/catalog_product_search`

Get a collection of products that match a given search string within the targeted IG User's Instagram Shop catalog.

#### Limitations
- **Accounts**: Instagram Creator accounts are **not supported**.
- **Media**: Stories, Instagram TV, Reels, Live, and Mentions are **not supported**.
- **Product Status**:
    - Products with a `review_status` of `rejected` will be returned, but **cannot** be tagged on media.
    - Tags for unapproved products will **not appear** on published posts until approved. It is recommended to only allow tagging of products with `review_status: approved`.

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
GET https://graph.facebook.com/v24.0/<IG_USER_ID>/catalog_product_search
  ?catalog_id=<CATALOG_ID>
  &q=<QUERY_STRING>
  &access_token=<ACCESS_TOKEN>
```

### Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| **`catalog_id`** | Yes | ID of the catalog to search. |
| **`q`** | No | Search string for product name or SKU. If omitted, all tag-eligible products are returned. |
| **`access_token`** | Yes | App user's User access token. |

---

## Response Fields

| Field Name | Description |
|------------|-------------|
| **`product_id`** | Product ID. |
| **`merchant_id`** | Merchant ID. |
| **`product_name`**| Product name. |
| **`image_url`** | Product image URL. |
| **`retailer_id`** | Retailer ID. |
| **`review_status`**| `approved`, `outdated`, `pending`, `rejected`. |
| **`is_checkout_flow`**| `true` if purchasable directly in the Instagram app. |
| **`product_variants`**| Array of `product_id` and `variant_name` for variants. |

### Sample Response

```json
{
  "data": [
    {
      "product_id": 3231775643511089,
      "merchant_id": 90010177253934,
      "product_name": "Gummy Wombats",
      "image_url": "https://scont...",
      "retailer_id": "oh59p9vzei",
      "review_status": "approved",
      "is_checkout_flow": true,
      "product_variants": [
        {
          "product_id": 5209223099160494
        },
        {
          "product_id": 7478222675582505,
          "variant_name": "Green Gummy Wombats"
        }
      ]
    }
  ]
}
```

---

## Operations Not Supported
- **Creating**: Not supported.
- **Updating**: Not supported.
- **Deleting**: Not supported.
