/**
 * Agrilux Frontend API Configuration Utility
 * 
 * Dynamically resolves the backend API URL:
 * 1. Environment variable NEXT_PUBLIC_API_URL if specified.
 * 2. In browser runtime: http://127.0.0.1:8000 when running on localhost / 127.0.0.1 (if specified).
 * 3. Deployed production backend URL fallback: https://crop-disease-prediction.fastapicloud.dev
 */

export function getApiUrl() {
  let url = process.env.NEXT_PUBLIC_API_URL;
  if (!url) {
    url = "https://crop-disease-prediction.fastapicloud.dev";
  }
  return url.replace(/\/+$/, "");
}

export const API_URL = getApiUrl();

/**
 * Handle 401 Unauthorized responses by clearing stored credentials
 * and redirecting the user back to the login screen.
 */
export function handleUnauthorized(router) {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    localStorage.removeItem("recommendedCrop");
    if (router && typeof router.push === "function") {
      router.push("/login");
    } else {
      window.location.href = "/login";
    }
  }
}

