import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { reportWebVitals } from './utils/analytics.ts';
import { TinaEditProvider } from 'tinacms/dist/edit-state';

// Mount app
const root = createRoot(document.getElementById('root')!);
root.render(
  <StrictMode>
    <TinaEditProvider editMode={<App />}>
      <App />
    </TinaEditProvider>
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
        console.log('ServiceWorker registration failed: ', error);
      }
    );
  });
}
