# ig.me Links

`ig.me` is a shortened URL service operated by Meta that redirects users to a conversation in Instagram. You can use them on your website, email newsletters and more.

The format of the URL is `https://ig.me/<USERNAME>` where `<USERNAME>` is the Instagram handle of the Instagram professional account.

## Overview

When a person clicks an `ig.me` URL to start or continue a conversation with an Instagram professional account, the person is redirected to a new or existing thread, based on whether the person had previously messaged the Instagram professional account. A `messages` webhook event is triggered and your webhook server receives a notification. If you add the `referral` parameter to your URL, the `messaging_postback` webhook event is triggered and the value of the parameter is sent in the notification.

You can include the `referral` parameter in your `ig.me` link to:

- Track different links in different channels
- Tie an Instagram professional user to a session or account in an external app
- Direct the user to specific content or features available within an Instagram professional account

> [!TIP]
> To get the most out of your `ig.me` URLs, you should implement Icebreakers in your Instagram experience for new conversations and set each icebreaker to its own referral parameter.

## Additional Scenarios

Other common scenarios for using an `ig.me` link include the following:

- An `ig.me` link with a QR code on product packaging to allow people to reach out to you for support or get a coupon towards the next purchase.
- An `ig.me` link with a QR code on out of home advertising such as billboards, TV ads, physical stores, etc., to sign up for loyalty or membership accounts.
- An `ig.me` link on the Contact Us page on a website to allow people to contact you via messaging instead of relying on calling.
- Provide people an option to message you on Instagram by sending an `ig.me` link via SMS.

## Limitations

> [!CAUTION]
> `ig.me` links are currently not supported on Instagram Web.

---

## User Experience

When a person follows an `ig.me` link, the following content is automatically displayed.

### New Conversation

```
You opened this conversation from a link. <INSTAGRAM_PROFESSIONAL_ACCOUNT_USERNAME> will see that you used their link once you send a message.
```

### Existing Conversation

```
You opened this conversation from a link. <INSTAGRAM_PROFESSIONAL_ACCOUNT_USERNAME> can see that you used their link. If you wish to stop receiving messages from them, you can turn off messages.
```

---

## Referral Parameters

You can include the `ref` parameter in your `ig.me` link to:

- Track different links in different channels
- Tie an Instagram professional user to a session or account in an external app
- Direct the user to specific content or features available within an Instagram professional account

### URL Format

A referral parameter must be a string of up to 2,083 characters in length and only alphanumeric characters, and hyphens (`-`), underscores (`_`), or equal signs (`=`) are supported.

```
https://ig.me/<USERNAME>?ref=<REFERRAL_PARAMETER_CONTENT>
```

### Webhook Notifications

Your webhook server will either receive a `postback` or `message` object with a `referral` object. The `referral` object will include the following:

| Field | Description |
|-------|-------------|
| `ref` | The `<REFERRAL_PARAMETER_CONTENT>` content in the `ig.me` link |
| `source` | Set to `SHORTLINKS` |
| `type` | Set to `OPEN_THREAD` |

---

## Examples

When an `ig.me` link with a `ref` parameter opens the Instagram app, one of the possible use cases can be triggered.

### New Conversation with an Icebreaker

If you have configured Icebreakers for your Instagram Account and the user taps on an Icebreaker, your app receives a notification with a `postback` object with the following:

| Field | Description |
|-------|-------------|
| `mid` | The message ID |
| `title` | The icebreaker question or prompt the person selected |
| `payload` | The information you set to be included when a person selects that particular icebreaker option |
| `referral` | The referral object |

#### Sample Webhook Payload

```json
{
  "object": "instagram",
  "entry": [
    {
      "id": "<IG_ID>",
      "time": 1502905976963,
      "messaging": [
        {
          "sender": {
            "id": "<IGSID>"
          },
          "recipient": {
            "id": "<IG_ID>"
          },
          "timestamp": 1502905976377,
          "postback": {
            "mid": "<MESSAGE_ID>",
            "title": "<SELECTED_ICEBREAKER_OPTION>",
            "payload": "<ICEBREAKER_OPTION_SELECTED_INFORMATION>",
            "referral": {
              "ref": "<REFERRAL_PARAMETER_CONTENT>",
              "source": "SHORTLINKS",
              "type": "OPEN_THREAD"
            }
          }
        }
      ]
    }
  ]
}
```

### New Thread with a Message

If a person sends a message instead of selecting an icebreaker, your app receives a notification with a `message` object with the following:

| Field | Description |
|-------|-------------|
| `mid` | The message ID |
| `referral` | The referral object |

#### Sample Webhook Payload

```json
{
  "message": {
    "mid": "<MESSAGE_ID>",
    "referral": {
      "ref": "<REFERRAL_PARAMETER_CONTENT>",
      "source": "SHORTLINKS",
      "type": "OPEN_THREAD"
    }
  }
}
```

### Existing Conversation

If a conversation already exists between the person and the Instagram professional account, and the person clicks the `ig.me` link, the existing conversation is opened and your app receives a notification with only the `referral` object. Your app has 24 hours to send a reply.

> [!IMPORTANT]
> This action resets the 24-hour window for standard messaging, allowing the app to reply after getting the webhook event with the `ref` parameter.

The `messaging_referral` webhook event follows this format:

```json
{
  "referral": {
    "ref": "<REFERRAL_PARAMETER_CONTENT>",
    "source": "SHORTLINKS",
    "type": "OPEN_THREAD"
  }
}
```
