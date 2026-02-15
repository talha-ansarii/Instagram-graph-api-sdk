/**
 * Instagram API Error Classes
 * 
 * Custom error classes for handling Instagram Graph API errors.
 */

/**
 * Base error class for Instagram API errors
 */
export class InstagramAPIError extends Error {
  public readonly code: number;
  public readonly type: string;
  public readonly subcode?: number;
  public readonly fbTraceId?: string;

  constructor(
    message: string,
    code: number,
    type: string,
    subcode?: number,
    fbTraceId?: string
  ) {
    super(message);
    this.name = 'InstagramAPIError';
    this.code = code;
    this.type = type;
    this.subcode = subcode;
    this.fbTraceId = fbTraceId;
    
    // Maintains proper stack trace for where error was thrown
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InstagramAPIError);
    }
  }

  /**
   * Create an InstagramAPIError from an API response
   */
  static fromResponse(response: InstagramErrorResponse): InstagramAPIError {
    const { error } = response;
    
    // Check for specific error types
    if (error.code === 190) {
      return new AuthenticationError(error.message, error.code, error.fbtrace_id);
    }
    
    if (error.code === 4 || error.code === 17 || error.code === 32) {
      return new RateLimitError(error.message, error.code, error.fbtrace_id);
    }
    
    if (error.code === 100) {
      return new ValidationError(error.message, error.code, error.error_subcode, error.fbtrace_id);
    }
    
    return new InstagramAPIError(
      error.message,
      error.code,
      error.type,
      error.error_subcode,
      error.fbtrace_id
    );
  }
}

/**
 * Authentication error (invalid/expired tokens)
 */
export class AuthenticationError extends InstagramAPIError {
  constructor(message: string, code: number = 190, fbTraceId?: string) {
    super(message, code, 'OAuthException', undefined, fbTraceId);
    this.name = 'AuthenticationError';
  }
}

/**
 * Rate limit exceeded error
 */
export class RateLimitError extends InstagramAPIError {
  public readonly retryAfter?: number;

  constructor(message: string, code: number = 4, fbTraceId?: string, retryAfter?: number) {
    super(message, code, 'RateLimitException', undefined, fbTraceId);
    this.name = 'RateLimitError';
    this.retryAfter = retryAfter;
  }
}

/**
 * Validation error (invalid parameters)
 */
export class ValidationError extends InstagramAPIError {
  constructor(message: string, code: number = 100, subcode?: number, fbTraceId?: string) {
    super(message, code, 'ValidationException', subcode, fbTraceId);
    this.name = 'ValidationError';
  }
}

/**
 * Network error (connection issues)
 */
export class NetworkError extends Error {
  public readonly originalError?: Error;

  constructor(message: string, originalError?: Error) {
    super(message);
    this.name = 'NetworkError';
    this.originalError = originalError;
    
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NetworkError);
    }
  }
}

/**
 * Instagram API error response structure
 */
export interface InstagramErrorResponse {
  error: {
    message: string;
    type: string;
    code: number;
    error_subcode?: number;
    fbtrace_id?: string;
  };
}

/**
 * Check if an error is an Instagram API error
 */
export function isInstagramAPIError(error: unknown): error is InstagramAPIError {
  return error instanceof InstagramAPIError;
}

/**
 * Check if an error is an authentication error
 */
export function isAuthenticationError(error: unknown): error is AuthenticationError {
  return error instanceof AuthenticationError;
}

/**
 * Check if an error is a rate limit error
 */
export function isRateLimitError(error: unknown): error is RateLimitError {
  return error instanceof RateLimitError;
}

/**
 * Check if an error is a validation error
 */
export function isValidationError(error: unknown): error is ValidationError {
  return error instanceof ValidationError;
}
