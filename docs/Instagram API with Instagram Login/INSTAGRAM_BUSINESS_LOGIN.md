# Business Login for Instagram (Authentication Flow)

## Overview
Business Login is a custom login flow that allows your app to ask for permissions to access your app user's Instagram professional account data. This process generates an access token used in subsequent API requests.

### How it works
The flow follows standard OAuth 2.0 protocols:
1.  **User Trigger:** User clicks "Log In" on your site (Embed URL).
2.  **Authorization:** User grants permissions in the Instagram popup.
3.  **Redirect:** Meta redirects the user back to your site with an **Authorization Code**.
4.  **Token Exchange:** Your server exchanges this code for a **Short-Lived Token**.
5.  **Long-Lived Token:** Your server exchanges the short-lived token for a **Long-Lived Token** (valid 60 days).



---

## ⚠️ Critical Update: New Scopes
**Deprecation Date:** January 27, 2025

You must update your code to use the new scope values to avoid service disruption.

| Feature | Old Scope (Deprecated) | **New Scope (Required)** |
| :--- | :--- | :--- |
| **Basic Access** | `business_basic` | `instagram_business_basic` |
| **Publishing** | `business_content_publish` | `instagram_business_content_publish` |
| **Comments** | `business_manage_comments` | `instagram_business_manage_comments` |
| **Messages** | `business_manage_messages` | `instagram_business_manage_messages` |

---

## Prerequisites
Before starting, ensure you have:
1.  **Access Level:** Advanced Access (for external users) or Standard Access (for internal testing).
2.  **Credentials:** `Instagram App ID` and `Instagram App Secret` (Found in App Dashboard > Instagram > API setup with Instagram login > Business login settings).
3.  **Endpoints:**
    * Auth: `https://www.instagram.com/oauth/authorize`
    * Short Token: `https://api.instagram.com/oauth/access_token`
    * Long Token: `https://graph.instagram.com/access_token`
    * Refresh: `https://graph.instagram.com/refresh_access_token`

---

## Step 1: Get Authorization (Client-Side)
Direct the user to this URL to open the authorization window.

### Embed URL Structure
```http
[https://www.instagram.com/oauth/authorize](https://www.instagram.com/oauth/authorize)
  ?client_id={app-id}
  &redirect_uri={redirect-uri}
  &response_type=code
  &scope=instagram_business_basic,instagram_business_manage_messages,instagram_business_manage_comments,instagram_business_content_publish

```

### Query String Parameters

| Parameter | Description |
| --- | --- |
| `client_id` | **Required.** Your Instagram App ID. |
| `redirect_uri` | **Required.** Must exactly match one of the Valid OAuth Redirect URIs in your App Dashboard. |
| `response_type` | **Required.** Must be set to `code`. |
| `scope` | **Required.** Comma-separated list of permissions. |
| `state` | *Optional.* Server-specific string to prevent CSRF. |
| `force_reauth` | *Optional.* Set to `true` to force re-login even if user has an active session. |

### Handling the Redirect

**Success:**
The user is redirected to:
`https://your-redirect-uri.com/?code=abcdefg...#_`

> **Note:** Strip the `#_` from the end of the code. The code is valid for **1 hour**.

**Cancellation:**
If the user denies access:
`https://your-redirect-uri.com/?error=access_denied&error_reason=user_denied`

---

## Step 2: Exchange Code for Short-Lived Token (Server-Side)

Send a POST request to exchange the authorization code for a token.

**Endpoint:** `POST https://api.instagram.com/oauth/access_token`

### Request (cURL)

```bash
curl -X POST [https://api.instagram.com/oauth/access_token](https://api.instagram.com/oauth/access_token) \
  -F 'client_id={app-id}' \
  -F 'client_secret={app-secret}' \
  -F 'grant_type=authorization_code' \
  -F 'redirect_uri={redirect-uri}' \
  -F 'code={auth-code}'

```

### Response

```json
{
  "data": [
    {
      "access_token": "SHORT_LIVED_TOKEN",
      "user_id": "1234567890",
      "permissions": "instagram_business_basic,..."
    }
  ]
}

```

---

## Step 3: Get Long-Lived Access Token (Server-Side)

Exchange the short-lived token for one that lasts **60 days**. This request **must** be server-side as it requires your App Secret.

**Endpoint:** `GET https://graph.instagram.com/access_token`

### Request

```bash
curl -i -X GET "[https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=](https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=){app-secret}&access_token={short-lived-token}"

```

### Response

```json
{
  "access_token": "LONG_LIVED_TOKEN",
  "token_type": "bearer",
  "expires_in": 5183944
}

```

---

## Maintenance: Refreshing Long-Lived Tokens

You can refresh a token if it is at least **24 hours old** and **not yet expired**.

**Endpoint:** `GET https://graph.instagram.com/refresh_access_token`

### Request

```bash
curl -i -X GET "[https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=](https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=){long-lived-token}"

```

```

