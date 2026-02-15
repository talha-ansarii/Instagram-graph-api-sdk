---
slug: /
sidebar_position: 1
---

# Instagram Graph API SDK

A **type-safe TypeScript SDK** for the Instagram Graph API with full Instagram Business Login support.

## What is Instagram Graph API?

The Instagram Graph API is a collection of APIs from Meta that allows applications to access data for **Instagram Professional accounts** (Business and Creator accounts). With this API, you can:

- 📷 **Publish Content** - Post images, videos, reels, and carousels
- 💬 **Manage Messages** - Read and respond to direct messages
- 💭 **Moderate Comments** - Reply to, hide, or delete comments
- 📊 **Access Insights** - Get analytics and engagement metrics
- 🔍 **Search Hashtags** - Discover content and trends

## Why Use This SDK?

| Feature | Benefit |
|---------|---------|
| **Type-Safe** | Full TypeScript support with autocomplete |
| **OAuth Built-in** | Easy token exchange and refresh |
| **Modular API** | Organized by feature (media, messaging, etc.) |
| **Error Handling** | Clear, typed error responses |
| **Well Documented** | Comprehensive guides and examples |

## Quick Example

```typescript
import { InstagramClient, InstagramOAuth } from 'instagram-graph-api-sdk';

// Get user profile
const client = new InstagramClient({ accessToken: 'your-token' });
const profile = await client.users.getProfile();
console.log(`Hello, @${profile.username}!`);

// Publish an image
await client.publishing.createAndPublish({
  imageUrl: 'https://example.com/photo.jpg',
  caption: 'Posted via API! 📸',
});
```

## Next Steps

<div className="row">
  <div className="col col--6">
    <div className="card margin-bottom--md">
      <div className="card__header">
        <h3>🚀 Getting Started</h3>
      </div>
      <div className="card__body">
        <p>Create your Meta App and get your credentials.</p>
      </div>
      <div className="card__footer">
        <a className="button button--primary button--block" href="/getting-started/prerequisites">Start Here →</a>
      </div>
    </div>
  </div>
  <div className="col col--6">
    <div className="card margin-bottom--md">
      <div className="card__header">
        <h3>📚 API Reference</h3>
      </div>
      <div className="card__body">
        <p>Explore all available methods and types.</p>
      </div>
      <div className="card__footer">
        <a className="button button--secondary button--block" href="/api-reference">Browse API →</a>
      </div>
    </div>
  </div>
</div>
