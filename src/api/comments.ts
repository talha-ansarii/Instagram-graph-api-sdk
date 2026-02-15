/**
 * Comments API Module
 * 
 * Handles comment moderation operations.
 */

import { HttpClient } from '../http';
import { COMMENT_ENDPOINTS } from '../endpoints';
import {
  IGComment,
  IGCommentField,
  GetCommentsOptions,
  ReplyToCommentOptions,
  UpdateCommentOptions,
} from '../types/comment';
import { PaginatedResponse, SuccessResponse, IdResponse } from '../types/common';

/**
 * Comments API class for Instagram comment operations
 */
export class CommentsApi {
  private readonly http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  /**
   * Get comment by ID
   * @param commentId - Comment ID
   * @param fields - Fields to retrieve
   */
  async get(
    commentId: string,
    fields: IGCommentField[] = ['id', 'text', 'username', 'timestamp']
  ): Promise<IGComment> {
    return this.http.get<IGComment>(
      COMMENT_ENDPOINTS.GET(commentId),
      { fields: fields.join(',') }
    );
  }

  /**
   * Get replies to a comment
   * @param commentId - Comment ID
   * @param options - Pagination and fields options
   */
  async getReplies(
    commentId: string,
    options?: GetCommentsOptions
  ): Promise<PaginatedResponse<IGComment>> {
    return this.http.get<PaginatedResponse<IGComment>>(
      COMMENT_ENDPOINTS.REPLIES(commentId),
      {
        fields: options?.fields?.join(',') || 'id,text,username,timestamp',
        limit: options?.limit,
        after: options?.after,
      }
    );
  }

  /**
   * Reply to a comment
   * @param commentId - Comment ID to reply to
   * @param options - Reply message
   */
  async reply(commentId: string, options: ReplyToCommentOptions): Promise<IdResponse> {
    return this.http.post<IdResponse>(
      COMMENT_ENDPOINTS.REPLY(commentId),
      { message: options.message }
    );
  }

  /**
   * Hide a comment
   * @param commentId - Comment ID
   */
  async hide(commentId: string): Promise<SuccessResponse> {
    return this.http.post<SuccessResponse>(
      COMMENT_ENDPOINTS.UPDATE(commentId),
      { hide: true }
    );
  }

  /**
   * Unhide a comment
   * @param commentId - Comment ID
   */
  async unhide(commentId: string): Promise<SuccessResponse> {
    return this.http.post<SuccessResponse>(
      COMMENT_ENDPOINTS.UPDATE(commentId),
      { hide: false }
    );
  }

  /**
   * Delete a comment
   * @param commentId - Comment ID
   */
  async delete(commentId: string): Promise<SuccessResponse> {
    return this.http.delete<SuccessResponse>(COMMENT_ENDPOINTS.DELETE(commentId));
  }
}
