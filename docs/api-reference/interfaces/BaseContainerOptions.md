[**Instagram Graph API SDK v1.0.0**](../README.md)

***

[Instagram Graph API SDK](../README.md) / BaseContainerOptions

# Interface: BaseContainerOptions

Defined in: src/types/publishing.ts:18

Base container creation options

## Extended by

- [`CreateImageContainerOptions`](CreateImageContainerOptions.md)
- [`CreateVideoContainerOptions`](CreateVideoContainerOptions.md)
- [`CreateCarouselContainerOptions`](CreateCarouselContainerOptions.md)
- [`ResumableUploadOptions`](ResumableUploadOptions.md)

## Properties

### caption?

> `optional` **caption**: `string`

Defined in: src/types/publishing.ts:20

Caption for the media

***

### location\_id?

> `optional` **location\_id**: `string`

Defined in: src/types/publishing.ts:22

Location tag ID

***

### user\_tags?

> `optional` **user\_tags**: [`UserTag`](UserTag.md)[]

Defined in: src/types/publishing.ts:24

User tags

***

### collaborators?

> `optional` **collaborators**: `string`[]

Defined in: src/types/publishing.ts:26

Collaborators (creator accounts to invite)

***

### alt\_text?

> `optional` **alt\_text**: `string`

Defined in: src/types/publishing.ts:28

Alt text for accessibility
