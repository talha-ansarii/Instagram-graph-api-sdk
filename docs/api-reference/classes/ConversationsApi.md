[**Instagram Graph API SDK v1.0.0**](../README.md)

***

[Instagram Graph API SDK](../README.md) / ConversationsApi

# Class: ConversationsApi

Defined in: src/api/conversations.ts:19

Conversations API class for Instagram conversation operations

## Constructors

### Constructor

> **new ConversationsApi**(`http`, `userId`): `ConversationsApi`

Defined in: src/api/conversations.ts:23

#### Parameters

##### http

[`HttpClient`](HttpClient.md)

##### userId

`string`

#### Returns

`ConversationsApi`

## Methods

### list()

> **list**(`options?`): `Promise`\<[`PaginatedResponse`](../interfaces/PaginatedResponse.md)\<[`Conversation`](../interfaces/Conversation.md)\>\>

Defined in: src/api/conversations.ts:32

Get list of conversations

#### Parameters

##### options?

[`GetConversationsOptions`](../interfaces/GetConversationsOptions.md)

Pagination and filter options

#### Returns

`Promise`\<[`PaginatedResponse`](../interfaces/PaginatedResponse.md)\<[`Conversation`](../interfaces/Conversation.md)\>\>

***

### findByUser()

> **findByUser**(`igsid`): `Promise`\<[`PaginatedResponse`](../interfaces/PaginatedResponse.md)\<[`Conversation`](../interfaces/Conversation.md)\>\>

Defined in: src/api/conversations.ts:49

Find conversation with a specific user

#### Parameters

##### igsid

`string`

Instagram-scoped user ID

#### Returns

`Promise`\<[`PaginatedResponse`](../interfaces/PaginatedResponse.md)\<[`Conversation`](../interfaces/Conversation.md)\>\>

***

### getMessages()

> **getMessages**(`conversationId`, `fields`): `Promise`\<\{ `messages`: [`PaginatedResponse`](../interfaces/PaginatedResponse.md)\<[`ConversationMessage`](../interfaces/ConversationMessage.md)\>; \}\>

Defined in: src/api/conversations.ts:65

Get messages in a conversation

#### Parameters

##### conversationId

`string`

Conversation ID

##### fields

`string` = `'messages{id,created_time,from,to,message}'`

Fields to retrieve (default: from,to)

#### Returns

`Promise`\<\{ `messages`: [`PaginatedResponse`](../interfaces/PaginatedResponse.md)\<[`ConversationMessage`](../interfaces/ConversationMessage.md)\>; \}\>

***

### getMessage()

> **getMessage**(`messageId`, `fields`): `Promise`\<[`ConversationMessage`](../interfaces/ConversationMessage.md)\>

Defined in: src/api/conversations.ts:80

Get a specific message

#### Parameters

##### messageId

`string`

Message ID

##### fields

`string` = `'id,created_time,from,to,message'`

Fields to retrieve

#### Returns

`Promise`\<[`ConversationMessage`](../interfaces/ConversationMessage.md)\>
