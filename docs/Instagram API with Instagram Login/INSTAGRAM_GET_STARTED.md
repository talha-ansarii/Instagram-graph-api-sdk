# Instagram Graph API - Getting Started

## Overview
This guide explains how to make your first API call using **Instagram Login**. You will learn how to obtain your User ID, username, and list of media objects.

## Prerequisites
* **App Type:** Must be a **Business** type app.
* **Setup:** You must have completed the basic setup (App Dashboard configuration).
* **Access:** If the app needs Advanced Access, App Review is required.

---

## Step 1: Get an Access Token
You need a token to make requests. There are two ways to get one:

### Method A: Business Login (Production)
If you have implemented the "Business Login for Instagram" flow (OAuth):
1.  Log in through your app.
2.  **Token Validity:** Short-lived (1 hour).
3.  *Note:* You can exchange this for a long-lived token (60 days) via the API.

### Method B: App Dashboard (Testing)
If you are testing and haven't built the login flow yet:
1.  Go to **App Dashboard** > **Instagram** > **API setup with Instagram business login**.
2.  Click **Generate token** next to the Instagram account you want to access.
3.  Log into Instagram in the popup.
4.  Copy the token.
5.  **Token Validity:** Long-lived (60 days).



---

## Step 2: Get User ID & Username
Once you have the token, you need to find your **Instagram Professional Account ID** (which is different from your App-Scoped ID).

**Endpoint:** `GET /me`

### Request (cURL)
```bash
curl -i -X GET \
 "[https://graph.instagram.com/v24.0/me?fields=user_id,username&access_token=](https://graph.instagram.com/v24.0/me?fields=user_id,username&access_token=){access-token}"

```

### Response

```json
{
  "data": [
    {
      "user_id": "17841400000000001", // <--- USE THIS ID FOR API CALLS
      "username": "my_business_account"
    }
  ]
}

```

### Available Fields

You can request these fields via the `?fields=` parameter on the `/me` endpoint.

| Field Name | Description |
| --- | --- |
| `id` | The **App-Scoped ID**. (Do not use this for graph queries). |
| `user_id` | The **Instagram Professional Account ID**. Use this for all subsequent API calls. |
| `username` | The Instagram handle (e.g., `nike`). |
| `name` | The full name on the profile. |
| `account_type` | `Business` or `Media_Creator`. |
| `profile_picture_url` | URL to the profile avatar. |
| `followers_count` | Total number of followers. |
| `follows_count` | Total number of accounts followed. |
| `media_count` | Total number of posts. |

---

## Step 3: Get Media Objects

Now that you have the `<IG_ID>` (from the `user_id` field above), you can fetch the user's posts.

**Endpoint:** `GET /{ig-user-id}/media`

### Request (cURL)

```bash
curl -i -X GET \
 "[https://graph.instagram.com/v24.0/](https://graph.instagram.com/v24.0/){ig-user-id}/media?access_token={access-token}"

```

### Response

Returns a list of Media IDs.

```json
{
  "data": [
    { "id": "17918195224117851" },
    { "id": "17895695668004550" },
    { "id": "17899305451014820" }
  ],
  "paging": {
    "cursors": {
      "before": "QVFIUkdGRXA...",
      "after": "QVFIUmlwbnFs..."
    }
  }
}

```

## Next Steps

Now that you have the **Media IDs**, you can query specific details for each post (like comments, insights, or image URLs) using the `GET /{media-id}` endpoint.

```

