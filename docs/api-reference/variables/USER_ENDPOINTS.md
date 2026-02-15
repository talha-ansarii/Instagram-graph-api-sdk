[**Instagram Graph API SDK v1.0.0**](../README.md)

***

[Instagram Graph API SDK](../README.md) / USER\_ENDPOINTS

# Variable: USER\_ENDPOINTS

> `const` **USER\_ENDPOINTS**: `object`

Defined in: src/endpoints.ts:23

User Endpoints

## Type Declaration

### PROFILE()

> `readonly` **PROFILE**: (`userId`) => `string`

Get user profile: GET /{user-id}

#### Parameters

##### userId

`string`

#### Returns

`string`

### MEDIA()

> `readonly` **MEDIA**: (`userId`) => `string`

Get user media: GET /{user-id}/media

#### Parameters

##### userId

`string`

#### Returns

`string`

### STORIES()

> `readonly` **STORIES**: (`userId`) => `string`

Get user stories: GET /{user-id}/stories

#### Parameters

##### userId

`string`

#### Returns

`string`

### INSIGHTS()

> `readonly` **INSIGHTS**: (`userId`) => `string`

Get user insights: GET /{user-id}/insights

#### Parameters

##### userId

`string`

#### Returns

`string`

### LIVE\_MEDIA()

> `readonly` **LIVE\_MEDIA**: (`userId`) => `string`

Get live media: GET /{user-id}/live_media

#### Parameters

##### userId

`string`

#### Returns

`string`

### CONTENT\_PUBLISHING\_LIMIT()

> `readonly` **CONTENT\_PUBLISHING\_LIMIT**: (`userId`) => `string`

Get content publishing limit: GET /{user-id}/content_publishing_limit

#### Parameters

##### userId

`string`

#### Returns

`string`

### BUSINESS\_DISCOVERY()

> `readonly` **BUSINESS\_DISCOVERY**: (`userId`) => `string`

Get business discovery: GET /{user-id}?fields=business_discovery.username(...)

#### Parameters

##### userId

`string`

#### Returns

`string`

### MENTIONED\_MEDIA()

> `readonly` **MENTIONED\_MEDIA**: (`userId`) => `string`

Get mentioned media: GET /{user-id}/mentioned_media

#### Parameters

##### userId

`string`

#### Returns

`string`

### MENTIONED\_COMMENT()

> `readonly` **MENTIONED\_COMMENT**: (`userId`) => `string`

Get mentioned comment: GET /{user-id}/mentioned_comment

#### Parameters

##### userId

`string`

#### Returns

`string`

### TAGS()

> `readonly` **TAGS**: (`userId`) => `string`

Get tags: GET /{user-id}/tags

#### Parameters

##### userId

`string`

#### Returns

`string`

### RECENTLY\_SEARCHED\_HASHTAGS()

> `readonly` **RECENTLY\_SEARCHED\_HASHTAGS**: (`userId`) => `string`

Get recently searched hashtags: GET /{user-id}/recently_searched_hashtags

#### Parameters

##### userId

`string`

#### Returns

`string`

### AVAILABLE\_CATALOGS()

> `readonly` **AVAILABLE\_CATALOGS**: (`userId`) => `string`

Get available catalogs: GET /{user-id}/available_catalogs

#### Parameters

##### userId

`string`

#### Returns

`string`

### CATALOG\_PRODUCT\_SEARCH()

> `readonly` **CATALOG\_PRODUCT\_SEARCH**: (`userId`) => `string`

Search catalog products: GET /{user-id}/catalog_product_search

#### Parameters

##### userId

`string`

#### Returns

`string`
