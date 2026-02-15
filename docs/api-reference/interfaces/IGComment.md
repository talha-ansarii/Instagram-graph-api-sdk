[**Instagram Graph API SDK v1.0.0**](../README.md)

***

[Instagram Graph API SDK](../README.md) / IGComment

# Interface: IGComment

Defined in: src/types/comment.ts:8

Instagram Comment

## Properties

### id

> **id**: `string`

Defined in: src/types/comment.ts:10

Comment ID

***

### text?

> `optional` **text**: `string`

Defined in: src/types/comment.ts:12

Comment text

***

### username?

> `optional` **username**: `string`

Defined in: src/types/comment.ts:14

Username of commenter

***

### timestamp?

> `optional` **timestamp**: `string`

Defined in: src/types/comment.ts:16

ISO 8601 timestamp

***

### like\_count?

> `optional` **like\_count**: `number`

Defined in: src/types/comment.ts:18

Like count

***

### hidden?

> `optional` **hidden**: `boolean`

Defined in: src/types/comment.ts:20

Is comment hidden

***

### from?

> `optional` **from**: `object`

Defined in: src/types/comment.ts:22

User who posted the comment

#### id

> **id**: `string`

#### username?

> `optional` **username**: `string`

***

### media?

> `optional` **media**: `object`

Defined in: src/types/comment.ts:27

Media this comment is on

#### id

> **id**: `string`

***

### parent\_id?

> `optional` **parent\_id**: `string`

Defined in: src/types/comment.ts:31

Parent comment (for replies)

***

### replies?

> `optional` **replies**: `object`

Defined in: src/types/comment.ts:33

Replies to this comment

#### data

> **data**: `IGComment`[]
