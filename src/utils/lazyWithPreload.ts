import { lazy, ComponentType } from 'react';

// Enhanced lazy loading with preload capabilities
export function lazyWithPreload<T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>
) {
  const Component = lazy(factory);
  // @ts-ignore
  Component.preload = factory;
  return Component;
}