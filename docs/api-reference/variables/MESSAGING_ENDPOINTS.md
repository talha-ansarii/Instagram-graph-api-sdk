[**Instagram Graph API SDK v1.0.0**](../README.md)

***

[Instagram Graph API SDK](../README.md) / MESSAGING\_ENDPOINTS

# Variable: MESSAGING\_ENDPOINTS

> `const` **MESSAGING\_ENDPOINTS**: `object`

Defined in: src/endpoints.ts:104

Messaging Endpoints

## Type Declaration

### SEND()

> `readonly` **SEND**: (`userId`) => `string`

Send message: POST /{user-id}/messages

#### Parameters

##### userId

`string`

#### Returns

`string`

### CONVERSATIONS()

> `readonly` **CONVERSATIONS**: (`userId`) => `string`

Get conversations: GET /{user-id}/conversations

#### Parameters

##### userId

`string`

#### Returns

`string`

### CONVERSATION()

> `readonly` **CONVERSATION**: (`conversationId`) => `string`

Get conversation by ID: GET /{conversation-id}

#### Parameters

##### conversationId

`string`

#### Returns

`string`

### MESSAGE()

> `readonly` **MESSAGE**: (`messageId`) => `string`

Get message by ID: GET /{message-id}

#### Parameters

##### messageId

`string`

#### Returns

`string`
