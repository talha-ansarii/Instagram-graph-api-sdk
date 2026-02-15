/**
 * OAuth Types
 * 
 * Types for Instagram Business Login OAuth flow.
 */

/**
 * Available Instagram Business Login scopes
 */
export type InstagramScope =
  | 'instagram_business_basic'
  | 'instagram_business_manage_messages'
  | 'instagram_business_manage_comments'
  | 'instagram_business_content_publish'
  | 'instagram_business_manage_insights';

/**
 * OAuth configuration for your Instagram app
 */
export interface OAuthConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
}

/**
 * Parameters for building the authorization URL
 */
export interface AuthorizationUrlParams {
  /** Your Instagram App ID */
  clientId: string;
  /** Must exactly match one of your Valid OAuth Redirect URIs */
  redirectUri: string;
  /** List of permissions to request */
  scopes: InstagramScope[];
  /** Optional CSRF protection state */
  state?: string;
  /** Response type, always 'code' */
  responseType?: 'code';
  /** Force re-authentication even if user has active session */
  forceReauth?: boolean;
}

/**
 * Parameters for exchanging authorization code for tokens
 */
export interface ExchangeCodeParams {
  /** Your Instagram App ID */
  clientId: string;
  /** Your Instagram App Secret */
  clientSecret: string;
  /** Authorization code from callback (will be cleaned of #_ suffix) */
  code: string;
  /** Must exactly match the redirect_uri used in authorization */
  redirectUri: string;
}

/**
 * Short-lived token response from Instagram API
 * Valid for 1 hour
 */
export interface ShortLivedTokenResponse {
  access_token: string;
  user_id: string;
  permissions: string;
}

/**
 * Long-lived token response from Instagram API
 * Valid for 60 days
 */
export interface LongLivedTokenResponse {
  access_token: string;
  token_type: string;
  /** Token lifetime in seconds (typically ~5184000 for 60 days) */
  expires_in: number;
}

/**
 * Complete OAuth token response with user info
 * Returned by exchangeCodeForToken()
 */
export interface OAuthTokenResponse {
  /** Long-lived access token (60 days) */
  access_token: string;
  token_type: string;
  /** Token lifetime in seconds */
  expires_in: number;
  /** Instagram User ID */
  user_id: string;
}

/**
 * OAuth error response from Instagram
 */
export interface OAuthError {
  error: string;
  error_reason?: string;
  error_description?: string;
}

/**
 * OAuth callback parameters (parsed from redirect URL)
 */
export interface OAuthCallbackParams {
  /** Authorization code (if successful) */
  code?: string;
  /** State parameter (if provided in authorization request) */
  state?: string;
  /** Error type (if user denied or error occurred) */
  error?: string;
  /** Error reason */
  error_reason?: string;
  /** Human-readable error description */
  error_description?: string;
}
