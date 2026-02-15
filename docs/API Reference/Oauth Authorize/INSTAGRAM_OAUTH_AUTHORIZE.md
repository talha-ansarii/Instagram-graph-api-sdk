# Oauth Authorize

This endpoint returns the **Authorization Window**, which app users use to authenticate their identity and grant your app permissions and Instagram User Access Tokens.

---

## Operations

### Reading
`GET /oauth/authorize`

Display the Authorization Window to the user.

#### Request Syntax
```bash
GET https://api.instagram.com/oauth/authorize
  ?client_id=<APP_ID>
  &redirect_uri=<REDIRECT_URI>
  &response_type=code
  &scope=<PERMISSIONS>
```

---

## Query String Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| **`client_id`** | Yes | Your Instagram App ID displayed in the Meta App Dashboard. |
| **`redirect_uri`** | Yes | The URI where users will be redirected after authentication. Must **exactly match** one of your valid OAuth URIs. |
| **`response_type`**| Yes | Must be set to `code`. |
| **`scope`** | Yes | Comma-separated (or URL-encoded space-separated) list of permissions. `instagram_basic` or `instagram_business_basic` is required. |
| **`state`** | No | An optional value to protect against CSRF. This will be included in the redirect. |

---

## Response

The Authorization Window will redirect to your `redirect_uri` with an **Authorization Code** upon success.

> [!IMPORTANT]
> **Stripping the Fragment**: Instagram appends `#_` to the end of the redirect URI. This is **not** part of the code itself; you must strip it out before exchanging for a token.

### Successful Authorization
```bash
https://socialsizzle.herokuapp.com/auth?code=AQBx-hBsH3...
```
- **Validity**: Codes are valid for **1 hour** and can be used only **once**.

### Canceled Authorization
If the user denies the request, they are redirected with error parameters:
```bash
https://socialsizzle.herokuapp.com/auth/
  ?error=access_denied
  &error_reason=user_denied
  &error_description=The+user+denied+your+request
```

---

## Operations Not Supported
- **Creating**: Not supported.
- **Updating**: Not supported.
- **Deleting**: Not supported.
