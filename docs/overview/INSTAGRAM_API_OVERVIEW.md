# Instagram Graph API - Platform Overview

## Overview
The Instagram Platform is a collection of APIs that allows your app to access data for Instagram professional accounts, including both businesses and creators. You can build an app that serves your own Instagram professional account or other accounts you do not own or manage.

## API Configurations
There are two main configurations depending on how your users log in and whether they have a Facebook Page.

| Component | Instagram API with Instagram Login | Instagram API with Facebook Login |
| :--- | :--- | :--- |
| **Target Audience** | Accounts with presence on Instagram only. | Accounts linked to a Facebook Page. |
| **Login Credentials** | Instagram Credentials | Facebook Credentials |
| **Access Token Type** | Instagram User Token | Facebook User or Page Token |
| **Authorization Type** | Business Login for Instagram | Facebook Login for Business |
| **Facebook Page** | Not Required (x) | **Required** |
| **Comment Moderation** | Supported | Supported |
| **Content Publishing** | Supported | Supported |
| **Hashtag Search** | Not Supported (x) | Supported |
| **Insights** | Supported | Supported |
| **Mentions** | Supported | Supported |
| **Messaging** | Supported | Supported (via Messenger Platform) |
| **Product Tagging** | Not Supported (x) | Supported |
| **Partnership Ads** | Not Supported (x) | Supported |

## Access Levels
There are two access levels available to your app:

### 1. Standard Access
* **Default:** The default level for all new apps.
* **Limitations:** Limits the data your app can get.
* **Use Case:** Development, testing, or if the app *only* serves accounts you own/manage.
* **Note:** Some features may not work properly until Advanced Access is granted.

### 2. Advanced Access
* **Requirement:** Required if your app serves accounts you do not own or manage.
* **Process:** Requires **App Review** and **Business Verification**.

## Authentication and Authorization
Endpoint authorization is handled through permissions and features via OAuth 2.0.

### The Auth Flow
1.  **User Login:** App user clicks your embed URL.
    * *Instagram Login:* Uses `instagram_basic` scope.
    * *Facebook Login:* Uses Facebook scopes.
2.  **Authorization Code:** Meta redirects user to your URI with an Authorization Code (Valid for **1 hour**).
3.  **Short-Lived Token:** Exchange code for a short-lived access token (Valid for **1 hour**).
4.  **Long-Lived Token:** Exchange short-lived token for a long-lived token (Valid for **60 days**).
    * *Note:* Can be refreshed before expiration.

### Base URLs
* **Instagram Login:** `https://graph.instagram.com`
* **Facebook Login:** `https://graph.facebook.com`

## Features and Permissions
The permissions your app must request depend on the login type.

| Feature | Instagram Login Permissions | Facebook Login Permissions |
| :--- | :--- | :--- |
| **Basic Info** | `instagram_business_basic` | `instagram_basic`, `pages_show_list` |
| **Publishing** | `instagram_business_content_publish` | `instagram_content_publish` |
| **Comments** | `instagram_business_manage_comments` | `instagram_manage_comments` |
| **Messages** | `instagram_business_manage_messages` | `instagram_manage_messages` |
| **Insights** | N/A | `instagram_manage_insights`, `pages_read_engagement` |
| **Public Content** | N/A | `Instagram Public Content Access` |

### Special Features
* **Human Agent:** Allows responding to user messages within 7 days (instead of 24h) if the issue requires human intervention.
* **Instagram Public Content Access:** Allows Hashtag Search (discovery, sentiment analysis).

## Key Functionalities

### Content Publishing
Your app can publish:
* Single Images
* Videos
* Reels (Single media posts)
* Carousels (Multiple images/videos)

### Content Delivery Network (CDN)
Media URLs are privacy-aware. They will **not** return media if the content has been deleted or expired.

### Collaborators (Facebook Login Only)
Using `Instagram Collaborator Tags`, users can co-author content.
* **Constraint:** Collaborators cannot access data on co-authored media via API (only the publisher can), with exceptions for "Top Performing" or "Hashtag Search" endpoints.

## User IDs
* **Instagram-scoped User ID (IGSID):** Created when a user interacts with an app using Instagram Login. Unique to the app + user pair.
* **Page-scoped User ID (PSID):** Created when a user interacts with an app using Facebook Login.

### The `/me` Endpoint
A dynamic endpoint that translates to the object ID of the account whose access token is currently being used.

## Messaging
* **Standard Window:** 24-hour response window.
* **Human Agent:** 7-day response window (requires tag).
* **Inbox:** Messages from non-followers go to "Requests". Answering via API moves them to "General".
* **Limitations:** API replies do not mark messages as "Read" in the Instagram native app until a reply is sent. Folder info is not supported.

## Rate Limiting

### Standard Rate Limits (Business Use Case)
Calls are counted against the **calling app's** call count per app/user pair in a rolling 24-hour window.

$$Limit = 4800 \times \text{Number of Impressions}$$
*(Impressions = Number of times content entered a person's screen in last 24h)*

### Messaging Rate Limits
* **Conversations API:** 2 calls/sec per account.
* **Private Replies (Live):** 100 calls/sec per account.
* **Private Replies (Post/Reel):** 750 calls/hour per account.
* **Send API (Text/Link):** 100 calls/sec per account.
* **Send API (Audio/Video):** 10 calls/sec per account.

**Note:** Always use **Webhooks** to receive notifications (messages, mentions) to save API calls and avoid rate limits.