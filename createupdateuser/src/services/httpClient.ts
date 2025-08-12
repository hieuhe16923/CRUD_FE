// Base API configuration
const API_BASE_URL = 'https://petstore.swagger.io/v2';

/**
 * HTTP Client wrapper for making API requests
 * Provides centralized error handling and request configuration
 */
class HttpClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  /**
   * Get the base URL
   */
  getBaseURL(): string {
    return this.baseURL;
  }

  /**
   * Generic request method
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    // Default headers (only add Content-Type if not provided in options)
    const defaultHeaders: HeadersInit = {};
    
    // Only add default Content-Type if not specified in options
    if (!options.headers || !('Content-Type' in options.headers)) {
      defaultHeaders['Content-Type'] = 'application/json';
    }

    // Add authorization header if token exists
    const token = localStorage.getItem('authToken');
    if (token) {
      defaultHeaders.Authorization = `Bearer ${token}`;
    }

    const config: RequestInit = {
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      // Handle non-2xx responses
      if (!response.ok) {
        throw new ApiError(
          `HTTP ${response.status}: ${response.statusText}`,
          response.status,
          endpoint
        );
      }

      // Handle empty responses (204 No Content, etc.)
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        return response.text() as unknown as T;
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(
        `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        0,
        endpoint
      );
    }
  }

  /**
   * GET request
   */
  async get<T>(endpoint: string, headers?: HeadersInit): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET', headers });
  }

  /**
   * POST request
   */
  async post<T>(endpoint: string, data?: unknown, headers?: HeadersInit): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
      headers,
    });
  }

  /**
   * POST request with form data
   */
  async postForm<T>(endpoint: string, data?: Record<string, string | number | boolean>, headers?: HeadersInit): Promise<T> {
    const formData = new URLSearchParams();
    if (data) {
      Object.keys(data).forEach(key => {
        if (data[key] !== undefined && data[key] !== null) {
          formData.append(key, String(data[key]));
        }
      });
    }

    const formHeaders: HeadersInit = {
      'Content-Type': 'application/x-www-form-urlencoded',
      ...headers,
    };

    return this.request<T>(endpoint, {
      method: 'POST',
      body: formData.toString(),
      headers: formHeaders,
    });
  }

  /**
   * PUT request
   */
  async put<T>(endpoint: string, data?: unknown, headers?: HeadersInit): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
      headers,
    });
  }

  /**
   * PUT request with form data
   */
  async putForm<T>(endpoint: string, data?: Record<string, string | number | boolean>, headers?: HeadersInit): Promise<T> {
    const formData = new URLSearchParams();
    if (data) {
      Object.keys(data).forEach(key => {
        if (data[key] !== undefined && data[key] !== null) {
          formData.append(key, String(data[key]));
        }
      });
    }

    const formHeaders: HeadersInit = {
      'Content-Type': 'application/x-www-form-urlencoded',
      ...headers,
    };

    return this.request<T>(endpoint, {
      method: 'PUT',
      body: formData.toString(),
      headers: formHeaders,
    });
  }

  /**
   * DELETE request
   */
  async delete<T>(endpoint: string, headers?: HeadersInit): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE', headers });
  }
}

/**
 * Custom API Error class for better error handling
 */
export class ApiError extends Error {
  status: number;
  endpoint: string;
  
  constructor(
    message: string,
    status: number,
    endpoint: string
  ) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.endpoint = endpoint;
  }
}

// Export singleton instance
export const httpClient = new HttpClient(API_BASE_URL);
