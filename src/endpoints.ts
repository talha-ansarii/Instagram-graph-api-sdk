/**
 * Instagram Graph API Endpoints
 * 
 * Centralized endpoint definitions for easy maintenance.
 * Update this file when Instagram API documentation changes.
 * 
 * Base URL: https://graph.instagram.com
 * API Version: Configurable (default: v22.0)
 */

export const INSTAGRAM_BASE_URL = 'https://graph.instagram.com';

/**
 * Build a full API URL with version
 */
export function buildUrl(version: string, path: string): string {
  return `${INSTAGRAM_BASE_URL}/${version}${path}`;
}

/**
 * User Endpoints
 */
export const USER_ENDPOINTS = {
  /** Get user profile: GET /{user-id} */
  PROFILE: (userId: string) => `/${userId}`,
  
  /** Get user media: GET /{user-id}/media */
  MEDIA: (userId: string) => `/${userId}/media`,
  
  /** Get user stories: GET /{user-id}/stories */
  STORIES: (userId: string) => `/${userId}/stories`,
  
  /** Get user insights: GET /{user-id}/insights */
  INSIGHTS: (userId: string) => `/${userId}/insights`,
  
  /** Get live media: GET /{user-id}/live_media */
  LIVE_MEDIA: (userId: string) => `/${userId}/live_media`,
  
  /** Get content publishing limit: GET /{user-id}/content_publishing_limit */
  CONTENT_PUBLISHING_LIMIT: (userId: string) => `/${userId}/content_publishing_limit`,
  
  /** Get business discovery: GET /{user-id}?fields=business_discovery.username(...) */
  BUSINESS_DISCOVERY: (userId: string) => `/${userId}`,
  
  /** Get mentioned media: GET /{user-id}/mentioned_media */
  MENTIONED_MEDIA: (userId: string) => `/${userId}/mentioned_media`,
  
  /** Get mentioned comment: GET /{user-id}/mentioned_comment */
  MENTIONED_COMMENT: (userId: string) => `/${userId}/mentioned_comment`,
  
  /** Get tags: GET /{user-id}/tags */
  TAGS: (userId: string) => `/${userId}/tags`,
  
  /** Get recently searched hashtags: GET /{user-id}/recently_searched_hashtags */
  RECENTLY_SEARCHED_HASHTAGS: (userId: string) => `/${userId}/recently_searched_hashtags`,
  
  /** Get available catalogs: GET /{user-id}/available_catalogs */
  AVAILABLE_CATALOGS: (userId: string) => `/${userId}/available_catalogs`,
  
  /** Search catalog products: GET /{user-id}/catalog_product_search */
  CATALOG_PRODUCT_SEARCH: (userId: string) => `/${userId}/catalog_product_search`,
} as const;

/**
 * Media Endpoints
 */
export const MEDIA_ENDPOINTS = {
  /** Get media by ID: GET /{media-id} */
  GET: (mediaId: string) => `/${mediaId}`,
  
  /** Get media children (carousel): GET /{media-id}/children */
  CHILDREN: (mediaId: string) => `/${mediaId}/children`,
  
  /** Get media comments: GET /{media-id}/comments */
  COMMENTS: (mediaId: string) => `/${mediaId}/comments`,
  
  /** Get media insights: GET /{media-id}/insights */
  INSIGHTS: (mediaId: string) => `/${mediaId}/insights`,
  
  /** Get media collaborators: GET /{media-id}/collaborators */
  COLLABORATORS: (mediaId: string) => `/${mediaId}/collaborators`,
  
  /** Get product tags: GET /{media-id}/product_tags */
  PRODUCT_TAGS: (mediaId: string) => `/${mediaId}/product_tags`,
} as const;

/**
 * Publishing Endpoints
 */
export const PUBLISHING_ENDPOINTS = {
  /** Create media container: POST /{user-id}/media */
  CREATE_CONTAINER: (userId: string) => `/${userId}/media`,
  
  /** Publish media: POST /{user-id}/media_publish */
  PUBLISH: (userId: string) => `/${userId}/media_publish`,
  
  /** Get container status: GET /{container-id} */
  CONTAINER_STATUS: (containerId: string) => `/${containerId}`,
} as const;

