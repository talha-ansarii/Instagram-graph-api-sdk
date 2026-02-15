[**Instagram Graph API SDK v1.0.0**](../README.md)

***

[Instagram Graph API SDK](../README.md) / SendMessageRequest

# Interface: SendMessageRequest

Defined in: src/types/messaging.ts:96

Send message request

## Properties

### recipient

> **recipient**: [`MessageRecipient`](MessageRecipient.md)

Defined in: src/types/messaging.ts:97

***

### message?

> `optional` **message**: [`MessageContent`](MessageContent.md)

Defined in: src/types/messaging.ts:98

***

### sender\_action?

> `optional` **sender\_action**: `"react"` \| `"unreact"` \| `"typing_on"` \| `"typing_off"` \| `"mark_seen"`

Defined in: src/types/messaging.ts:100

Sender action (react, unreact)

***

### payload?

> `optional` **payload**: `object`

Defined in: src/types/messaging.ts:102

Payload for reactions

#### message\_id

> **message\_id**: `string`

#### reaction?

> `optional` **reaction**: `"love"` \| `"like"` \| `"laugh"` \| `"wow"` \| `"sad"` \| `"angry"`

***

### messaging\_type?

> `optional` **messaging\_type**: `"RESPONSE"` \| `"UPDATE"` \| `"MESSAGE_TAG"`

Defined in: src/types/messaging.ts:107

Messaging type

***

### tag?

> `optional` **tag**: `"HUMAN_AGENT"`

Defined in: src/types/messaging.ts:109

Message tag for outside 24hr window
