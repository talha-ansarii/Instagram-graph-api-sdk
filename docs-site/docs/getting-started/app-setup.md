---
sidebar_position: 2
---

# App Setup

This guide walks you through creating and configuring a Meta App for Instagram API access.

## Step 1: Create a Meta App

1. Go to [Meta App Dashboard](https://developers.facebook.com/apps/)
2. Click **Create App**
3. Select **Other** for use case
4. Select **Business** app type
5. Enter your app name and contact email
6. Click **Create App**

## Step 2: Add Instagram Product

1. In your app dashboard, find **Add Products**
2. Look for **Instagram** and click **Set Up**
3. Select **API setup with Instagram Business Login**

:::warning Important
Choose "Instagram Business Login" NOT "Facebook Login for Instagram". They have different capabilities.
:::

## Step 3: Configure Business Login Settings

Navigate to **Instagram** → **API setup with Instagram Login** → **Business login settings**

### Add Redirect URI

Add your OAuth callback URL:

```
// Development
http://localhost:3000/api/instagram/callback

// Production
https://your-domain.com/api/instagram/callback
```

### Get Your Credentials

On the same page, copy:
- **Instagram App ID**
- **Instagram App Secret** (click "Show")

:::danger Keep Secret Safe
Never commit your App Secret to version control. Use environment variables.
:::

## Step 4: Add Test Users (Optional)

For testing before App Review:

1. Go to **App Roles** → **Roles**
2. Click **Add Instagram Testers**
3. Enter their Instagram username
4. They must accept the invitation in their Instagram app

## Step 5: Configure Permissions

Go to **Instagram** → **API setup with Instagram Login** → **Permissions**

Enable the scopes your app needs:

| Scope | For |
|-------|-----|
| `instagram_business_basic` | Read profile & media |
| `instagram_business_content_publish` | Post content |
| `instagram_business_manage_comments` | Moderate comments |
| `instagram_business_manage_messages` | Read/send DMs |

## Your App is Ready!

You now have:
- ✅ Meta App created
- ✅ Instagram product added
- ✅ Redirect URI configured
- ✅ App ID and Secret

Next: [Get your environment variables →](/getting-started/environment)
