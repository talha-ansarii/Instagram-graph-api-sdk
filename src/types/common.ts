/**
 * Common Types for Instagram Graph API SDK
 */

/**
 * SDK Configuration options
 */
export interface InstagramClientConfig {
  /** Instagram User access token */
  accessToken: string;
  /** API version (default: 'v22.0') */
  apiVersion?: string;
  /** Request timeout in milliseconds (default: 30000) */
  timeout?: number;
}

/**
 * Pagination cursor for API responses
 */
export interface PagingCursors {
  before?: string;
  after?: string;
}

/**
 * Pagination info for list responses
 */
export interface Paging {
  cursors?: PagingCursors;
  next?: string;
  previous?: string;
}

/**
 * Generic paginated response
 */
export interface PaginatedResponse<T> {
  data: T[];
  paging?: Paging;
}

/**
 * Generic single item response
 */
export interface SingleResponse<T> {
  data: T;
}

/**
 * Success response for mutations
 */
export interface SuccessResponse {
  success: boolean;
}

/**
 * ID response for creates
 */
export interface IdResponse {
  id: string;
}

/**
 * Fields parameter type (comma-separated list)
 */
export type FieldsParam = string | string[];

/**
 * Convert fields to comma-separated string
 */
export function formatFields(fields?: FieldsParam): string | undefined {
  if (!fields) return undefined;
  if (Array.isArray(fields)) return fields.join(',');
  return fields;
}

/**
 * Base options for list requests
 */
export interface ListOptions {
  /** Maximum number of items to return */
  limit?: number;
  /** Pagination cursor (after) */
  after?: string;
  /** Pagination cursor (before) */
  before?: string;
}

/**
 * Options with fields selection
 */
export interface FieldsOptions {
  /** Fields to include in response */
  fields?: FieldsParam;
}

/**
 * Combined list options with fields
 */
export interface ListWithFieldsOptions extends ListOptions, FieldsOptions {}

/**
 * Time period for insights
 */
export type InsightsPeriod = 'day' | 'week' | 'days_28' | 'month' | 'lifetime';

/**
 * Metric breakdown type
 */
export type MetricBreakdown = 'age' | 'city' | 'country' | 'gender';
