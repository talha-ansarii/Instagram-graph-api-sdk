[**Instagram Graph API SDK v1.0.0**](../README.md)

***

[Instagram Graph API SDK](../README.md) / HASHTAG\_ENDPOINTS

# Variable: HASHTAG\_ENDPOINTS

> `const` **HASHTAG\_ENDPOINTS**: `object`

Defined in: src/endpoints.ts:157

Hashtag Endpoints

## Type Declaration

### SEARCH

> `readonly` **SEARCH**: `"/ig_hashtag_search"` = `'/ig_hashtag_search'`

Search hashtag: GET /ig_hashtag_search

### GET()

> `readonly` **GET**: (`hashtagId`) => `string`

Get hashtag: GET /{hashtag-id}

#### Parameters

##### hashtagId

`string`

#### Returns

`string`

### RECENT\_MEDIA()

> `readonly` **RECENT\_MEDIA**: (`hashtagId`) => `string`

Get recent media: GET /{hashtag-id}/recent_media

#### Parameters

##### hashtagId

`string`

#### Returns

`string`

### TOP\_MEDIA()

> `readonly` **TOP\_MEDIA**: (`hashtagId`) => `string`

Get top media: GET /{hashtag-id}/top_media

#### Parameters

##### hashtagId

`string`

#### Returns

`string`
