# Instagram (IG) Comment

Represents a comment on an Instagram media object.

> [!NOTE]
> If you are migrating from Marketing API Instagram Ads endpoints to Instagram Platform endpoints, be aware that some field names are different.
> - **New Field**: `legacy_instagram_comment_id`
> - **Not Supported**: `comment_type`, `mentioned_instagram_users`

---

## Requirements

### Comparison of Login Flows

| Feature | Instagram API with Instagram Login | Instagram API with Facebook Login |
|---------|------------------------------------|-----------------------------------|
| **Access Tokens** | Instagram User access token | Facebook User access token |
| **Host URL** | `graph.instagram.com` | `graph.facebook.com` |
| **Login Type** | Business Login for Instagram | Facebook Login for Business |
| **Permissions** | `instagram_business_basic`, `instagram_business_manage_comments` | `instagram_basic`, `instagram_manage_comments`, `pages_read_engagement` |

> [!NOTE]
> If the app user was granted a role via the Business Manager on the Page connected to the targeted IG User, you will also need one of: `ads_management` or `ads_read`.

---

## Operations

### Reading
`GET /<IG_COMMENT_ID>?fields=<LIST_OF_FIELDS>`

#### Limitations
- **Mentions**: Cannot query comments discovered through Mentions API unless made by the comment owner (use Mentioned Comment node instead).
- **Age-Gated**: Comments on age-gated media are not returned.
- **Restricted Users**: Comments by users restricted by the app user are not returned unless unrestricted and approved.
- **Live Video**: Only readable during the broadcast.

#### Fields

| Field Name | Description |
|------------|-------------|
| `from` | Object with `id` (IGSID) and `username` of the commenter. |
| `hidden` | `true` if hidden, `false` otherwise. |
| `id` | IG Comment ID. |
| `like_count` | Number of likes. |
| `legacy_instagram_comment_id` | ID for Marketing API compatibility (v21.0 and older). |
| `media` | Object with `id` and `media_product_type` of the media. |
| `parent_id` | ID of the parent comment (if this is a reply). |
| `replies` | List of replies made on the comment. |
| `text` | Comment text. |
| `timestamp` | ISO 8601 creation time (e.g., `2017-05-19T23:27:28+0000`). |
| `user` | ID of the author (returned only if the app user created it). |
| `username` | Username of the author (requires management permissions as of Aug 27, 2024). |

#### Edges
- `replies`: Get/Create IG Comments on the comment.

#### Example Request
```bash
curl -i -X GET \
 "https://graph.instagram.com/v24.0/<IG_COMMENT_ID>?fields=hidden,media,timestamp&access_token=<ACCESS_TOKEN>"
```

---

### Updating (Hiding/Unhiding)
`POST /<IG_COMMENT_ID>?hide=<BOOLEAN>`

| Parameter | Required | Description |
|-----------|----------|-------------|
| `hide` | Yes | `true` to hide, `false` to show. |

#### Limitations
- **Owners**: Owner comments on their own media are always displayed (`hide=true` is ignored).
- **Live Video**: Not supported.

#### Example Request
```bash
POST graph.instagram.com/v24.0/17873440459141021?hide=true
```

---

### Deleting
`DELETE /<IG_COMMENT_ID>`

#### Access Token
Requires a User access token from the user who created the comment.

#### Limitations
- **Permissions**: A comment can only be deleted by the **owner of the object** upon which the comment was made, or the comment's author (author must have permissions).
- **Live Video**: Not supported.

#### Example Request
```bash
DELETE graph.instagram.com/v24.0/17873440459141021
```
