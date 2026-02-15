[**Instagram Graph API SDK v1.0.0**](../README.md)

***

[Instagram Graph API SDK](../README.md) / InstagramOAuth

# Class: InstagramOAuth

Defined in: src/api/oauth.ts:51

Instagram OAuth - Static methods for authentication flow

Use these methods for user onboarding (Instagram Business Login).
After obtaining a token, create an InstagramClient instance to make API calls.

## Constructors

### Constructor

> **new InstagramOAuth**(): `InstagramOAuth`

#### Returns

`InstagramOAuth`

## Methods

### buildAuthorizationUrl()

> `static` **buildAuthorizationUrl**(`params`): `string`

Defined in: src/api/oauth.ts:76

Build the Instagram authorization URL

Direct users to this URL to start the OAuth flow.
They will be asked to grant permissions to your app.

#### Parameters

##### params

[`AuthorizationUrlParams`](../interfaces/AuthorizationUrlParams.md)

Authorization URL parameters

#### Returns

`string`

Full authorization URL to redirect user to

#### Example

```typescript
const url = InstagramOAuth.buildAuthorizationUrl({
  clientId: process.env.INSTAGRAM_APP_ID,
  redirectUri: `${process.env.APP_URL}/api/instagram/callback`,
  scopes: [
    'instagram_business_basic',
    'instagram_business_manage_messages',
  ],
  state: crypto.randomUUID(), // CSRF protection
});

// Redirect user to url
```

***

### parseCallback()

> `static` **parseCallback**(`url`): [`OAuthCallbackParams`](../interfaces/OAuthCallbackParams.md)

Defined in: src/api/oauth.ts:128

Parse OAuth callback parameters from URL

Use this to extract code, state, and error info from the callback URL.

#### Parameters

##### url

`string`

The callback URL (or just the search params)

#### Returns

[`OAuthCallbackParams`](../interfaces/OAuthCallbackParams.md)

Parsed callback parameters

#### Example

```typescript
const params = InstagramOAuth.parseCallback(request.url);

if (params.error) {
  // User denied access
  console.log(params.error_description);
} else {
  // Exchange code for token
  const tokens = await InstagramOAuth.exchangeCodeForToken({
    code: params.code!,
    ...
  });
}
```

***

### exchangeCodeForToken()

> `static` **exchangeCodeForToken**(`params`): `Promise`\<[`OAuthTokenResponse`](../interfaces/OAuthTokenResponse.md)\>

Defined in: src/api/oauth.ts:172

Exchange authorization code for tokens

This is the recommended method - it handles the full flow:
1. Exchange code for short-lived token (1 hour)
2. Exchange short-lived for long-lived token (60 days)

#### Parameters

##### params

[`ExchangeCodeParams`](../interfaces/ExchangeCodeParams.md)

Exchange parameters

#### Returns

`Promise`\<[`OAuthTokenResponse`](../interfaces/OAuthTokenResponse.md)\>

Long-lived token response with user ID

#### Throws

Error if exchange fails

#### Example

```typescript
const tokens = await InstagramOAuth.exchangeCodeForToken({
  clientId: process.env.INSTAGRAM_APP_ID!,
  clientSecret: process.env.INSTAGRAM_APP_SECRET!,
  code: codeFromCallback,
  redirectUri: `${process.env.APP_URL}/api/instagram/callback`,
});

// Store tokens.access_token and tokens.user_id in your database
// Token expires in tokens.expires_in seconds (~60 days)
```

***

### getShortLivedToken()

> `static` **getShortLivedToken**(`params`): `Promise`\<[`ShortLivedTokenResponse`](../interfaces/ShortLivedTokenResponse.md)\>

Defined in: src/api/oauth.ts:200

Get short-lived token from authorization code

Use this if you need more control over the token exchange process.
The short-lived token is valid for 1 hour.

#### Parameters

##### params

[`ExchangeCodeParams`](../interfaces/ExchangeCodeParams.md)

Exchange parameters

#### Returns

`Promise`\<[`ShortLivedTokenResponse`](../interfaces/ShortLivedTokenResponse.md)\>

Short-lived token response

#### Throws

Error if exchange fails

***

### getLongLivedToken()

> `static` **getLongLivedToken**(`params`): `Promise`\<`LongLivedTokenResponse`\>

Defined in: src/api/oauth.ts:266

Exchange short-lived token for long-lived token

Long-lived tokens are valid for 60 days and can be refreshed.

#### Parameters

##### params

Exchange parameters

###### clientSecret

`string`

###### accessToken

`string`

#### Returns

`Promise`\<`LongLivedTokenResponse`\>

Long-lived token response

#### Throws

Error if exchange fails

***

### getDefaultScopes()

> `static` **getDefaultScopes**(): [`InstagramScope`](../type-aliases/InstagramScope.md)[]

Defined in: src/api/oauth.ts:304

Get the default scopes for Instagram Business Login

#### Returns

[`InstagramScope`](../type-aliases/InstagramScope.md)[]

Array of commonly used scopes

***

### getAllScopes()

> `static` **getAllScopes**(): [`InstagramScope`](../type-aliases/InstagramScope.md)[]

Defined in: src/api/oauth.ts:318

Get all available Instagram Business Login scopes

#### Returns

[`InstagramScope`](../type-aliases/InstagramScope.md)[]

Array of all available scopes
