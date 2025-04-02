import { lazy, ComponentType, LazyExoticComponent } from 'react';
import analytics from './analytics';

/**
 * Options for enhanced lazy loading
 */
export interface LazyLoadOptions {
  /**
   * Optional callback to track component load performance
   */
  onLoad?: (componentName: string, loadTimeMs: number) => void;
  
  /**
   * Priority level for loading (affects prefetching strategy)
   */
  priority?: 'high' | 'medium' | 'low';
  
  /**
   * Debug mode to log loading events in console
   */
  debug?: boolean;
  
  /**
   * Name for the component (for debugging and performance tracking)
   */
  name?: string;
  
  /**
   * Timeout in milliseconds for loading attempts
   */
  timeout?: number;
  
  /**
   * Number of retry attempts for failed loads
   */
  retries?: number;
}

/**
 * Enhanced lazy component with preload and prefetch capabilities
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface EnhancedLazyComponent<T extends ComponentType<any>> extends LazyExoticComponent<T> {
  /**
   * Preload the component module immediately
   * @returns Promise that resolves when module is loaded
   */
  preload: () => Promise<{ default: T }>;
  
  /**
   * Prefetch the component with lower priority (using requestIdleCallback)
   * @returns Promise that resolves when module is fetched
   */
  prefetch: () => Promise<void>;
  
  /**
   * Warmup the component (load but don't initialize)
   * @returns Promise that resolves when warmed up
   */
  warmup: () => Promise<void>;
  
  /**
   * Flag indicating if this component has been loaded
   */
  isLoaded: boolean;
  
  /**
   * Flag indicating if this component has failed to load
   */
  hasError: boolean;
  
  /**
   * Last error that occurred during loading
   */
  lastError?: Error;
}

/**
 * Enhanced lazy loading with preload, prefetch, and performance tracking capabilities
 * 
 * @param factory Function that returns a promise for the component module
 * @param options Configuration options for lazy loading behavior
 * @returns Enhanced lazy component with additional loading methods
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function lazyWithPreload<T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>,
  options: LazyLoadOptions = {}
): EnhancedLazyComponent<T> {
  const {
    onLoad,
    priority = 'medium',
    debug = false,
    name = 'Component',
    timeout = 30000,
    retries = 3
  } = options;
  
  // Track component state
  let isComponentLoaded = false;
  let hasError = false;
  let lastError: Error | undefined;
  let retryCount = 0;
  
  // Wrap factory to add performance tracking and error handling
  const trackedFactory = async (): Promise<{ default: T }> => {
    const startTime = performance.now();
    
    if (debug) {
      console.log(`🔄 [LazyLoad] Starting to load ${name}...`);
    }
    
    try {
      // Create a timeout promise
      const timeoutPromise = new Promise<{ default: T }>((_, reject) => {
        setTimeout(() => reject(new Error(`Loading timeout for ${name}`)), timeout);
      });
      
      // Race between the factory and timeout
      const module = await Promise.race([factory(), timeoutPromise]);
      
      const loadTime = performance.now() - startTime;
      isComponentLoaded = true;
      hasError = false;
      lastError = undefined;
      
      if (debug) {
        console.log(`✅ [LazyLoad] ${name} loaded in ${loadTime.toFixed(2)}ms`);
      }
      
      if (onLoad) {
        onLoad(name, loadTime);
      }
      
      // Track successful load in analytics
      analytics.event({
        action: 'component_load',
        category: 'Performance',
        label: name,
        value: Math.round(loadTime)
      });
      
      return module;
    } catch (error) {
      hasError = true;
      lastError = error instanceof Error ? error : new Error(String(error));
      
      if (debug) {
        console.error(`❌ [LazyLoad] Failed to load ${name}:`, error);
      }
      
      // Track error in analytics
      analytics.event({
        action: 'component_load_error',
        category: 'Error',
        label: name,
        value: 1,
        nonInteraction: true
      });
      
      // Retry if we haven't exceeded retry count
      if (retryCount < retries) {
        retryCount++;
        if (debug) {
          console.log(`🔄 [LazyLoad] Retrying ${name} (attempt ${retryCount}/${retries})...`);
        }
        return trackedFactory();
      }
      
      throw error;
    }
  };
  
  // Create the lazy component
  const lazyComponent = lazy(trackedFactory) as EnhancedLazyComponent<T>;
  
  // Add preload method
  lazyComponent.preload = () => {
    if (isComponentLoaded) {
      return Promise.resolve({ default: lazyComponent as unknown as T });
    }
    return trackedFactory() as Promise<{ default: T }>;
  };
  
  // Add prefetch method
  lazyComponent.prefetch = () => {
    if (isComponentLoaded) return Promise.resolve();
    
    const prefetchStrategy = () => {
      if (priority === 'high') {
        return trackedFactory().then(() => {});
      }
      
      if ('requestIdleCallback' in window) {
        return new Promise<void>((resolve) => {
          window.requestIdleCallback(() => {
            trackedFactory().then(() => resolve());
          }, { timeout: 5000 });
        });
      }
      
      // Fallback for browsers without requestIdleCallback
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          trackedFactory().then(() => resolve());
        }, 3000);
      });
    };
    
    return prefetchStrategy();
  };
  
  // Add warmup method
  lazyComponent.warmup = () => {
    if (isComponentLoaded) return Promise.resolve();
    
    return new Promise<void>((resolve) => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = factory.toString().match(/import\(['"]([^'"]+)['"]\)/)?.[1] || '';
      document.head.appendChild(link);
      resolve();
    });
  };
  
  // Add state flags
  Object.defineProperty(lazyComponent, 'isLoaded', {
    get: () => isComponentLoaded
  });
  
  Object.defineProperty(lazyComponent, 'hasError', {
    get: () => hasError
  });
  
  Object.defineProperty(lazyComponent, 'lastError', {
    get: () => lastError
  });
  
  return lazyComponent;
}

/**
 * Preload multiple components in parallel
 * 
 * @param components Array of enhanced lazy components to preload
 * @returns Promise that resolves when all components are loaded
 */
export function preloadComponents(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  components: EnhancedLazyComponent<any>[]
): Promise<void> {
  return Promise.all(components.map(component => component.preload())).then(() => {});
}

/**
 * Prefetch multiple components with priority-based timing
 * 
 * @param components Array of enhanced lazy components to prefetch
 */
export function prefetchComponents(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  components: EnhancedLazyComponent<any>[]
): void {
  components.forEach(component => component.prefetch());
}

