import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { reportWebVitals } from './utils/analytics.ts';

// Mount app
const root = createRoot(document.getElementById('root')!);

// Render the main application
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Initialize web vitals reporting
reportWebVitals((metric) => {
  // Send to analytics in production
  if (process.env.NODE_ENV !== 'development') {
    // This would connect to an analytics service in production
    console.log(metric);
  }
});

// Register service worker
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(
      (registration) => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      },
      (error) => {
        console.error('ServiceWorker registration failed: ', error);
        // Don't block app loading if service worker fails
      }
    ).catch(error => {
      console.error('ServiceWorker registration error: ', error);
      // Don't block app loading if service worker fails
    });
  });
}
