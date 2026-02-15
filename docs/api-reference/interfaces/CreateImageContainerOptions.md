[**Instagram Graph API SDK v1.0.0**](../README.md)

***

[Instagram Graph API SDK](../README.md) / CreateImageContainerOptions

# Interface: CreateImageContainerOptions

Defined in: src/types/publishing.ts:43

Image container creation options

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

### image\_url

> **image\_url**: `string`

Defined in: src/types/publishing.ts:45

URL to the image (must be publicly accessible)

***

### is\_carousel\_item?

> `optional` **is\_carousel\_item**: `boolean`

Defined in: src/types/publishing.ts:47

Whether this is a carousel item
