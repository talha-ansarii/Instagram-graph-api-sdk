/**
 * Messaging API Module
 * 
 * Handles all messaging operations (Send API).
 */

import { HttpClient } from '../http';
import { MESSAGING_ENDPOINTS } from '../endpoints';
import {
  SendMessageResponse,
  SendTextOptions,
  SendMediaOptions,
  GenericTemplateOptions,
  ButtonTemplateOptions,
  QuickRepliesOptions,
  QuickReply,
  ReactionType,
  TemplateElement,
  TemplateButton,
} from '../types/messaging';

/**
 * Messaging API class for Instagram messaging operations
 */
export class MessagingApi {
  private readonly http: HttpClient;
  private readonly userId: string;

  constructor(http: HttpClient, userId: string) {
    this.http = http;
    this.userId = userId;
  }

  /**
   * Send a text message
   * @param recipientId - Instagram-scoped user ID (IGSID)
   * @param text - Message text
   * @param options - Optional settings (humanAgent for 7-day window)
   */
  async sendText(
    recipientId: string,
    text: string,
    options?: SendTextOptions
  ): Promise<SendMessageResponse> {
    const payload: Record<string, unknown> = {
      recipient: { id: recipientId },
      message: { text },
    };

    if (options?.humanAgent) {
      payload.messaging_type = 'MESSAGE_TAG';
      payload.tag = 'HUMAN_AGENT';
    }

    return this.http.post<SendMessageResponse>(
      MESSAGING_ENDPOINTS.SEND(this.userId),
      payload
    );
  }

  /**
   * Send a media message (image, video, audio)
   * @param recipientId - Instagram-scoped user ID
   * @param options - Media type and URL
   */
  async sendMedia(
    recipientId: string,
    options: SendMediaOptions
  ): Promise<SendMessageResponse> {
    return this.http.post<SendMessageResponse>(
      MESSAGING_ENDPOINTS.SEND(this.userId),
      {
        recipient: { id: recipientId },
        message: {
          attachment: {
            type: options.type,
            payload: { url: options.url },
          },
        },
      }
    );
  }

  /**
   * Send a sticker (like_heart)
   * @param recipientId - Instagram-scoped user ID
   */
  async sendLikeHeart(recipientId: string): Promise<SendMessageResponse> {
    return this.http.post<SendMessageResponse>(
      MESSAGING_ENDPOINTS.SEND(this.userId),
      {
        recipient: { id: recipientId },
        message: {
          attachment: {
            type: 'like_heart',
          },
        },
      }
    );
  }

  /**
   * Send a generic template
   * @param recipientId - Instagram-scoped user ID
   * @param options - Template elements
   */
  async sendGenericTemplate(
    recipientId: string,
    options: GenericTemplateOptions
  ): Promise<SendMessageResponse> {
    return this.http.post<SendMessageResponse>(
      MESSAGING_ENDPOINTS.SEND(this.userId),
      {
        recipient: { id: recipientId },
        message: {
          attachment: {
            type: 'template',
            payload: {
              template_type: 'generic',
              elements: options.elements,
            },
          },
        },
      }
    );
  }

  /**
   * Send a button template
   * @param recipientId - Instagram-scoped user ID
   * @param options - Text and buttons
   */
  async sendButtonTemplate(
    recipientId: string,
    options: ButtonTemplateOptions
  ): Promise<SendMessageResponse> {
    return this.http.post<SendMessageResponse>(
      MESSAGING_ENDPOINTS.SEND(this.userId),
      {
        recipient: { id: recipientId },
        message: {
          attachment: {
            type: 'template',
            payload: {
              template_type: 'button',
              text: options.text,
              buttons: options.buttons,
            },
          },
        },
      }
    );
  }

  /**
   * Send quick replies
   * @param recipientId - Instagram-scoped user ID
   * @param options - Text and quick reply options
   */
  async sendQuickReplies(
    recipientId: string,
    options: QuickRepliesOptions
  ): Promise<SendMessageResponse> {
    return this.http.post<SendMessageResponse>(
      MESSAGING_ENDPOINTS.SEND(this.userId),
      {
        recipient: { id: recipientId },
        message: {
          text: options.text,
          quick_replies: options.replies,
        },
      }
    );
  }

  /**
   * Send a private reply to a comment
   * @param commentId - Comment ID to reply to
   * @param message - Message text
   */
  async sendPrivateReply(
    commentId: string,
    message: string
  ): Promise<SendMessageResponse> {
    return this.http.post<SendMessageResponse>(
      MESSAGING_ENDPOINTS.SEND(this.userId),
      {
        recipient: { comment_id: commentId },
        message: { text: message },
      }
    );
  }

  /**
   * Share a published post via message
   * @param recipientId - Instagram-scoped user ID
   * @param mediaId - Media ID of the post to share
   */
  async sendMediaShare(
    recipientId: string,
    mediaId: string
  ): Promise<SendMessageResponse> {
    return this.http.post<SendMessageResponse>(
      MESSAGING_ENDPOINTS.SEND(this.userId),
      {
        recipient: { id: recipientId },
        message: {
          attachment: {
            type: 'MEDIA_SHARE',
            payload: { id: mediaId },
          },
        },
      }
    );
  }

  /**
   * React to a message
   * @param recipientId - Instagram-scoped user ID
   * @param messageId - Message ID to react to
   * @param reaction - Reaction type
   */
  async reactToMessage(
    recipientId: string,
    messageId: string,
    reaction: ReactionType
  ): Promise<SendMessageResponse> {
    return this.http.post<SendMessageResponse>(
      MESSAGING_ENDPOINTS.SEND(this.userId),
      {
        recipient: { id: recipientId },
        sender_action: 'react',
        payload: {
          message_id: messageId,
          reaction,
        },
      }
    );
  }

  /**
   * Remove reaction from a message
   * @param recipientId - Instagram-scoped user ID
   * @param messageId - Message ID to unreact from
   */
  async unreactToMessage(
    recipientId: string,
    messageId: string
  ): Promise<SendMessageResponse> {
    return this.http.post<SendMessageResponse>(
      MESSAGING_ENDPOINTS.SEND(this.userId),
      {
        recipient: { id: recipientId },
        sender_action: 'unreact',
        payload: {
          message_id: messageId,
        },
      }
    );
  }

  /**
   * Send typing indicator
   * @param recipientId - Instagram-scoped user ID
   * @param typing - Whether to show typing (true) or stop (false)
   */
  async sendTypingIndicator(
    recipientId: string,
    typing: boolean = true
  ): Promise<SendMessageResponse> {
    return this.http.post<SendMessageResponse>(
      MESSAGING_ENDPOINTS.SEND(this.userId),
      {
        recipient: { id: recipientId },
        sender_action: typing ? 'typing_on' : 'typing_off',
      }
    );
  }
}
