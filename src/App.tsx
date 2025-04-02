import React, { useEffect, Suspense, ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import SkipToContent from './components/SkipToContent';
import BackToTop from './components/BackToTop';
import { lazyWithPreload, prefetchComponents, preloadComponents } from './utils/lazyWithPreload';

// Import analytics utilities
import analytics from './utils/analytics';

// Performance tracking function
const trackPageLoad = (pageName: string, loadTimeMs: number) => {
  console.log(`📊 Page Performance: ${pageName} loaded in ${loadTimeMs.toFixed(2)}ms`);
  
  // Send timing data to Google Analytics
  analytics.timing({
    name: 'page_load',
    value: Math.round(loadTimeMs),
    category: 'Performance',
    label: pageName
  });
};

// Loading component with error handling
const LoadingComponent = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-navy-900"></div>
  </div>
);

// Error component with retry functionality
const ErrorComponent = ({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) => (
  <div className="flex flex-col items-center justify-center min-h-screen p-4">
    <h2 className="text-2xl font-bold text-navy-900 mb-4">Something went wrong</h2>
    <p className="text-gray-600 mb-4">{error.message}</p>
    <button
      onClick={resetErrorBoundary}
      className="px-4 py-2 bg-navy-900 text-white rounded hover:bg-navy-800 transition-colors"
    >
      Try again
    </button>
  </div>
);

// Lazy-loaded page components with priority levels
// Primary pages (high priority)
const HomePage = lazyWithPreload(() => import('./pages/HomePage'), { 
  name: 'HomePage', 
  priority: 'high',
  onLoad: trackPageLoad
});

const ServicesPage = lazyWithPreload(() => import('./pages/ServicesPage'), { 
  name: 'ServicesPage', 
  priority: 'high',
  onLoad: trackPageLoad
});

const TeamPage = lazyWithPreload(() => import('./pages/TeamPage'), { 
  name: 'TeamPage', 
  priority: 'high',
  onLoad: trackPageLoad
});

const ContactPage = lazyWithPreload(() => import('./pages/ContactPage'), { 
  name: 'ContactPage', 
  priority: 'high',
  onLoad: trackPageLoad
});

// Secondary pages (medium priority)
const ResultsPage = lazyWithPreload(() => import('./pages/ResultsPage'), { 
  name: 'ResultsPage', 
  priority: 'medium',
  onLoad: trackPageLoad
});

const ApproachPage = lazyWithPreload(() => import('./pages/ApproachPage'), { 
  name: 'ApproachPage', 
  priority: 'medium',
  onLoad: trackPageLoad
});

const UpdatesPage = lazyWithPreload(() => import('./pages/UpdatesPage'), { 
  name: 'UpdatesPage', 
  priority: 'medium',
  onLoad: trackPageLoad
});

const ResourcesPage = lazyWithPreload(() => import('./pages/ResourcesPage'), { 
  name: 'ResourcesPage', 
  priority: 'medium',
  onLoad: trackPageLoad
});

const FAQPage = lazyWithPreload(() => import('./pages/FAQPage'), { 
  name: 'FAQPage', 
  priority: 'medium',
  onLoad: trackPageLoad
});

// Tertiary pages (lower priority)
const BlogPostPage = lazyWithPreload(() => import('./pages/BlogPostPage'), { 
  name: 'BlogPostPage', 
  priority: 'low',
  onLoad: trackPageLoad
});

const PracticeAreasPage = lazyWithPreload(() => import('./pages/PracticeAreasPage'), { 
  name: 'PracticeAreasPage', 
  priority: 'low',
  onLoad: trackPageLoad
});

const SuccessStoriesPage = lazyWithPreload(() => import('./pages/SuccessStoriesPage'), { 
  name: 'SuccessStoriesPage', 
  priority: 'low',
  onLoad: trackPageLoad
});

// Route wrapper component with error boundary
const RouteWrapper = ({ children }: { children: ReactNode }) => (
  <ErrorBoundary>
    <Suspense fallback={<LoadingComponent />}>
      {children}
    </Suspense>
  </ErrorBoundary>
);

// Main App component
const App = () => {
  const location = useLocation();

  // Prefetch components based on route
  useEffect(() => {
    const path = location.pathname;
    
    // Prefetch components based on current route
    if (path === '/') {
      prefetchComponents([ServicesPage, TeamPage]);
    } else if (path === '/services') {
      prefetchComponents([ResultsPage, ApproachPage]);
    } else if (path === '/team') {
      prefetchComponents([SuccessStoriesPage, BlogPostPage]);
    }
  }, [location]);

  return (
    <div className="flex flex-col min-h-screen">
      <SkipToContent />
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<RouteWrapper><HomePage /></RouteWrapper>} />
          <Route path="/services" element={<RouteWrapper><ServicesPage /></RouteWrapper>} />
          <Route path="/team" element={<RouteWrapper><TeamPage /></RouteWrapper>} />
          <Route path="/contact" element={<RouteWrapper><ContactPage /></RouteWrapper>} />
          <Route path="/results" element={<RouteWrapper><ResultsPage /></RouteWrapper>} />
          <Route path="/approach" element={<RouteWrapper><ApproachPage /></RouteWrapper>} />
          <Route path="/updates" element={<RouteWrapper><UpdatesPage /></RouteWrapper>} />
          <Route path="/resources" element={<RouteWrapper><ResourcesPage /></RouteWrapper>} />
          <Route path="/faq" element={<RouteWrapper><FAQPage /></RouteWrapper>} />
          <Route path="/blog/:slug" element={<RouteWrapper><BlogPostPage /></RouteWrapper>} />
          <Route path="/practice-areas" element={<RouteWrapper><PracticeAreasPage /></RouteWrapper>} />
          <Route path="/success-stories" element={<RouteWrapper><SuccessStoriesPage /></RouteWrapper>} />
        </Routes>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};

// Wrap the app with necessary providers
const AppWithProviders = () => (
  <HelmetProvider>
    <Router>
      <App />
    </Router>
  </HelmetProvider>
);

export default AppWithProviders;
