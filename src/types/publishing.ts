/**
 * Publishing Types for Instagram Graph API SDK
 */

/**
 * Container media type for publishing
 */
export type ContainerMediaType = 'IMAGE' | 'VIDEO' | 'REELS' | 'STORIES' | 'CAROUSEL';

/**
 * Container status code
 */
export type ContainerStatusCode = 'EXPIRED' | 'ERROR' | 'FINISHED' | 'IN_PROGRESS' | 'PUBLISHED';

/**
 * Base container creation options
 */
export interface BaseContainerOptions {
  /** Caption for the media */
  caption?: string;
  /** Location tag ID */
  location_id?: string;
  /** User tags */
  user_tags?: UserTag[];
  /** Collaborators (creator accounts to invite) */
  collaborators?: string[];
  /** Alt text for accessibility */
  alt_text?: string;
}

/**
 * User tag for media
 */
export interface UserTag {
  username: string;
  x?: number;
  y?: number;
}

/**
 * Image container creation options
 */
export interface CreateImageContainerOptions extends BaseContainerOptions {
  /** URL to the image (must be publicly accessible) */
  image_url: string;
  /** Whether this is a carousel item */
  is_carousel_item?: boolean;
}

/**
 * Video container creation options
 */
export interface CreateVideoContainerOptions extends BaseContainerOptions {
  /** URL to the video (must be publicly accessible) */
  video_url: string;
  /** Media type: VIDEO, REELS, or STORIES */
  media_type: 'VIDEO' | 'REELS' | 'STORIES';
  /** Whether to share reel to feed */
  share_to_feed?: boolean;
  /** Whether this is a carousel item */
  is_carousel_item?: boolean;
  /** Cover URL for video */
  cover_url?: string;
  /** Thumb offset for video cover (ms) */
  thumb_offset?: number;
  /** Audio name for reels */
  audio_name?: string;
}

/**
 * Carousel container creation options
 */
export interface CreateCarouselContainerOptions extends BaseContainerOptions {
  /** Array of child container IDs */
  children: string[];
}

/**
 * Resumable upload options
 */
export interface ResumableUploadOptions extends BaseContainerOptions {
  /** Media type: VIDEO, REELS, or STORIES */
  media_type: 'VIDEO' | 'REELS' | 'STORIES';
  /** Upload type */
  upload_type: 'resumable';
}

/**
 * Container creation response
 */
export interface ContainerResponse {
  id: string;
}

/**
 * Container status response
 */
export interface ContainerStatus {
  id: string;
  status_code?: ContainerStatusCode;
  status?: string;
}

/**
 * Publish response
 */
export interface PublishResponse {
  id: string;
}

/**
 * Trial reel options
 */
export interface TrialReelOptions {
  /** Graduation strategy */
  graduation_strategy: 'MANUAL' | 'SS_PERFORMANCE';
}
