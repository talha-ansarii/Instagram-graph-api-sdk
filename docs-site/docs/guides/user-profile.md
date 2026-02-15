---
sidebar_position: 1
---

# User Profile

Working with user profiles and media.

## Get Your Profile

```typescript
const profile = await client.users.getProfile();

console.log('ID:', profile.id);
console.log('Username:', profile.username);
console.log('Followers:', profile.followers_count);
```

### Available Fields

```typescript
const profile = await client.users.getProfile({
  fields: [
    'id',
    'username',
    'name',
    'biography',
    'profile_picture_url',
    'account_type',
    'followers_count',
    'follows_count',
    'media_count',
  ],
});
```

## Get Your Media

```typescript
const media = await client.users.getMedia({
  limit: 10,
  fields: ['id', 'caption', 'media_type', 'permalink', 'timestamp'],
});

media.data.forEach(post => {
  console.log(`[${post.media_type}] ${post.caption?.substring(0, 50)}`);
});
```

### Pagination

```typescript
// First page
const page1 = await client.users.getMedia({ limit: 10 });

// Next page (if exists)
if (page1.paging?.cursors?.after) {
  const page2 = await client.users.getMedia({
    limit: 10,
    after: page1.paging.cursors.after,
  });
}
```

## Get Stories

```typescript
const stories = await client.users.getStories();

console.log(`Active stories: ${stories.data.length}`);
```

## Check Publishing Limits

```typescript
const limits = await client.users.getContentPublishingLimit();

console.log('Posts today:', limits.quota_usage);
console.log('Daily limit:', limits.config.quota_total);
```

:::info Rate Limit
Instagram allows 25 posts per 24-hour period.
:::
