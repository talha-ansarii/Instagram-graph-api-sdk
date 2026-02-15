# Product Tags

Represents product tags on an IG Media. For complete usage details, see the [Product Tagging](https://developers.facebook.com/docs/instagram-api/guides/product-tagging) guide.

> [!NOTE]
> This feature is available for the **Instagram API with Facebook Login**.

---

## Operations

### Creating / Updating
`POST /<IG_MEDIA_ID>/product_tags`

Create or update product tags on an existing IG Media.

#### Limitations
- **Accounts**: Instagram Creator accounts are **not supported**.
- **Media**: Stories, Instagram TV, Live, and Mentions are **not supported**.
- **Tagging**: Additive until the **5 tag limit** is reached. If the product is already tagged, its `x` and `y` coordinates will be updated.

#### Requirements
- **Admin Role**: App user must have an admin role on the Business Manager owning the Instagram Shop.
- **Approved Shop**: The IG User must have an approved Shop with a product catalog.
- **Permissions**: `ad_reads`, `catalog_management`, `instagram_basic`, `instagram_shopping_tag_products`.
- *(If via Business Manager)*: `ads_management`.

#### Query String Parameters
- **`updated_tags`** (required): Array of objects (max 5).
  - `product_id` (required): Product ID.
  - `x`: (Images only) Float (0.0–1.0) distance from left edge.
  - `y`: (Images only) Float (0.0–1.0) distance from top edge.

#### Example Request
```bash
curl -i -X POST \
 "https://graph.facebook.com/v24.0/<IG_MEDIA_ID>/product_tags?updated_tags=[{'product_id':'3859448974125379','x':0.5,'y':0.8}]&access_token=<TOKEN>"
```

---

### Reading
`GET /<IG_MEDIA_ID>/product_tags`

Get a collection of product tags on an IG Media.

#### Response Fields
| Field | Description |
|-------|-------------|
| `product_id` | Product ID. |
| `merchant_id` | Merchant ID. |
| `name` | Product name. |
| `price_string` | Price string (e.g., "$3.50"). |
| `image_url` | Product image URL. |
| `review_status`| `approved`, `rejected`, `pending`, `outdated`, or `""`. |
| `is_checkout` | `true` if purchasable directly in Instagram app. |
| `x` / `y` | Float (0.0–1.0) position on the image. |

#### Sample Response
```json
{
  "data": [
    {
      "product_id": 3231775643511089,
      "merchant_id": 90010177253934,
      "name": "Gummy Bears",
      "price_string": "$3.50",
      "image_url": "https://scont...",
      "review_status": "approved",
      "is_checkout": true,
      "x": 0.5,
      "y": 0.8
    }
  ]
}
```

---

## Operations Not Supported
- **Deleting**: Not supported directly through this endpoint. (Updating with an empty set or a different set is the primary management method).
