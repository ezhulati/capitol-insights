import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { reportWebVitals } from './utils/analytics.ts';

// Error handling for root element
const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('Root element not found in DOM');
  throw new Error('Failed to find the root element');
}

// Log environment and build info
console.log('Application environment:', {
  NODE_ENV: process.env.NODE_ENV,
  VITE_APP_VERSION: import.meta.env.VITE_APP_VERSION,
  VITE_BUILD_TIME: import.meta.env.VITE_BUILD_TIME,
});

// Mount app with error boundary
const root = createRoot(rootElement);

// Render the main application with error handling
try {
  console.log('Starting application render...');
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
  console.log('Application rendered successfully');
  
  // Remove loading state
  const loadingElement = document.querySelector('.loading');
  if (loadingElement) {
    loadingElement.remove();
  }
} catch (error) {
  console.error('Failed to render application:', error);
  
  // Show error state
  const loadingElement = document.querySelector('.loading');
  if (loadingElement) {
    loadingElement.remove();
  }
  
  const errorContainer = document.getElementById('error-container');
  if (errorContainer) {
    errorContainer.style.display = 'flex';
  }
  
  // Log error details
  if (error instanceof Error) {
    console.error('Error stack:', error.stack);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
  }
}

// Initialize web vitals reporting
reportWebVitals((metric) => {
  // Send to analytics in production
  if (process.env.NODE_ENV !== 'development') {
    console.log('Web Vitals:', metric);
    // This would connect to an analytics service in production
  }
});

// Register service worker with improved error handling
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', async () => {
    try {
      console.log('Registering service worker...');
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
      
      // Handle service worker updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New content is available, refresh the page
              window.location.reload();
            }
          });
        }
      });
    } catch (error) {
      console.error('ServiceWorker registration failed: ', error);
      // Don't block app loading if service worker fails
    }
  });
}

// Add global error handler
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  // You could send this to an error tracking service
});

// Add unhandled rejection handler
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  // You could send this to an error tracking service
});

// Add offline/online status handling
window.addEventListener('online', () => {
  console.log('Application is online');
  // You could show a notification or update UI
});

window.addEventListener('offline', () => {
  console.log('Application is offline');
  // You could show a notification or update UI
});
