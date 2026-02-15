# User Media

Represents a collection of IG Media objects on an IG User. This endpoint is central to the [Content Publishing](../../Publish%20Content/INSTAGRAM_CONTENT_PUBLISHING.md) flow.

---

## Recent Updates

- **July 9, 2025**: Added support for `user_tags` (with x/y coordinates) for image and video stories.
- **March 24, 2025**: Introduced `alt_text` field for image posts (not supported for Reels/Stories).

---

## Operations

### Creating Media Containers
`POST /<IG_USER_ID>/media`

Used to create containers for Images, Carousels, Stories, or Reels. 

#### General Limitations
- **Expiration**: Containers expire after **24 hours**.
- **Rate Limit**: Maximum **400 containers** per rolling 24-hour period.
- **Authorization**: Requires Page Publishing Authorization (PPA) and 2FA where applicable.
- **Character Set**: Strongly recommend **US ASCII characters** for URLs.

---

## Format Specifications

### Images (Posts & Stories)
- **Format**: JPEG
- **Size**: 8 MB max
- **Aspect Ratio**: 4:5 to 1.91:1 (Posts), Recommended 9:16 (Stories)
- **Color Space**: sRGB

### Reels & Video Stories
- **Container**: MOV or MP4 (no edit lists, `moov` atom at front)
- **Video Codec**: HEVC or H264 (progressive, closed GOP, 4:2:0)
- **Audio Codec**: AAC (48khz max, 1-2 channels)
- **Bitrate**: VBR 25Mbps max (Video), 128kbps (Audio)
- **Duration**: 
    - Reels: 3s – 15 mins
    - Stories: 3s – 60s
- **Size**: 300 MB max (Reels), 100 MB max (Stories)

---

## Request Syntax

### 1. Image Containers
```bash
POST /<IG_USER_ID>/media
  ?image_url=<URL>
  &caption=<CAPTION>
  &alt_text=<ALT_TEXT>
  &user_tags=[{username:'name',x:0.5,y:0.8}]
  &product_tags=[{product_id:'id',x:0.5,y:0.8}]
```

### 2. Reel Containers
```bash
POST /<IG_USER_ID>/media
  ?media_type=REELS
  &video_url=<URL>
  &caption=<CAPTION>
  &share_to_feed=true
  &collaborators=['user1','user2']
  &cover_url=<COVER_URL>
```

### 3. Carousel Containers
Create individual item containers first (setting `is_carousel_item=true`), then create the parent:
```bash
POST /<IG_USER_ID>/media
  ?media_type=CAROUSEL
  &children=[<CONTAINER_ID_1>, <CONTAINER_ID_2>]
  &caption=<CAPTION>
```

---

## Resumable Uploads

For larger video files, use the resumable protocol:

1. **Initialize Session**: `POST /<ID>/media?upload_type=resumable&media_type=<TYPE>`.
2. **Upload Binary**:
```bash
curl -X POST "https://rupload.facebook.com/ig-api-upload/v24.0/<CONTAINER_ID>" \
     -H "Authorization: OAuth <TOKEN>" \
     -H "offset: 0" \
     -H "file_size: <BYTES>" \
     --data-binary "@<FILE_PATH>"
```

---

## Reading Media
`GET /<IG_USER_ID>/media`

Get a collection of all IG Media on an IG User.

#### Limitations
- **Count**: Returns a maximum of **10k** most recent media objects.
- **Stories**: Does **not** include Story media. Use the `/stories` endpoint instead.

#### Time-based Pagination
Supports `since` and `until` query parameters for filtering by creation date.

---

## Requirements

- **Permissions**: `instagram_basic`, `instagram_content_publish`, `pages_read_engagement`.
- **Commerce**: `catalog_management`, `instagram_shopping_tag_products` (for product tagging).
- **Page Tasks**: App user needs `MANAGE` or `CREATE_CONTENT` tasks on the linked Page.

---

## Sample Response (Creation)
```json
{
  "id": "17889455560051444"
}
```

---

## Operations Not Supported
- **Updating**: This operation is not supported.
- **Deleting**: This operation is not supported.
