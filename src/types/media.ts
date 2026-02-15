/**
 * Media Types for Instagram Graph API SDK
 */

import { PaginatedResponse } from './common';

/**
 * Media type
 */
export type MediaType = 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';

/**
 * Media product type
 */
export type MediaProductType = 'FEED' | 'REELS' | 'STORY';

/**
 * Instagram Media object
 */
export interface IGMedia {
  /** The Media's ID */
  id: string;
  /** Caption text */
  caption?: string;
  /** Media type */
  media_type?: MediaType;
  /** Media product type (FEED, REELS, STORY) */
  media_product_type?: MediaProductType;
  /** URL to the media */
  media_url?: string;
  /** Permalink to the media on Instagram */
  permalink?: string;
  /** Thumbnail URL (for videos) */
  thumbnail_url?: string;
  /** ISO 8601 timestamp */
  timestamp?: string;
  /** Username of the owner */
  username?: string;
  /** Like count */
  like_count?: number;
  /** Comments count */
  comments_count?: number;
  /** Is comments enabled */
  is_comment_enabled?: boolean;
  /** Is shared to feed */
  is_shared_to_feed?: boolean;
  /** Owner ID */
  owner?: { id: string };
  /** Shortcode */
  shortcode?: string;
}

/**
 * Available fields for IGMedia
 */
export const IG_MEDIA_FIELDS = [
  'id',
  'caption',
  'media_type',
  'media_product_type',
  'media_url',
  'permalink',
  'thumbnail_url',
  'timestamp',
  'username',
  'like_count',
  'comments_count',
  'is_comment_enabled',
  'is_shared_to_feed',
  'owner',
  'shortcode',
] as const;

export type IGMediaField = (typeof IG_MEDIA_FIELDS)[number];

/**
 * Carousel child media
 */
export interface IGMediaChild {
  id: string;
  media_type?: MediaType;
  media_url?: string;
  timestamp?: string;
}

/**
 * Media collaborator
 */
export interface MediaCollaborator {
  id: string;
  username?: string;
}

/**
 * Product tag on media
 */
export interface ProductTag {
  product_id: string;
  merchant_id?: string;
  name?: string;
  image_url?: string;
  x?: number;
  y?: number;
}

/**
 * Media children response
 */
export type MediaChildrenResponse = PaginatedResponse<IGMediaChild>;

/**
 * Get media options
 */
export interface GetMediaOptions {
  fields?: IGMediaField[];
}

/**
 * Get media children options
 */
export interface GetMediaChildrenOptions {
  fields?: string[];
}
