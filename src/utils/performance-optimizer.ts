/**
 * Performance Optimization Utilities
 * 
 * This module provides utilities for optimizing application performance through:
 * - Resource preloading
 * - Critical path optimization
 * - Performance metrics tracking
 * - Adaptive resource loading based on network conditions
 */

import { useEffect, useState } from 'react';

/**
 * Network condition types that affect loading strategies
 */
export type NetworkCondition = 'fast' | 'medium' | 'slow' | 'offline';

/**
 * Interface for resource hints that can be added to the document
 */
interface ResourceHint {
  rel: 'preload' | 'prefetch' | 'preconnect' | 'dns-prefetch';
  href: string;
  as?: 'script' | 'style' | 'image' | 'font' | 'fetch';
  type?: string;
  crossOrigin?: '' | 'anonymous' | 'use-credentials';
  media?: string;
  imagesrcset?: string;
  imagesizes?: string;
}

/**
 * Detects current network conditions
 * 
 * @returns A hook that provides the current network condition
 */
export function useNetworkCondition(): NetworkCondition {
  const [networkCondition, setNetworkCondition] = useState<NetworkCondition>('medium');

  useEffect(() => {
    // Use the Network Information API if available
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      
      const updateNetworkCondition = () => {
        if (!navigator.onLine) {
          setNetworkCondition('offline');
          return;
        }

        if (connection) {
          const { effectiveType, downlink, rtt, saveData } = connection;
          
          if (effectiveType === '4g' && downlink >= 5 && rtt < 100) {
            setNetworkCondition('fast');
          } else if (effectiveType === '2g' || downlink < 0.5 || rtt > 500 || saveData) {
            setNetworkCondition('slow');
          } else {
            setNetworkCondition('medium');
          }
        } else {
          // Fallback if detailed info is not available
          setNetworkCondition('medium');
        }
      };
      
      updateNetworkCondition();
      
      // Listen for changes in connection quality
      connection.addEventListener('change', updateNetworkCondition);
      
      // Listen for online/offline status
      window.addEventListener('online', updateNetworkCondition);
      window.addEventListener('offline', updateNetworkCondition);
      
      return () => {
        connection.removeEventListener('change', updateNetworkCondition);
        window.removeEventListener('online', updateNetworkCondition);
        window.removeEventListener('offline', updateNetworkCondition);
      };
    } else {
      // Basic online/offline detection as fallback
      const handleOnlineStatus = () => {
        setNetworkCondition(navigator.onLine ? 'medium' : 'offline');
      };
      
      handleOnlineStatus();
      window.addEventListener('online', handleOnlineStatus);
      window.addEventListener('offline', handleOnlineStatus);
      
      return () => {
        window.removeEventListener('online', handleOnlineStatus);
        window.removeEventListener('offline', handleOnlineStatus);
      };
    }
  }, []);
  
  return networkCondition;
}

/**
 * Adds resource hints to the document head
 * 
 * @param hint The resource hint configuration
 * @returns Function to remove the hint when no longer needed
 */
export function addResourceHint(hint: ResourceHint): () => void {
  const linkEl = document.createElement('link');
  linkEl.rel = hint.rel;
  linkEl.href = hint.href;
  
  if (hint.as) linkEl.setAttribute('as', hint.as);
  if (hint.type) linkEl.setAttribute('type', hint.type);
  if (hint.crossOrigin) linkEl.setAttribute('crossorigin', hint.crossOrigin);
  if (hint.media) linkEl.setAttribute('media', hint.media);
  if (hint.imagesrcset) linkEl.setAttribute('imagesrcset', hint.imagesrcset);
  if (hint.imagesizes) linkEl.setAttribute('imagesizes', hint.imagesizes);
  
  document.head.appendChild(linkEl);
  
  // Return cleanup function
  return () => {
    if (document.head.contains(linkEl)) {
      document.head.removeChild(linkEl);
    }
  };
}

/**
 * Preloads critical resources based on the current route
 * 
 * @param route The current application route
 */
