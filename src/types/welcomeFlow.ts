/**
 * Welcome Flow Types for Instagram Graph API SDK
 */

/**
 * Welcome message flow action
 */
export interface FlowAction {
  /** Action type */
  type: 'QUICK_REPLY' | 'ICE_BREAKER' | 'CTA';
  /** Title shown to user */
  title?: string;
  /** Payload sent back on click */
  payload?: string;
  /** URL for CTA actions */
  url?: string;
}

/**
 * Welcome message flow screen
 */
export interface FlowScreen {
  /** Screen ID */
  id?: string;
  /** Screen title */
  title?: string;
  /** Screen body text */
  body?: string;
  /** Actions on this screen */
  actions?: FlowAction[];
}

/**
 * Welcome message flow
 */
export interface WelcomeMessageFlow {
  /** Flow ID */
  flow_id?: string;
  /** Flow name */
  name?: string;
  /** Flow screens */
  screens?: FlowScreen[];
  /** Whether flow is active */
  is_active?: boolean;
  /** ISO 8601 timestamp */
  created_time?: string;
  /** ISO 8601 timestamp */
  updated_time?: string;
}

/**
 * Create/Update flow options
 */
export interface WelcomeFlowOptions {
  name: string;
  screens: FlowScreen[];
}

/**
 * Get flows response
 */
export interface WelcomeFlowsResponse {
  data: WelcomeMessageFlow[];
}
