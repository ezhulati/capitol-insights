/**
 * CSRF Protection Utility
 * Provides functions for handling CSRF tokens in client-side forms
 */

/**
 * Fetch a CSRF token from the server
 * @returns {Promise<string>} A promise that resolves to the CSRF token
 */
export async function getCsrfToken(): Promise<string> {
  try {
    const response = await fetch('/.netlify/functions/get-csrf-token');
    
    if (!response.ok) {
      throw new Error(`Failed to fetch CSRF token: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.token;
  } catch (error) {
    console.error('Error fetching CSRF token:', error);
    throw error;
  }
}

/**
 * Add a CSRF token to form data
 * @param {Object} formData - The original form data object
 * @returns {Promise<Object>} A promise that resolves to form data with CSRF token
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function addCsrfTokenToForm<T extends Record<string, any>>(formData: T): Promise<T & {'csrf-token': string}> {
  const token = await getCsrfToken();
  
  return {
    ...formData,
    'csrf-token': token
  };
}

/**
 * Create a CSRF-protected fetch function for form submissions
 * @param {string} url - The URL to send the request to
 * @param {Object} options - Fetch options (method, headers, etc.)
 * @returns {Promise<Response>} A promise that resolves to the fetch response
 */
export async function csrfProtectedFetch(
  url: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: RequestInit & { body?: any } = {}
): Promise<Response> {
  // Get CSRF token
  const token = await getCsrfToken();
  
  // Create headers with CSRF token
  const headers = new Headers(options.headers || {});
  headers.append('X-CSRF-Token', token);
  
  // If this is a JSON request, add the token to the body as well
  let body = options.body;
  
  if (body && typeof body === 'object' && !(body instanceof FormData) && !(body instanceof URLSearchParams)) {
    // For JSON body
    body = JSON.stringify({
      ...JSON.parse(body.toString()),
      'csrf-token': token
    });
  } else if (body instanceof FormData) {
    // For FormData body
    body.append('csrf-token', token);
  } else if (body instanceof URLSearchParams) {
    // For URLSearchParams body
    body.append('csrf-token', token);
  }
  
  // Return fetch with CSRF protection
  return fetch(url, {
    ...options,
    headers,
    body
  });
}
