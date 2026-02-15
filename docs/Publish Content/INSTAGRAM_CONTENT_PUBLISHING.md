# Content Publishing

This guide shows you how to publish single images, videos, reels (single media posts), or posts containing multiple images and videos (carousel posts) on Instagram professional accounts using the Instagram Platform.

On March 24, 2025, we introduced the new `alt_text` field for image posts on the `/<INSTAGRAM_PROFESSIONAL_ACCOUNT_ID>/media` endpoint. Reels and stories are not supported.

## Requirements

This guide assumes you have read the Instagram Platform Overview and implemented the needed components for using this API, such as a Meta login flow and a webhooks server to receive notifications.

### Media on a Public Server

We cURL media used in publishing attempts, so the media must be hosted on a publicly accessible server at the time of the attempt.

### Page Publishing Authorization (PPA)

An Instagram professional account connected to a Page that requires Page Publishing Authorization (PPA) cannot be published to until PPA has been completed.

It's possible that an app user may be able to perform Tasks on a Page that initially does not require PPA but later requires it. In this scenario, the app user would not be able to publish content to their Instagram professional account until completing PPA. 

> [!TIP]
> Since there's no way for you to determine if an app user's Page requires PPA, we recommend that you advise app users to preemptively complete PPA.

---

## Comparison of Login Flows

| Feature | Instagram API with Instagram Login | Instagram API with Facebook Login |
|---------|------------------------------------|-----------------------------------|
| **Access Levels** | Advanced Access / Standard Access | Advanced Access / Standard Access |
| **Access Tokens** | Instagram User access token | Facebook Page access token |
| **Host URL** | `graph.instagram.com` | `graph.facebook.com` / `rupload.facebook.com` |
| **Login Type** | Business Login for Instagram | Facebook Login for Business |
| **Permissions** | `instagram_business_basic`, `instagram_business_content_publish` | `instagram_basic`, `instagram_content_publish`, `pages_read_engagement` |

> [!NOTE]
> If the app user was granted a role on the Page connected to your app user's Instagram professional account via the Business Manager, your app will also need `ads_management` and `ads_read`.

---

## Endpoints

- `/<IG_ID>/media` — Create media container and upload the media.
- `upload_type=resumable` — Create a resumable upload session for large videos (FB Login for Business only).
- `/<IG_ID>/media_publish` — Publish uploaded media using their media containers.
- `/<IG_CONTAINER_ID>?fields=status_code` — Check media container publishing eligibility and status.
- `/<IG_ID>/content_publishing_limit` — Check app user's current publishing rate limit usage.
- `POST https://rupload.facebook.com/ig-api-upload/<IG_MEDIA_CONTAINER_ID>` — Upload the video to Meta servers.

---

## Limitations

- **Image Format**: JPEG is the only image format supported. Extended JPEG formats such as MPO and JPS are not supported.
- **Shopping Tags**: Not supported.
- **Branded Content**: Not supported.
- **Filters**: Not supported.

### Rate Limit

Instagram accounts are limited to **100 API-published posts** within a 24-hour moving period. Carousels count as a single post. This limit is enforced on the `POST /<IG_ID>/media_publish` endpoint.

> [!TIP]
> To check an Instagram professional account's current rate limit usage, query the `GET /<IG_ID>/content_publishing_limit` endpoint.

---

## Step 1: Create a Container

In order to publish a media object, it must have a container. Send a `POST` request to the `/<IG_ID>/media` endpoint.

### Parameters

- `access_token`: App user's access token.
- `image_url` or `video_url`: Path to the media (must be on a public server).
- `media_type`: Set to `VIDEO`, `REELS`, or `STORIES` for video containers.
- `is_carousel_item`: Set to `true` if part of a carousel.
- `upload_type`: Set to `resumable` for large video files.

### Sample Request

```bash
curl -X POST "https://<HOST_URL>/v24.0/<IG_ID>/media" \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer <ACCESS_TOKEN>" \
     -d '{
           "image_url":"https://www.example.com/images/bronz-fonz.jpg"
         }'
```

On success, your app receives a JSON response with the Instagram Container ID: `{"id": "<IG_CONTAINER_ID>"}`.

---

## Step 2: Create a Carousel Container (Optional)

To publish up to 10 images/videos in a single post:

- `media_type`: Set to `CAROUSEL`.
- `children`: Comma-separated list of up to 10 container IDs.

### Sample Request

```bash
curl -X POST "https://graph.instagram.com/v24.0/<IG_ID>/media" \
     -H "Content-Type: application/json" \
     -d '{  
           "caption":"Fruit candies",
           "media_type":"CAROUSEL",
           "children":"<IG_CONTAINER_ID_1>,<IG_CONTAINER_ID_2>"
         }'
```

---

## Step 3: Resumable Upload Session (Video Only)

For videos, upload the file to `rupload.facebook.com` using the container ID.

### Sample Request (Local File)

```bash
curl -X POST "https://rupload.facebook.com/ig-api-upload/v24.0/<IG_MEDIA_CONTAINER_ID>" \
     -H "Authorization: OAuth <ACCESS_TOKEN>" \
     -H "offset: 0" \
     -H "file_size: Your_file_size_in_bytes" \
     --data-binary "@my_video_file.mp4"
```

---

## Step 4: Publish the Container

Send a `POST` request to the `/<IG_ID>/media_publish` endpoint.

```bash
curl -X POST "https://<HOST_URL>/v24.0/<IG_ID>/media_publish" \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer <ACCESS_TOKEN>" \
     -d '{
           "creation_id":"<IG_CONTAINER_ID>" 
         }'
```

On success, you receive the Instagram Media ID: `{"id": "<IG_MEDIA_ID>"}`.

---

## Specific Media Types

### Reels

To publish a reel, use `media_type=REELS`. Note that querying a reel's `media_type` after publishing will return `VIDEO`; use `media_product_type` instead to identify it as a reel.

#### Trial Reels

Reels shared only to non-followers. Use `trial_params` with a `graduation_strategy` (`MANUAL` or `SS_PERFORMANCE`).

### Stories

To publish a story, use `media_type=STORIES`. Like reels, use `media_product_type` to verify the published type.

---

## Troubleshooting

If publishing fails, query the container status: `GET /<IG_CONTAINER_ID>?fields=status_code`.

| Status Code | Description |
|-------------|-------------|
| `EXPIRED` | Container not published within 24 hours. |
| `ERROR` | Publishing process failed. |
| `FINISHED` | Ready to be published. |
| `IN_PROGRESS` | Processing. |
| `PUBLISHED` | Successfully published. |
