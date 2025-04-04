import React, { useEffect, Suspense, ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import SkipToContent from './components/SkipToContent';
import BackToTop from './components/BackToTop';
import Clarity from '@microsoft/clarity';
import { lazyWithPreload, prefetchComponents, preloadComponents } from './utils/lazyWithPreload';

// Performance tracking function
const trackPageLoad = (pageName: string, loadTimeMs: number) => {
  console.log(`📊 Page Performance: ${pageName} loaded in ${loadTimeMs.toFixed(2)}ms`);
  // Could send to analytics service here
};

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

const LegislativeCalendarPage = lazyWithPreload(() => import('./pages/LegislativeCalendarPage'), { 
  name: 'LegislativeCalendarPage', 
  priority: 'low',
  onLoad: trackPageLoad
});

const PolicyBriefingsPage = lazyWithPreload(() => import('./pages/PolicyBriefingsPage'), { 
  name: 'PolicyBriefingsPage', 
  priority: 'low',
  onLoad: trackPageLoad
});

// Utility pages
const PrivacyPolicyPage = lazyWithPreload(() => import('./pages/PrivacyPolicyPage'), { 
  name: 'PrivacyPolicyPage', 
  priority: 'low',
  onLoad: trackPageLoad
});

const TermsPage = lazyWithPreload(() => import('./pages/TermsPage'), { 
  name: 'TermsPage', 
  priority: 'low',
  onLoad: trackPageLoad
});

const NotFoundPage = lazyWithPreload(() => import('./pages/NotFoundPage'), { 
  name: 'NotFoundPage', 
  priority: 'low',
  onLoad: trackPageLoad
});

// Group components for strategic preloading
const primaryPages = [HomePage, ServicesPage, TeamPage, ContactPage];
const secondaryPages = [ResultsPage, ApproachPage, UpdatesPage, ResourcesPage, FAQPage];
const tertiaryPages = [
  BlogPostPage, PracticeAreasPage, SuccessStoriesPage,
  LegislativeCalendarPage, PolicyBriefingsPage
];

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="w-16 h-16 bg-gold-200 rounded-full flex items-center justify-center mx-auto mb-4">
        <div className="w-10 h-10 bg-gold-600 rounded-full"></div>
      </div>
      <div className="h-4 w-32 bg-slate-200 rounded mx-auto"></div>
    </div>
  </div>
);

// Strategic page preloading for better UX
const preloadNextPages = () => {
  // Immediately preload primary pages
  preloadComponents(primaryPages).then(() => {
    console.log('✅ Primary pages preloaded');
    
    // Once primary pages are loaded, prefetch secondary pages
    prefetchComponents(secondaryPages);
    
    // Use requestIdleCallback for tertiary pages to load during idle time
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(() => {
        prefetchComponents(tertiaryPages);
      }, { timeout: 5000 });
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(() => {
        prefetchComponents(tertiaryPages);
      }, 3000);
    }
  });
};

// ScrollToTop component to handle scroll position on route changes
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      // Delayed execution to ensure DOM is fully updated
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [pathname, hash]);

  return null;
};

// Simple page transition
const PageTransition: React.FC<{ children: ReactNode }> = ({ children }) => (
  <div>{children}</div>
);

function App() {
  // Trigger preloading on initial mount
  useEffect(() => {
    preloadNextPages();
    
    // Initialize Microsoft Clarity with advanced features
    const projectId = "qyml0noa0b";
    try {
      // Initialize Clarity
      Clarity.init(projectId);
      console.log('Microsoft Clarity initialized successfully');
      
      // Set cookie consent (assuming consent is given)
      Clarity.consent(true);
      
      // Identify the user (using anonymous ID for now)
      // In a real app, you might use a user ID from authentication
      const anonymousId = `anon-${Math.random().toString(36).substring(2, 15)}`;
      Clarity.identify(anonymousId);
      
      // Set custom tags for better filtering
      Clarity.setTag("environment", "production");
      Clarity.setTag("version", "1.0.0");
      
      // Track page visit as a custom event
      Clarity.event("page_visit");
      
      // Upgrade important sessions (e.g., when user is on resources page)
      if (window.location.pathname.includes('resources')) {
        Clarity.upgrade("resources_page_visit");
      }
    } catch (error) {
      console.error('Error initializing Microsoft Clarity:', error);
    }
  }, []);
  
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <Router>
          <SkipToContent />
          <ScrollToTop />
          <div className="flex flex-col min-h-screen">
            <Header />
            <main id="main-content" className="flex-grow">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route 
                  path="/" 
                  element={
                    <PageTransition>
                      <HomePage />
                    </PageTransition>
                  } 
                />
                <Route 
                  path="/services" 
                  element={
                    <PageTransition>
                      <ServicesPage />
                    </PageTransition>
                  } 
                />
                <Route 
                  path="/practice-areas" 
                  element={
                    <PageTransition>
                      <PracticeAreasPage />
                    </PageTransition>
                  } 
                />
                <Route 
                  path="/team" 
                  element={
                    <PageTransition>
                      <TeamPage />
                    </PageTransition>
                  } 
                />
                <Route 
                  path="/results" 
                  element={
                    <PageTransition>
                      <ResultsPage />
                    </PageTransition>
                  } 
                />
                <Route 
                  path="/success-stories" 
                  element={
                    <PageTransition>
                      <SuccessStoriesPage />
                    </PageTransition>
                  } 
                />
                <Route 
                  path="/approach" 
                  element={
                    <PageTransition>
                      <ApproachPage />
                    </PageTransition>
                  } 
                />
                <Route 
                  path="/contact" 
                  element={
                    <PageTransition>
                      <ContactPage />
                    </PageTransition>
                  } 
                />
                <Route 
                  path="/updates" 
                  element={
                    <PageTransition>
                      <UpdatesPage />
                    </PageTransition>
                  } 
                />
                <Route 
                  path="/updates/:slug" 
                  element={
                    <PageTransition>
                      <BlogPostPage />
                    </PageTransition>
                  } 
                />
                <Route 
                  path="/privacy" 
                  element={
                    <PageTransition>
                      <PrivacyPolicyPage />
                    </PageTransition>
                  } 
                />
                <Route 
                  path="/terms" 
                  element={
                    <PageTransition>
                      <TermsPage />
                    </PageTransition>
                  } 
                />
                <Route 
                  path="/legislative-calendar" 
                  element={
                    <PageTransition>
                      <LegislativeCalendarPage />
                    </PageTransition>
                  } 
                />
                <Route 
                  path="/policy-briefings" 
                  element={
                    <PageTransition>
                      <PolicyBriefingsPage />
                    </PageTransition>
                  } 
                />
                <Route 
                  path="/resources" 
                  element={
                    <PageTransition>
                      <ResourcesPage />
                    </PageTransition>
                  } 
                />
                <Route 
                  path="/faq" 
                  element={
                    <PageTransition>
                      <FAQPage />
                    </PageTransition>
                  } 
                />
                {/* 404 Not Found - This must be the last route */}
                <Route 
                  path="*" 
                  element={
                    <PageTransition>
                      <NotFoundPage />
                    </PageTransition>
                  } 
                />
              </Routes>
            </Suspense>
          </main>
          <BackToTop />
          <Footer />
        </div>
        </Router>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;
