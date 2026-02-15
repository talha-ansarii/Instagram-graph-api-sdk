[**Instagram Graph API SDK v1.0.0**](../README.md)

***

[Instagram Graph API SDK](../README.md) / ExchangeCodeParams

# Interface: ExchangeCodeParams

Defined in: src/types/oauth.ts:47

Parameters for exchanging authorization code for tokens

## Properties

### clientId

> **clientId**: `string`

Defined in: src/types/oauth.ts:49

Your Instagram App ID

***

### clientSecret

> **clientSecret**: `string`

Defined in: src/types/oauth.ts:51

Your Instagram App Secret

***

### code

> **code**: `string`

Defined in: src/types/oauth.ts:53

Authorization code from callback (will be cleaned of #_ suffix)

***

### redirectUri

> **redirectUri**: `string`

Defined in: src/types/oauth.ts:55

Must exactly match the redirect_uri used in authorization
