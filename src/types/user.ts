/**
 * User Types for Instagram Graph API SDK
 */

import { PaginatedResponse } from './common';
import { IGMedia } from './media';

/**
 * Instagram User account type
 */
export type IGAccountType = 'BUSINESS' | 'MEDIA_CREATOR' | 'PERSONAL';

/**
 * Instagram User profile fields
 */
export interface IGUser {
  /** The User's ID */
  id: string;
  /** The User's account type */
  account_type?: IGAccountType;
  /** The User's biography */
  biography?: string;
  /** The number of followers */
  followers_count?: number;
  /** The number of accounts following */
  follows_count?: number;
  /** The number of media objects */
  media_count?: number;
  /** The User's username */
  username?: string;
  /** The User's name */
  name?: string;
  /** The User's profile picture URL */
  profile_picture_url?: string;
  /** The User's website */
  website?: string;
  /** Instagram user ID */
  ig_id?: number;
}

/**
 * Available fields for IGUser
 */
export const IG_USER_FIELDS = [
  'id',
  'account_type',
  'biography',
  'followers_count',
  'follows_count',
  'media_count',
  'username',
  'name',
  'profile_picture_url',
  'website',
  'ig_id',
] as const;

export type IGUserField = (typeof IG_USER_FIELDS)[number];

/**
 * Business Discovery response
 */
export interface BusinessDiscovery {
  business_discovery: Partial<IGUser> & {
    media?: PaginatedResponse<IGMedia>;
  };
  id: string;
}

/**
 * Content publishing limit
 */
export interface ContentPublishingLimit {
  quota_usage: number;
  config: {
    quota_total: number;
    quota_duration: number;
  };
}

/**
 * User mentions response
 */
export interface UserMention {
  id: string;
  timestamp?: string;
  caption?: string;
  media_type?: string;
  media_url?: string;
  permalink?: string;
  username?: string;
}

/**
 * Recently searched hashtag
 */
export interface RecentlySearchedHashtag {
  id: string;
  name?: string;
}

/**
 * Available catalog
 */
export interface AvailableCatalog {
  catalog_id: string;
  catalog_name?: string;
  shop_name?: string;
  product_count?: number;
}

/**
 * Catalog product
 */
export interface CatalogProduct {
  product_id: string;
  merchant_id?: string;
  product_name?: string;
  image_url?: string;
  retailer_id?: string;
  review_status?: string;
  is_checkout_flow?: boolean;
}

/**
 * User profile request options
 */
export interface GetUserProfileOptions {
  fields?: IGUserField[];
}

/**
 * User media request options
 */
export interface GetUserMediaOptions {
  fields?: string[];
  limit?: number;
  after?: string;
  before?: string;
}

/**
 * Business discovery options
 */
export interface BusinessDiscoveryOptions {
  username: string;
  fields?: string[];
}
