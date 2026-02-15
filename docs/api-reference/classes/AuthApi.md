[**Instagram Graph API SDK v1.0.0**](../README.md)

***

[Instagram Graph API SDK](../README.md) / AuthApi

# Class: AuthApi

Defined in: src/api/auth.ts:31

Auth API class for Instagram authentication operations

## Constructors

### Constructor

> **new AuthApi**(`http`): `AuthApi`

Defined in: src/api/auth.ts:34

#### Parameters

##### http

[`HttpClient`](HttpClient.md)

#### Returns

`AuthApi`

## Methods

### me()

> **me**(`fields`): `Promise`\<[`IGUser`](../interfaces/IGUser.md)\>

Defined in: src/api/auth.ts:42

Get current user information

#### Parameters

##### fields

`string` = `'id,username'`

Fields to retrieve

#### Returns

`Promise`\<[`IGUser`](../interfaces/IGUser.md)\>

***

### refreshToken()

> **refreshToken**(): `Promise`\<[`LongLivedTokenResponse`](../interfaces/LongLivedTokenResponse.md)\>

Defined in: src/api/auth.ts:50

Refresh a long-lived token (Instagram Login)
Returns a new long-lived token with 60 days expiry

#### Returns

`Promise`\<[`LongLivedTokenResponse`](../interfaces/LongLivedTokenResponse.md)\>

***

### exchangeToken()

> **exchangeToken**(`shortLivedToken`, `appSecret`): `Promise`\<[`LongLivedTokenResponse`](../interfaces/LongLivedTokenResponse.md)\>

Defined in: src/api/auth.ts:62

Exchange short-lived token for long-lived token (Instagram Login)

#### Parameters

##### shortLivedToken

`string`

Short-lived access token (1 hour expiry)

##### appSecret

`string`

Instagram App Secret

#### Returns

`Promise`\<[`LongLivedTokenResponse`](../interfaces/LongLivedTokenResponse.md)\>