/**
 * Messaging Endpoints
 */
export const MESSAGING_ENDPOINTS = {
  /** Send message: POST /{user-id}/messages */
  SEND: (userId: string) => `/${userId}/messages`,
  
  /** Get conversations: GET /{user-id}/conversations */
  CONVERSATIONS: (userId: string) => `/${userId}/conversations`,
  
  /** Get conversation by ID: GET /{conversation-id} */
  CONVERSATION: (conversationId: string) => `/${conversationId}`,
  
  /** Get message by ID: GET /{message-id} */
  MESSAGE: (messageId: string) => `/${messageId}`,
} as const;

/**
 * Welcome Message Flow Endpoints
 */
export const WELCOME_FLOW_ENDPOINTS = {
  /** Get/Create/Update flows: /{user-id}/welcome_message_flows */
  FLOWS: (userId: string) => `/${userId}/welcome_message_flows`,
} as const;

/**
 * Messenger Profile Endpoints (Ice Breakers, Persistent Menu)
 */
export const MESSENGER_PROFILE_ENDPOINTS = {
  /** Get/Set/Delete profile: /{user-id}/messenger_profile */
  PROFILE: (userId: string) => `/${userId}/messenger_profile`,
} as const;

/**
 * Comment Endpoints
 */
export const COMMENT_ENDPOINTS = {
  /** Get comment: GET /{comment-id} */
  GET: (commentId: string) => `/${commentId}`,
  
  /** Get replies: GET /{comment-id}/replies */
  REPLIES: (commentId: string) => `/${commentId}/replies`,
  
  /** Reply to comment: POST /{comment-id}/replies */
  REPLY: (commentId: string) => `/${commentId}/replies`,
  
  /** Hide/Unhide comment: POST /{comment-id} */
  UPDATE: (commentId: string) => `/${commentId}`,
  
  /** Delete comment: DELETE /{comment-id} */
  DELETE: (commentId: string) => `/${commentId}`,
} as const;

/**
 * Hashtag Endpoints
 */
export const HASHTAG_ENDPOINTS = {
  /** Search hashtag: GET /ig_hashtag_search */
  SEARCH: '/ig_hashtag_search',
  
  /** Get hashtag: GET /{hashtag-id} */
  GET: (hashtagId: string) => `/${hashtagId}`,
  
  /** Get recent media: GET /{hashtag-id}/recent_media */
  RECENT_MEDIA: (hashtagId: string) => `/${hashtagId}/recent_media`,
  
  /** Get top media: GET /{hashtag-id}/top_media */
  TOP_MEDIA: (hashtagId: string) => `/${hashtagId}/top_media`,
} as const;

/**
 * Auth Endpoints (require access token)
 */
export const AUTH_ENDPOINTS = {
  /** Get current user: GET /me */
  ME: '/me',
  
  /** Refresh token: GET /refresh_access_token */
  REFRESH_TOKEN: '/refresh_access_token',
  
  /** Exchange token: GET /access_token */
  ACCESS_TOKEN: '/access_token',
} as const;

/**
 * OAuth Endpoints (for Instagram Business Login)
 * Note: These use different base URLs than the Graph API
 */
export const OAUTH_ENDPOINTS = {
  /** Authorization URL - redirect users here to start OAuth flow */
  AUTHORIZE: 'https://www.instagram.com/oauth/authorize',
  
  /** Short-lived token exchange: POST with form data */
  TOKEN: 'https://api.instagram.com/oauth/access_token',
  
  /** Long-lived token exchange: GET with query params */
  LONG_LIVED_TOKEN: 'https://graph.instagram.com/access_token',
} as const;

/**
 * oEmbed Endpoints
 */
export const OEMBED_ENDPOINTS = {
  /** Get oEmbed: GET /instagram_oembed */
  GET: '/instagram_oembed',
} as const;
