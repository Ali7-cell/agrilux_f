/**
 * Agrilux Frontend API Configuration Utility
 * 
 * Dynamically resolves the backend API URL:
 * 1. Environment variable NEXT_PUBLIC_API_URL if specified.
 * 2. In browser runtime: http://127.0.0.1:8000 when running on localhost / 127.0.0.1.
 * 3. Deployed production backend URL fallback: https://crop-disease-prediction.fastapicloud.dev
 */

export function getApiUrl() {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    if (hostname === "localhost" || hostname === "127.0.0.1") {
      return "http://127.0.0.1:8000";
    }
  }
  return "https://crop-disease-prediction.fastapicloud.dev";
}

export const API_URL = getApiUrl();
