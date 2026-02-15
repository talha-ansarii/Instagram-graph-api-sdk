# Instagram (IG) Hashtag

Represents an Instagram hashtag.

> [!NOTE]
> This endpoint is only available for **Facebook Login for Business**.

---

## Operations

### Reading
`GET /<IG_HASHTAG_ID>`

Returns Fields and Edges on an IG Hashtag.

#### Limitations
- **Volume**: You can query a maximum of **30 unique hashtags** within a 7-day period.

---

## Requirements

| Requirement | Description |
|-------------|-------------|
| **Features** | Instagram Public Content Access |
| **Permissions** | `instagram_basic` |
| **Tokens** | The app user's User access token. |

> [!IMPORTANT]
> If the token is from a User whose Page role was granted via the Business Manager, one of the following permissions is also required: `ads_management`, `business_management`, or `pages_read_engagement`.

---

## Request Syntax

```bash
GET https://graph.facebook.com/v24.0/<IG_HASHTAG_ID>
  ?fields={fields}
  &access_token={access-token}
```

### Query String Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| `access_token` | Yes | The app user's Instagram User Access Token. |
| `fields` | No | Comma-separated list of Fields and Edges. |

---

## Fields

| Field Name | Description |
|------------|-------------|
| **`id`** | The hashtag's ID (included by default). IDs are static and global. |
| **`name`** | The hashtag's name, without the leading hash symbol. |

---

## Edges

| Edge | Description |
|------|-------------|
| **`recent_media`** | Get a list of the most recently published photo and video IG Media objects published with a specific hashtag. |
| **`top_media`** | Returns the most popular photo and video IG Media objects that have been tagged with the hashtag. |

---

## Sample Request
```bash
GET https://graph.facebook.com/v24.0/17841593698074073
  ?fields=id,name
  &access_token=<ACCESS_TOKEN>
```

## Sample Response
```json
{
  "id": "17841593698074073",
  "name": "coke"
}
```

---

## Operations Not Supported
- **Creating**: Not supported.
- **Updating**: Not supported.
- **Deleting**: Not supported.
