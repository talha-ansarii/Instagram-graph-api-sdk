# Changelog for Instagram Platform

This changelog tracks changes made to the Instagram APIs. For related changes, see the following:
- [Graph API Changelog](https://developers.facebook.com/docs/graph-api/changelog)
- [Marketing API Changelog](https://developers.facebook.com/docs/marketing-api/changelog)
- [Messenger Platform Changelog](https://developers.facebook.com/docs/messenger-platform/changelog) (includes Instagram Messaging)

---

## 2025

### December 19, 2025
#### Instagram PDF Attachment
You can now upload and send **PDF file attachments** in Instagram Direct using:
- **Facebook Graph API**: For Instagram accounts linked with a Facebook page.
- **Instagram API**: For Instagram-only accounts.

### December 12, 2025
#### Link Sticker URLs in Webhooks
Instagram Messaging webhooks now include **link sticker URLs** when users reply to stories via DM.
- **New Field**: `reply_to.story.link_sticker_url`.
- **Use Case**: Trigger specific messaging automations based on the URL in the story's link sticker.

### December 3, 2025
#### Accept/Decline Collaboration Invites
*Applies to all versions.*
Introducing collaboration invite management on the **IG User** node:
- **List Invites**: `GET /<IG_USER_ID>/collaboration_invites`.
- **Action**: `POST /<IG_USER_ID>/collaboration_invites` (accept or decline).
- **Permission**: `instagram_basic`.

#### New Insights Metrics
*Applies to all versions.*
- **Media Insights**: Added `reels_skip_rate` and `reposts`.
- **User Insights**: Added `reposts`.
- **Crossposting**: Added `crossposted_views` (aggregated IG + FB) and `facebook_views` (FB only) for Reels.

#### Trial Reels Support
*Applies to all versions.*
Added `trial_params` to the **Content Publishing API** (both Facebook and Instagram Login flavors) to create and publish Trial Reels directly.

### November 10, 2025
#### Self Messaging
Instagram Professional accounts can now **message themselves** for testing and previewing automation.

### November 3, 2025
#### Multi-Image Sending
You can now send a collection of images in Instagram Direct. 
> [!NOTE]
> This is a **Beta** feature rolling out incrementally. If unavailable for an account, you may see error `2534068`.

### October 27, 2025
#### Enhanced Post Sharing
Rolling out enhanced support for Instagram post shares in messaging webhooks.

### September 23, 2025
#### Sender Actions
Businesses can now display **typing indicators** (`typing_on`/`typing_off`) and **mark seen** indicators in conversations.

### September 10, 2025
#### message_edit Webhook
Introducing the `message_edit` webhook subscription for both Business Login for Instagram and Facebook Login for Business.

### June 16, 2025
#### view_count on Media
Added `view_count` field to the **IG Media** endpoint (available via **Business Discovery** for Reels).

### June 14, 2025
#### Business Login Enhancements
- **New Parameter**: `force_reauth` added to fix broken login experiences on mobile.
- **Deprecations**: `enable_fb_login` and `force_authentication` are no longer supported.

### April 8, 2025
#### Meta oEmbed Read
- The new **Meta oEmbed Read** feature replaces the legacy **oEmbed Read**.
- Legacy feature deprecation: **November 3, 2025**.
- **Response Updates**: `author_name`, `author_url`, and thumbnail fields will be removed from responses on November 3, 2025.

### March 24, 2025
#### Alt Text for Images
Added `alt_text` field to the `POST /{ig-user-id}/media` endpoint (Photos only; Reels/Stories not supported).

### January 21, 2025
#### Insights for Instagram Login
Insights APIs for media and users are now available for apps using **Instagram API with Instagram Login**.

#### Metric Updates
- **New**: `views` metric for media and user insights.
- **Deprecations (v22.0+)**: `clips_replays_count`, `impressions`, and `plays`. (Full error enforcement after May 20, 2025).

#### v1.0 Endpoint Deprecation
The **Instagram v1.0 API** is officially deprecated. Users must migrate to the Instagram Platform endpoints.

---

## 2024

### December 4, 2024
#### Instagram Basic Display API Deprecation
The **Instagram Basic Display API** is now deprecated. Requests will return errors. Migration to the Instagram API is required.

### October 3, 2024
#### Welcome Message Flows
Now available for apps using **Instagram API with Instagram Login**.

### October 2, 2024
#### Metric Retirements
- **Media**: `video_views` removed.
- **User**: `email_contacts`, `profile_views`, `website_clicks`, etc., removed.

### September 17, 2024
#### New Scope Names
Updated scope names for consistency:
- `instagram_business_basic`
- `instagram_business_content_publish`
- `instagram_business_manage_comments`
- `instagram_business_manage_messages`
*Old values deprecated January 27, 2025.*

### July 23, 2024
#### Launch: Instagram API with Instagram Login
Key features:
- **No Facebook Page required**.
- Host: `graph.instagram.com`.
- New permission set (`instagram_business_basic`, etc.).

---

## 2018 – 2023 Highlights

- **2023 (Sept 12)**: Deprecation of legacy/duplicative Insight metrics.
- **2022 (Oct 31)**: Product Tagging for **Reels** launched.
- **2022 (June 28)**: **Reels** support added to Content Publishing.
- **2022 (March 15)**: **Carousel Posts** support (images/videos).
- **2021 (Nov 9)**: **Live Videos** support (retrieval and comments).
- **2021 (Jan 26)**: Content Publishing exit from Beta; open to all.
- **2018 (Oct 31)**: **Hashtag Search API** launched.
- **2018 (Jan/Feb)**: Initial Content Publishing Beta with photo hashtags.
