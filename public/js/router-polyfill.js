/**
 * React Router Polyfill
 * 
 * This provides global constants that React Router depends on but that might
 * not be properly transformed during the build process, particularly in older
 * versions or with specific bundler configurations.
 */

// Define the Action enum constants that React Router uses
window.POP = 'POP';
window.PUSH = 'PUSH';
window.REPLACE = 'REPLACE';

console.log('[Router Polyfill] Initialized React Router constants');