export function preloadRouteResources(route: string): void {
  // Resource mapping based on routes
  const criticalResources: Record<string, ResourceHint[]> = {
    '/': [
      { rel: 'preload', href: '/images/texas-capitol.jpg', as: 'image' },
      { rel: 'preload', href: '/uploads/team/drew-campbell.jpg', as: 'image' },
      { rel: 'preload', href: '/uploads/team/byron-campbell.jpg', as: 'image' }
    ],
    '/services': [
      { rel: 'preload', href: '/images/approach-capitol.jpg', as: 'image' }
    ],
    '/team': [
      { rel: 'preload', href: '/uploads/team/drew-campbell.jpg', as: 'image' },
      { rel: 'preload', href: '/uploads/team/byron-campbell.jpg', as: 'image' }
    ],
    '/contact': [
      { rel: 'preload', href: '/images/approach-capitol.jpg', as: 'image' }
    ]
  };
  
  // Clean up any existing hints (optional)
  document.querySelectorAll('link[data-auto-hint="true"]').forEach(el => {
    document.head.removeChild(el);
  });
  
  // Add route-specific resource hints
  const resources = criticalResources[route] || [];
  resources.forEach(resource => {
    const linkEl = document.createElement('link');
    linkEl.rel = resource.rel;
    linkEl.href = resource.href;
    if (resource.as) linkEl.setAttribute('as', resource.as);
    linkEl.setAttribute('data-auto-hint', 'true');
    document.head.appendChild(linkEl);
  });
}

/**
 * Tracks and logs Core Web Vitals and other performance metrics
 */
export function trackPerformanceMetrics(): void {
  if ('performance' in window && 'getEntriesByType' in performance) {
    // Wait for the page to be fully loaded
    window.addEventListener('load', () => {
      // Slight delay to ensure metrics are available
      setTimeout(() => {
        try {
          // Get navigation timing data
          const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
          
          if (navigationEntry) {
            // Calculate important metrics
            const ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
            const fcp = performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0;
            const domComplete = navigationEntry.domComplete;
            const loadComplete = navigationEntry.loadEventEnd;
            
            // Log performance metrics
            console.log('📊 Performance Metrics:');
            console.log(`⏱️ Time to First Byte: ${ttfb.toFixed(2)}ms`);
            console.log(`🎨 First Contentful Paint: ${fcp.toFixed(2)}ms`);
            console.log(`🏗️ DOM Complete: ${domComplete.toFixed(2)}ms`);
            console.log(`✅ Load Complete: ${loadComplete.toFixed(2)}ms`);
            
            // Report to backend analytics (placeholder)
            // reportToAnalytics({ ttfb, fcp, domComplete, loadComplete });
          }
        } catch (error) {
          console.error('Error collecting performance metrics:', error);
        }
      }, 0);
    });
  }
}

/**
 * Hook to detect if a resource is in the user's cache
 * 
 * @param url URL of the resource to check
 * @returns Boolean indicating if the resource is likely cached
 */
export function useIsCached(url: string): boolean {
  const [isCached, setIsCached] = useState(false);
  
  useEffect(() => {
    if (!('caches' in window)) {
      return;
    }
    
    const checkCache = async () => {
      try {
        const cache = await caches.match(url);
        setIsCached(!!cache);
      } catch (error) {
        console.error('Error checking cache:', error);
        setIsCached(false);
      }
    };
    
    checkCache();
  }, [url]);
  
  return isCached;
}

/**
 * Initializes performance monitoring and optimization when the app starts
 */
export function initializePerformanceOptimization(): void {
  // Track performance metrics
  trackPerformanceMetrics();
  
  // Preconnect to origins
  const origins = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com'
  ];
  
  origins.forEach(origin => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = origin;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
  
  // Register timing observer for First Input Delay measurement
  if ('PerformanceObserver' in window) {
    try {
      const perfObserver = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          // Log FID - need to use the correct interface for first-input entries
          if (entry.entryType === 'first-input') {
            // Cast to PerformanceEventTiming interface which has processingStart
            const fidEntry = entry as PerformanceEventTiming;
            const fid = fidEntry.processingStart ? (fidEntry.processingStart - fidEntry.startTime) : 0;
            console.log(`⌨️ First Input Delay: ${fid.toFixed(2)}ms`);
          }
        }
      });
      
      perfObserver.observe({ type: 'first-input', buffered: true });
    } catch (e) {
      console.error('PerformanceObserver error:', e);
    }
  }
}
