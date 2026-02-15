[**Instagram Graph API SDK v1.0.0**](../README.md)

***

[Instagram Graph API SDK](../README.md) / InsightsApi

# Class: InsightsApi

Defined in: src/api/insights.ts:18

Insights API class for Instagram analytics

## Constructors

### Constructor

> **new InsightsApi**(`http`, `userId`): `InsightsApi`

Defined in: src/api/insights.ts:22

#### Parameters

##### http

[`HttpClient`](HttpClient.md)

##### userId

`string`

#### Returns

`InsightsApi`

## Methods

### getAccountInsights()

> **getAccountInsights**(`options`): `Promise`\<[`InsightsResponse`](../interfaces/InsightsResponse.md)\>

Defined in: src/api/insights.ts:31

Get account insights

#### Parameters

##### options

[`GetAccountInsightsOptions`](../interfaces/GetAccountInsightsOptions.md)

Metrics, period, and breakdown options

#### Returns

`Promise`\<[`InsightsResponse`](../interfaces/InsightsResponse.md)\>

***

### getMediaInsights()

> **getMediaInsights**(`mediaId`, `options`): `Promise`\<[`InsightsResponse`](../interfaces/InsightsResponse.md)\>

Defined in: src/api/insights.ts:50

Get media insights

#### Parameters

##### mediaId

`string`

Media ID

##### options

[`GetMediaInsightsOptions`](../interfaces/GetMediaInsightsOptions.md)

Metrics to retrieve

#### Returns

`Promise`\<[`InsightsResponse`](../interfaces/InsightsResponse.md)\>
