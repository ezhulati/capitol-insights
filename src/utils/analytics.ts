/**
 * Google Analytics Utility Functions
 * 
 * This file provides utility functions for interacting with Google Analytics
 * in a React-friendly way. It includes functions for tracking page views,
 * events, and user interactions.
 */

// Check if Google Analytics is loaded
const isGaLoaded = (): boolean => {
  return typeof window !== 'undefined' && typeof window.gtag === 'function';
};

// Track page view
export const pageview = (url: string, title?: string): void => {
  if (!isGaLoaded()) return;
  
  window.gtag('config', 'G-04T2WHMD23', {
    page_path: url,
    page_title: title || document.title
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
  [key: string]: any; // Allow custom parameters
}

export const event = (params: EventParams): void => {
  if (!isGaLoaded()) return;
  
  window.gtag('event', params.action, {
    event_category: params.category,
    event_label: params.label,
    value: params.value,
    non_interaction: params.nonInteraction,
    ...params
  });
  
  console.log(`[Analytics] Event: ${params.category} / ${params.action} / ${params.label || 'N/A'}`);
};

// Track user timing
export interface TimingParams {
  name: string;
  value: number; // Time in milliseconds
  category: string;
  label?: string;
}

export const timing = (params: TimingParams): void => {
  if (!isGaLoaded()) return;
  
  window.gtag('event', 'timing_complete', {
    name: params.name,
    value: params.value,
    event_category: params.category,
    event_label: params.label
  });
  
  console.log(`[Analytics] Timing: ${params.category} / ${params.name} / ${params.value}ms`);
};

// Set user properties
export const setUserProperties = (properties: Record<string, any>): void => {
  if (!isGaLoaded()) return;
  
  window.gtag('set', 'user_properties', properties);
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
    'custom_dimension2': process.env.NODE_ENV || 'development'
  });
  
  console.log('[Analytics] Initialized');
};

// Add TypeScript declarations for gtag
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export default {
  pageview,
  event,
  timing,
  setUserProperties,
  initAnalytics
};