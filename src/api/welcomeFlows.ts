/**
 * Welcome Flows API Module
 * 
 * Handles welcome message flow operations.
 */

import { HttpClient } from '../http';
import { WELCOME_FLOW_ENDPOINTS } from '../endpoints';
import {
  WelcomeMessageFlow,
  WelcomeFlowOptions,
  WelcomeFlowsResponse,
} from '../types/welcomeFlow';
import { SuccessResponse, IdResponse } from '../types/common';

/**
 * Welcome Flows API class for managing welcome message flows
 */
export class WelcomeFlowsApi {
  private readonly http: HttpClient;
  private readonly userId: string;

  constructor(http: HttpClient, userId: string) {
    this.http = http;
    this.userId = userId;
  }

  /**
   * Get all welcome message flows
   */
  async list(): Promise<WelcomeFlowsResponse> {
    return this.http.get<WelcomeFlowsResponse>(
      WELCOME_FLOW_ENDPOINTS.FLOWS(this.userId)
    );
  }

  /**
   * Get a specific welcome message flow
   * @param flowId - Flow ID
   */
  async get(flowId: string): Promise<WelcomeMessageFlow> {
    return this.http.get<WelcomeMessageFlow>(
      WELCOME_FLOW_ENDPOINTS.FLOWS(this.userId),
      { flow_id: flowId }
    );
  }

  /**
   * Create a new welcome message flow
   * @param options - Flow name and screens
   */
  async create(options: WelcomeFlowOptions): Promise<IdResponse> {
    return this.http.post<IdResponse>(
      WELCOME_FLOW_ENDPOINTS.FLOWS(this.userId),
      {
        name: options.name,
        screens: options.screens,
      }
    );
  }

  /**
   * Update an existing welcome message flow
   * @param flowId - Flow ID
   * @param options - Updated flow name and screens
   */
  async update(flowId: string, options: WelcomeFlowOptions): Promise<SuccessResponse> {
    return this.http.post<SuccessResponse>(
      WELCOME_FLOW_ENDPOINTS.FLOWS(this.userId),
      {
        flow_id: flowId,
        name: options.name,
        screens: options.screens,
      }
    );
  }

  /**
   * Delete a welcome message flow
   * @param flowId - Flow ID
   */
  async delete(flowId: string): Promise<SuccessResponse> {
    return this.http.delete<SuccessResponse>(
      WELCOME_FLOW_ENDPOINTS.FLOWS(this.userId),
      { flow_id: flowId }
    );
  }
}
