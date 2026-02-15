[**Instagram Graph API SDK v1.0.0**](../README.md)

***

[Instagram Graph API SDK](../README.md) / AttachmentPayload

# Interface: AttachmentPayload

Defined in: src/types/messaging.ts:23

Message attachment payload

## Properties

### url?

> `optional` **url**: `string`

Defined in: src/types/messaging.ts:25

URL of the attachment

***

### attachment\_id?

> `optional` **attachment\_id**: `string`

Defined in: src/types/messaging.ts:27

Attachment ID (for uploaded assets)

***

### id?

> `optional` **id**: `string`

Defined in: src/types/messaging.ts:29

Media ID (for MEDIA_SHARE)

***

### template\_type?

> `optional` **template\_type**: `"generic"` \| `"button"`

Defined in: src/types/messaging.ts:31

Template type

***

### elements?

> `optional` **elements**: [`TemplateElement`](TemplateElement.md)[]

Defined in: src/types/messaging.ts:33

Template elements

***

### text?

> `optional` **text**: `string`

Defined in: src/types/messaging.ts:35

Button template text

***

### buttons?

> `optional` **buttons**: [`TemplateButton`](TemplateButton.md)[]

Defined in: src/types/messaging.ts:37

Buttons
