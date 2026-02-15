# Instagram User Profile API

## Overview
The User Profile API allows your app to retrieve public profile information about an Instagram user who has interacted with your business. This is useful for personalizing the messaging experience.

## ⚠️ Critical Constraint: User Consent
You cannot just look up any Instagram user.
* **Requirement:** The Instagram user must have **consented** by initiating an interaction.
* **Valid Triggers:**
    * Sending a message to your business.
    * Clicking an Icebreaker.
    * Clicking a Persistent Menu.
* **Invalid Triggers:** If a user only *comments* on a post but hasn't messaged you, you **cannot** access their profile via this API. You will receive an error: *"User consent is required to access user profile."*

---

## Prerequisites
* **Access Level:** Advanced Access (for external users) or Standard Access (internal testing).
* **Permissions:**
    * `instagram_business_basic`
    * `instagram_business_manage_messages`
* **ID Source:** You must use the **Instagram-Scoped ID (IGSID)** received from a webhook notification. You cannot use their public username to perform this lookup.



---

## Get Profile Information
**Endpoint:** `GET /{igsid}`

To retrieve the user's details, send a GET request to their Scoped ID (found in the `sender.id` field of a webhook).

### Request (cURL)
```bash
curl -X GET "[https://graph.instagram.com/v24.0/](https://graph.instagram.com/v24.0/){igsid}?fields=name,username,profile_pic,follower_count,is_user_follow_business,is_business_follow_user&access_token={access-token}"

```

### Response

```json
{
  "name": "Peter Chang",
  "username": "peter_chang_live",
  "profile_pic": "https://fbcdn-profile-...", // URL expires in a few days
  "follower_count": 1234,
  "is_user_follow_business": false, // Does Peter follow you?
  "is_business_follow_user": true,  // Do you follow Peter?
  "is_verified_user": false,
  "id": "1234567890"
}

```

---

## Available Fields

| Field Name | Type | Description |
| --- | --- | --- |
| `name` | `string` | The user's full name (can be null). |
| `username` | `string` | The user's Instagram handle. |
| `profile_pic` | `url` | URL to their avatar. **Note:** This URL is temporary and expires in a few days. Do not hardcode it. |
| `follower_count` | `int` | The number of followers the user has. |
| `is_user_follow_business` | `boolean` | `true` if the user follows your business account. |
| `is_business_follow_user` | `boolean` | `true` if your business account follows the user. |
| `is_verified_user` | `boolean` | `true` if the user has a blue checkmark (Verified). |

---

## Limitations

* **Blocking:** If the user blocks your business account, you cannot query their profile, even if you have a valid ID.
* **Scope:** This API uses the **Instagram-Scoped ID (IGSID)**. This ID is unique to your app and cannot be used to find the user on other apps or the public web.


