[**Instagram Graph API SDK v1.0.0**](../README.md)

***

[Instagram Graph API SDK](../README.md) / ListWithFieldsOptions

# Interface: ListWithFieldsOptions

Defined in: src/types/common.ts:100

Combined list options with fields

## Extends

- [`ListOptions`](ListOptions.md).[`FieldsOptions`](FieldsOptions.md)

## Properties

### limit?

> `optional` **limit**: `number`

Defined in: src/types/common.ts:82

Maximum number of items to return

#### Inherited from

[`ListOptions`](ListOptions.md).[`limit`](ListOptions.md#limit)

***

### after?

> `optional` **after**: `string`

Defined in: src/types/common.ts:84

Pagination cursor (after)

#### Inherited from

[`ListOptions`](ListOptions.md).[`after`](ListOptions.md#after)

***

### before?

> `optional` **before**: `string`

Defined in: src/types/common.ts:86

Pagination cursor (before)

#### Inherited from

[`ListOptions`](ListOptions.md).[`before`](ListOptions.md#before)

***

### fields?

> `optional` **fields**: [`FieldsParam`](../type-aliases/FieldsParam.md)

Defined in: src/types/common.ts:94

Fields to include in response

#### Inherited from

[`FieldsOptions`](FieldsOptions.md).[`fields`](FieldsOptions.md#fields)
