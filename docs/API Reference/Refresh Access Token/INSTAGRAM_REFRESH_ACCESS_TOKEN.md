# Refresh Access Token

This endpoint allows you to refresh long-lived Instagram User Access Tokens.

---

## Operations

### Reading
`GET /refresh_access_token`

Refresh a long-lived access token that is at least **24 hours old** but has **not expired**. 

> [!TIP]
> Refreshed tokens are valid for **60 days** from the date at which they are refreshed.

---

## Requirements

| Requirement | Description |
|-------------|-------------|
| **Access Tokens** | Instagram User (long-lived). |
| **Permissions** | `instagram_business_basic`. |

---

## Request Syntax

```bash
GET https://graph.instagram.com/refresh_access_token
  ?grant_type=ig_refresh_token
  &access_token=<LONG_LIVED_ACCESS_TOKEN>
```

### Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| **`grant_type`** | Yes | Set this to `ig_refresh_token`. |
| **`access_token`** | Yes | The valid (unexpired) long-lived Instagram User Access Token you want to refresh. |

---

## Response

Returns a JSON object with the new token and expiration details.

| Field | Description |
|-------|-------------|
| **`access_token`** | The refreshed long-lived Instagram User Access Token. |
| **`token_type`** | Always `bearer`. |
| **`expires_in`** | Number of seconds until the token expires. |

### Sample Request
```bash
curl -X GET \
  'https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=<LONG_LIVED_TOKEN>'
```

### Sample Response
```json
{
  "access_token": "c3oxd...",
  "token_type": "bearer",
  "expires_in": 5183944
}
```

---

## Operations Not Supported
- **Creating**: Not supported.
- **Updating**: Not supported.
- **Deleting**: Not supported.
