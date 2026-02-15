/**
 * Messaging Types for Instagram Graph API SDK
 */

/**
 * Message recipient
 */
export interface MessageRecipient {
  /** Instagram-scoped user ID */
  id?: string;
  /** Comment ID for private replies */
  comment_id?: string;
}

/**
 * Message attachment type
 */
export type AttachmentType = 'image' | 'video' | 'audio' | 'file' | 'template' | 'like_heart' | 'MEDIA_SHARE';

/**
 * Message attachment payload
 */
export interface AttachmentPayload {
  /** URL of the attachment */
  url?: string;
  /** Attachment ID (for uploaded assets) */
  attachment_id?: string;
  /** Media ID (for MEDIA_SHARE) */
  id?: string;
  /** Template type */
  template_type?: 'generic' | 'button';
  /** Template elements */
  elements?: TemplateElement[];
  /** Button template text */
  text?: string;
  /** Buttons */
  buttons?: TemplateButton[];
}

/**
 * Message attachment
 */
export interface MessageAttachment {
  type: AttachmentType;
  payload?: AttachmentPayload;
}

/**
 * Template element for generic template
 */
export interface TemplateElement {
  title: string;
  subtitle?: string;
  image_url?: string;
  default_action?: {
    type: 'web_url';
    url: string;
  };
  buttons?: TemplateButton[];
}

/**
 * Template button
 */
export interface TemplateButton {
  type: 'web_url' | 'postback';
  title: string;
  url?: string;
  payload?: string;
}

/**
 * Quick reply
 */
export interface QuickReply {
  content_type: 'text' | 'user_phone_number' | 'user_email';
  title?: string;
  payload?: string;
}

/**
 * Message content
 */
export interface MessageContent {
  /** Text message */
  text?: string;
  /** Attachment */
  attachment?: MessageAttachment;
  /** Quick replies */
  quick_replies?: QuickReply[];
}

/**
 * Send message request
 */
export interface SendMessageRequest {
  recipient: MessageRecipient;
  message?: MessageContent;
  /** Sender action (react, unreact) */
  sender_action?: 'react' | 'unreact' | 'typing_on' | 'typing_off' | 'mark_seen';
  /** Payload for reactions */
  payload?: {
    message_id: string;
    reaction?: 'love' | 'like' | 'laugh' | 'wow' | 'sad' | 'angry';
  };
  /** Messaging type */
  messaging_type?: 'RESPONSE' | 'UPDATE' | 'MESSAGE_TAG';
  /** Message tag for outside 24hr window */
  tag?: 'HUMAN_AGENT';
}

/**
 * Send message response
 */
export interface SendMessageResponse {
  recipient_id: string;
  message_id: string;
}

/**
 * Conversation
 */
export interface Conversation {
  id: string;
  updated_time?: string;
}

/**
 * Conversation message
 */
export interface ConversationMessage {
  id: string;
  created_time?: string;
  from?: {
    id: string;
    username?: string;
  };
  to?: {
    data: Array<{
      id: string;
      username?: string;
    }>;
  };
  message?: string;
  is_unsupported?: boolean;
}

/**
 * Get conversations options
 */
export interface GetConversationsOptions {
  platform?: 'instagram';
  user_id?: string;
  limit?: number;
  after?: string;
}

/**
 * Send text message options
 */
export interface SendTextOptions {
  /** Use HUMAN_AGENT tag (7 day window) */
  humanAgent?: boolean;
}

/**
 * Send media message options
 */
export interface SendMediaOptions {
  /** Media type */
  type: 'image' | 'video' | 'audio';
  /** URL to the media */
  url: string;
}

/**
 * Generic template options
 */
export interface GenericTemplateOptions {
  elements: TemplateElement[];
}

/**
 * Button template options
 */
export interface ButtonTemplateOptions {
  text: string;
  buttons: TemplateButton[];
}

/**
 * Quick replies options
 */
export interface QuickRepliesOptions {
  text: string;
  replies: QuickReply[];
}

/**
 * Reaction type
 */
export type ReactionType = 'love' | 'like' | 'laugh' | 'wow' | 'sad' | 'angry';
