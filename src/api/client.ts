/**
 * BioEvidence API Client
 *
 * Handles HTTP transport, error boundary normalization, and seamless fallback to
 * local structured mock datasets during local development or when backend services
 * (Python + FastAPI) are unreachable.
 */

export class ApiError extends Error {
  public status: number;
  public statusText: string;
  public endpoint: string;
  public details?: unknown;

  constructor(message: string, status: number, statusText: string, endpoint: string, details?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.statusText = statusText;
    this.endpoint = endpoint;
    this.details = details;
  }
}

const API_BASE_URL: string = (import.meta as any).env?.VITE_API_URL || '';

export function getApiBaseUrl(): string {
  return API_BASE_URL;
}

export function isUsingMockData(): boolean {
  return !API_BASE_URL;
}

export async function apiClient<T>(
  endpoint: string,
  options?: RequestInit,
  fallbackData?: () => T | Promise<T>
): Promise<T> {
  if (API_BASE_URL) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      if (!response.ok) {
        let errorPayload: unknown;
        try {
          errorPayload = await response.json();
        } catch {
          errorPayload = await response.text().catch(() => null);
        }

        const errorMessage = `API request to ${endpoint} failed with HTTP ${response.status} (${response.statusText})`;

        if (fallbackData) {
          console.warn(`[BioEvidence API] ${errorMessage}. Falling back to demo data.`, errorPayload);
          return await fallbackData();
        }

        throw new ApiError(errorMessage, response.status, response.statusText, endpoint, errorPayload);
      }

      try {
        const data: T = await response.json();
        return data;
      } catch (jsonErr) {
        const parseErrorMessage = `API response from ${endpoint} was not valid JSON`;
        if (fallbackData) {
          console.warn(`[BioEvidence API] ${parseErrorMessage}. Falling back to demo data.`, jsonErr);
          return await fallbackData();
        }
        throw new ApiError(parseErrorMessage, response.status, 'MALFORMED_JSON', endpoint, jsonErr);
      }
    } catch (netErr: unknown) {
      if (netErr instanceof ApiError) {
        throw netErr;
      }

      const netMsg = `Network failure communicating with ${API_BASE_URL}${endpoint}`;
      if (fallbackData) {
        console.warn(`[BioEvidence API] ${netMsg}. Utilizing offline demo dataset.`, netErr);
        await new Promise((resolve) => setTimeout(resolve, 80));
        return await fallbackData();
      }

      throw new ApiError(netMsg, 0, 'NETWORK_ERROR', endpoint, netErr);
    }
  }

  // Pure demo/mock environment fallback
  if (fallbackData) {
    await new Promise((resolve) => setTimeout(resolve, 80));
    return await fallbackData();
  }

  throw new ApiError(`Endpoint ${endpoint} not available and no fallback provided.`, 404, 'NOT_FOUND', endpoint);
}

