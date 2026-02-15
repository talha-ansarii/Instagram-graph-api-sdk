# Migrating to Instagram API with Instagram Login

## Overview
This guide helps you determine whether you should migrate your existing app to the new Instagram product and how to implement it.

## Why Migrate?
The **Instagram API with Instagram Login** offers a streamlined way for users to manage their professional accounts **without** needing a Facebook Page.

* **Simplified Onboarding:** The process has been reduced from an average of 12 steps to just **2 steps**.
* **Permissions:** Only two permissions are required per functionality (e.g., `instagram_business_basic` + specific feature permission).
* **Result:** Significant improvement in onboarding success rates.

---

## Decision Matrix: Should You Migrate?
Use this table to determine if the new Instagram product supports the features your app needs.

| Component | Instagram Login (New) | Facebook Login (Legacy) |
| :--- | :--- | :--- |
| **Access Token Type** | Instagram User | Facebook User or Page |
| **Authorization Type** | Business Login for Instagram | Facebook Login for Business |
| **Facebook Page Required** | **No (x)** | **Yes** |
| **Comment Moderation** | Supported | Supported |
| **Content Publishing** | Supported | Supported |
| **Insights** | Supported | Supported |
| **Mentions** | Supported | Supported |
| **Messaging** | Supported | Supported (via Messenger Platform) |
| **Hashtag Search** | **Not Supported (x)** | Supported |
| **Product Tagging** | **Not Supported (x)** | Supported |
| **Partnership Ads** | **Not Supported (x)** | Supported |

---

## Migration Steps

### Step 1: Add Instagram Product
1.  Follow the **Create a Meta app with Instagram guide** to add the "Instagram" product to your existing app.
    * *Note:* Your app **must** be a "Business" type app. If not, you must create a new app and select **Business**.
2.  **App Review:** If your app needs Advanced Access, the review is handled within the Instagram product flow (not the general left-side menu).
3.  **Configuration:** You will need to configure:
    * Instagram Login for Business
    * Permissions and features
    * Webhooks

### Step 2: Update Your Code
1.  **Launch Flow:** Copy and paste the **Embed URL** into an anchor tag or button on your website to launch the "Business Login for Instagram" flow.
    * *Result:* This flow returns an **Instagram User Access Token**.
2.  **Update Host URL:** Change your API calls to use the Instagram host:
    * Old: `graph.facebook.com`
    * New: `graph.instagram.com`
3.  **Update Endpoints:**
    * Update API calls to use the **Instagram User Access Token**.
    * The `/me` endpoint will now return an **Instagram Professional Account ID** instead of a Facebook Page ID.
4.  **Update Credentials:**
    * Replace your Meta App ID/Secret with the **Instagram App ID and Secret**.
    * *Location:* App Dashboard > Instagram > API setup with Instagram login > 3. Set up Instagram business login > Business login settings.