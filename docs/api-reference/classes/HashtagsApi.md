[**Instagram Graph API SDK v1.0.0**](../README.md)

***

[Instagram Graph API SDK](../README.md) / HashtagsApi

# Class: HashtagsApi

Defined in: src/api/hashtags.ts:20

Hashtags API class for Instagram hashtag operations

## Constructors

### Constructor

> **new HashtagsApi**(`http`): `HashtagsApi`

Defined in: src/api/hashtags.ts:23

#### Parameters

##### http

[`HttpClient`](HttpClient.md)

#### Returns

`HashtagsApi`

## Methods

### search()

> **search**(`options`): `Promise`\<[`HashtagSearchResponse`](../interfaces/HashtagSearchResponse.md)\>

Defined in: src/api/hashtags.ts:31

Search for a hashtag

#### Parameters

##### options

[`HashtagSearchOptions`](../interfaces/HashtagSearchOptions.md)

User ID and search query

#### Returns

`Promise`\<[`HashtagSearchResponse`](../interfaces/HashtagSearchResponse.md)\>

***

### get()

> **get**(`hashtagId`): `Promise`\<[`IGHashtag`](../interfaces/IGHashtag.md)\>

Defined in: src/api/hashtags.ts:45

Get hashtag information

#### Parameters

##### hashtagId

`string`

Hashtag ID

#### Returns

`Promise`\<[`IGHashtag`](../interfaces/IGHashtag.md)\>

***

### getRecentMedia()

> **getRecentMedia**(`hashtagId`, `options`): `Promise`\<[`HashtagMediaResponse`](../type-aliases/HashtagMediaResponse.md)\>

Defined in: src/api/hashtags.ts:57

Get recent media with hashtag

#### Parameters

##### hashtagId

`string`

Hashtag ID

##### options

[`GetHashtagMediaOptions`](../interfaces/GetHashtagMediaOptions.md)

User ID and pagination options

#### Returns

`Promise`\<[`HashtagMediaResponse`](../type-aliases/HashtagMediaResponse.md)\>

***

### getTopMedia()

> **getTopMedia**(`hashtagId`, `options`): `Promise`\<[`HashtagMediaResponse`](../type-aliases/HashtagMediaResponse.md)\>

Defined in: src/api/hashtags.ts:77

Get top media with hashtag

#### Parameters

##### hashtagId

`string`

Hashtag ID

##### options

[`GetHashtagMediaOptions`](../interfaces/GetHashtagMediaOptions.md)

User ID and pagination options

#### Returns

`Promise`\<[`HashtagMediaResponse`](../type-aliases/HashtagMediaResponse.md)\>
