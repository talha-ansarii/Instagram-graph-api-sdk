/**
 * Users API Module
 * 
 * Handles all user-related API operations.
 */

import { HttpClient } from '../http';
import { USER_ENDPOINTS } from '../endpoints';
import {
  IGUser,
  IGUserField,
  ContentPublishingLimit,
  BusinessDiscovery,
  RecentlySearchedHashtag,
  AvailableCatalog,
  CatalogProduct,
  GetUserProfileOptions,
  GetUserMediaOptions,
  BusinessDiscoveryOptions,
} from '../types/user';
import { IGMedia } from '../types/media';
import { PaginatedResponse, formatFields } from '../types/common';

/**
 * Users API class for Instagram user operations
 */
export class UsersApi {
  private readonly http: HttpClient;
  private readonly userId: string;

  constructor(http: HttpClient, userId: string) {
    this.http = http;
    this.userId = userId;
  }

  /**
   * Get user profile information
   * @param options - Fields to retrieve
   */
  async getProfile(options?: GetUserProfileOptions): Promise<IGUser> {
    const fields = options?.fields?.join(',') || 'id,username,account_type';
    return this.http.get<IGUser>(USER_ENDPOINTS.PROFILE(this.userId), { fields });
  }

  /**
   * Get user's media
   * @param options - Pagination and fields options
   */
  async getMedia(options?: GetUserMediaOptions): Promise<PaginatedResponse<IGMedia>> {
    return this.http.get<PaginatedResponse<IGMedia>>(
      USER_ENDPOINTS.MEDIA(this.userId),
      {
        fields: formatFields(options?.fields) || 'id,caption,media_type,media_url,permalink,timestamp',
        limit: options?.limit,
        after: options?.after,
        before: options?.before,
      }
    );
  }

  /**
   * Get user's stories
   */
  async getStories(): Promise<PaginatedResponse<IGMedia>> {
    return this.http.get<PaginatedResponse<IGMedia>>(
      USER_ENDPOINTS.STORIES(this.userId),
      { fields: 'id,media_type,media_url,timestamp' }
    );
  }

  /**
   * Get user's live media
   */
  async getLiveMedia(): Promise<PaginatedResponse<IGMedia>> {
    return this.http.get<PaginatedResponse<IGMedia>>(
      USER_ENDPOINTS.LIVE_MEDIA(this.userId),
      { fields: 'id,media_type,timestamp' }
    );
  }

  /**
   * Get content publishing limit (quota usage)
   */
  async getContentPublishingLimit(): Promise<ContentPublishingLimit> {
    return this.http.get<ContentPublishingLimit>(
      USER_ENDPOINTS.CONTENT_PUBLISHING_LIMIT(this.userId),
      { fields: 'quota_usage,config' }
    );
  }

  /**
   * Discover another business account by username
   * @param options - Username and fields to retrieve
   */
  async getBusinessDiscovery(options: BusinessDiscoveryOptions): Promise<BusinessDiscovery> {
    const fields = options.fields?.join(',') || 'id,username,followers_count,media_count';
    return this.http.get<BusinessDiscovery>(
      USER_ENDPOINTS.BUSINESS_DISCOVERY(this.userId),
      {
        fields: `business_discovery.username(${options.username}){${fields}}`,
      }
    );
  }

  /**
   * Get media where user is mentioned
   */
  async getMentionedMedia(): Promise<PaginatedResponse<IGMedia>> {
    return this.http.get<PaginatedResponse<IGMedia>>(
      USER_ENDPOINTS.MENTIONED_MEDIA(this.userId),
      { fields: 'id,caption,media_type,timestamp' }
    );
  }

  /**
   * Get comments where user is mentioned
   */
  async getMentionedComment(): Promise<PaginatedResponse<{ id: string; text?: string }>> {
    return this.http.get<PaginatedResponse<{ id: string; text?: string }>>(
      USER_ENDPOINTS.MENTIONED_COMMENT(this.userId),
      { fields: 'id,text,timestamp' }
    );
  }

  /**
   * Get media user is tagged in
   */
  async getTags(): Promise<PaginatedResponse<IGMedia>> {
    return this.http.get<PaginatedResponse<IGMedia>>(
      USER_ENDPOINTS.TAGS(this.userId),
      { fields: 'id,media_type,timestamp' }
    );
  }

  /**
   * Get recently searched hashtags
   */
  async getRecentlySearchedHashtags(): Promise<PaginatedResponse<RecentlySearchedHashtag>> {
    return this.http.get<PaginatedResponse<RecentlySearchedHashtag>>(
      USER_ENDPOINTS.RECENTLY_SEARCHED_HASHTAGS(this.userId)
    );
  }

  /**
   * Get available product catalogs
   */
  async getAvailableCatalogs(): Promise<PaginatedResponse<AvailableCatalog>> {
    return this.http.get<PaginatedResponse<AvailableCatalog>>(
      USER_ENDPOINTS.AVAILABLE_CATALOGS(this.userId)
    );
  }

  /**
   * Search products in a catalog
   * @param catalogId - Catalog ID to search in
   * @param query - Search query
   */
  async searchCatalogProducts(
    catalogId: string,
    query: string
  ): Promise<PaginatedResponse<CatalogProduct>> {
    return this.http.get<PaginatedResponse<CatalogProduct>>(
      USER_ENDPOINTS.CATALOG_PRODUCT_SEARCH(this.userId),
      { catalog_id: catalogId, q: query }
    );
  }
}
