[**Instagram Graph API SDK v1.0.0**](../README.md)

***

[Instagram Graph API SDK](../README.md) / CreateVideoContainerOptions

# Interface: CreateVideoContainerOptions

Defined in: src/types/publishing.ts:53

Video container creation options

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

### video\_url

> **video\_url**: `string`

Defined in: src/types/publishing.ts:55

URL to the video (must be publicly accessible)

***

### media\_type

> **media\_type**: `"VIDEO"` \| `"REELS"` \| `"STORIES"`

Defined in: src/types/publishing.ts:57

Media type: VIDEO, REELS, or STORIES

***

### share\_to\_feed?

> `optional` **share\_to\_feed**: `boolean`

Defined in: src/types/publishing.ts:59

Whether to share reel to feed

***

### is\_carousel\_item?

> `optional` **is\_carousel\_item**: `boolean`

Defined in: src/types/publishing.ts:61

Whether this is a carousel item

***

### cover\_url?

> `optional` **cover\_url**: `string`

Defined in: src/types/publishing.ts:63

Cover URL for video

***

### thumb\_offset?

> `optional` **thumb\_offset**: `number`

Defined in: src/types/publishing.ts:65

Thumb offset for video cover (ms)

***

### audio\_name?

> `optional` **audio\_name**: `string`

Defined in: src/types/publishing.ts:67

Audio name for reels
