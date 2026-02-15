# Sharing to Stories

You can integrate sharing into your Android and iOS apps so that users can share your content as an Instagram story.

> [!IMPORTANT]
> **Facebook App ID Required**: Beginning in January 2023, you must provide a Facebook App ID to share content to Instagram Stories. Without it, users will see an error: *"The app you shared from doesn't currently support sharing to Stories"*.

## Overview

By using Android Implicit Intents and iOS Custom URL Schemes, your app can send photos, videos, and stickers to the Instagram app. The story composer is comprised of a **background layer** and a **sticker layer**.

- **Background Layer**: Fills the screen (photo, video, solid color, or gradient).
- **Sticker Layer**: Overlays the background (customizable image).

---

## Data Specifications

| Content | Type | Description |
|---------|------|-------------|
| **Facebook App ID** | String | Your Facebook App ID. |
| **Background Asset** | Uri / NSData | JPG/PNG or Video (H.264, H.265). Min: 720x1280. Max video: 20s, 1080p. |
| **Sticker Asset** | Uri / NSData | JPG/PNG. Recommended: 640x480. |
| **Colors** | Hex String | Top and bottom color values for gradients or solid backgrounds. |

---

## Android Developers

Android implementations use implicit intents (`com.instagram.share.ADD_TO_STORY`) to launch Instagram.

### Sharing a Background Asset

```java
Intent intent = new Intent("com.instagram.share.ADD_TO_STORY");

String sourceApplication = "1234567"; // Your FB App ID
intent.putExtra("source_application", sourceApplication);

Uri backgroundAssetUri = Uri.parse("content://..."); 
intent.setDataAndType(backgroundAssetUri, MEDIA_TYPE_JPEG);
intent.setFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);

if (activity.getPackageManager().resolveActivity(intent, 0) != null) {
  activity.startActivityForResult(intent, 0);
}
```

### Sharing a Sticker with Background Colors

```java
Intent intent = new Intent("com.instagram.share.ADD_TO_STORY");
intent.putExtra("source_application", "1234567");

Uri stickerAssetUri = Uri.parse("content://...");
intent.setType(MEDIA_TYPE_JPEG);
intent.putExtra("interactive_asset_uri", stickerAssetUri);
intent.putExtra("top_background_color", "#33FF33");
intent.putExtra("bottom_background_color", "#FF00FF");

activity.grantUriPermission("com.instagram.android", stickerAssetUri, Intent.FLAG_GRANT_READ_URI_PERMISSION);

if (activity.getPackageManager().resolveActivity(intent, 0) != null) {
  activity.startActivityForResult(intent, 0);
}
```

---

## iOS Developers

iOS implementations use the custom URL scheme `instagram-stories://share`.

### Configuration

Add `instagram-stories` to the `LSApplicationQueriesSchemes` key in your app's `Info.plist`.

### Sharing a Background and Sticker Asset

```objectivec
- (void)backgroundImage:(NSData *)backgroundImage 
        stickerImage:(NSData *)stickerImage 
        appID:(NSString *)appID
{
  NSURL *urlScheme = [NSURL URLWithString:[NSString stringWithFormat:@"instagram-stories://share?source_application=%@", appID]];

  if ([[UIApplication sharedApplication] canOpenURL:urlScheme]) {
    // Attach the pasteboard items
    NSArray *pasteboardItems = @[@{
      @"com.instagram.sharedSticker.backgroundImage" : backgroundImage,
      @"com.instagram.sharedSticker.stickerImage" : stickerImage
    }];

    NSDictionary *pasteboardOptions = @{UIPasteboardOptionExpirationDate : [[NSDate date] dateByAddingTimeInterval:60 * 5]};

    [[UIPasteboard generalPasteboard] setItems:pasteboardItems options:pasteboardOptions];
    [[UIApplication sharedApplication] openURL:urlScheme options:@{} completionHandler:nil];
  }
}
```

---

## Sharing to Facebook Stories

To allow users to share content to Facebook Stories, refer to the [Facebook Sharing to Stories documentation](https://developers.facebook.com/docs/sharing/sharing-to-stories).
