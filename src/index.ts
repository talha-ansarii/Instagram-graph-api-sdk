/**
 * Instagram Graph API SDK
 * 
 * Type-safe TypeScript SDK for Instagram Graph API with Instagram Login.
 * 
 * @packageDocumentation
 */

// Main client
export { InstagramClient } from './client';

// OAuth (static methods - no access token required)
export { InstagramOAuth } from './api/oauth';

// HTTP Client
export { HttpClient, HttpClientConfig } from './http';

// Errors
export {
  InstagramAPIError,
  AuthenticationError,
  RateLimitError,
  ValidationError,
  NetworkError,
  InstagramErrorResponse,
  isInstagramAPIError,
  isAuthenticationError,
  isRateLimitError,
  isValidationError,
} from './errors';

// Endpoints (for advanced usage)
export {
  INSTAGRAM_BASE_URL,
  buildUrl,
  USER_ENDPOINTS,
  MEDIA_ENDPOINTS,
  PUBLISHING_ENDPOINTS,
  MESSAGING_ENDPOINTS,
  WELCOME_FLOW_ENDPOINTS,
  MESSENGER_PROFILE_ENDPOINTS,
  COMMENT_ENDPOINTS,
  HASHTAG_ENDPOINTS,
  AUTH_ENDPOINTS,
  OAUTH_ENDPOINTS,
  OEMBED_ENDPOINTS,
} from './endpoints';

// API Classes
export {
  AuthApi,
  UsersApi,
  MediaApi,
  PublishingApi,
  MessagingApi,
  ConversationsApi,
  CommentsApi,
  HashtagsApi,
  InsightsApi,
  WelcomeFlowsApi,
  MessengerProfileApi,
  OEmbedApi,
  TokenResponse,
  LongLivedTokenResponse,
  // OAuth exports
  AuthorizationUrlParams,
  ExchangeCodeParams,
  OAuthShortLivedTokenResponse,
  OAuthTokenResponse,
  OAuthCallbackParams,
  OAuthConfig,
  InstagramScope,
  WebhooksApi,
} from './api';

// Webhooks
export { InstagramWebhooks } from './utils/webhooks';
export {
    WebhookEntry,
    // WebhookEvent, // Removed as it wasn't defined in types
    WebhookChange,
    WebhookPayload,
    WebhookMessagingEvent,
    SubscribedFieldsResponse,
} from './types/webhooks';

// Types
export * from './types';
export * from './types/oauth';
