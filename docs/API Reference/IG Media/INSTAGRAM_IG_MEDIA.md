# Instagram (IG) Media

Represents an Instagram album, photo, or video (uploaded video, live video, reel, or story).

> [!NOTE]
> **Migration Warning**: If you are migrating from Marketing API Instagram Ads endpoints to Instagram Platform endpoints, be aware that some field names are different.
> - **New Field**: `legacy_instagram_media_id`
> - **Not Supported**: `filter_name`, `location`, `location_name`, `latitude`, `longitude`.

---

## Requirements

### Comparison of Login Flows

| Feature | Instagram API with Instagram Login | Instagram API with Facebook Login |
|---------|------------------------------------|-----------------------------------|
| **Access Tokens** | Instagram User access token | Facebook User access token |
| **Host URL** | `graph.instagram.com` | `graph.facebook.com` |
| **Login Type** | Business Login for Instagram | Facebook Login for Business |
| **Permissions** | `instagram_business_basic` | `instagram_basic`, `pages_read_engagement` |

> [!IMPORTANT]
> If the app user was granted a role via the Business Manager on the Page connected to your app user's Instagram professional account, your app will also need `ads_management` or `ads_read`.

---

## Operations

### Reading
`GET /<IG_MEDIA_ID>`

#### Limitations
- **Ads Data**: Fields like `comments_count` exclude ads-driven data.
- **Mentions**: Captions exclude the `@` symbol unless the app user has admin-equivalent tasks.
- **Albums**: Some fields like `permalink` cannot be used on album children.
- **Live Video**: Only readable during the broadcast.
- **Account Type**: Only returns data for media owned by **Instagram professional accounts**.

#### Public Fields
| Field | Description |
|-------|-------------|
| `id` | Media ID. |
| `media_type` | `CAROUSEL_ALBUM`, `IMAGE`, or `VIDEO`. |
| `media_url` | The URL for the media (omitted if flagged for copyright). |
| `permalink` | Permanent URL to the media. |
| `thumbnail_url` | Media thumbnail URL (VIDEO only). |
| `timestamp` | ISO 8601 creation date in UTC. |
| `username` | Username of the creator. |
| `caption` | Caption text (excludes album children). |
| `comments_count`| Count of comments (includes replies). |
| `like_count` | Count of likes (omitted if hidden by owner). |

#### Advanced Fields
- **`copyright_check_information`**: Status (`completed`, `error`, `in_progress`) and `matches_found` (`true`/`false`).
- **`is_comment_enabled`**: Indicates if comments are enabled.
- **`is_shared_to_feed`**: (Reels only) If true, appear in both Feed and Reels tabs.
- **`media_product_type`**: Surface where published (`AD`, `FEED`, `STORY`, `REELS`).
- **`view_count`**: View count for Reels (paid and organic).

#### Edges
- **`children`**: Collection of media objects in an album.
- **`comments`**: Collection of comments on the media.
- **`insights`**: Social interaction metrics (impressions, reach, etc.).
- **`collaborators`**: List of users added as collaborators (Facebook Login only).

#### Example Request
```bash
curl -X GET \
  'https://graph.instagram.com/v24.0/<IG_MEDIA_ID>?fields=id,media_type,media_url,owner,timestamp&access_token=<TOKEN>'
```

---

### Updating
`POST /<IG_MEDIA_ID>?comment_enabled=<BOOL>`

Enable or disable comments on an Instagram Media.

#### Parameters
- **`comment_enabled`** (required): `true` to enable, `false` to disable.

#### Limitations
- **Live Video**: Not supported.

#### Example Request
```bash
curl -i -X POST \
 "https://graph.instagram.com/v24.0/<IG_MEDIA_ID>?comment_enabled=true&access_token=<TOKEN>"
```

---

### Deleting
`DELETE /<IG_MEDIA_ID>`

> [!WARNING]
> This operation is only supported for **Instagram API with Facebook Login**.

#### Supported Content
- Non-ad posts, stories, reels, and entire carousel albums.
- **Carousel Albums**: To delete media inside a carousel, the *entire* album must be deleted. Individual deletion of children is not supported.

#### Permissions
Requires `instagram_basic` and `instagram_manage_contents`.

#### Example Request
```bash
curl -i -X DELETE \
 "https://graph.facebook.com/v24.0/<IG_MEDIA_ID>?access_token=<TOKEN>"
```

#### Success Response
```json
{
  "success": true,
  "deleted_id": "17918920912340654"
}
```
