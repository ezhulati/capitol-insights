import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

type MetricName = 'CLS' | 'FID' | 'FCP' | 'LCP' | 'TTFB';

interface MetricObject {
  name: MetricName;
  value: number;
  delta: number;
  id: string;
}

// Function to report web vitals metrics
export const reportWebVitals = (
   
  onMetric?: (metric: MetricObject) => void
) => {
  if (onMetric && typeof onMetric === 'function') {
    getCLS(metric => onMetric(metric as MetricObject));
    getFID(metric => onMetric(metric as MetricObject));
    getFCP(metric => onMetric(metric as MetricObject));
    getLCP(metric => onMetric(metric as MetricObject));
    getTTFB(metric => onMetric(metric as MetricObject));
  }
};

// Analytics event tracking
export const trackEvent = (
  category: string,
  action: string,
  label?: string,
  value?: number
) => {
  // This would connect to actual analytics services in production
  // For now, just log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Analytics] ${category} - ${action} - ${label || ''} - ${value || ''}`);
  }
  
  // Example of how we would send to Google Analytics
  // if (window.gtag) {
  //   window.gtag('event', action, {
  //     event_category: category,
  //     event_label: label,
  //     value: value
  //   });
  // }
};

// Page view tracking
export const trackPageView = (path: string, title: string) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Analytics] Page View: ${path} - ${title}`);
  }
  
  // Example of how we would send to Google Analytics
  // if (window.gtag) {
  //   window.gtag('config', 'G-XXXXXXXXXX', {
  //     page_path: path,
  //     page_title: title
  //   });
  // }
};