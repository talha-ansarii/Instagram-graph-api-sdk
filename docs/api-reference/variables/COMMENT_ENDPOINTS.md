[**Instagram Graph API SDK v1.0.0**](../README.md)

***

[Instagram Graph API SDK](../README.md) / COMMENT\_ENDPOINTS

# Variable: COMMENT\_ENDPOINTS

> `const` **COMMENT\_ENDPOINTS**: `object`

Defined in: src/endpoints.ts:137

Comment Endpoints

## Type Declaration

### GET()

> `readonly` **GET**: (`commentId`) => `string`

Get comment: GET /{comment-id}

#### Parameters

##### commentId

`string`

#### Returns

`string`

### REPLIES()

> `readonly` **REPLIES**: (`commentId`) => `string`

Get replies: GET /{comment-id}/replies

#### Parameters

##### commentId

`string`

#### Returns

`string`

### REPLY()

> `readonly` **REPLY**: (`commentId`) => `string`

Reply to comment: POST /{comment-id}/replies

#### Parameters

##### commentId

`string`

#### Returns

`string`

### UPDATE()

> `readonly` **UPDATE**: (`commentId`) => `string`

Hide/Unhide comment: POST /{comment-id}

#### Parameters

##### commentId

`string`

#### Returns

`string`

### DELETE()

> `readonly` **DELETE**: (`commentId`) => `string`

Delete comment: DELETE /{comment-id}

#### Parameters

##### commentId

`string`

#### Returns

`string`
