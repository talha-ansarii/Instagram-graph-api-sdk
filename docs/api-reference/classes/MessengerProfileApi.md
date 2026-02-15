[**Instagram Graph API SDK v1.0.0**](../README.md)

***

[Instagram Graph API SDK](../README.md) / MessengerProfileApi

# Class: MessengerProfileApi

Defined in: src/api/messengerProfile.ts:23

Messenger Profile API class for managing ice breakers and persistent menu

## Constructors

### Constructor

> **new MessengerProfileApi**(`http`, `userId`): `MessengerProfileApi`

Defined in: src/api/messengerProfile.ts:27

#### Parameters

##### http

[`HttpClient`](HttpClient.md)

##### userId

`string`

#### Returns

`MessengerProfileApi`

## Methods

### getIceBreakers()

> **getIceBreakers**(): `Promise`\<[`IceBreakersResponse`](../interfaces/IceBreakersResponse.md)\>

Defined in: src/api/messengerProfile.ts:35

Get current ice breakers

#### Returns

`Promise`\<[`IceBreakersResponse`](../interfaces/IceBreakersResponse.md)\>

***

### setIceBreakers()

> **setIceBreakers**(`iceBreakers`): `Promise`\<[`SuccessResponse`](../interfaces/SuccessResponse.md)\>

Defined in: src/api/messengerProfile.ts:46

Set ice breakers (FAQ questions)

#### Parameters

##### iceBreakers

[`IceBreaker`](../interfaces/IceBreaker.md)[]

Ice breaker configurations (max 4 questions per locale)

#### Returns

`Promise`\<[`SuccessResponse`](../interfaces/SuccessResponse.md)\>

***

### deleteIceBreakers()

> **deleteIceBreakers**(): `Promise`\<[`SuccessResponse`](../interfaces/SuccessResponse.md)\>

Defined in: src/api/messengerProfile.ts:59

Delete ice breakers

#### Returns

`Promise`\<[`SuccessResponse`](../interfaces/SuccessResponse.md)\>

***

### getPersistentMenu()

> **getPersistentMenu**(): `Promise`\<\{ `data`: [`PersistentMenu`](../interfaces/PersistentMenu.md)[]; \}\>

Defined in: src/api/messengerProfile.ts:69

Get persistent menu

#### Returns

`Promise`\<\{ `data`: [`PersistentMenu`](../interfaces/PersistentMenu.md)[]; \}\>

***

### setPersistentMenu()

> **setPersistentMenu**(`menus`): `Promise`\<[`SuccessResponse`](../interfaces/SuccessResponse.md)\>

Defined in: src/api/messengerProfile.ts:80

Set persistent menu

#### Parameters

##### menus

[`PersistentMenu`](../interfaces/PersistentMenu.md)[]

Persistent menu configurations

#### Returns

`Promise`\<[`SuccessResponse`](../interfaces/SuccessResponse.md)\>

***

### deletePersistentMenu()

> **deletePersistentMenu**(): `Promise`\<[`SuccessResponse`](../interfaces/SuccessResponse.md)\>

Defined in: src/api/messengerProfile.ts:93

Delete persistent menu

#### Returns

`Promise`\<[`SuccessResponse`](../interfaces/SuccessResponse.md)\>
