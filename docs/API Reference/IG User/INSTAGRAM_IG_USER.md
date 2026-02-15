# Instagram (IG) User

Represents an Instagram Business Account or an Instagram Creator Account. Throughout this documentation, "Instagram User" and "Instagram Account" are used interchangeably to represent your app user's Instagram professional account.

---

## Requirements

### Comparison of Login Flows

| Feature | Instagram API with Instagram Login | Instagram API with Facebook Login |
|---------|------------------------------------|-----------------------------------|
| **Access Tokens** | Instagram User user access token | Facebook User access token |
| **Host URL** | `graph.instagram.com` | `graph.facebook.com` |
| **Login Type** | Business Login for Instagram | Facebook Login for Business |
| **Permissions** | `instagram_business_basic` | `instagram_basic`, `pages_read_engagement` |

> [!IMPORTANT]
> - **Ads Roles**: If the app user was granted a role via Business Manager, you may also need `ads_management` or `ads_read`.
> - **Product Tagging**: Requesting `shopping_product_tag_eligibility` requires `catalog_management`, `instagram_shopping_tag_products`, and an admin role on the Business Manager owning the Shop.

---

## Operations

### Reading
`GET /<IG_USER_ID>`

Get fields and edges on an Instagram Business or Creator Account.

#### Public Fields
| Field Name | Description |
|------------|-------------|
| **`id`** | App-scoped User ID. |
| **`username`** | Profile username. |
| **`name`** | Profile name. |
| **`biography`**| Profile biography text. |
| **`followers_count`** | Total followers. |
| **`follows_count`** | Total followed users. |
| **`media_count`** | Total media published. |
| **`website`** | Profile website URL. |
| **`profile_picture_url`** | URL of the profile picture. |
| **`has_profile_pic`** | Boolean indicating if a profile pic exists. |

#### Advanced Fields
- **`is_published`**: Indicates if the account is published.
- **`legacy_instagram_user_id`**: Legacy ID for Marketing API compatibility (v21.0 and older).
- **`shopping_product_tag_eligibility`**: `true` if eligible for product tagging (requires Shop setup).

---

## Edges

| Edge | Description |
|------|-------------|
| **`media`** | Collection of IG Media (Photos, Video, Albums, Reels). |
| **`stories`** | Collection of active story IG Media objects. |
| **`insights`** | Account-level social interaction metrics. |
| **`mentions`** | Content where the user has been @mentioned. |
| **`tags`** | Media in which the user has been tagged. |
| **`business_discovery`** | Get data about *other* Instagram Business/Creator users. |
| **`media_publish`** | Endpoint to publish an IG Container. |
| **`content_publishing_limit`** | Current content publishing usage. |
| **`live_media`** | Collection of live video IG Media. |
| **`recently_searched_hashtags`**| Hashtags searched within the last 7 days. |
| **`upcoming_events`** | List of events the account is hosting. |

---

## Sample Request
```bash
curl -X GET \
  'https://graph.facebook.com/v24.0/<IG_USER_ID>?fields=biography,id,username,website&access_token=<TOKEN>'
```

## Sample Response
```json
{
  "biography": "Dino data crunching app",
  "id": "17841405822304914",
  "username": "metricsaurus",
  "website": "http://www.metricsaurus.com/"
}
```

---

## Operations Not Supported
- **Creating**: Not supported.
- **Updating**: Not supported.
- **Deleting**: Not supported.
