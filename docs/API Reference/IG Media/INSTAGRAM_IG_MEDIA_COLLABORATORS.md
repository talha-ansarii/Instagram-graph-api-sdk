# Collaborators

Represents a list of users who are added as collaborators on an IG Media object.

> [!NOTE]
> This feature is available for the **Instagram API with Facebook Login**.

---

## Operations

### Reading
Get a list of Instagram users as collaborators and their invitation status on an IG Media object.

`GET /<IG_MEDIA_ID>/collaborators`

#### Limitations
- **Count**: Up to **5 Instagram accounts** can be added as collaborators.
- **Privacy**: Only IG users who have enabled collaborator tagging will be returned in the response.
- **Support**: Supported for **Feed images, Reels, and Carousels**. Stories are **not supported**.

---

## Requirements

| Requirement | Description |
|-------------|-------------|
| **Access Tokens** | User Access Token (User must have created the IG Media object). |
| **Permissions** | `instagram_basic`, `pages_read_engagement`. |

> [!IMPORTANT]
> If the app user was granted a role on the Page via the Business Manager, you also need one of: `ads_management` or `ads_read`.

---

## Request Syntax

```bash
GET https://graph.facebook.com/v24.0/<IG_MEDIA_ID>/collaborators?access_token=<USER_ACCESS_TOKEN>
```

### Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| **`access_token`** | Yes | Your app user's User access token. |

---

## Response Fields

| Field Name | Description |
|------------|-------------|
| **`id`** | The App-scoped ID for the Instagram account of the potential collaborator. |
| **`username`** | Instagram profile username for the potential collaborator. |
| **`invite_status`** | The status for the invitation. Can be **`Accepted`** or **`Pending`**. |

### Sample Response

```json
{
  "data": [
    {
      "id": "90010775360791",
      "username": "realtest1",
      "invite_status": "Accepted"
    },
    {
      "id": "17841449208283139",
      "username": "realtest2",
      "invite_status": "Pending"
    }
  ]
}
```

---

## Operations Not Supported
- **Creating**: Not supported.
- **Updating**: Not supported.
- **Deleting**: Not supported.
