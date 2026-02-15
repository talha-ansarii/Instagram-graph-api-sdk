# Embed an Instagram Post (oEmbed)

You can query the Instagram oEmbed endpoint to get an Instagram post’s embed HTML and basic metadata in order to display the post in another website or app. This supports photo, video, Reel, and Feed posts.

> [!IMPORTANT]
> **OEmbed Update (April 2025)**: On April 8, 2025, Meta introduced **Meta oEmbed Read** to replace the existing feature. The legacy oEmbed Read feature will be deprecated on **November 3, 2025**.
> 
> The following fields are no longer returned and will be fully deprecated:
> - `author_name`, `author_url`
> - `thumbnail_height`, `thumbnail_url`, `thumbnail_width`

## Common Uses
- Embed a post in a blog or website.
- Render a post in a content management system (CMS).
- Render a post in a messaging app.

---

## Requirements

### Access Levels
- **Advanced Access** for the Meta oEmbed Read feature (Requires Meta App Review).

### Access Tokens
- **App Access Token**: If accessing from a backend server.
- **Client Access Token**: If accessing from a user agent (mobile device or web browser). *Note: Must be combined with your Meta App ID using a pipe symbol.*

### Base URL
All endpoints are accessed via `graph.facebook.com`.

### Endpoints
- `GET /instagram_oembed`

---

## Limitations

> [!CAUTION]
> - **Prohibited Use**: Metadata and content from the endpoint must ONLY be used for providing a front-end view. Manipulation, extraction, or persisting for analytics is strictly prohibited.
> - **Unsupported Content**: Posts on private, inactive, or age-restricted accounts; accounts with disabled embeds; Stories; Shadow DOM.

### Rate Limits
- **App Tokens**: Up to 5 million requests per 24 hours.
- **Client Tokens**: Significantly lower; limits change based on app activity.

---

## Programmatic Embed HTML

To get an Instagram post's embed HTML, send a `GET` request:

```bash
GET /instagram_oembed?url=<URL_OF_THE_POST>&access_token=<ACCESS_TOKEN>
```

### Sample Requests

```bash
# Using access token in query string
curl -X GET \
  "https://graph.facebook.com/v24.0/instagram_oembed?url=https://www.instagram.com/p/fA9uwTtkSN/&access_token=YOUR_TOKEN"

# Using Authorization header
curl -i -X GET \
     -H "Authorization: Bearer YOUR_TOKEN" \
     "https://graph.facebook.com/v24.0/instagram_oembed?url=https%3A%2F%2Fwww.instagram.com%2Fp%2FfA9uwTtkSN"
```

### Sample Response

```json
{
  "version": "1.0",
  "provider_name": "Instagram",
  "provider_url": "https://www.instagram.com/",
  "type": "rich",
  "width": 658,
  "html": "<blockquote class=\"instagram-media\" data-instgrm-ca..."
}
```

---

## Advanced Features

### Embed JS
The HTML contains a reference to the Instagram `embed.js` library. 
- Use `omitscript=true` to load the library separately.
- Call `instgrm.Embeds.process()` to manually initialize the HTML after loading.

### Post Size
Posts are responsive by default. Use the `maxwidth` parameter to set a maximum width.

### Thumbnails
If you cannot render the full HTML, you can render a thumbnail instead. 

> [!WARNING]
> If you render only the thumbnail, you **must** provide clear attribution next to the image, including the original author, Instagram, and a link to the original post.

```bash
GET /instagram_oembed?url=<URL>&maxwidth=320&fields=thumbnail_url,provider_name,provider_url&access_token=<TOKEN>
```

---

## App Review Submission

When submitting for review, provide a URL where Meta can test the oEmbed implementation. Use the endpoint to get the HTML for any public post on the official Facebook or Instagram Page, embed it on your test page, and provide that URL in the review form.
