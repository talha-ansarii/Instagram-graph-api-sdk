[**Instagram Graph API SDK v1.0.0**](../README.md)

***

[Instagram Graph API SDK](../README.md) / MEDIA\_ENDPOINTS

# Variable: MEDIA\_ENDPOINTS

> `const` **MEDIA\_ENDPOINTS**: `object`

Defined in: src/endpoints.ts:67

Media Endpoints

## Type Declaration

### GET()

> `readonly` **GET**: (`mediaId`) => `string`

Get media by ID: GET /{media-id}

#### Parameters

##### mediaId

`string`

#### Returns

`string`

### CHILDREN()

> `readonly` **CHILDREN**: (`mediaId`) => `string`

Get media children (carousel): GET /{media-id}/children

#### Parameters

##### mediaId

`string`

#### Returns

`string`

### COMMENTS()

> `readonly` **COMMENTS**: (`mediaId`) => `string`

Get media comments: GET /{media-id}/comments

#### Parameters

##### mediaId

`string`

#### Returns

`string`

### INSIGHTS()

> `readonly` **INSIGHTS**: (`mediaId`) => `string`

Get media insights: GET /{media-id}/insights

#### Parameters

##### mediaId

`string`

#### Returns

`string`

### COLLABORATORS()

> `readonly` **COLLABORATORS**: (`mediaId`) => `string`

Get media collaborators: GET /{media-id}/collaborators

#### Parameters

##### mediaId

`string`

#### Returns

`string`

### PRODUCT\_TAGS()

> `readonly` **PRODUCT\_TAGS**: (`mediaId`) => `string`

Get product tags: GET /{media-id}/product_tags

#### Parameters

##### mediaId

`string`

#### Returns

`string`
