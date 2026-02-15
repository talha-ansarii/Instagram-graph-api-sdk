[**Instagram Graph API SDK v1.0.0**](../README.md)

***

[Instagram Graph API SDK](../README.md) / AuthorizationUrlParams

# Interface: AuthorizationUrlParams

Defined in: src/types/oauth.ts:29

Parameters for building the authorization URL

## Properties

### clientId

> **clientId**: `string`

Defined in: src/types/oauth.ts:31

Your Instagram App ID

***

### redirectUri

> **redirectUri**: `string`

Defined in: src/types/oauth.ts:33

Must exactly match one of your Valid OAuth Redirect URIs

***

### scopes

> **scopes**: [`InstagramScope`](../type-aliases/InstagramScope.md)[]

Defined in: src/types/oauth.ts:35

List of permissions to request

***

### state?

> `optional` **state**: `string`

Defined in: src/types/oauth.ts:37

Optional CSRF protection state

***

### responseType?

> `optional` **responseType**: `"code"`

Defined in: src/types/oauth.ts:39

Response type, always 'code'

***

### forceReauth?

> `optional` **forceReauth**: `boolean`

Defined in: src/types/oauth.ts:41

Force re-authentication even if user has active session
