/**
 * Insights Types for Instagram Graph API SDK
 */

/**
 * Insight metric value
 */
export interface InsightValue {
  value: number | Record<string, number>;
  end_time?: string;
}

/**
 * Insight data point
 */
export interface InsightData {
  id: string;
  name: string;
  period: string;
  values: InsightValue[];
  title: string;
  description: string;
}

/**
 * Insights response
 */
export interface InsightsResponse {
  data: InsightData[];
}

/**
 * Account insight metrics
 * Updated to match current Instagram Graph API v22.0
 */
export type AccountMetric =
  | 'reach'
  | 'follower_count'
  | 'website_clicks'
  | 'profile_views'
  | 'online_followers'
  | 'accounts_engaged'
  | 'total_interactions'
  | 'likes'
  | 'comments'
  | 'shares'
  | 'saves'
  | 'replies'
  | 'engaged_audience_demographics'
  | 'reached_audience_demographics'
  | 'follower_demographics'
  | 'follows_and_unfollows'
  | 'profile_links_taps'
  | 'views';

/**
 * Media insight metrics
 */
export type MediaMetric =
  | 'engagement'
  | 'impressions'
  | 'reach'
  | 'saved'
  | 'video_views'
  | 'likes'
  | 'comments'
  | 'shares'
  | 'plays'
  | 'total_interactions';

/**
 * Insights period
 */
export type InsightPeriod = 'day' | 'week' | 'days_28' | 'month' | 'lifetime';

/**
 * Get account insights options
 */
export interface GetAccountInsightsOptions {
  metric: AccountMetric[];
  period?: InsightPeriod;
  since?: number;
  until?: number;
  metric_type?: 'total_value' | 'time_series';
  breakdown?: 'age' | 'city' | 'country' | 'gender';
}

/**
 * Get media insights options
 */
export interface GetMediaInsightsOptions {
  metric: MediaMetric[];
}

/**
 * Demographics breakdown
 */
export interface DemographicsBreakdown {
  [key: string]: number;
}
