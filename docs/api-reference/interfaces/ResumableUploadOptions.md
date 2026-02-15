[**Instagram Graph API SDK v1.0.0**](../README.md)

***

[Instagram Graph API SDK](../README.md) / ResumableUploadOptions

# Interface: ResumableUploadOptions

Defined in: src/types/publishing.ts:81

Resumable upload options

## Extends

- [`BaseContainerOptions`](BaseContainerOptions.md)

## Properties

### caption?

> `optional` **caption**: `string`

Defined in: src/types/publishing.ts:20

Caption for the media

#### Inherited from

[`BaseContainerOptions`](BaseContainerOptions.md).[`caption`](BaseContainerOptions.md#caption)

***

### location\_id?

> `optional` **location\_id**: `string`

Defined in: src/types/publishing.ts:22

Location tag ID

#### Inherited from

[`BaseContainerOptions`](BaseContainerOptions.md).[`location_id`](BaseContainerOptions.md#location_id)

***

### user\_tags?

> `optional` **user\_tags**: [`UserTag`](UserTag.md)[]

Defined in: src/types/publishing.ts:24

User tags

#### Inherited from

[`BaseContainerOptions`](BaseContainerOptions.md).[`user_tags`](BaseContainerOptions.md#user_tags)

***

### collaborators?

> `optional` **collaborators**: `string`[]

Defined in: src/types/publishing.ts:26

Collaborators (creator accounts to invite)

#### Inherited from

[`BaseContainerOptions`](BaseContainerOptions.md).[`collaborators`](BaseContainerOptions.md#collaborators)

***

### alt\_text?

> `optional` **alt\_text**: `string`

Defined in: src/types/publishing.ts:28

Alt text for accessibility

#### Inherited from

[`BaseContainerOptions`](BaseContainerOptions.md).[`alt_text`](BaseContainerOptions.md#alt_text)

***

### media\_type

> **media\_type**: `"VIDEO"` \| `"REELS"` \| `"STORIES"`

Defined in: src/types/publishing.ts:83

Media type: VIDEO, REELS, or STORIES

***

### upload\_type

> **upload\_type**: `"resumable"`

Defined in: src/types/publishing.ts:85

Upload type
