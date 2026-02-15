---
sidebar_position: 2
---

# Publishing Content

Post images, videos, reels, and carousels to Instagram.

## Publishing Workflow

All publishing follows a two-step process:

1. **Create Container** - Upload media and get a container ID
2. **Publish** - Publish the container to your feed

```mermaid
graph LR
    A[Create Container] -->|Container ID| B[Check Status]
    B -->|Ready| C[Publish]
    C -->|Media ID| D[Live on Instagram!]
```

## Publish an Image

```typescript
// Step 1: Create container
const container = await client.publishing.createImageContainer({
  imageUrl: 'https://example.com/photo.jpg',
  caption: 'Amazing sunset! 🌅 #photography',
});

// Step 2: Publish
const result = await client.publishing.publish(container.id);
console.log('Published! Media ID:', result.id);
```

:::warning Image Requirements
- Format: JPEG or PNG
- Max file size: 8MB
- Aspect ratio: 4:5 to 1.91:1
- URL must be publicly accessible
:::

## Publish a Video/Reel

```typescript
// Step 1: Create container
const container = await client.publishing.createVideoContainer({
  videoUrl: 'https://example.com/video.mp4',
  caption: 'Check out this reel! 🎬',
  mediaType: 'REELS', // or 'VIDEO' for feed video
});

// Step 2: Wait for processing
let status = await client.publishing.getContainerStatus(container.id);
while (status.status_code === 'IN_PROGRESS') {
  await new Promise(r => setTimeout(r, 5000)); // Wait 5 seconds
  status = await client.publishing.getContainerStatus(container.id);
}

if (status.status_code === 'ERROR') {
  throw new Error(`Upload failed: ${status.status}`);
}

// Step 3: Publish
const result = await client.publishing.publish(container.id);
console.log('Published! Media ID:', result.id);
```

:::warning Video Requirements
- Format: MP4, MOV
- Max file size: 1GB for Reels
- Duration: 3-90 seconds for Reels
- Resolution: 1080x1920 recommended
:::

## Publish a Carousel

```typescript
// Step 1: Create item containers
const item1 = await client.publishing.createImageContainer({
  imageUrl: 'https://example.com/photo1.jpg',
  isCarouselItem: true,
});

const item2 = await client.publishing.createImageContainer({
  imageUrl: 'https://example.com/photo2.jpg',
  isCarouselItem: true,
});

// Step 2: Create carousel container
const carousel = await client.publishing.createCarouselContainer({
  children: [item1.id, item2.id],
  caption: 'Swipe for more! 👉',
});

// Step 3: Publish
const result = await client.publishing.publish(carousel.id);
```

## Add User Tags

```typescript
const container = await client.publishing.createImageContainer({
  imageUrl: 'https://example.com/photo.jpg',
  caption: 'Great times with friends!',
  userTags: [
    { username: 'friend1', x: 0.3, y: 0.5 },
    { username: 'friend2', x: 0.7, y: 0.5 },
  ],
});
```

## Add Location

```typescript
const container = await client.publishing.createImageContainer({
  imageUrl: 'https://example.com/photo.jpg',
  caption: 'Beautiful place!',
  locationId: '123456789', // Facebook Page ID for the location
});
```

## Error Handling

```typescript
try {
  const container = await client.publishing.createImageContainer({
    imageUrl: 'https://example.com/photo.jpg',
    caption: 'Test post',
  });
  await client.publishing.publish(container.id);
} catch (error) {
  if (isValidationError(error)) {
    console.error('Invalid media:', error.message);
  } else if (isRateLimitError(error)) {
    console.error('Publishing limit reached');
  }
}
```
