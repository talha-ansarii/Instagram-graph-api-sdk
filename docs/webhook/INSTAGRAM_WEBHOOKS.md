# Instagram Graph API - Webhooks Setup

## Overview
Webhooks allow your app to receive real-time notifications for events happening on Instagram professional accounts. Instead of polling the API, Meta sends HTTPS requests to your server when events occur (e.g., new comments, messages, mentions).



## Prerequisites
* **HTTPS:** Your server must support HTTPS with a valid TLS/SSL certificate (Self-signed certificates are **not** supported).
* **App Status:** App must be **Live** to receive actual notifications (Development mode only works for testers).
* **Access Levels:** Advanced Access is required for specific fields like `comments` and `live_comments`.

---

## Step 1: Create an Endpoint
Your endpoint must handle two types of requests: **Verification** (GET) and **Event Notifications** (POST).

### 1. Verification Requests (GET)
When you configure Webhooks in the App Dashboard, Meta sends a `GET` request to verify your endpoint.

**Request Parameters:**
* `hub.mode`: Always set to `subscribe`.
* `hub.challenge`: An integer you must echo back.
* `hub.verify_token`: A string you define in the App Dashboard.

**Server Logic:**
1.  Verify `hub.verify_token` matches your secret token.
2.  Respond with the `hub.challenge` value (plain text).
3.  Return `200 OK`.

**Sample Request:**
```http
GET [https://your-domain.com/webhooks?hub.mode=subscribe&hub.challenge=1158201444&hub.verify_token=my_secret_token](https://your-domain.com/webhooks?hub.mode=subscribe&hub.challenge=1158201444&hub.verify_token=my_secret_token)

```

### 2. Event Notifications (POST)

When an event occurs, Meta sends a `POST` request with a JSON payload.

**Security Validation (Crucial):**

* **Header:** `X-Hub-Signature-256`
* **Format:** `sha256={signature}`
* **Logic:** You must calculate the SHA256 hash of the raw request body using your **App Secret** as the key. If it matches the header, the request is genuine.

**Sample Payload:**

```json
{
  "object": "user",
  "entry": [
    {
      "id": "10210299214172187",
      "time": 1520383571,
      "changes": [
        {
          "field": "photos",
          "value": {
             "verb": "update",
             "object_id": "10211885744794461"
          }
        }
      ]
    }
  ]
}

```

**Retry Policy:**
If your server does not return `200 OK`, Meta will retry immediately and then with decreasing frequency for **36 hours**.

---

## Step 2: Enable Subscriptions

After your endpoint is verified, you must explicitly tell Meta *which* fields you want to subscribe to for a specific user/page.

**Endpoint:** `POST /me/subscribed_apps`

**Parameters:**

* `access_token`: The Page or User Access Token.
* `subscribed_fields`: Comma-separated list of fields.

**Example (cURL):**

```bash
curl -i -X POST \
  "[https://graph.instagram.com/v24.0/](https://graph.instagram.com/v24.0/){account-id}/subscribed_apps?subscribed_fields=comments,messages&access_token={access-token}"

```

**Response:**

```json
{ "success": true }

```

---

## Available Webhook Fields

| Webhook Field | Required Permission (IG Login) | Required Permission (FB Login) |
| --- | --- | --- |
| **comments** | `instagram_business_manage_comments` | `instagram_manage_comments` |
| **live_comments** | `instagram_business_manage_comments` | `instagram_manage_comments` |
| **mentions** | (Included in `comments`) | `instagram_manage_comments` |
| **messages** | `instagram_business_manage_messages` | `instagram_manage_messages` |
| **message_reactions** | `instagram_business_manage_messages` | `instagram_manage_messages` |
| **story_insights** | N/A | `instagram_manage_insights` |
| **messaging_seen** | `instagram_business_manage_messages` | `instagram_manage_messages` |

*Note: `story_insights` only shows metrics for the first 24 hours.*

---

## mTLS (Mutual TLS) Security

For high security, you can verify that the connection is actually coming from Meta using mTLS.

**Certificate Chain:**

1. **Root:** DigiCert High Assurance EV Root CA
2. **Intermediate:** DigiCert SHA2 High Assurance Server CA
3. **Client Common Name (CN):** `client.webhooks.fbclientcerts.com`

**Nginx Configuration Example:**

```nginx
ssl_verify_client on;
ssl_client_certificate /etc/ssl/certs/DigiCert_High_Assurance_EV_Root_CA.pem;
ssl_verify_depth 3;

location /webhooks {
    if ($ssl_client_s_dn !~ "CN=client.webhooks.fbclientcerts.com") {
        return 403;
    }
    # Proxy pass to your app
}

```

---

## Testing

1. **Dashboard Test:** Use the "Test" button in the Webhooks product section of the App Dashboard to send sample payloads.
2. **Live Test:** Send a message or comment to the connected Instagram account.
3. **Verification:** Ensure your endpoint returns `200 OK` and logs the payload.

