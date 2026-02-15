[**Instagram Graph API SDK v1.0.0**](../README.md)

***

[Instagram Graph API SDK](../README.md) / OEmbedApi

# Class: OEmbedApi

Defined in: src/api/oembed.ts:14

oEmbed API class for embedding Instagram content

## Constructors

### Constructor

> **new OEmbedApi**(`http`): `OEmbedApi`

Defined in: src/api/oembed.ts:17

#### Parameters

##### http

[`HttpClient`](HttpClient.md)

#### Returns

`OEmbedApi`

## Methods

### get()

> **get**(`options`): `Promise`\<[`OEmbedResponse`](../interfaces/OEmbedResponse.md)\>

Defined in: src/api/oembed.ts:25

Get oEmbed data for an Instagram URL

#### Parameters

##### options

[`GetOEmbedOptions`](../interfaces/GetOEmbedOptions.md)

URL and optional formatting options

#### Returns

`Promise`\<[`OEmbedResponse`](../interfaces/OEmbedResponse.md)\>
