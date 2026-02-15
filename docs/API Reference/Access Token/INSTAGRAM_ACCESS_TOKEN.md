# Access Token

The `/access_token` endpoint allows you to exchange short-lived Instagram User Access Tokens (which expire in one hour) for long-lived Instagram User Access Tokens (which expire in 60 days).

---

## Operations

| Operation | Supported | Description |
|-----------|-----------|-------------|
| **Creating** | ❌ No | Not supported via this endpoint. |
| **Reading** | ✅ Yes | `GET /access_token` |
| **Updating** | ❌ No | Not supported. |
| **Deleting** | ❌ No | Not supported. |

---

## Get a Long-Lived Token

Exchange a short-lived Instagram User access token for a long-lived one (60 days).

> [!CAUTION]
> **Security Warning**: Requests for long-lived tokens include your **app secret**. These requests should ONLY be made in server-side code. Never expose your app secret in client-side code, user agents, or decompilable binaries.

### Requirements

- **Access Token**: A valid (unexpired) short-lived Instagram User access token.
- **Host URL**: `graph.instagram.com`

### Required Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `grant_type` | String | Set this to **`ig_exchange_token`**. |
| `client_secret` | String | Your Instagram app's secret (found in App Dashboard). |
| `access_token` | String | The valid short-lived token you wish to exchange. |

### Permissions
- `instagram_graph_user_profile` (for Instagram Basic Display API)

---

## Request Syntax

```bash
GET https://graph.instagram.com/access_token
  ?grant_type=ig_exchange_token
  &client_secret=<INSTAGRAM_APP_SECRET>
  &access_token=<VALID_SHORT_LIVED_ACCESS_TOKEN>
```

---

## Response

Upon success, the API returns a JSON object:

- `access_token`: The new, long-lived Instagram User access token (numeric string).
- `token_type`: `bearer` (string).
- `expires_in`: Number of seconds until the token expires (integer).

### Example cURL Request

```bash
curl -X GET "https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=YOUR_APP_SECRET&access_token=SHORT_LIVED_TOKEN"
```

### Sample Response

```json
{
  "access_token": "lZAfb2dhVW...",
  "token_type": "bearer",
  "expires_in": 5184000
}
```
