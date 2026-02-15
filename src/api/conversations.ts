/**
 * Conversations API Module
 * 
 * Handles conversation and message retrieval.
 */

import { HttpClient } from '../http';
import { MESSAGING_ENDPOINTS } from '../endpoints';
import {
  Conversation,
  ConversationMessage,
  GetConversationsOptions,
} from '../types/messaging';
import { PaginatedResponse } from '../types/common';

/**
 * Conversations API class for Instagram conversation operations
 */
export class ConversationsApi {
  private readonly http: HttpClient;
  private readonly userId: string;

  constructor(http: HttpClient, userId: string) {
    this.http = http;
    this.userId = userId;
  }

  /**
   * Get list of conversations
   * @param options - Pagination and filter options
   */
  async list(options?: GetConversationsOptions): Promise<PaginatedResponse<Conversation>> {
    return this.http.get<PaginatedResponse<Conversation>>(
      MESSAGING_ENDPOINTS.CONVERSATIONS(this.userId),
      {
        platform: options?.platform || 'instagram',
        user_id: options?.user_id,
        limit: options?.limit,
        after: options?.after,
        fields: 'id,updated_time',
      }
    );
  }

  /**
   * Find conversation with a specific user
   * @param igsid - Instagram-scoped user ID
   */
  async findByUser(igsid: string): Promise<PaginatedResponse<Conversation>> {
    return this.http.get<PaginatedResponse<Conversation>>(
      MESSAGING_ENDPOINTS.CONVERSATIONS(this.userId),
      {
        platform: 'instagram',
        user_id: igsid,
        fields: 'id,updated_time',
      }
    );
  }

  /**
   * Get messages in a conversation
   * @param conversationId - Conversation ID
   * @param fields - Fields to retrieve (default: from,to)
   */
  async getMessages(
    conversationId: string,
    fields: string = 'messages{id,created_time,from,to,message}'
  ): Promise<{ messages: PaginatedResponse<ConversationMessage> }> {
    return this.http.get<{ messages: PaginatedResponse<ConversationMessage> }>(
      MESSAGING_ENDPOINTS.CONVERSATION(conversationId),
      { fields }
    );
  }

  /**
   * Get a specific message
   * @param messageId - Message ID
   * @param fields - Fields to retrieve
   */
  async getMessage(
    messageId: string,
    fields: string = 'id,created_time,from,to,message'
  ): Promise<ConversationMessage> {
    return this.http.get<ConversationMessage>(
      MESSAGING_ENDPOINTS.MESSAGE(messageId),
      { fields }
    );
  }
}
