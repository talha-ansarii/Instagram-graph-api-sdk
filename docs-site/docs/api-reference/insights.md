---
sidebar_position: 9
---

# InsightsApi

Analytics and metrics.

## getAccountInsights()

```typescript
const insights = await client.insights.getAccountInsights({
  metric: ['reach', 'profile_views', 'follower_count'],
  period: 'day', // 'day' | 'week' | 'days_28'
  breakdown: 'age', // optional
});
```

### Available Metrics

- `reach`, `follower_count`, `website_clicks`, `profile_views`
- `accounts_engaged`, `total_interactions`
- `likes`, `comments`, `shares`, `saves`, `replies`
- `follows_and_unfollows`, `profile_links_taps`, `views`

## getMediaInsights()

```typescript
const insights = await client.insights.getMediaInsights(mediaId, {
  metric: ['likes', 'comments', 'shares'],
});
```

### Available Media Metrics

- `likes`, `comments`, `shares`, `saved`
- `reach`, `plays`, `total_interactions`
