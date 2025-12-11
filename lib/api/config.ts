/**
 * API Configuration
 * Centralized API base URL configuration
 */
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

/**
 * Common headers for API requests
 */
export const API_HEADERS = {
  'Content-Type': 'application/json',
};

/**
 * API error handler
 */
export class APIError extends Error {
  constructor(
    message: string,
    public status?: number,
    public details?: unknown
  ) {
    super(message);
    this.name = 'APIError';
  }
}
