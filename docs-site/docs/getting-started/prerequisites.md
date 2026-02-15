---
sidebar_position: 1
---

# Prerequisites

Before using the Instagram Graph API SDK, you need to set up a few things.

## Requirements

### 1. Instagram Professional Account

You need an **Instagram Business or Creator account** (not a personal account).

**To convert your account:**
1. Open Instagram → Settings → Account
2. Tap "Switch to Professional Account"
3. Choose **Business** or **Creator**
4. Complete the setup

:::info
The API does not work with personal Instagram accounts. You must have a Professional account.
:::

### 2. Meta Developer Account

1. Go to [Meta for Developers](https://developers.facebook.com/)
2. Click **Log In** (use your Facebook account)
3. Accept the Developer Agreement

### 3. Meta App

You'll create this in the next step. The app provides your:
- **App ID** - Used for OAuth
- **App Secret** - Used for token exchange

## Access Levels

| Level | For | Requirements |
|-------|-----|--------------|
| **Standard Access** | Your own accounts | None |
| **Advanced Access** | External users | App Review + Business Verification |

:::tip
Start with Standard Access for development. You only need Advanced Access when serving other users' accounts.
:::

## API Capabilities

With Instagram Business Login, you can:

| Feature | Supported |
|---------|-----------|
| Read Profile | ✅ Yes |
| Publish Content | ✅ Yes |
| Manage Comments | ✅ Yes |
| Direct Messages | ✅ Yes |
| Insights | ✅ Yes |
| Hashtag Search | ❌ Requires Facebook Login |
| Product Tagging | ❌ Requires Facebook Login |

## Next Step

Ready? Let's [create your Meta App →](/getting-started/app-setup)
