# Instagram Media Insights

Represents social interaction metrics on an Instagram Media object.

---

## Metric Deprecation Notices

> [!WARNING]
> **Deprecated Metrics (v22.0+)**: The following metrics are deprecated and will be removed for all versions on **April 21, 2025**:
> - `plays`
> - `clips_replays_count`
> - `ig_reels_aggregated_all_plays_count`
> - `impressions` (Requests for media created before July 1, 2024, will work until 2025).
> - `video_views` (Already deprecated).

---

## Operations

### Reading
`GET /<INSTAGRAM_MEDIA_ID>/insights`

Get insights data on an Instagram Media object.

#### Limitations
- **Organic Only**: Only organic metrics are reported; interactions on ads are excluded.
- **Delay**: Data can be delayed up to **48 hours**.
- **Retention**: Metrics are stored for up to **2 years**.
- **Album Insights**: Data is **not available** for individual media within an album (carousel).
- **Story Insights**:
  - Only available for **24 hours**. (Use webhooks `story_insights` to capture before expiry).
  - Metrics with values **less than 5** return an error (#10).
  - Stories in Europe/Japan return **0** for the `replies` metric.

---

## Requirements

### Comparison of Login Flows

| Feature | Instagram API with Instagram Login | Instagram API with Facebook Login |
|---------|------------------------------------|-----------------------------------|
| **Access Tokens** | Instagram User access token | Facebook User access token |
| **Host URL** | `graph.instagram.com` | `graph.facebook.com` |
| **Login Type** | Business Login for Instagram | Facebook Login for Business |
| **Permissions** | `instagram_business_basic`, `instagram_business_manage_insights` | `instagram_basic`, `instagram_manage_insights`, `pages_read_engagement` |

---

## Parameters

### Query String Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| **`metric`** | Yes | Comma-separated list of metrics (e.g., `reach,likes`). |
| **`period`** | No | `day`, `week`, `days_28`, `month`, `lifetime`, etc. (Defaults to `lifetime`). |
| **`breakdown`**| No | Designates subset division (`action_type`, `story_navigation_action_type`). |

---

## Available Metrics

| Metric | Type | Description |
|--------|------|-------------|
| `reach` | FEED, REELS, STORY | Unique users who saw the media. (Estimated). |
| `views` | FEED, REELS, STORY | Total views (including paid in some contexts). |
| `reach` | FEED, REELS, STORY | Total unique users seen (estimated). |
| `likes` | FEED, REELS | Number of likes. |
| `comments` | FEED, REELS | Number of comments. |
| `saved` | FEED, REELS | Number of saves. |
| `shares` | FEED, REELS, STORY | Number of shares. |
| `total_interactions`| FEED, REELS, STORY | Sum of likes, saves, comments, and shares. |
| `follows` | FEED, STORY | New followers from this media. |
| `profile_activity` | FEED, STORY | Profile actions taken after engagement. |
| `navigation` | STORY | Exit, forward, back, next actions (Story only). |
| `ig_reels_avg_watch_time` | REELS | Average play time. |

---

## Breakdowns

| Breakdown Value | Metric Compatibility | Values returned |
|-----------------|-----------------------|-----------------|
| `action_type` | `profile_activity` | `BIO_LINK_CLICKED`, `CALL`, `DIRECTION`, `EMAIL`, `TEXT`. |
| `story_navigation_action_type` | `navigation` | `SWIPE_FORWARD`, `TAP_BACK`, `TAP_EXIT`, `TAP_FORWARD`. |

---

## Sample Requests

### Post Metric Request (Facebook Login)
```bash
curl -i -X GET \
 "https://graph.facebook.com/v24.0/<MEDIA_ID>/insights?metric=profile_activity&breakdown=action_type&access_token=<TOKEN>"
```

### Story Metric Request (Instagram Login)
```bash
curl -i -X GET \
 "https://graph.instagram.com/v24.0/<STORY_ID>/insights?metric=navigation&breakdown=story_navigation_action_type&access_token=<TOKEN>"
```

---

## Operations Not Supported
- **Creating**: Not supported.
- **Updating**: Not supported.
- **Deleting**: Not supported.
