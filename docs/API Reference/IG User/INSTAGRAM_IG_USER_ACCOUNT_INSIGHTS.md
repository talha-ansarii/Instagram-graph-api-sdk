# Instagram Account Insights

Represents social interaction and demographic metrics on an Instagram Business or Creator account.

---

## Metric Deprecation Notices

> [!WARNING]
> **Deprecated Metrics (v22.0+)**: The `impressions` metric is deprecated and will be removed for all versions on **April 21, 2025**.
> - **Replacement**: Use the new `views` metric with `total_value` and breakdowns for `follower_type` and `media_product_type`.

---

## Operations

### Reading
`GET /<IG_USER_ID>/insights`

Returns insights on your app user's Instagram professional account.

#### Limitations
- **Account Size**: `follower_count` and `online_followers` metrics are not available for accounts with **fewer than 100 followers**.
- **Retention**: `online_followers` data is only available for the last **30 days**.
- **Demographics**: Returns only the **top 45 performers** and requires at least 100 engagements/followers.
- **Delay**: Data calculation can be delayed up to **48 hours**.

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

## Query Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| **`metric`** | Yes | Comma-separated list of metrics. |
| **`period`** | Yes | Period aggregation (e.g., `day`, `lifetime`). |
| **`metric_type`**| No | `time_series` (aggregated by period) or `total_value` (simple total). |
| **`timeframe`** | Yes* | Required for demographic metrics (e.g., `this_month`, `last_90_days`). |
| **`breakdown`** | No | Divides results (`contact_button_type`, `follow_type`, `media_product_type`, or demographic dimensions like `city`, `age`). |
| **`since` / `until`**| No | Unix timestamps for interaction metrics range. (Ignored for demographic metrics). |

---

## Interaction Metrics

| Metric | Type | Description |
|--------|------|-------------|
| `reach` | estimated | Unique accounts that saw content. Supports `media_product_type` and `follow_type` breakdowns. |
| `views` | in dev | Number of times content was played/displayed. Supports `follower_type` and `media_product_type` breakdowns. |
| `accounts_engaged`| estimated | Number of accounts that interacted (likes, saves, etc.). |
| `likes` | total | Number of likes across posts, reels, and videos. |
| `comments` | in dev | Number of comments across all media types. |
| `replies` | total | Replies received from stories (text and quick reactions). |
| `saved` | total | Number of saves across all media types. |
| `shares` | total | Number of shares across all media types. |
| `total_interactions`| total | Sum of interactions including boosted content. |
| `profile_links_taps`| total | Taps on address, call, email, or text buttons. |

---

## Demographic Metrics
Requires `period=lifetime` and a `timeframe`.

| Metric | Breakdown Options |
|--------|-------------------|
| `follower_demographics` | `age`, `city`, `country`, `gender` |
| `engaged_audience_demographics`| `age`, `city`, `country`, `gender` |

> [!NOTE]
> Demo metrics for `this_month` return data for the last 30 days, and `this_week` returns data for the last 7 days.

---

## Sample Requests

### Interaction Metrics (Facebook Login)
```bash
curl -i -X GET \
  "https://graph.facebook.com/v24.0/<IG_USER_ID>/insights?metric=reach&period=day&breakdown=media_product_type&metric_type=total_value&access_token=<TOKEN>"
```

### Demographic Metrics (Instagram Login)
```bash
curl -i -X GET \
  "https://graph.instagram.com/v24.0/<IG_USER_ID>/insights?metric=engaged_audience_demographics&period=lifetime&timeframe=last_90_days&breakdown=country&metric_type=total_value&access_token=<TOKEN>"
```

---

## Operations Not Supported
- **Creating**: Not supported.
- **Updating**: Not supported.
- **Deleting**: Not supported.
