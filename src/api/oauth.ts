/**
 * Instagram OAuth Module
 * 
 * Static methods for Instagram Business Login OAuth flow.
 * These methods don't require an access token.
 * 
 * @example
 * ```typescript
 * import { InstagramOAuth } from 'instagram-graph-api-sdk';
 * 
 * // 1. Build authorization URL
 * const authUrl = InstagramOAuth.buildAuthorizationUrl({
 *   clientId: 'your-app-id',
 *   redirectUri: 'https://your-app.com/callback',
 *   scopes: ['instagram_business_basic', 'instagram_business_manage_messages'],
 *   state: 'csrf-token',
 * });
 * 
 * // 2. Redirect user to authUrl...
 * 
 * // 3. In callback, exchange code for token
 * const tokens = await InstagramOAuth.exchangeCodeForToken({
 *   clientId: 'your-app-id',
 *   clientSecret: 'your-app-secret',
 *   code: 'code-from-callback',
 *   redirectUri: 'https://your-app.com/callback',
 * });
 * 
 * console.log(tokens.access_token); // Long-lived token (60 days)
 * console.log(tokens.user_id);      // Instagram User ID
 * ```
 */

import { OAUTH_ENDPOINTS } from '../endpoints';
import {
  AuthorizationUrlParams,
  ExchangeCodeParams,
  ShortLivedTokenResponse,
  LongLivedTokenResponse,
  OAuthTokenResponse,
  OAuthCallbackParams,
  InstagramScope,
} from '../types/oauth';

/**
 * Instagram OAuth - Static methods for authentication flow
 * 
 * Use these methods for user onboarding (Instagram Business Login).
 * After obtaining a token, create an InstagramClient instance to make API calls.
 */
