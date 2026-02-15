# Mentions

Identify captions, comments, and IG Media in which an Instagram Business or Creator's alias has been tagged or @mentioned.

## Requirements

This guide assumes you have read the Instagram Platform Overview and implemented the needed components for using this API, such as a Meta login flow and a webhooks server to receive notifications.

You will need the following:

### Access Level

| Access Type | Description |
|-------------|-------------|
| **Advanced Access** | If your app serves Instagram Professional accounts you don't own or manage |
| **Standard Access** | If your app serves Instagram Professional accounts you own or manage and have added to your app in the App Dashboard |

### Base URL

All endpoints can be accessed via the `graph.instagram.com` host.

### Endpoints

- `GET /<IG_ID>/tags` — to get the media objects in which a Business or Creator Account has been tagged
- `POST /<IG_ID>/mentions` — to reply to a comment or media object caption that a Business or Creator Account has been @mentioned in by another Instagram user

### Permissions

- `instagram_business_basic`
- `instagram_business_manage_comments`

### Limitations

> [!WARNING]
> - Mentions on Stories are not supported.
> - Commenting on photos in which you were tagged is not supported.
> - Webhooks will not be sent if the Media upon which the comment or @mention appears was created by an account that is set to private.

---

## Listening for and Replying to @Mentions

You can listen for comment @mentions and reply to any that meet your criteria:

1. **Set up a script** that can parse the Webhooks notifications and identify comment IDs.
2. **Use the IDs** to query the `GET /<IG_ID>/tags` endpoint to get more information about each comment.
3. **Analyze the returned results** to identify any comments that meet your criteria.
4. **Use the POST /<IG_ID>/mentions** endpoint to reply to those comments or media objects.
