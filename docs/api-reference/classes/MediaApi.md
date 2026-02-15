[**Instagram Graph API SDK v1.0.0**](../README.md)

***

[Instagram Graph API SDK](../README.md) / MediaApi

# Class: MediaApi

Defined in: src/api/media.ts:25

Media API class for Instagram media operations

## Constructors

### Constructor

> **new MediaApi**(`http`): `MediaApi`

Defined in: src/api/media.ts:28

#### Parameters

##### http

[`HttpClient`](HttpClient.md)

#### Returns

`MediaApi`

## Methods

### get()

> **get**(`mediaId`, `options?`): `Promise`\<[`IGMedia`](../interfaces/IGMedia.md)\>

Defined in: src/api/media.ts:37

Get media by ID

#### Parameters

##### mediaId

`string`

Media ID

##### options?

[`GetMediaOptions`](../interfaces/GetMediaOptions.md)

Fields to retrieve

#### Returns

`Promise`\<[`IGMedia`](../interfaces/IGMedia.md)\>

***

### getChildren()

> **getChildren**(`mediaId`, `options?`): `Promise`\<[`PaginatedResponse`](../interfaces/PaginatedResponse.md)\<[`IGMediaChild`](../interfaces/IGMediaChild.md)\>\>

Defined in: src/api/media.ts:47

Get carousel children

#### Parameters

##### mediaId

`string`

Carousel media ID

##### options?

[`GetMediaChildrenOptions`](../interfaces/GetMediaChildrenOptions.md)

Fields to retrieve

#### Returns

`Promise`\<[`PaginatedResponse`](../interfaces/PaginatedResponse.md)\<[`IGMediaChild`](../interfaces/IGMediaChild.md)\>\>

***

### getComments()

> **getComments**(`mediaId`, `options?`): `Promise`\<[`PaginatedResponse`](../interfaces/PaginatedResponse.md)\<[`IGComment`](../interfaces/IGComment.md)\>\>

Defined in: src/api/media.ts:63

Get comments on media

#### Parameters

##### mediaId

`string`

Media ID

##### options?

[`GetCommentsOptions`](../interfaces/GetCommentsOptions.md)

Pagination and fields options

#### Returns

`Promise`\<[`PaginatedResponse`](../interfaces/PaginatedResponse.md)\<[`IGComment`](../interfaces/IGComment.md)\>\>

***

### getInsights()

> **getInsights**(`mediaId`, `options`): `Promise`\<[`InsightsResponse`](../interfaces/InsightsResponse.md)\>

Defined in: src/api/media.ts:82

Get media insights

#### Parameters

##### mediaId

`string`

Media ID

##### options

[`GetMediaInsightsOptions`](../interfaces/GetMediaInsightsOptions.md)

Metrics to retrieve

#### Returns

`Promise`\<[`InsightsResponse`](../interfaces/InsightsResponse.md)\>

***

### getCollaborators()

> **getCollaborators**(`mediaId`): `Promise`\<[`PaginatedResponse`](../interfaces/PaginatedResponse.md)\<[`MediaCollaborator`](../interfaces/MediaCollaborator.md)\>\>

Defined in: src/api/media.ts:96

Get media collaborators

#### Parameters

##### mediaId

`string`

Media ID

#### Returns

`Promise`\<[`PaginatedResponse`](../interfaces/PaginatedResponse.md)\<[`MediaCollaborator`](../interfaces/MediaCollaborator.md)\>\>

***

### getProductTags()

> **getProductTags**(`mediaId`): `Promise`\<[`PaginatedResponse`](../interfaces/PaginatedResponse.md)\<[`ProductTag`](../interfaces/ProductTag.md)\>\>

Defined in: src/api/media.ts:107

Get product tags on media

#### Parameters

##### mediaId

`string`

Media ID

#### Returns

`Promise`\<[`PaginatedResponse`](../interfaces/PaginatedResponse.md)\<[`ProductTag`](../interfaces/ProductTag.md)\>\>
