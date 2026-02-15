---
sidebar_position: 5
---

# Insights & Analytics

Access engagement metrics and analytics.

## Account Insights

```typescript
const insights = await client.insights.getAccountInsights({
  metric: ['reach', 'profile_views', 'accounts_engaged'],
  period: 'day',
});

insights.data.forEach(metric => {
  console.log(`${metric.name}: ${metric.values[0].value}`);
});
```

### Available Account Metrics

| Metric | Description |
|--------|-------------|
| `reach` | Unique accounts that saw your content |
| `profile_views` | Profile visits |
| `accounts_engaged` | Accounts that interacted |
| `total_interactions` | Total likes, comments, shares, saves |
| `likes` | Total likes |
| `comments` | Total comments |
| `shares` | Total shares |
| `saves` | Total saves |
| `follows_and_unfollows` | Net follower change |
| `follower_count` | Current follower count |

### Time Periods

```typescript
// Last 24 hours
await client.insights.getAccountInsights({
  metric: ['reach'],
  period: 'day',
});

// Last 7 days
await client.insights.getAccountInsights({
  metric: ['reach'],
  period: 'week',
});

// Last 28 days
await client.insights.getAccountInsights({
  metric: ['reach'],
  period: 'days_28',
});
```

## Media Insights

```typescript
const mediaInsights = await client.insights.getMediaInsights(mediaId, {
  metric: ['likes', 'comments', 'shares', 'saved'],
});

mediaInsights.data.forEach(metric => {
  console.log(`${metric.name}: ${metric.values[0].value}`);
});
```

### Available Media Metrics

| Metric | Description |
|--------|-------------|
| `likes` | Number of likes |
| `comments` | Number of comments |
| `shares` | Number of shares |
| `saved` | Number of saves |
| `reach` | Unique accounts reached |
| `plays` | Video/reel plays |
| `total_interactions` | All engagement |

## Demographics (Engagement)

```typescript
const demographics = await client.insights.getAccountInsights({
  metric: ['engaged_audience_demographics'],
  period: 'lifetime',
  breakdown: 'age',
});
```

### Breakdown Options

- `age` - Age groups (18-24, 25-34, etc.)
- `gender` - Male, Female, Other
- `city` - Top cities
- `country` - Top countries

## Example: Weekly Report

```typescript
async function generateWeeklyReport() {
  const insights = await client.insights.getAccountInsights({
    metric: [
      'reach',
      'accounts_engaged',
      'total_interactions',
      'follower_count',
    ],
    period: 'week',
  });

  const report = {};
  insights.data.forEach(m => {
    report[m.name] = m.values[0].value;
  });

  console.log('📊 Weekly Report');
  console.log(`   Reach: ${report.reach.toLocaleString()}`);
  console.log(`   Engaged: ${report.accounts_engaged.toLocaleString()}`);
  console.log(`   Interactions: ${report.total_interactions.toLocaleString()}`);
  console.log(`   Followers: ${report.follower_count.toLocaleString()}`);
}
```

:::info Advanced Insights
Some demographic insights require the `instagram_business_manage_insights` permission and may need Advanced Access.
:::
