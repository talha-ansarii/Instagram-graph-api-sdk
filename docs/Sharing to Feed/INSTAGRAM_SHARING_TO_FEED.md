# Sharing to Feed

With Sharing to Feed, you can allow your app's Users to share your content to their Instagram Feed.

## Overview

By using Android Implicit Intents and iOS Universal Links or Document Interaction, your app can pass photos and videos to the Instagram app. The Instagram app will receive this content and load it in the feed composer so the User can publish it to their Instagram Feed.

---

## Shareable Content

You can pass the following content to the Instagram app:

| Content | File Types | Description |
|---------|------------|-------------|
| **Image Asset** | JPEG, GIF, or PNG | Standard image files. |
| **Video Asset** | MKV, MP4 | Min duration: 3s; Max duration: 10m; Min dimensions: 640x640 pixels. |

---

## Android Developers

Android implementations use implicit intents with the `EXTRA_STREAM` extra to prompt the User to select the Instagram app.

### Sharing Flow

1. **Instantiate** an implicit intent with the content.
2. **Start an activity** and check that it can resolve the implicit intent.
3. **Resolve** the activity.

### Example: Image/Video Share Intent

```java
// For Image: String type = "image/*";
// For Video: String type = "video/*";

private void createInstagramIntent(String type, String mediaPath) {
    // Create the new Intent using the 'Send' action
    Intent share = new Intent(Intent.ACTION_SEND);

    // Set the MIME type
    share.setType(type);

    // Create the URI from the media
    File media = new File(mediaPath);
    Uri uri = Uri.fromFile(media);

    // Add the URI to the Intent
    share.putExtra(Intent.EXTRA_STREAM, uri);

    // Broadcast the Intent
    startActivity(Intent.createChooser(share, "Share to"));
}
```

---

## iOS Developers

iOS implementations can use **Universal Links** to launch the Instagram app and pass content, or **Document Interaction** for specific photo-sharing flows.

### Universal Links

| Universal Link | Action |
|----------------|--------|
| `https://www.instagram.com` | Launch the Instagram app. |
| `https://www.instagram.com/create/story` | Launch camera view or photo library. |
| `https://www.instagram.com/p/{media_id}` | Load a specific post by ID. |
| `https://www.instagram.com/{username}` | Load a specific user profile. |
| `https://www.instagram.com/explore/locations/{location_id}` | Load a specific location feed. |
| `https://www.instagram.com/explore/tags/{tag_name}` | Load a specific hashtag page. |

#### Sample Objective-C Code

```objectivec
NSURL *instagramURL = [NSURL URLWithString:@"https://www.instagram.com/create/story"];
if ([[UIApplication sharedApplication] canOpenURL:instagramURL]) {
    [[UIApplication sharedApplication] openURL:instagramURL];
}
```

### Document Interaction

If your application creates photos, you can use the Document Interaction API to open them in Instagram's sharing flow.

- **File Requirement**: Save as PNG or JPEG (preferred) with extension `.ig`.
- **UTI**: `com.instagram.photo` (conforms to `public/jpeg` and `public/png`).
- **Exclusive Sharing**: Use extension `.igo` (type `com.instagram.exclusivegram`) to show only Instagram in the application list.

> [!TIP]
> Instagram prefers a **640px by 640px square JPEG**. Larger images will be resized dynamically. When triggered, Instagram immediately presents the filter screen.
