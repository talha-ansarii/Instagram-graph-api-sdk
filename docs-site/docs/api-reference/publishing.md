---
sidebar_position: 6
---

# PublishingApi

Content publishing operations.

## createImageContainer()

```typescript
const container = await client.publishing.createImageContainer({
  imageUrl: 'https://example.com/image.jpg',
  caption: 'My caption',
  userTags: [{ username: 'friend', x: 0.5, y: 0.5 }],
  locationId: '123',
  isCarouselItem: false,
});
```

## createVideoContainer()

```typescript
const container = await client.publishing.createVideoContainer({
  videoUrl: 'https://example.com/video.mp4',
  caption: 'My reel',
  mediaType: 'REELS',
});
```

## createCarouselContainer()

```typescript
const carousel = await client.publishing.createCarouselContainer({
  children: [containerId1, containerId2],
  caption: 'Swipe!',
});
```

## getContainerStatus()

```typescript
const status = await client.publishing.getContainerStatus(containerId);
// status.status_code: 'IN_PROGRESS' | 'FINISHED' | 'ERROR'
```

## publish()

```typescript
const result = await client.publishing.publish(containerId);
// result.id = published media ID
```
