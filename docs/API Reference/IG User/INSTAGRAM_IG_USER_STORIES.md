# User Stories

Represents a collection of story IG Media objects on an IG User.

---

## Operations

### Creating
To create Story media containers, refer to the [IG User Media](INSTAGRAM_IG_USER_MEDIA.md) documentation.

### Reading
`GET /<IG_USER_ID>/stories`

Returns a list of story IG Media objects currently active on an IG User's profile.

#### Limitations
- **Live Video**: Responses will **not** include Live Video stories.
- **Reshared Content**: New stories created when a user reshares another story will **not** be returned.
- **Duration**: Stories are only available for **24 hours**.
- **Captions**: Only **one caption** will be returned per Instagram story, even if multiple captions exist.

---

## Requirements

### Permissions
A Facebook User access token with:
- `instagram_basic`
- `pages_read_engagement`

> [!IMPORTANT]
> If the token is via Business Manager, one of the following is also required: `ads_management` or `ads_read`.

---

## Request Syntax

```bash
GET https://graph.facebook.com/v24.0/<IG_USER_ID>/stories
  ?access_token=<TOKEN>
```

---

## Sample Request
```bash
curl -X GET \
  'https://graph.facebook.com/v24.0/17841405822304914/stories?access_token=<TOKEN>'
```

### Sample Response
```json
{
  "data": [
    {
      "id": "17861937508009798"
    },
    {
      "id": "17862253585030136"
    }
  ],
  "paging": {
    "cursors": {
      "before": "...",
      "after": "..."
    }
  }
}
```

---

## Operations Not Supported
- **Updating**: Not supported.
- **Deleting**: Not supported.
