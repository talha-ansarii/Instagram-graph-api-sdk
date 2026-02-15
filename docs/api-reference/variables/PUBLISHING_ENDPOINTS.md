[**Instagram Graph API SDK v1.0.0**](../README.md)

***

[Instagram Graph API SDK](../README.md) / PUBLISHING\_ENDPOINTS

# Variable: PUBLISHING\_ENDPOINTS

> `const` **PUBLISHING\_ENDPOINTS**: `object`

Defined in: src/endpoints.ts:90

Publishing Endpoints

## Type Declaration

### CREATE\_CONTAINER()

> `readonly` **CREATE\_CONTAINER**: (`userId`) => `string`

Create media container: POST /{user-id}/media

#### Parameters

##### userId

`string`

#### Returns

`string`

### PUBLISH()

> `readonly` **PUBLISH**: (`userId`) => `string`

Publish media: POST /{user-id}/media_publish

#### Parameters

##### userId

`string`

#### Returns

`string`

### CONTAINER\_STATUS()

> `readonly` **CONTAINER\_STATUS**: (`containerId`) => `string`

Get container status: GET /{container-id}

#### Parameters

##### containerId

`string`

#### Returns

`string`
