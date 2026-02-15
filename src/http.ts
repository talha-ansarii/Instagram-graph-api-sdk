/**
 * HTTP Client for Instagram Graph API
 * 
 * Axios-based HTTP client with interceptors for authentication,
 * error handling, and rate limiting.
 */

import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { INSTAGRAM_BASE_URL } from './endpoints';
import {
  InstagramAPIError,
  InstagramErrorResponse,
  NetworkError,
  RateLimitError,
} from './errors';

/**
 * HTTP Client configuration options
 */
export interface HttpClientConfig {
  /** Instagram User access token */
  accessToken: string;
  /** API version (e.g., 'v22.0') */
  apiVersion: string;
  /** Request timeout in milliseconds */
  timeout?: number;
  /** Custom headers */
  headers?: Record<string, string>;
}

/**
 * HTTP Client for making requests to Instagram Graph API
 */
export class HttpClient {
  private readonly client: AxiosInstance;
  private readonly config: HttpClientConfig;

  constructor(config: HttpClientConfig) {
    this.config = config;

    this.client = axios.create({
      baseURL: `${INSTAGRAM_BASE_URL}/${config.apiVersion}`,
      timeout: config.timeout ?? 30000,
      headers: {
        'Content-Type': 'application/json',
        ...config.headers,
      },
    });

    this.setupInterceptors();
  }

  /**
   * Set up request and response interceptors
   */
  private setupInterceptors(): void {
    // Request interceptor - add access token
    this.client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // Add access token to all requests
        if (config.params) {
          config.params.access_token = this.config.accessToken;
        } else {
          config.params = { access_token: this.config.accessToken };
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor - handle errors
    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error) => {
        // Handle network errors
        if (!error.response) {
          throw new NetworkError(
            error.message || 'Network error occurred',
            error
          );
        }

        // Handle API errors
        const response = error.response;
        if (response.data?.error) {
          throw InstagramAPIError.fromResponse(response.data as InstagramErrorResponse);
        }

        // Handle rate limit headers
        if (response.status === 429) {
          const retryAfter = parseInt(response.headers['retry-after'] || '60', 10);
          throw new RateLimitError(
            'Rate limit exceeded',
            4,
            response.headers['x-fb-trace-id'],
            retryAfter
          );
        }

        // Generic error
        throw new InstagramAPIError(
          response.data?.message || 'Unknown error occurred',
          response.status,
          'UnknownError'
        );
      }
    );
  }

  /**
   * Update access token
   */
  public setAccessToken(accessToken: string): void {
    (this.config as { accessToken: string }).accessToken = accessToken;
  }

  /**
   * GET request
   */
  public async get<T>(
    path: string,
    params?: Record<string, unknown>,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.get<T>(path, {
      ...config,
      params: { ...params },
    });
    return response.data;
  }

  /**
   * POST request
   */
  public async post<T>(
    path: string,
    data?: Record<string, unknown>,
    params?: Record<string, unknown>,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.post<T>(path, data, {
      ...config,
      params: { ...params },
    });
    return response.data;
  }

  /**
   * DELETE request
   */
  public async delete<T>(
    path: string,
    params?: Record<string, unknown>,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.delete<T>(path, {
      ...config,
      params: { ...params },
    });
    return response.data;
  }

  /**
   * POST with form data (for file uploads)
   */
  public async postForm<T>(
    path: string,
    data: Record<string, unknown>,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const formData = new URLSearchParams();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });

    const response = await this.client.post<T>(path, formData, {
      ...config,
      headers: {
        ...config?.headers,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response.data;
  }
}
