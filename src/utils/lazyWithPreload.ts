import { lazy, ComponentType, LazyExoticComponent } from 'react';

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
}

/**
 * Enhanced lazy component with preload and prefetch capabilities
 */
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
}

/**
 * Enhanced lazy loading with preload, prefetch, and performance tracking capabilities
 * 
 * @param factory Function that returns a promise for the component module
 * @param options Configuration options for lazy loading behavior
 * @returns Enhanced lazy component with additional loading methods
 */
export function lazyWithPreload<T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>,
  options: LazyLoadOptions = {}
): EnhancedLazyComponent<T> {
  const {
    onLoad,
    priority = 'medium',
    debug = false,
    name = 'Component'
  } = options;
  
  // Track if component is loaded
  let isComponentLoaded = false;
  
  // Wrap factory to add performance tracking
  const trackedFactory = () => {
    const startTime = performance.now();
    
    if (debug) {
      console.log(`🔄 [LazyLoad] Starting to load ${name}...`);
    }
    
    return factory().then(module => {
      const loadTime = performance.now() - startTime;
      isComponentLoaded = true;
      
      if (debug) {
        console.log(`✅ [LazyLoad] ${name} loaded in ${loadTime.toFixed(2)}ms`);
      }
      
      if (onLoad) {
        onLoad(name, loadTime);
      }
      
      return module;
    }).catch(error => {
      if (debug) {
        console.error(`❌ [LazyLoad] Failed to load ${name}:`, error);
      }
      throw error;
    });
  };
  
  // Create the base lazy component
  const Component = lazy(trackedFactory);
  
  // Preload implementation - highest priority, immediate loading
  const preload = () => {
    if (debug) {
      console.log(`🚀 [LazyLoad] Preloading ${name} with high priority`);
    }
    return trackedFactory();
  };
  
  // Prefetch implementation - load during idle time
  const prefetch = () => {
    return new Promise<void>((resolve) => {
      if (isComponentLoaded) {
        resolve();
        return;
      }
      
      if (debug) {
        console.log(`🔍 [LazyLoad] Prefetching ${name} during idle time`);
      }
      
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(() => {
          trackedFactory().then(() => resolve());
        }, { timeout: priority === 'high' ? 500 : 2000 });
      } else {
        // Fallback for browsers without requestIdleCallback
        setTimeout(() => {
          trackedFactory().then(() => resolve());
        }, priority === 'high' ? 100 : 1000);
      }
    });
  };
  
  // Warmup implementation - load and parse but don't initialize
  const warmup = () => {
    if (isComponentLoaded) {
      return Promise.resolve();
    }
    
    if (debug) {
      console.log(`🔥 [LazyLoad] Warming up ${name}`);
    }
    
    // Use a microtask to not block the main thread
    return Promise.resolve().then(() => {
      trackedFactory();
      return Promise.resolve();
    });
  };
  
  // Enhance the component with our additional methods
  const EnhancedComponent = Component as EnhancedLazyComponent<T>;
  EnhancedComponent.preload = preload;
  EnhancedComponent.prefetch = prefetch;
  EnhancedComponent.warmup = warmup;
  
  // Add property to check if loaded
  Object.defineProperty(EnhancedComponent, 'isLoaded', {
    get: () => isComponentLoaded
  });
  
  return EnhancedComponent;
}

/**
 * Batch preload multiple components
 * 
 * @param components Array of enhanced lazy components to preload
 * @returns Promise that resolves when all components are loaded
 */
export function preloadComponents(
  components: EnhancedLazyComponent<any>[]
): Promise<void> {
  return Promise.all(
    components.map(component => component.preload())
  ).then(() => void 0);
}

/**
 * Prefetch multiple components with low priority
 * 
 * @param components Array of enhanced lazy components to prefetch
 */
export function prefetchComponents(
  components: EnhancedLazyComponent<any>[]
): void {
  // We don't wait for completion since these are low priority
  components.forEach(component => {
    if (!component.isLoaded) {
      component.prefetch();
    }
  });
}
