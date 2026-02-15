/**
 * Auth API Module
 * 
 * Handles authentication and token operations.
 */

import { HttpClient } from '../http';
import { AUTH_ENDPOINTS } from '../endpoints';
import { IGUser } from '../types/user';

/**
 * Token response from Instagram API
 */
export interface TokenResponse {
  access_token: string;
  token_type: string;
}

/**
 * Long-lived token response
 */
export interface LongLivedTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

/**
 * Auth API class for Instagram authentication operations
 */
export class AuthApi {
  private readonly http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  /**
   * Get current user information
   * @param fields - Fields to retrieve
   */
  async me(fields: string = 'id,username'): Promise<IGUser> {
    return this.http.get<IGUser>(AUTH_ENDPOINTS.ME, { fields });
  }

  /**
   * Refresh a long-lived token (Instagram Login)
   * Returns a new long-lived token with 60 days expiry
   */
  async refreshToken(): Promise<LongLivedTokenResponse> {
    return this.http.get<LongLivedTokenResponse>(
      AUTH_ENDPOINTS.REFRESH_TOKEN,
      { grant_type: 'ig_refresh_token' }
    );
  }

  /**
   * Exchange short-lived token for long-lived token (Instagram Login)
   * @param shortLivedToken - Short-lived access token (1 hour expiry)
   * @param appSecret - Instagram App Secret
   */
  async exchangeToken(
    shortLivedToken: string,
    appSecret: string
  ): Promise<LongLivedTokenResponse> {
    return this.http.get<LongLivedTokenResponse>(
      AUTH_ENDPOINTS.ACCESS_TOKEN,
      {
        grant_type: 'ig_exchange_token',
        client_secret: appSecret,
        access_token: shortLivedToken,
      }
    );
  }
}
