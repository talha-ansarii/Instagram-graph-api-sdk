/**
 * Instagram Graph API SDK - Main Client
 * 
 * Type-safe TypeScript SDK for Instagram Graph API with Instagram Login.
 * 
 * @example
 * ```typescript
 * import { InstagramClient } from 'instagram-graph-api-sdk';
 * 
 * const client = new InstagramClient({
 *   accessToken: 'your-access-token',
 *   apiVersion: 'v22.0', // optional, defaults to 'v22.0'
 * });
 * 
 * // Get user profile
 * const profile = await client.users.getProfile({ fields: ['id', 'username'] });
 * console.log(profile);
 * ```
 */

import { HttpClient } from './http';
import { InstagramClientConfig } from './types/common';
import { IGUser } from './types/user';
import {
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
  WebhooksApi,
} from './api';

/**
 * Default API version
 */
const DEFAULT_API_VERSION = 'v22.0';

/**
 * Instagram Graph API Client
 * 
 * Main entry point for the SDK. Provides access to all API modules.
 */
export class InstagramClient {
  private readonly http: HttpClient;
  private readonly config: Required<InstagramClientConfig>;
  private cachedUserId: string | null = null;

  /** Authentication API - Token management */
  public readonly auth: AuthApi;

  /** Users API - Profile, media, insights */
  public readonly users: UsersApi;

  /** Media API - Get media, children, comments */
  public readonly media: MediaApi;

  /** Publishing API - Publish images, videos, reels */
  public readonly publishing: PublishingApi;

  /** Messaging API - Send messages, templates */
  public readonly messaging: MessagingApi;

  /** Conversations API - List conversations, messages */
  public readonly conversations: ConversationsApi;

  /** Comments API - Moderation */
  public readonly comments: CommentsApi;

  /** Hashtags API - Search, media */
  public readonly hashtags: HashtagsApi;

  /** Insights API - Analytics */
  public readonly insights: InsightsApi;

  /** Welcome Flows API - Welcome message flows */
  public readonly welcomeFlows: WelcomeFlowsApi;

  /** Messenger Profile API - Ice breakers, menu */
  public readonly messengerProfile: MessengerProfileApi;

  /** oEmbed API - Embed content */
  public readonly oembed: OEmbedApi;

  /** Webhooks API - Manage subscriptions */
  public readonly webhooks: WebhooksApi;

  /**
   * Create a new Instagram client
   * @param config - Client configuration
   */
  constructor(config: InstagramClientConfig) {
    this.config = {
      accessToken: config.accessToken,
      apiVersion: config.apiVersion || DEFAULT_API_VERSION,
      timeout: config.timeout || 30000,
    };

    this.http = new HttpClient({
      accessToken: this.config.accessToken,
      apiVersion: this.config.apiVersion,
      timeout: this.config.timeout,
    });

    // Initialize API modules
    // Note: User-specific APIs use 'me' as placeholder until setUserId is called
    const userId = 'me';

    this.auth = new AuthApi(this.http);
    this.users = new UsersApi(this.http, userId);
    this.media = new MediaApi(this.http);
    this.publishing = new PublishingApi(this.http, userId);
    this.messaging = new MessagingApi(this.http, userId);
    this.conversations = new ConversationsApi(this.http, userId);
    this.comments = new CommentsApi(this.http);
    this.hashtags = new HashtagsApi(this.http);
    this.insights = new InsightsApi(this.http, userId);
    this.welcomeFlows = new WelcomeFlowsApi(this.http, userId);
    this.messengerProfile = new MessengerProfileApi(this.http, userId);
    this.oembed = new OEmbedApi(this.http);
    this.webhooks = new WebhooksApi(this.http, userId);
  }

  /**
   * Get the current user ID
   * Fetches from API if not cached
   */
  async getUserId(): Promise<string> {
    if (this.cachedUserId) {
      return this.cachedUserId;
    }

    const user = await this.auth.me('id');
    this.cachedUserId = user.id;
    return user.id;
  }

  /**
   * Update the access token
   * @param accessToken - New access token
   */
  setAccessToken(accessToken: string): void {
    this.http.setAccessToken(accessToken);
  }

  /**
   * Get the current configuration
   */
  getConfig(): Readonly<Required<InstagramClientConfig>> {
    return { ...this.config };
  }

  /**
   * Get the API version
   */
  getApiVersion(): string {
    return this.config.apiVersion;
  }
}
