[**Instagram Graph API SDK v1.0.0**](../README.md)

***

[Instagram Graph API SDK](../README.md) / PublishingApi

# Class: PublishingApi

Defined in: src/api/publishing.ts:22

Publishing API class for content publishing operations

## Constructors

### Constructor

> **new PublishingApi**(`http`, `userId`): `PublishingApi`

Defined in: src/api/publishing.ts:26

#### Parameters

##### http

[`HttpClient`](HttpClient.md)

##### userId

`string`

#### Returns

`PublishingApi`

## Methods

### createImageContainer()

> **createImageContainer**(`options`): `Promise`\<[`ContainerResponse`](../interfaces/ContainerResponse.md)\>

Defined in: src/api/publishing.ts:35

Create an image container

#### Parameters

##### options

[`CreateImageContainerOptions`](../interfaces/CreateImageContainerOptions.md)

Image URL and optional caption, location, tags

#### Returns

`Promise`\<[`ContainerResponse`](../interfaces/ContainerResponse.md)\>

***

### createVideoContainer()

> **createVideoContainer**(`options`): `Promise`\<[`ContainerResponse`](../interfaces/ContainerResponse.md)\>

Defined in: src/api/publishing.ts:54

Create a video/reel/story container

#### Parameters

##### options

[`CreateVideoContainerOptions`](../interfaces/CreateVideoContainerOptions.md)

Video URL, media type, and optional settings

#### Returns

`Promise`\<[`ContainerResponse`](../interfaces/ContainerResponse.md)\>

***

### createCarouselContainer()

> **createCarouselContainer**(`options`): `Promise`\<[`ContainerResponse`](../interfaces/ContainerResponse.md)\>

Defined in: src/api/publishing.ts:77

Create a carousel container

#### Parameters

##### options

[`CreateCarouselContainerOptions`](../interfaces/CreateCarouselContainerOptions.md)

Child container IDs and optional caption

#### Returns

`Promise`\<[`ContainerResponse`](../interfaces/ContainerResponse.md)\>

***

### createResumableUpload()

> **createResumableUpload**(`options`): `Promise`\<[`ContainerResponse`](../interfaces/ContainerResponse.md)\>

Defined in: src/api/publishing.ts:94

Create a resumable upload session

#### Parameters

##### options

[`ResumableUploadOptions`](../interfaces/ResumableUploadOptions.md)

Media type and settings

#### Returns

`Promise`\<[`ContainerResponse`](../interfaces/ContainerResponse.md)\>

***

### getContainerStatus()

> **getContainerStatus**(`containerId`): `Promise`\<[`ContainerStatus`](../interfaces/ContainerStatus.md)\>

Defined in: src/api/publishing.ts:111

Get container status

#### Parameters

##### containerId

`string`

Container ID

#### Returns

`Promise`\<[`ContainerStatus`](../interfaces/ContainerStatus.md)\>

***

### publishContainer()

> **publishContainer**(`containerId`): `Promise`\<[`PublishResponse`](../interfaces/PublishResponse.md)\>

Defined in: src/api/publishing.ts:122

Publish a container

#### Parameters

##### containerId

`string`

Container ID to publish

#### Returns

`Promise`\<[`PublishResponse`](../interfaces/PublishResponse.md)\>

***

### waitAndPublish()

> **waitAndPublish**(`containerId`, `maxAttempts`, `intervalMs`): `Promise`\<[`PublishResponse`](../interfaces/PublishResponse.md)\>

Defined in: src/api/publishing.ts:135

Wait for container to be ready, then publish

#### Parameters

##### containerId

`string`

Container ID

##### maxAttempts

`number` = `30`

Maximum number of status checks (default: 30)

##### intervalMs

`number` = `2000`

Interval between checks in ms (default: 2000)

#### Returns

`Promise`\<[`PublishResponse`](../interfaces/PublishResponse.md)\>
