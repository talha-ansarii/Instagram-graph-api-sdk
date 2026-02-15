[**Instagram Graph API SDK v1.0.0**](../README.md)

***

[Instagram Graph API SDK](../README.md) / MessagingApi

# Class: MessagingApi

Defined in: src/api/messaging.ts:25

Messaging API class for Instagram messaging operations

## Constructors

### Constructor

> **new MessagingApi**(`http`, `userId`): `MessagingApi`

Defined in: src/api/messaging.ts:29

#### Parameters

##### http

[`HttpClient`](HttpClient.md)

##### userId

`string`

#### Returns

`MessagingApi`

## Methods

### sendText()

> **sendText**(`recipientId`, `text`, `options?`): `Promise`\<[`SendMessageResponse`](../interfaces/SendMessageResponse.md)\>

Defined in: src/api/messaging.ts:40

Send a text message

#### Parameters

##### recipientId

`string`

Instagram-scoped user ID (IGSID)

##### text

`string`

Message text

##### options?

[`SendTextOptions`](../interfaces/SendTextOptions.md)

Optional settings (humanAgent for 7-day window)

#### Returns

`Promise`\<[`SendMessageResponse`](../interfaces/SendMessageResponse.md)\>

***

### sendMedia()

> **sendMedia**(`recipientId`, `options`): `Promise`\<[`SendMessageResponse`](../interfaces/SendMessageResponse.md)\>

Defined in: src/api/messaging.ts:66

Send a media message (image, video, audio)

#### Parameters

##### recipientId

`string`

Instagram-scoped user ID

##### options

[`SendMediaOptions`](../interfaces/SendMediaOptions.md)

Media type and URL

#### Returns

`Promise`\<[`SendMessageResponse`](../interfaces/SendMessageResponse.md)\>

***

### sendLikeHeart()

> **sendLikeHeart**(`recipientId`): `Promise`\<[`SendMessageResponse`](../interfaces/SendMessageResponse.md)\>

Defined in: src/api/messaging.ts:88

Send a sticker (like_heart)

#### Parameters

##### recipientId

`string`

Instagram-scoped user ID

#### Returns

`Promise`\<[`SendMessageResponse`](../interfaces/SendMessageResponse.md)\>

***

### sendGenericTemplate()

> **sendGenericTemplate**(`recipientId`, `options`): `Promise`\<[`SendMessageResponse`](../interfaces/SendMessageResponse.md)\>

Defined in: src/api/messaging.ts:107

Send a generic template

#### Parameters

##### recipientId

`string`

Instagram-scoped user ID

##### options

[`GenericTemplateOptions`](../interfaces/GenericTemplateOptions.md)

Template elements

#### Returns

`Promise`\<[`SendMessageResponse`](../interfaces/SendMessageResponse.md)\>

***

### sendButtonTemplate()

> **sendButtonTemplate**(`recipientId`, `options`): `Promise`\<[`SendMessageResponse`](../interfaces/SendMessageResponse.md)\>

Defined in: src/api/messaging.ts:133

Send a button template

#### Parameters

##### recipientId

`string`

Instagram-scoped user ID

##### options

[`ButtonTemplateOptions`](../interfaces/ButtonTemplateOptions.md)

Text and buttons

#### Returns

`Promise`\<[`SendMessageResponse`](../interfaces/SendMessageResponse.md)\>

***

### sendQuickReplies()

> **sendQuickReplies**(`recipientId`, `options`): `Promise`\<[`SendMessageResponse`](../interfaces/SendMessageResponse.md)\>

Defined in: src/api/messaging.ts:160

Send quick replies

#### Parameters

##### recipientId

`string`

Instagram-scoped user ID

##### options

[`QuickRepliesOptions`](../interfaces/QuickRepliesOptions.md)

Text and quick reply options

#### Returns

`Promise`\<[`SendMessageResponse`](../interfaces/SendMessageResponse.md)\>

***

### sendPrivateReply()

> **sendPrivateReply**(`commentId`, `message`): `Promise`\<[`SendMessageResponse`](../interfaces/SendMessageResponse.md)\>

Defined in: src/api/messaging.ts:181

Send a private reply to a comment

#### Parameters

##### commentId

`string`

Comment ID to reply to

##### message

`string`

Message text

#### Returns

`Promise`\<[`SendMessageResponse`](../interfaces/SendMessageResponse.md)\>

***

### sendMediaShare()

> **sendMediaShare**(`recipientId`, `mediaId`): `Promise`\<[`SendMessageResponse`](../interfaces/SendMessageResponse.md)\>

Defined in: src/api/messaging.ts:199

Share a published post via message

#### Parameters

##### recipientId

`string`

Instagram-scoped user ID

##### mediaId

`string`

Media ID of the post to share

#### Returns

`Promise`\<[`SendMessageResponse`](../interfaces/SendMessageResponse.md)\>

***

### reactToMessage()

> **reactToMessage**(`recipientId`, `messageId`, `reaction`): `Promise`\<[`SendMessageResponse`](../interfaces/SendMessageResponse.md)\>

Defined in: src/api/messaging.ts:223

React to a message

#### Parameters

##### recipientId

`string`

Instagram-scoped user ID

##### messageId

`string`

Message ID to react to

##### reaction

[`ReactionType`](../type-aliases/ReactionType.md)

Reaction type

#### Returns

`Promise`\<[`SendMessageResponse`](../interfaces/SendMessageResponse.md)\>

***

### unreactToMessage()

> **unreactToMessage**(`recipientId`, `messageId`): `Promise`\<[`SendMessageResponse`](../interfaces/SendMessageResponse.md)\>

Defined in: src/api/messaging.ts:246

Remove reaction from a message

#### Parameters

##### recipientId

`string`

Instagram-scoped user ID

##### messageId

`string`

Message ID to unreact from

#### Returns

`Promise`\<[`SendMessageResponse`](../interfaces/SendMessageResponse.md)\>

***

### sendTypingIndicator()

> **sendTypingIndicator**(`recipientId`, `typing`): `Promise`\<[`SendMessageResponse`](../interfaces/SendMessageResponse.md)\>

Defined in: src/api/messaging.ts:267

Send typing indicator

#### Parameters

##### recipientId

`string`

Instagram-scoped user ID

##### typing

`boolean` = `true`

Whether to show typing (true) or stop (false)

#### Returns

`Promise`\<[`SendMessageResponse`](../interfaces/SendMessageResponse.md)\>
