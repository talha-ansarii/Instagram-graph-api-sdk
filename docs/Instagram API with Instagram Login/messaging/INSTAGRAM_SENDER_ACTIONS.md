# Instagram Graph API - Sender Actions

## Overview
Sender actions allow you to control the conversational indicators displayed to the user. These are crucial for making your bot feel "alive" and responsive.

* **Typing Indicators:** Let the user know you are processing their request.
* **Read Receipts:** Let the user know their message was received.



---

## Available Actions

| Action | Description |
| :--- | :--- |
| `typing_on` | Displays the "..." bubble in the chat. Use this when your bot needs time to generate a response. |
| `typing_off` | Removes the "..." bubble. (Note: Typing indicators automatically turn off after a short period, but you can force it off). |
| `mark_seen` | Displays the "Seen" status (read receipt) on the user's last message. |

---

## Sending an Action
**Endpoint:** `POST /me/messages`

To send an action, you strictly send the `sender_action` parameter.

### Constraints
* **Exclusive Request:** You **cannot** send a message (text/media) and a sender action in the same request. They must be separate API calls.
* **Auth:** The recipient must be signed in for these indicators to appear.

### 1. Show Typing Indicator
```bash
curl -X POST "[https://graph.instagram.com/v24.0/me/messages?access_token=](https://graph.instagram.com/v24.0/me/messages?access_token=){access-token}" \
     -H "Content-Type: application/json" \
     -d '{
           "recipient":{
             "id":"{igsid}"
           },
           "sender_action":"typing_on"
         }'

```

### 2. Mark Message as Seen

```bash
curl -X POST "[https://graph.instagram.com/v24.0/me/messages?access_token=](https://graph.instagram.com/v24.0/me/messages?access_token=){access-token}" \
     -H "Content-Type: application/json" \
     -d '{
           "recipient":{
             "id":"{igsid}"
           },
           "sender_action":"mark_seen"
         }'

```

---

## Best Practices

1. **Immediate Feedback:** Send `mark_seen` immediately upon receiving a webhook to confirm receipt.
2. **Processing Time:** Send `typing_on` immediately *after* `mark_seen` if your bot needs more than 1 second to calculate a response (e.g., calling an LLM or database).
3. **Human Pace:** Do not leave `typing_on` active for an unnatural amount of time. If the process fails, send `typing_off` or an error message.


