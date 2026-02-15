[**Instagram Graph API SDK v1.0.0**](../README.md)

***

[Instagram Graph API SDK](../README.md) / OAUTH\_ENDPOINTS

# Variable: OAUTH\_ENDPOINTS

> `const` **OAUTH\_ENDPOINTS**: `object`

Defined in: src/endpoints.ts:189

OAuth Endpoints (for Instagram Business Login)
Note: These use different base URLs than the Graph API

## Type Declaration

### AUTHORIZE

> `readonly` **AUTHORIZE**: `"https://www.instagram.com/oauth/authorize"` = `'https://www.instagram.com/oauth/authorize'`

Authorization URL - redirect users here to start OAuth flow

### TOKEN

> `readonly` **TOKEN**: `"https://api.instagram.com/oauth/access_token"` = `'https://api.instagram.com/oauth/access_token'`

Short-lived token exchange: POST with form data

### LONG\_LIVED\_TOKEN

> `readonly` **LONG\_LIVED\_TOKEN**: `"https://graph.instagram.com/access_token"` = `'https://graph.instagram.com/access_token'`

Long-lived token exchange: GET with query params
