# Error Codes

This document describes the error messages that can be returned by the Instagram API.

## Sample Error Response

The following response shows an example of error code `36000` and subcode `2207004`.

```json
{
  "error": {
      "message": "The image size is too large.",
      "type": "OAuthException",
      "code": 36000,
      "error_subcode": 2207004,
      "is_transient": false,
      "error_user_title": "Image size too large",
      "error_user_msg": "The image is too large to download. It should be less than 8 MiB.",
      "fbtrace_id": "A6LJylpZRKw2xKLFsAP-cJh"
   }
 }
```

---

## Error Codes Defined

| HTTP | Code | Subcode | User Message | Recommended Solution |
|------|------|---------|--------------|----------------------|
| 400 | -2 | 2207003 | It takes too long to download the media. | A timeout occurred while downloading. Try again. |
| 400 | -2 | 2207020 | The media you are trying to access has expired. | Generate a new container ID and try again. |
| 400 | -1 | 2207001 | Instagram server error. | Internal server error. Try again. |
| 400 | -1 | 2207032 | Create media fail. | Failed to create a media container. Try again. |
| 400 | -1 | 2207053 | Unknown upload error. | Unknown error during upload (videos). Generate a new container. |
| 400 | 1 | 2207057 | Thumbnail offset out of bounds. | Offset must be >=0 and < video duration. |
| 400 | 4 | 2207051 | Activity restricted (Spam). | Action suspected to be spam. Review and try again. |
| 400 | 9 | 2207042 | Maximum number of posts reached. | Daily publishing limit reached. Try again tomorrow. |
| 400 | 24 | 2207006 | Media cannot be found. | Permission error or expired token. Generate a new container. |
| 400 | 24 | 2207008 | Media builder expired. | Temporary error. Retry in 30s–2m or generate new container. |
| 400 | 25 | 2207050 | Instagram account is restricted. | Account is inactive/checkpointed. User must sign in to IG app. |
| 400 | 100 | 2207023 | Unknown media type. | The media type entered is not expected. |
| 400 | 100 | 2207028 | Carousel requires 2-10 items. | Use between 2 and 10 photos/videos. |
| 400 | 100 | 2207035 | Video product tags cannot have positions. | Disallow X/Y coordinates for video product tags. |
| 400 | 100 | 2207036 | Image product tags require positions. | Product tags on images must include X/Y coordinates. |
| 400 | 100 | 2207037 | Couldn't add all product tags. | Check product IDs, existence, or permissions. |
| 400 | 100 | 2207040 | Too many tags. | Max 20 @ tags target per media exceeded. |
| 400 | 352 | 2207026 | Video format not supported. | Use MOV or MP4 (MPEG-4 Part 14). |
| 400 | 9004 | 2207052 | Media could not be fetched from URI. | Ensure high URI validity and public availability. |
| 400 | 9007 | 2207027 | Media is not ready for publishing. | Check container status. Publish when status is `FINISHED`. |
| 400 | 36000 | 2207004 | Image size too large. | File must be less than 8 MiB. |
| 400 | 36001 | 2207005 | Image format not supported. | Check supported formats (JPG/PNG). |
| 400 | 36003 | 2207009 | Invalid aspect ratio. | Aspect ratio must be within 4:5 to 1.91:1 range. |
| 400 | 36004 | 2207010 | Caption too long. | Max 2,200 chars, 30 hashtags, and 20 @ tags. |
