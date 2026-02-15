[**Instagram Graph API SDK v1.0.0**](../README.md)

***

[Instagram Graph API SDK](../README.md) / InstagramClient

# Class: InstagramClient

Defined in: src/client.ts:49

Instagram Graph API Client

Main entry point for the SDK. Provides access to all API modules.

## Constructors

### Constructor

> **new InstagramClient**(`config`): `InstagramClient`

Defined in: src/client.ts:94

Create a new Instagram client

#### Parameters

##### config

[`InstagramClientConfig`](../interfaces/InstagramClientConfig.md)

Client configuration

#### Returns

`InstagramClient`

## Properties

### auth

> `readonly` **auth**: [`AuthApi`](AuthApi.md)

Defined in: src/client.ts:55

Authentication API - Token management

***

### users

> `readonly` **users**: [`UsersApi`](UsersApi.md)

Defined in: src/client.ts:58

Users API - Profile, media, insights

***

### media

> `readonly` **media**: [`MediaApi`](MediaApi.md)

Defined in: src/client.ts:61

Media API - Get media, children, comments

***

### publishing

> `readonly` **publishing**: [`PublishingApi`](PublishingApi.md)

Defined in: src/client.ts:64

Publishing API - Publish images, videos, reels

***

### messaging

> `readonly` **messaging**: [`MessagingApi`](MessagingApi.md)

Defined in: src/client.ts:67

Messaging API - Send messages, templates

***

### conversations

> `readonly` **conversations**: [`ConversationsApi`](ConversationsApi.md)

Defined in: src/client.ts:70

Conversations API - List conversations, messages

***

### comments

> `readonly` **comments**: [`CommentsApi`](CommentsApi.md)

Defined in: src/client.ts:73

Comments API - Moderation

***

### hashtags

> `readonly` **hashtags**: [`HashtagsApi`](HashtagsApi.md)

Defined in: src/client.ts:76

Hashtags API - Search, media

***

### insights

> `readonly` **insights**: [`InsightsApi`](InsightsApi.md)

Defined in: src/client.ts:79

Insights API - Analytics

***

### welcomeFlows

> `readonly` **welcomeFlows**: [`WelcomeFlowsApi`](WelcomeFlowsApi.md)

Defined in: src/client.ts:82

Welcome Flows API - Welcome message flows

***

### messengerProfile

> `readonly` **messengerProfile**: [`MessengerProfileApi`](MessengerProfileApi.md)

Defined in: src/client.ts:85

Messenger Profile API - Ice breakers, menu

***

### oembed

> `readonly` **oembed**: [`OEmbedApi`](OEmbedApi.md)

Defined in: src/client.ts:88

oEmbed API - Embed content

## Methods

### getUserId()

> **getUserId**(): `Promise`\<`string`\>

Defined in: src/client.ts:129

Get the current user ID
Fetches from API if not cached

#### Returns

`Promise`\<`string`\>

***

### setAccessToken()

> **setAccessToken**(`accessToken`): `void`

Defined in: src/client.ts:143

Update the access token

#### Parameters

##### accessToken

`string`

New access token

#### Returns

`void`

***

### getConfig()

> **getConfig**(): `Readonly`\<`Required`\<[`InstagramClientConfig`](../interfaces/InstagramClientConfig.md)\>\>

Defined in: src/client.ts:150

Get the current configuration

#### Returns

`Readonly`\<`Required`\<[`InstagramClientConfig`](../interfaces/InstagramClientConfig.md)\>\>

***

### getApiVersion()

> **getApiVersion**(): `string`

Defined in: src/client.ts:157

Get the API version

#### Returns

`string`
