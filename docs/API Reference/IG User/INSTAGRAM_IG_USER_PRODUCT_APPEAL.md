# Product Appeal

Represents a rejected product's appeal status. For complete usage details, see the [Product Tagging](https://developers.facebook.com/docs/instagram-api/guides/product-tagging) guide.

---

## Operations

### Creating (Appeal a Product)
`POST /<IG_USER_ID>/product_appeal`

Submit an appeal for a rejected product.

#### Limitations
- **Accounts**: Instagram Creator accounts are **not supported**.
- **Media**: Stories, Instagram TV, Reels, Live, and Mentions are **not supported**.

#### Parameters
| Parameter | Required | Description |
|-----------|----------|-------------|
| **`product_id`** | Yes | ID of the product to appeal. |
| **`appeal_reason`**| Yes | Explanation of why the product should be approved. |
| **`access_token`** | Yes | App user's User access token. |

#### Sample Request
```bash
curl -X POST \
 "https://graph.facebook.com/v24.0/<IG_USER_ID>/product_appeal?appeal_reason=product%20is%20a%20toy&product_id=4382881195057752&access_token=<TOKEN>"
```

#### Sample Response
```json
{
  "success": true
}
```
*Note: Response indicates if the request was accepted, not the outcome of the appeal.*

---

### Reading (Check Appeal Status)
`GET /<IG_USER_ID>/product_appeal`

Get the appeal status of a rejected product.

#### Parameters
| Parameter | Required | Description |
|-----------|----------|-------------|
| **`product_id`** | Yes | ID of the product. |
| **`access_token`** | Yes | App user's User access token. |

#### Response Fields
| Field Name | Description |
|------------|-------------|
| **`product_id`** | Product ID. |
| **`review_status`**| Current status: `approved`, `rejected`, `pending`, `outdated`. |
| **`eligible_for_appeal`**| Boolean indicating if the decision can be appealed. |

#### Sample Request
```bash
curl -X GET \
 "https://graph.facebook.com/v24.0/<IG_USER_ID>/product_appeal?product_id=4029274203846188&access_token=<TOKEN>"
```

#### Sample Response
```json
{
  "data": [
    {
      "product_id": 4029274203846188,
      "review_status": "approved",
      "eligible_for_appeal": false
    }
  ]
}
```

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

## Operations Not Supported
- **Updating**: Not supported.
- **Deleting**: Not supported.
