[**Instagram Graph API SDK v1.0.0**](../README.md)

***

[Instagram Graph API SDK](../README.md) / OAuthCallbackParams

# Interface: OAuthCallbackParams

Defined in: src/types/oauth.ts:105

OAuth callback parameters (parsed from redirect URL)

## Properties

### code?

> `optional` **code**: `string`

Defined in: src/types/oauth.ts:107

Authorization code (if successful)

***

### state?

> `optional` **state**: `string`

Defined in: src/types/oauth.ts:109

State parameter (if provided in authorization request)

***

### error?

> `optional` **error**: `string`

Defined in: src/types/oauth.ts:111

Error type (if user denied or error occurred)

***

### error\_reason?

> `optional` **error\_reason**: `string`

Defined in: src/types/oauth.ts:113

Error reason

***

### error\_description?

> `optional` **error\_description**: `string`

Defined in: src/types/oauth.ts:115

Human-readable error description
