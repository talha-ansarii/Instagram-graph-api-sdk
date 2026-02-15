[**Instagram Graph API SDK v1.0.0**](../README.md)

***

[Instagram Graph API SDK](../README.md) / UsersApi

# Class: UsersApi

Defined in: src/api/users.ts:27

Users API class for Instagram user operations

## Constructors

### Constructor

> **new UsersApi**(`http`, `userId`): `UsersApi`

Defined in: src/api/users.ts:31

#### Parameters

##### http

[`HttpClient`](HttpClient.md)

##### userId

`string`

#### Returns

`UsersApi`

## Methods

### getProfile()

> **getProfile**(`options?`): `Promise`\<[`IGUser`](../interfaces/IGUser.md)\>

Defined in: src/api/users.ts:40

Get user profile information

#### Parameters

##### options?

[`GetUserProfileOptions`](../interfaces/GetUserProfileOptions.md)

Fields to retrieve

#### Returns

`Promise`\<[`IGUser`](../interfaces/IGUser.md)\>

***

### getMedia()

> **getMedia**(`options?`): `Promise`\<[`PaginatedResponse`](../interfaces/PaginatedResponse.md)\<[`IGMedia`](../interfaces/IGMedia.md)\>\>

Defined in: src/api/users.ts:49

Get user's media

#### Parameters

##### options?

[`GetUserMediaOptions`](../interfaces/GetUserMediaOptions.md)

Pagination and fields options

#### Returns

`Promise`\<[`PaginatedResponse`](../interfaces/PaginatedResponse.md)\<[`IGMedia`](../interfaces/IGMedia.md)\>\>

***

### getStories()

> **getStories**(): `Promise`\<[`PaginatedResponse`](../interfaces/PaginatedResponse.md)\<[`IGMedia`](../interfaces/IGMedia.md)\>\>

Defined in: src/api/users.ts:64

Get user's stories

#### Returns

`Promise`\<[`PaginatedResponse`](../interfaces/PaginatedResponse.md)\<[`IGMedia`](../interfaces/IGMedia.md)\>\>

***

### getLiveMedia()

> **getLiveMedia**(): `Promise`\<[`PaginatedResponse`](../interfaces/PaginatedResponse.md)\<[`IGMedia`](../interfaces/IGMedia.md)\>\>

Defined in: src/api/users.ts:74

Get user's live media

#### Returns

`Promise`\<[`PaginatedResponse`](../interfaces/PaginatedResponse.md)\<[`IGMedia`](../interfaces/IGMedia.md)\>\>

***

### getContentPublishingLimit()

> **getContentPublishingLimit**(): `Promise`\<[`ContentPublishingLimit`](../interfaces/ContentPublishingLimit.md)\>

Defined in: src/api/users.ts:84

Get content publishing limit (quota usage)

#### Returns

`Promise`\<[`ContentPublishingLimit`](../interfaces/ContentPublishingLimit.md)\>

***

### getBusinessDiscovery()

> **getBusinessDiscovery**(`options`): `Promise`\<[`BusinessDiscovery`](../interfaces/BusinessDiscovery.md)\>

Defined in: src/api/users.ts:95

Discover another business account by username

#### Parameters

##### options

[`BusinessDiscoveryOptions`](../interfaces/BusinessDiscoveryOptions.md)

Username and fields to retrieve

#### Returns

`Promise`\<[`BusinessDiscovery`](../interfaces/BusinessDiscovery.md)\>

***

### getMentionedMedia()

> **getMentionedMedia**(): `Promise`\<[`PaginatedResponse`](../interfaces/PaginatedResponse.md)\<[`IGMedia`](../interfaces/IGMedia.md)\>\>

Defined in: src/api/users.ts:108

Get media where user is mentioned

#### Returns

`Promise`\<[`PaginatedResponse`](../interfaces/PaginatedResponse.md)\<[`IGMedia`](../interfaces/IGMedia.md)\>\>

***

### getMentionedComment()

> **getMentionedComment**(): `Promise`\<[`PaginatedResponse`](../interfaces/PaginatedResponse.md)\<\{ `id`: `string`; `text?`: `string`; \}\>\>

Defined in: src/api/users.ts:118

Get comments where user is mentioned

#### Returns

`Promise`\<[`PaginatedResponse`](../interfaces/PaginatedResponse.md)\<\{ `id`: `string`; `text?`: `string`; \}\>\>

***

### getTags()

> **getTags**(): `Promise`\<[`PaginatedResponse`](../interfaces/PaginatedResponse.md)\<[`IGMedia`](../interfaces/IGMedia.md)\>\>

Defined in: src/api/users.ts:128

Get media user is tagged in

#### Returns

`Promise`\<[`PaginatedResponse`](../interfaces/PaginatedResponse.md)\<[`IGMedia`](../interfaces/IGMedia.md)\>\>

***

### getRecentlySearchedHashtags()

> **getRecentlySearchedHashtags**(): `Promise`\<[`PaginatedResponse`](../interfaces/PaginatedResponse.md)\<[`RecentlySearchedHashtag`](../interfaces/RecentlySearchedHashtag.md)\>\>

Defined in: src/api/users.ts:138

Get recently searched hashtags

#### Returns

`Promise`\<[`PaginatedResponse`](../interfaces/PaginatedResponse.md)\<[`RecentlySearchedHashtag`](../interfaces/RecentlySearchedHashtag.md)\>\>

***

### getAvailableCatalogs()

> **getAvailableCatalogs**(): `Promise`\<[`PaginatedResponse`](../interfaces/PaginatedResponse.md)\<[`AvailableCatalog`](../interfaces/AvailableCatalog.md)\>\>

Defined in: src/api/users.ts:147

Get available product catalogs

#### Returns

`Promise`\<[`PaginatedResponse`](../interfaces/PaginatedResponse.md)\<[`AvailableCatalog`](../interfaces/AvailableCatalog.md)\>\>

***

### searchCatalogProducts()

> **searchCatalogProducts**(`catalogId`, `query`): `Promise`\<[`PaginatedResponse`](../interfaces/PaginatedResponse.md)\<[`CatalogProduct`](../interfaces/CatalogProduct.md)\>\>

Defined in: src/api/users.ts:158

Search products in a catalog

#### Parameters

##### catalogId

`string`

Catalog ID to search in

##### query

`string`

Search query

#### Returns

`Promise`\<[`PaginatedResponse`](../interfaces/PaginatedResponse.md)\<[`CatalogProduct`](../interfaces/CatalogProduct.md)\>\>
