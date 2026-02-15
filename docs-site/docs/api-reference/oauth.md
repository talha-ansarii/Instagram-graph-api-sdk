---
sidebar_position: 3
---

# InstagramOAuth

Static class for handling the OAuth authentication flow.

## Methods

All methods are static - no instantiation needed.

### buildAuthorizationUrl()

Build the URL to redirect users for Instagram login.

```typescript
const url = InstagramOAuth.buildAuthorizationUrl({
  clientId: 'your-app-id',
  redirectUri: 'https://your-app.com/callback',
  scopes: ['instagram_business_basic'],
  state: 'csrf-token',  // recommended
  responseType: 'code', // default
  forceReauth: false,   // optional
});
```

**Parameters:**

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `clientId` | `string` | Yes | Instagram App ID |
| `redirectUri` | `string` | Yes | OAuth callback URL |
| `scopes` | `InstagramScope[]` | Yes | Permissions to request |
| `state` | `string` | No | CSRF protection token |
| `responseType` | `string` | No | Always `'code'` |
| `forceReauth` | `boolean` | No | Force re-login |

### parseCallback()

Parse the callback URL after user authorization.

```typescript
const { code, state, error, errorReason } = InstagramOAuth.parseCallback(
  'https://your-app.com/callback?code=ABC&state=xyz'
);
```

**Returns:**

| Field | Type | Description |
|-------|------|-------------|
| `code` | `string \| null` | Authorization code |
| `state` | `string \| null` | State parameter |
| `error` | `string \| null` | Error code if denied |
| `errorReason` | `string \| null` | Error reason |

### exchangeCodeForToken()

Exchange authorization code for a long-lived access token.

```typescript
const tokens = await InstagramOAuth.exchangeCodeForToken({
  clientId: 'your-app-id',
  clientSecret: 'your-app-secret',
  redirectUri: 'https://your-app.com/callback',
  code: 'authorization-code',
});
```

**Returns:**

```typescript
{
  access_token: string;  // Long-lived token (60 days)
  user_id: string;       // Instagram User ID
  token_type: 'bearer';
  expires_in: number;    // Seconds until expiration
}
```

### getShortLivedToken()

Get only the short-lived token (1 hour).

```typescript
const shortToken = await InstagramOAuth.getShortLivedToken({
  clientId: 'your-app-id',
  clientSecret: 'your-app-secret',
  redirectUri: 'https://your-app.com/callback',
  code: 'authorization-code',
});
```

### getLongLivedToken()

Exchange a short-lived token for a long-lived token.

```typescript
const longToken = await InstagramOAuth.getLongLivedToken({
  clientSecret: 'your-app-secret',
  accessToken: shortLivedToken,
});
```

### getDefaultScopes()

Get the recommended default scopes.

```typescript
const scopes = InstagramOAuth.getDefaultScopes();
// ['instagram_business_basic', 'instagram_business_manage_messages', 
//  'instagram_business_manage_comments', 'instagram_business_content_publish']
```

### getAllScopes()

Get all available scopes.

```typescript
const scopes = InstagramOAuth.getAllScopes();
// Also includes 'instagram_business_manage_insights'
```

## Types

### InstagramScope

```typescript
type InstagramScope = 
  | 'instagram_business_basic'
  | 'instagram_business_content_publish'
  | 'instagram_business_manage_messages'
  | 'instagram_business_manage_comments'
  | 'instagram_business_manage_insights';
```
