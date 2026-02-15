[**Instagram Graph API SDK v1.0.0**](../README.md)

***

[Instagram Graph API SDK](../README.md) / HttpClient

# Class: HttpClient

Defined in: src/http.ts:39

HTTP Client for making requests to Instagram Graph API

## Constructors

### Constructor

> **new HttpClient**(`config`): `HttpClient`

Defined in: src/http.ts:43

#### Parameters

##### config

[`HttpClientConfig`](../interfaces/HttpClientConfig.md)

#### Returns

`HttpClient`

## Methods

### setAccessToken()

> **setAccessToken**(`accessToken`): `void`

Defined in: src/http.ts:118

Update access token

#### Parameters

##### accessToken

`string`

#### Returns

`void`

***

### get()

> **get**\<`T`\>(`path`, `params?`, `config?`): `Promise`\<`T`\>

Defined in: src/http.ts:125

GET request

#### Type Parameters

##### T

`T`

#### Parameters

##### path

`string`

##### params?

`Record`\<`string`, `unknown`\>

##### config?

`AxiosRequestConfig`\<`any`\>

#### Returns

`Promise`\<`T`\>

***

### post()

> **post**\<`T`\>(`path`, `data?`, `params?`, `config?`): `Promise`\<`T`\>

Defined in: src/http.ts:140

POST request

#### Type Parameters

##### T

`T`

#### Parameters

##### path

`string`

##### data?

`Record`\<`string`, `unknown`\>

##### params?

`Record`\<`string`, `unknown`\>

##### config?

`AxiosRequestConfig`\<`any`\>

#### Returns

`Promise`\<`T`\>

***

### delete()

> **delete**\<`T`\>(`path`, `params?`, `config?`): `Promise`\<`T`\>

Defined in: src/http.ts:156

DELETE request

#### Type Parameters

##### T

`T`

#### Parameters

##### path

`string`

##### params?

`Record`\<`string`, `unknown`\>

##### config?

`AxiosRequestConfig`\<`any`\>

#### Returns

`Promise`\<`T`\>

***

### postForm()

> **postForm**\<`T`\>(`path`, `data`, `config?`): `Promise`\<`T`\>

Defined in: src/http.ts:171

POST with form data (for file uploads)

#### Type Parameters

##### T

`T`

#### Parameters

##### path

`string`

##### data

`Record`\<`string`, `unknown`\>

##### config?

`AxiosRequestConfig`\<`any`\>

#### Returns

`Promise`\<`T`\>
