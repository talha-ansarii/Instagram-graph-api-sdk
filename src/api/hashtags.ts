/**
 * Hashtags API Module
 * 
 * Handles hashtag search and media retrieval.
 */

import { HttpClient } from '../http';
import { HASHTAG_ENDPOINTS } from '../endpoints';
import {
  IGHashtag,
  HashtagSearchOptions,
  HashtagSearchResponse,
  GetHashtagMediaOptions,
  HashtagMediaResponse,
} from '../types/hashtag';

/**
 * Hashtags API class for Instagram hashtag operations
 */
export class HashtagsApi {
  private readonly http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  /**
   * Search for a hashtag
   * @param options - User ID and search query
   */
  async search(options: HashtagSearchOptions): Promise<HashtagSearchResponse> {
    return this.http.get<HashtagSearchResponse>(
      HASHTAG_ENDPOINTS.SEARCH,
      {
        user_id: options.user_id,
        q: options.q,
      }
    );
  }

  /**
   * Get hashtag information
   * @param hashtagId - Hashtag ID
   */
  async get(hashtagId: string): Promise<IGHashtag> {
    return this.http.get<IGHashtag>(
      HASHTAG_ENDPOINTS.GET(hashtagId),
      { fields: 'id,name' }
    );
  }

  /**
   * Get recent media with hashtag
   * @param hashtagId - Hashtag ID
   * @param options - User ID and pagination options
   */
  async getRecentMedia(
    hashtagId: string,
    options: GetHashtagMediaOptions
  ): Promise<HashtagMediaResponse> {
    return this.http.get<HashtagMediaResponse>(
      HASHTAG_ENDPOINTS.RECENT_MEDIA(hashtagId),
      {
        user_id: options.user_id,
        fields: options.fields?.join(',') || 'id,caption,media_type,permalink',
        limit: options.limit,
        after: options.after,
      }
    );
  }

  /**
   * Get top media with hashtag
   * @param hashtagId - Hashtag ID
   * @param options - User ID and pagination options
   */
  async getTopMedia(
    hashtagId: string,
    options: GetHashtagMediaOptions
  ): Promise<HashtagMediaResponse> {
    return this.http.get<HashtagMediaResponse>(
      HASHTAG_ENDPOINTS.TOP_MEDIA(hashtagId),
      {
        user_id: options.user_id,
        fields: options.fields?.join(',') || 'id,caption,media_type,permalink',
        limit: options.limit,
        after: options.after,
      }
    );
  }
}
