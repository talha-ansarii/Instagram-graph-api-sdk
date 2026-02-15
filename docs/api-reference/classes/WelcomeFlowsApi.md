[**Instagram Graph API SDK v1.0.0**](../README.md)

***

[Instagram Graph API SDK](../README.md) / WelcomeFlowsApi

# Class: WelcomeFlowsApi

Defined in: src/api/welcomeFlows.ts:19

Welcome Flows API class for managing welcome message flows

## Constructors

### Constructor

> **new WelcomeFlowsApi**(`http`, `userId`): `WelcomeFlowsApi`

Defined in: src/api/welcomeFlows.ts:23

#### Parameters

##### http

[`HttpClient`](HttpClient.md)

##### userId

`string`

#### Returns

`WelcomeFlowsApi`

## Methods

### list()

> **list**(): `Promise`\<[`WelcomeFlowsResponse`](../interfaces/WelcomeFlowsResponse.md)\>

Defined in: src/api/welcomeFlows.ts:31

Get all welcome message flows

#### Returns

`Promise`\<[`WelcomeFlowsResponse`](../interfaces/WelcomeFlowsResponse.md)\>

***

### get()

> **get**(`flowId`): `Promise`\<[`WelcomeMessageFlow`](../interfaces/WelcomeMessageFlow.md)\>

Defined in: src/api/welcomeFlows.ts:41

Get a specific welcome message flow

#### Parameters

##### flowId

`string`

Flow ID

#### Returns

`Promise`\<[`WelcomeMessageFlow`](../interfaces/WelcomeMessageFlow.md)\>

***

### create()

> **create**(`options`): `Promise`\<[`IdResponse`](../interfaces/IdResponse.md)\>

Defined in: src/api/welcomeFlows.ts:52

Create a new welcome message flow

#### Parameters

##### options

[`WelcomeFlowOptions`](../interfaces/WelcomeFlowOptions.md)

Flow name and screens

#### Returns

`Promise`\<[`IdResponse`](../interfaces/IdResponse.md)\>

***

### update()

> **update**(`flowId`, `options`): `Promise`\<[`SuccessResponse`](../interfaces/SuccessResponse.md)\>

Defined in: src/api/welcomeFlows.ts:67

Update an existing welcome message flow

#### Parameters

##### flowId

`string`

Flow ID

##### options

[`WelcomeFlowOptions`](../interfaces/WelcomeFlowOptions.md)

Updated flow name and screens

#### Returns

`Promise`\<[`SuccessResponse`](../interfaces/SuccessResponse.md)\>

***

### delete()

> **delete**(`flowId`): `Promise`\<[`SuccessResponse`](../interfaces/SuccessResponse.md)\>

Defined in: src/api/welcomeFlows.ts:82

Delete a welcome message flow

#### Parameters

##### flowId

`string`

Flow ID

#### Returns

`Promise`\<[`SuccessResponse`](../interfaces/SuccessResponse.md)\>
