# Instagram API with Instagram Login

## Overview
The **Instagram API with Instagram Login** allows Instagram professionals (Businesses and Creators) to use your app to manage their presence on Instagram.

**Key Distinction:** This API setup **does not require** a Facebook Page to be linked to the Instagram professional account.

## Core Capabilities
The API supports the following features:

* **Comment Moderation:** Manage and reply to comments on their media.
* **Content Publishing:** Get and publish their media.
* **Media Insights:** Get insights on their media. *(New Feature)*
* **Mentions:** Identify media where they have been @mentioned by other Instagram users.
* **Messaging:** Send and receive messages with customers or people interested in their Instagram account.

---

## Critical Update: Scope Migration
**Deprecation Date:** January 27, 2025

To ensure consistency, new scope values have been introduced. You **must** update your code to use the new scopes. Failure to do so will result in your app being unable to call Instagram endpoints.

| Feature | Old Scope (Deprecated) | **New Scope (Required)** |
| :--- | :--- | :--- |
| **Basic Access** | `business_basic` | `instagram_business_basic` |
| **Publishing** | `business_content_publish` | `instagram_business_content_publish` |
| **Comments** | `business_manage_comments` | `instagram_business_manage_comments` |
| **Messages** | `business_manage_messages` | `instagram_business_manage_messages` |

> **Warning:** The old scope values are deprecated as of Jan 27, 2025. Apps using the old scopes will experience disruption.

---

## Limitations
* **Ads:** This API setup cannot access Ads API.
* **Tagging:** This API setup cannot access Tagging features.