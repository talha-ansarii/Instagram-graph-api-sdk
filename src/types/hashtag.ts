/**
 * Hashtag Types for Instagram Graph API SDK
 */

import { IGMedia } from './media';
import { PaginatedResponse } from './common';

/**
 * Instagram Hashtag
 */
export interface IGHashtag {
  /** Hashtag ID */
  id: string;
  /** Hashtag name (without #) */
  name?: string;
}

/**
 * Hashtag search options
 */
export interface HashtagSearchOptions {
  /** User ID for context */
  user_id: string;
  /** Search query (hashtag name without #) */
  q: string;
}

/**
 * Hashtag search response
 */
export interface HashtagSearchResponse {
  data: IGHashtag[];
}

/**
 * Get hashtag media options
 */
export interface GetHashtagMediaOptions {
  /** User ID for context */
  user_id: string;
  /** Fields to return */
  fields?: string[];
  /** Maximum results */
  limit?: number;
  /** Pagination cursor */
  after?: string;
}

/**
 * Hashtag media response
 */
export type HashtagMediaResponse = PaginatedResponse<IGMedia>;
