# Insights

This guide shows you how to get insights for your app users' Instagram media and professional accounts using the Instagram Platform.

> [!NOTE]
> In this guide we will be using Instagram user and Instagram professional account interchangeably. An Instagram User object represents your app user's Instagram professional account.

Instagram Insights are now available for Instagram API with Instagram Login.

## Requirements

This guide assumes you have read the Instagram Platform Overview and implemented the needed components for using this API, such as a Meta login flow and a webhooks server to receive notifications.

### Comparison of Login Flows

| Feature | Instagram API with Instagram Login | Instagram API with Facebook Login |
|---------|------------------------------------|-----------------------------------|
| **Access Tokens** | Instagram User access token | Facebook User access token |
| **Host URL** | `graph.instagram.com` | `graph.facebook.com` |
| **Login Type** | Business Login for Instagram | Facebook Login for Business |
| **Permissions** | `instagram_business_basic`, `instagram_business_manage_insights` | `instagram_basic`, `instagram_manage_insights`, `pages_read_engagement` |

> [!NOTE]
| If the app user was granted a role on the Page connected to your app user's Instagram professional account via the Business Manager, your app will also need `ads_management` and `ads_read`.

### Access Level

- **Advanced Access**: If your app serves Instagram professional accounts you don't own or manage.
- **Standard Access**: If your app serves Instagram professional accounts you own or manage and have added to your app in the App Dashboard.

---

## Endpoints

- `GET /<INSTAGRAM_MEDIA_ID>/insights` — Gets metrics on a media object.
- `GET /<INSTAGRAM_ACCOUNT_ID>/insights` — Gets metrics on an Instagram Business Account or Instagram Creator account.

> [!IMPORTANT]
> **Timestamps**: API responses use UTC with zero offset and are formatted using ISO-8601. Example: `2019-04-05T07:56:32+0000`.

---

## Webhook Event Subscriptions

- **story_insights**: Only available for Instagram API with Facebook Login.

---

## Limitations

### Media Insights
- **Ads Data**: Fields that return aggregated values don't include ads-driven data (e.g., `comments_count` excludes ad-driven comments).
- **Mentions**: Captions don't include the `@` symbol unless the app user has admin-equivalent tasks on the app.
- **Albums**: Some fields like `permalink` cannot be used on photos within albums (children).
- **Live Video**: Can only be read while they are being broadcast.
- **Account Type**: Returns data ONLY for media owned by Instagram professional accounts.

### Account Insights
- **Follower Count**: Some metrics are not available for accounts with fewer than 100 followers.
- **Storage**: User Metrics data is stored for up to **90 days**.
- **Scope**: You can only get insights for a **single user** at a time.
- **Page Limitation**: You cannot get insights for Facebook Pages.
- **Missing Data**: If data doesn't exist, the API returns an **empty data set** instead of 0.

---

## Examples

### Instagram Account Request (Facebook Login Flow)

To get impressions, profile views, and reach for a 24-hour period:

```bash
GET graph.facebook.com/v24.0/<INSTAGRAM_USER_ID>/insights
    ?metric=impressions,reach,profile_views
    &period=day
    &access_token=<ACCESS_TOKEN>
```

#### Sample Response

```json
{
  "data": [
    {
      "name": "impressions",
      "period": "day",
      "values": [
        {
          "value": 32,
          "end_time": "2018-01-11T08:00:00+0000"
        }
      ],
      "title": "Impressions",
      "description": "Total number of times the Business Account's media objects have been viewed",
      "id": "<IG_ID>/insights/impressions/day"
    },
    {
      "name": "reach",
      "period": "day",
      "values": [
        {
          "value": 12,
          "end_time": "2018-01-11T08:00:00+0000"
        }
      ],
      "title": "Reach",
      "description": "Total number of times the Business Account's media objects have been uniquely viewed",
      "id": "<IG_ID>/insights/reach/day"
    }
  ]
}
```

### Instagram Media Request (Instagram Login Flow)

To get engagement, impressions, and reach for a specific media object:

```bash
GET graph.instagram.com/v24.0/<INSTAGRAM_MEDIA_ID>/insights
    ?metric=engagement,impressions,reach
    &access_token=<ACCESS_TOKEN>
```

#### Sample Response

```json
{
  "data": [
    {
      "name": "engagement",
      "period": "lifetime",
      "values": [{ "value": 8 }],
      "title": "Engagement",
      "description": "Total number of likes and comments on the media object",
      "id": "<MEDIA_ID>/insights/engagement/lifetime"
    },
    {
      "name": "impressions",
      "period": "lifetime",
      "values": [{ "value": 13 }],
      "title": "Impressions",
      "description": "Total number of times the media object has been seen",
      "id": "<MEDIA_ID>/insights/impressions/lifetime"
    }
  ]
}
```
