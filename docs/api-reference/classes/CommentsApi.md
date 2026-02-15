[**Instagram Graph API SDK v1.0.0**](../README.md)

***

[Instagram Graph API SDK](../README.md) / CommentsApi

# Class: CommentsApi

Defined in: src/api/comments.ts:21

Comments API class for Instagram comment operations

## Constructors

### Constructor

> **new CommentsApi**(`http`): `CommentsApi`

Defined in: src/api/comments.ts:24

#### Parameters

##### http

[`HttpClient`](HttpClient.md)

#### Returns

`CommentsApi`

## Methods

### get()

> **get**(`commentId`, `fields`): `Promise`\<[`IGComment`](../interfaces/IGComment.md)\>

Defined in: src/api/comments.ts:33

Get comment by ID

#### Parameters

##### commentId

`string`

Comment ID

##### fields

(`"text"` \| `"id"` \| `"timestamp"` \| `"username"` \| `"like_count"` \| `"hidden"` \| `"from"` \| `"media"` \| `"parent_id"` \| `"replies"`)[] = `...`

Fields to retrieve

#### Returns

`Promise`\<[`IGComment`](../interfaces/IGComment.md)\>

***

### getReplies()

> **getReplies**(`commentId`, `options?`): `Promise`\<[`PaginatedResponse`](../interfaces/PaginatedResponse.md)\<[`IGComment`](../interfaces/IGComment.md)\>\>

Defined in: src/api/comments.ts:48

Get replies to a comment

#### Parameters

##### commentId

`string`

Comment ID

##### options?

[`GetCommentsOptions`](../interfaces/GetCommentsOptions.md)

Pagination and fields options

#### Returns

`Promise`\<[`PaginatedResponse`](../interfaces/PaginatedResponse.md)\<[`IGComment`](../interfaces/IGComment.md)\>\>

***

### reply()

> **reply**(`commentId`, `options`): `Promise`\<[`IdResponse`](../interfaces/IdResponse.md)\>

Defined in: src/api/comments.ts:67

Reply to a comment

#### Parameters

##### commentId

`string`

Comment ID to reply to

##### options

[`ReplyToCommentOptions`](../interfaces/ReplyToCommentOptions.md)

Reply message

#### Returns

`Promise`\<[`IdResponse`](../interfaces/IdResponse.md)\>

***

### hide()

> **hide**(`commentId`): `Promise`\<[`SuccessResponse`](../interfaces/SuccessResponse.md)\>

Defined in: src/api/comments.ts:78

Hide a comment

#### Parameters

##### commentId

`string`

Comment ID

#### Returns

`Promise`\<[`SuccessResponse`](../interfaces/SuccessResponse.md)\>

***

### unhide()

> **unhide**(`commentId`): `Promise`\<[`SuccessResponse`](../interfaces/SuccessResponse.md)\>

Defined in: src/api/comments.ts:89

Unhide a comment

#### Parameters

##### commentId

`string`

Comment ID

#### Returns

`Promise`\<[`SuccessResponse`](../interfaces/SuccessResponse.md)\>

***

### delete()

> **delete**(`commentId`): `Promise`\<[`SuccessResponse`](../interfaces/SuccessResponse.md)\>

Defined in: src/api/comments.ts:100

Delete a comment

#### Parameters

##### commentId

`string`

Comment ID

#### Returns

`Promise`\<[`SuccessResponse`](../interfaces/SuccessResponse.md)\>
