/**
 * Content Security Policy (CSP) Nonce Generator
 * 
 * This utility generates cryptographically strong nonces for use with
 * Content Security Policy to allow specific inline scripts while maintaining
 * a strong CSP that blocks most inline scripts.
 */

/**
 * Generate a cryptographically secure random nonce for use with Content Security Policy
 * 
 * @returns A base64 encoded nonce string
 */
export function generateNonce(): string {
  // Create a buffer with random bytes
  const randomBytes = new Uint8Array(16);
  
  // Fill with cryptographically strong random values
  crypto.getRandomValues(randomBytes);
  
  // Convert the random bytes to a base64 string
  const nonce = btoa(String.fromCharCode.apply(null, Array.from(randomBytes)));
  
  return nonce;
}

/**
 * Get the current nonce from the page, or generate a new one if none exists
 * This allows components to use the same nonce throughout a page render
 * 
 * @returns The current CSP nonce
 */
export function getNonce(): string {
  if (typeof window === 'undefined') {
    // Server-side rendering case
    return generateNonce();
  }
  
  // Look for an existing nonce on the page
  let nonce = window.__CSP_NONCE__;
  
  // If no nonce exists yet, generate one and store it
  if (!nonce) {
    nonce = generateNonce();
    window.__CSP_NONCE__ = nonce;
  }
  
  return nonce;
}

// Extend the Window interface to include our nonce property
declare global {
  interface Window {
    __CSP_NONCE__?: string;
  }
}
