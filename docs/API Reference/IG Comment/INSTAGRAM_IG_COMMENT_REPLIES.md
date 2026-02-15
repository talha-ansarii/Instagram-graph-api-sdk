# IG Comment Replies

Represents a collection of IG Comments on an IG Comment.

> [!TIP]
> To create an IG Comment on an IG Media object, use the `POST /{ig-media-id}/comments` endpoint instead.

---

## Creating

### Replying to a Comment
`POST /{ig-comment-id}/replies?message={message}`

Creates an IG Comment on an IG Comment.

#### Parameters
- **`message`** (required): The text to be included in the comment.

#### Limitations
- **Nesting**: You can only reply to top-level comments; replies to a reply will be added to the top-level comment.
- **Visibility**: You cannot reply to hidden comments.
- **Live Video**: You cannot reply to comments on a live video; use the [Instagram Messaging API](../messaging/INSTAGRAM_SENDER_ACTIONS.md) to send a private reply instead.

#### Permissions
Requires a User access token from the user who created the comment, with:
- `instagram_basic`
- `instagram_manage_comments`
- `pages_show_list`
- `page_read_engagement`

*Note: If the token is via Business Manager, `ads_management` or `ads_read` may also be required.*

#### Sample Request
```bash
POST graph.facebook.com/v24.0/<IG_COMMENT_ID>/replies?message=Great point!
```

#### Sample Response
```json
{
  "id": "17873440459141021"
}
```

---

## Reading

### Getting All Replies (Comments) on a Comment
`GET /{ig-comment-id}/replies`

Returns a list of IG Comments on an IG Comment.

#### Limitations
- **Deleted Content**: You cannot get replies to a comment that has been deleted.

#### Permissions
Requires an access token from the user who created the comment, with:
- `instagram_basic`
- `pages_show_list`
- `page_read_engagement`

#### Sample Request
```bash
GET graph.facebook.com/v24.0/<IG_COMMENT_ID>/replies
```

#### Sample Response
```json
{
  "data": [
    {
      "timestamp": "2017-08-31T16:53:49+0000",
      "text": "This is a great comment",
      "id": "17871618799146774"
    },
    {
      "timestamp": "2017-08-30T04:24:45+0000",
      "text": "It's me. Trust me.",
      "id": "17887288333072596"
    }
  ]
}
```

---

## Operations
- **Updating**: This operation is **not supported**.
- **Deleting**: This operation is **not supported**.
