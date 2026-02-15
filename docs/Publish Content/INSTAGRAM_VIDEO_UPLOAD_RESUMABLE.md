# Upload Video to Meta Servers

This guide shows you how to upload large video files, from local and publicly hosted content, to be published on Instagram. This is available only for apps that have implemented Facebook Login for Business.

The API allows you to resume a local file upload operation after a network interruption or other transmission failure, saving time and bandwidth in the event of network failures.

## Host URLs

| Host | Description |
|------|-------------|
| `graph.facebook.com` | Create video media containers and publish and manage uploaded media |
| `rupload.facebook.com` | Upload the video to Meta servers |

## Endpoints

- `POST https://graph.facebook.com/<IG_USER_ID>/media?upload_type=resumable` — Initialize the upload and create a media container.
- `POST https://rupload.facebook.com/ig-api-upload/<IG_MEDIA_CONTAINER_ID>` — Upload the video to Meta servers.
- `POST https://graph.facebook.com/<IG_USER_ID>/media_publish?creation_id=<IG_MEDIA_CONTAINER_ID>` — Publish the uploaded video.
- `GET /<IG_MEDIA_CONTAINER_ID>?fields=status_code` — Check publishing eligibility and status of the video.

> [!TIP]
> **URL Encoding Hint**: Some parameters are supported in list/dict format. For example: `user_tags=[{username:’ig_user_name’}]` is encoded to `user_tags=%5B%7Busername:ig_user_name%7D%5D`.

---

## Step 1: Create a Container

To create a resumable upload session for the video, send a `POST` request to the `/<IG_USER_ID>/media` endpoint on the `graph.facebook.com` host.

### Required Parameters

- `access_token`: Your app user's access token.
- `upload_type`: Set to `resumable`.
- `media_type`: Set to `REELS`, `STORIES`, or `VIDEO` (for videos used in carousels).
- `is_carousel_item`: Set to `true` (for videos used in carousels).

### Optional Parameters for Reels

- `audio_name`, `caption`, `collaborators`, `cover_url`, `location_id`, `thumb_offset`, `user_tags`.

### Sample Request

```bash
curl "https://graph.facebook.com/v24.0/<IG_USER_ID>/media" \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer <USER_ACCESS_TOKEN>" \
     -d '{  
            "media_type": "REELS",
            "upload_type": "resumable"
        }'
```

On success, your app receives a JSON object with the ID and the Meta URI for the container.

```json
{
   "id": "<IG_MEDIA_CONTAINER_ID>",
   "uri": "https://rupload.facebook.com/ig-api-upload/v24.0/<IG_MEDIA_CONTAINER_ID>"
}
```

---

## Step 2: Upload the Video

Calls to upload videos for Reels use `rupload.facebook.com`. Supported sources include local files and public-facing URLs (CDNs).

### Sample Request: Upload a Local Video File

```bash
curl -X POST "https://rupload.facebook.com/ig-api-upload/v24.0/<IG_MEDIA_CONTAINER_ID>" \
     -H "Authorization: OAuth <ACCESS_TOKEN>" \
     -H "offset: 0" \
     -H "file_size: Your_file_size_in_bytes" \
     --data-binary "@my_video_file.mp4"
```

### Sample Request: Upload a Publicly Hosted Video

```bash
curl -X POST "https://rupload.facebook.com/ig-api-upload/v24.0/<IG_MEDIA_CONTAINER_ID>" \
     -H "Authorization: OAuth <ACCESS_TOKEN>" \
     -H "file_url: https://example_hosted_video.com"
```

### Sample Response

On success:
```json
{
  "success": true,
  "message": "Upload successful."
}
```

---

## Step 3: (Carousel Only) Create Carousel Containers

You can reuse Step 1 and 2 to create multiple `ig-container-ids` with `is_carousel_item=true`. Then create a Carousel Container:

```bash
curl -X POST "https://graph.facebook.com/v24.0/<IG_USER_ID>/media" \
    -d "media_type=CAROUSEL" \
    -d "caption={caption}" \
    -d "children=[<IG_MEDIA_CONTAINER_ID_1>,<IG_MEDIA_CONTAINER_ID_2>]" \
    -H "Authorization: OAuth <ACCESS_TOKEN>"
```

---

## Step 4: Publish the Media

For Reels and Video Stories, use the creation ID from Step 1. For carousels, use the ID from Step 3.

```bash
curl -X POST "https://graph.facebook.com/v24.0/<IG_USER_ID>/media_publish" \
    -d "creation_id=<IG_MEDIA_CONTAINER_ID>" \
    -H "Authorization: OAuth <ACCESS_TOKEN>"
```

---

## Step 5: Get Media Status

Query the status of the upload. The `video_status` field contains details about the local upload and processing status.

```bash
curl -X GET "https://graph.facebook.com/v24.0/<IG_MEDIA_CONTAINER_ID>?fields=id,status,status_code,video_status" \
    -H "Authorization: OAuth <ACCESS_TOKEN>"
```

### Sample Response: Success

```json
{
  "id": "<IG_MEDIA_CONTAINER_ID>",
  "status": "Published: Media has been successfully published.",
  "status_code": "PUBLISHED",
  "video_status": {
    "uploading_phase": { "status": "complete", "bytes_transferred": 37006904 },
    "processing_phase": { "status": "complete" }
  }
}
```

### Sample Response: Interrupted (Resume from Offset)

From here, you can resume your upload in Step 2 with `offset=50002`.

```json
{
  "id": "<IG_MEDIA_CONTAINER_ID>",
  "status_code": "IN_PROGRESS",
  "video_status": {
    "uploading_phase": { "status": "in_progress", "bytes_transferred": 50002 },
    "processing_phase": { "status": "not_started" }
  }
}
```
