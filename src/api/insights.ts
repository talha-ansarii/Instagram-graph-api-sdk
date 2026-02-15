/**
 * Insights API Module
 * 
 * Handles account and media insights.
 */

import { HttpClient } from '../http';
import { USER_ENDPOINTS, MEDIA_ENDPOINTS } from '../endpoints';
import {
  InsightsResponse,
  GetAccountInsightsOptions,
  GetMediaInsightsOptions,
} from '../types/insights';

/**
 * Insights API class for Instagram analytics
 */
export class InsightsApi {
  private readonly http: HttpClient;
  private readonly userId: string;

  constructor(http: HttpClient, userId: string) {
    this.http = http;
    this.userId = userId;
  }

  /**
   * Get account insights
   * @param options - Metrics, period, and breakdown options
   */
  async getAccountInsights(options: GetAccountInsightsOptions): Promise<InsightsResponse> {
    return this.http.get<InsightsResponse>(
      USER_ENDPOINTS.INSIGHTS(this.userId),
      {
        metric: options.metric.join(','),
        period: options.period || 'day',
        since: options.since,
        until: options.until,
        metric_type: options.metric_type,
        breakdown: options.breakdown,
      }
    );
  }

  /**
   * Get media insights
   * @param mediaId - Media ID
   * @param options - Metrics to retrieve
   */
  async getMediaInsights(
    mediaId: string,
    options: GetMediaInsightsOptions
  ): Promise<InsightsResponse> {
    return this.http.get<InsightsResponse>(
      MEDIA_ENDPOINTS.INSIGHTS(mediaId),
      { metric: options.metric.join(',') }
    );
  }
}
