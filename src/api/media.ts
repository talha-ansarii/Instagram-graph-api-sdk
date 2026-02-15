/**
 * Media API Module
 * 
 * Handles all media-related API operations.
 */

import { HttpClient } from '../http';
import { MEDIA_ENDPOINTS } from '../endpoints';
import {
  IGMedia,
  IGMediaField,
  IGMediaChild,
  MediaCollaborator,
  ProductTag,
  GetMediaOptions,
  GetMediaChildrenOptions,
} from '../types/media';
import { IGComment, GetCommentsOptions } from '../types/comment';
import { InsightsResponse, GetMediaInsightsOptions, MediaMetric } from '../types/insights';
import { PaginatedResponse, formatFields } from '../types/common';

/**
 * Media API class for Instagram media operations
 */
export class MediaApi {
  private readonly http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  /**
   * Get media by ID
   * @param mediaId - Media ID
   * @param options - Fields to retrieve
   */
  async get(mediaId: string, options?: GetMediaOptions): Promise<IGMedia> {
    const fields = options?.fields?.join(',') || 'id,caption,media_type,media_url,permalink,timestamp';
    return this.http.get<IGMedia>(MEDIA_ENDPOINTS.GET(mediaId), { fields });
  }

  /**
   * Get carousel children
   * @param mediaId - Carousel media ID
   * @param options - Fields to retrieve
   */
  async getChildren(
    mediaId: string,
    options?: GetMediaChildrenOptions
  ): Promise<PaginatedResponse<IGMediaChild>> {
    const fields = formatFields(options?.fields) || 'id,media_type,media_url';
    return this.http.get<PaginatedResponse<IGMediaChild>>(
      MEDIA_ENDPOINTS.CHILDREN(mediaId),
      { fields }
    );
  }

  /**
   * Get comments on media
   * @param mediaId - Media ID
   * @param options - Pagination and fields options
   */
  async getComments(
    mediaId: string,
    options?: GetCommentsOptions
  ): Promise<PaginatedResponse<IGComment>> {
    return this.http.get<PaginatedResponse<IGComment>>(
      MEDIA_ENDPOINTS.COMMENTS(mediaId),
      {
        fields: formatFields(options?.fields) || 'id,text,username,timestamp',
        limit: options?.limit,
        after: options?.after,
      }
    );
  }

  /**
   * Get media insights
   * @param mediaId - Media ID
   * @param options - Metrics to retrieve
   */
  async getInsights(
    mediaId: string,
    options: GetMediaInsightsOptions
  ): Promise<InsightsResponse> {
    return this.http.get<InsightsResponse>(
      MEDIA_ENDPOINTS.INSIGHTS(mediaId),
      { metric: options.metric.join(',') }
    );
  }

  /**
   * Get media collaborators
   * @param mediaId - Media ID
   */
  async getCollaborators(mediaId: string): Promise<PaginatedResponse<MediaCollaborator>> {
    return this.http.get<PaginatedResponse<MediaCollaborator>>(
      MEDIA_ENDPOINTS.COLLABORATORS(mediaId),
      { fields: 'id,username' }
    );
  }

  /**
   * Get product tags on media
   * @param mediaId - Media ID
   */
  async getProductTags(mediaId: string): Promise<PaginatedResponse<ProductTag>> {
    return this.http.get<PaginatedResponse<ProductTag>>(
      MEDIA_ENDPOINTS.PRODUCT_TAGS(mediaId)
    );
  }
}
