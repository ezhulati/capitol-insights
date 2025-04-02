/**
 * Google Analytics Utility Functions
 * 
 * This file provides utility functions for interacting with Google Analytics
 * in a React-friendly way. It includes functions for tracking page views,
 * events, user interactions, and web vitals reporting.
 */

import { ReportHandler } from 'web-vitals';

// Check if Google Analytics is loaded
const isGaLoaded = (): boolean => {
  return typeof window !== 'undefined' && typeof window.gtag === 'function';
};

// Track page view
export const pageview = (url: string, title?: string): void => {
  if (!isGaLoaded()) return;
  
  window.gtag('config', 'G-04T2WHMD23', {
    page_path: url,
    page_title: title || document.title,
    send_page_view: true
  });
  
  console.log(`[Analytics] Pageview: ${url}`);
};

// Track event
export interface EventParams {
  action: string;
  category: string;
  label?: string;
  value?: number;
  nonInteraction?: boolean;
  error_message?: string;
  error_stack?: string;
  component_stack?: string;
  page_url?: string;
  user_agent?: string;
  [key: string]: any; // Allow custom parameters
}

export const event = (params: EventParams): void => {
  if (!isGaLoaded()) return;
  
  // Add timestamp and user agent info
  const eventParams = {
    ...params,
    timestamp: new Date().toISOString(),
    user_agent: navigator.userAgent,
    screen_resolution: `${window.screen.width}x${window.screen.height}`,
    viewport_size: `${window.innerWidth}x${window.innerHeight}`,
    language: navigator.language,
    time_zone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    // Add performance metrics
    performance_timing: {
      navigation_start: performance.timing?.navigationStart,
      dom_loading: performance.timing?.domLoading,
      dom_interactive: performance.timing?.domInteractive,
      dom_complete: performance.timing?.domComplete,
      load_event_end: performance.timing?.loadEventEnd
    }
  };
  
  window.gtag('event', params.action, {
    event_category: params.category,
    event_label: params.label,
    value: params.value,
    non_interaction: params.nonInteraction,
    ...eventParams
  });
  
  console.log(`[Analytics] Event: ${params.category} / ${params.action} / ${params.label || 'N/A'}`);
};

// Track user timing
export interface TimingParams {
  name: string;
  value: number; // Time in milliseconds
  category: string;
  label?: string;
  page_url?: string;
  user_agent?: string;
}

export const timing = (params: TimingParams): void => {
  if (!isGaLoaded()) return;
  
  window.gtag('event', 'timing_complete', {
    name: params.name,
    value: params.value,
    event_category: params.category,
    event_label: params.label,
    timestamp: new Date().toISOString(),
    page_url: window.location.href,
    user_agent: navigator.userAgent
  });
  
  console.log(`[Analytics] Timing: ${params.category} / ${params.name} / ${params.value}ms`);
};

// Set user properties
export const setUserProperties = (properties: Record<string, any>): void => {
  if (!isGaLoaded()) return;
  
  window.gtag('set', 'user_properties', {
    ...properties,
    last_updated: new Date().toISOString(),
    // Add device and browser info
    device_type: /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile/.test(navigator.userAgent) ? 'mobile' : 'desktop',
    browser: {
      name: navigator.userAgent.match(/(chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i)?.[1] || 'unknown',
      version: navigator.userAgent.match(/(chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i)?.[2] || 'unknown'
    }
  });
  
  console.log('[Analytics] Set user properties', properties);
};

// Initialize analytics with custom dimensions
export const initAnalytics = (): void => {
  if (!isGaLoaded()) {
    console.warn('[Analytics] Google Analytics not loaded');
    return;
  }
  
  // Set default custom dimensions
  window.gtag('set', {
    'custom_dimension1': 'Capitol Insights',
    'custom_dimension2': process.env.NODE_ENV || 'development',
    'custom_dimension3': process.env.VITE_APP_VERSION || 'unknown',
    'custom_dimension4': process.env.VITE_BUILD_TIME || 'unknown',
    'custom_dimension5': navigator.userAgent,
    'custom_dimension6': window.screen.width + 'x' + window.screen.height,
    'custom_dimension7': window.innerWidth + 'x' + window.innerHeight,
    'custom_dimension8': navigator.language,
    'custom_dimension9': Intl.DateTimeFormat().resolvedOptions().timeZone,
    // Add performance metrics
    'custom_dimension10': performance.timing?.navigationStart || 'unknown',
    'custom_dimension11': performance.timing?.domLoading || 'unknown',
    'custom_dimension12': performance.timing?.domInteractive || 'unknown',
    'custom_dimension13': performance.timing?.domComplete || 'unknown',
    'custom_dimension14': performance.timing?.loadEventEnd || 'unknown'
  });
  
  console.log('[Analytics] Initialized');
};

// Report web vitals
export const reportWebVitals = (onPerfEntry?: ReportHandler) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

// Add TypeScript declarations for gtag
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: any[]) => void;
  }
}

// Export default object for easier importing
export default {
  pageview,
  event,
  timing,
  setUserProperties,
  initAnalytics,
  reportWebVitals
};