export class InstagramOAuth {
  /**
   * Build the Instagram authorization URL
   * 
   * Direct users to this URL to start the OAuth flow.
   * They will be asked to grant permissions to your app.
   * 
   * @param params - Authorization URL parameters
   * @returns Full authorization URL to redirect user to
   * 
   * @example
   * ```typescript
   * const url = InstagramOAuth.buildAuthorizationUrl({
   *   clientId: process.env.INSTAGRAM_APP_ID,
   *   redirectUri: `${process.env.APP_URL}/api/instagram/callback`,
   *   scopes: [
   *     'instagram_business_basic',
   *     'instagram_business_manage_messages',
   *   ],
   *   state: crypto.randomUUID(), // CSRF protection
   * });
   * 
   * // Redirect user to url
   * ```
   */
  static buildAuthorizationUrl(params: AuthorizationUrlParams): string {
    const {
      clientId,
      redirectUri,
      scopes,
      state,
      responseType = 'code',
      forceReauth,
    } = params;

    const queryParams = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      scope: scopes.join(','),
      response_type: responseType,
    });

    if (state) {
      queryParams.set('state', state);
    }

    if (forceReauth) {
      queryParams.set('force_reauth', 'true');
    }

    return `${OAUTH_ENDPOINTS.AUTHORIZE}?${queryParams.toString()}`;
  }

  /**
   * Parse OAuth callback parameters from URL
   * 
   * Use this to extract code, state, and error info from the callback URL.
   * 
   * @param url - The callback URL (or just the search params)
   * @returns Parsed callback parameters
   * 
   * @example
   * ```typescript
   * const params = InstagramOAuth.parseCallback(request.url);
   * 
   * if (params.error) {
   *   // User denied access
   *   console.log(params.error_description);
   * } else {
   *   // Exchange code for token
   *   const tokens = await InstagramOAuth.exchangeCodeForToken({
   *     code: params.code!,
   *     ...
   *   });
   * }
   * ```
   */
  static parseCallback(url: string): OAuthCallbackParams {
    const urlObj = new URL(url, 'https://placeholder.com');
    const params = urlObj.searchParams;

    let code = params.get('code') || undefined;
    
    // Strip #_ suffix that Instagram appends
    if (code) {
      code = code.replace(/#_$/, '');
    }

    return {
      code,
      state: params.get('state') || undefined,
      error: params.get('error') || undefined,
      error_reason: params.get('error_reason') || undefined,
      error_description: params.get('error_description') || undefined,
    };
  }

  /**
   * Exchange authorization code for tokens
   * 
   * This is the recommended method - it handles the full flow:
   * 1. Exchange code for short-lived token (1 hour)
   * 2. Exchange short-lived for long-lived token (60 days)
   * 
   * @param params - Exchange parameters
   * @returns Long-lived token response with user ID
   * @throws Error if exchange fails
   * 
   * @example
   * ```typescript
   * const tokens = await InstagramOAuth.exchangeCodeForToken({
   *   clientId: process.env.INSTAGRAM_APP_ID!,
   *   clientSecret: process.env.INSTAGRAM_APP_SECRET!,
   *   code: codeFromCallback,
   *   redirectUri: `${process.env.APP_URL}/api/instagram/callback`,
   * });
   * 
   * // Store tokens.access_token and tokens.user_id in your database
   * // Token expires in tokens.expires_in seconds (~60 days)
   * ```
   */
  static async exchangeCodeForToken(params: ExchangeCodeParams): Promise<OAuthTokenResponse> {
    // Step 1: Get short-lived token
    const shortLived = await this.getShortLivedToken(params);

    // Step 2: Exchange for long-lived token
    const longLived = await this.getLongLivedToken({
      clientSecret: params.clientSecret,
      accessToken: shortLived.access_token,
    });

    return {
      access_token: longLived.access_token,
      token_type: longLived.token_type,
      expires_in: longLived.expires_in,
      user_id: shortLived.user_id,
    };
  }

  /**
   * Get short-lived token from authorization code
   * 
   * Use this if you need more control over the token exchange process.
   * The short-lived token is valid for 1 hour.
   * 
   * @param params - Exchange parameters
   * @returns Short-lived token response
   * @throws Error if exchange fails
   */
  static async getShortLivedToken(params: ExchangeCodeParams): Promise<ShortLivedTokenResponse> {
    const { clientId, clientSecret, code, redirectUri } = params;

    // Clean the code - remove #_ suffix if present
    const cleanCode = code.replace(/#_$/, '');

    // POST with form data
    const formData = new FormData();
    formData.append('client_id', clientId);
    formData.append('client_secret', clientSecret);
    formData.append('grant_type', 'authorization_code');
    formData.append('redirect_uri', redirectUri);
    formData.append('code', cleanCode);

    const response = await fetch(OAUTH_ENDPOINTS.TOKEN, {
      method: 'POST',
      body: formData,
    });

    const responseText = await response.text();

    if (!response.ok) {
      let error: { error_message?: string; error?: { message?: string } };
      try {
        error = JSON.parse(responseText);
      } catch {
        error = { error_message: responseText };
      }
      throw new Error(
        error.error_message || 
        error.error?.message || 
        'Failed to exchange authorization code for token'
      );
    }

    const data = JSON.parse(responseText);

    // Handle both response formats:
    // New format: { data: [{ access_token, user_id, permissions }] }
    // Legacy format: { access_token, user_id }
    if (data.data && Array.isArray(data.data) && data.data.length > 0) {
      return {
        access_token: data.data[0].access_token,
        user_id: data.data[0].user_id,
        permissions: data.data[0].permissions || '',
      };
    } else if (data.access_token) {
      return {
        access_token: data.access_token,
        user_id: data.user_id,
        permissions: data.permissions || '',
      };
    }

    throw new Error('Unexpected token response format');
  }

  /**
   * Exchange short-lived token for long-lived token
   * 
   * Long-lived tokens are valid for 60 days and can be refreshed.
   * 
   * @param params - Exchange parameters
   * @returns Long-lived token response
   * @throws Error if exchange fails
   */
  static async getLongLivedToken(params: {
    clientSecret: string;
    accessToken: string;
  }): Promise<LongLivedTokenResponse> {
    const { clientSecret, accessToken } = params;

    const queryParams = new URLSearchParams({
      grant_type: 'ig_exchange_token',
      client_secret: clientSecret,
      access_token: accessToken,
    });

    const response = await fetch(
      `${OAUTH_ENDPOINTS.LONG_LIVED_TOKEN}?${queryParams.toString()}`
    );

    const responseText = await response.text();

    if (!response.ok) {
      let error: { error?: { message?: string } };
      try {
        error = JSON.parse(responseText);
      } catch {
        error = { error: { message: responseText } };
      }
      throw new Error(
        error.error?.message || 'Failed to exchange for long-lived token'
      );
    }

    return JSON.parse(responseText);
  }

  /**
   * Get the default scopes for Instagram Business Login
   * 
   * @returns Array of commonly used scopes
   */
  static getDefaultScopes(): InstagramScope[] {
    return [
      'instagram_business_basic',
      'instagram_business_manage_messages',
      'instagram_business_manage_comments',
      'instagram_business_content_publish',
    ];
  }

  /**
   * Get all available Instagram Business Login scopes
   * 
   * @returns Array of all available scopes
   */
  static getAllScopes(): InstagramScope[] {
    return [
      'instagram_business_basic',
      'instagram_business_manage_messages',
      'instagram_business_manage_comments',
      'instagram_business_content_publish',
      'instagram_business_manage_insights',
    ];
  }
}

// Re-export types for convenience
export type {
  AuthorizationUrlParams,
  ExchangeCodeParams,
  ShortLivedTokenResponse,
  LongLivedTokenResponse,
  OAuthTokenResponse,
  OAuthCallbackParams,
  OAuthConfig,
  InstagramScope,
} from '../types/oauth';
