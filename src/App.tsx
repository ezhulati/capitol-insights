import React, { useEffect, lazy, Suspense, ReactNode, ComponentType, LazyExoticComponent } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import SkipToContent from './components/SkipToContent';
import { lazyWithPreload } from './utils/lazyWithPreload';

// Define a type for components with preload method
interface LazyComponentWithPreload<T extends ComponentType<any>> extends LazyExoticComponent<T> {
  preload: () => Promise<{ default: T }>;
}

// Lazy-loaded page components
const HomePage = lazyWithPreload(() => import('./pages/HomePage')) as LazyComponentWithPreload<any>;
const ServicesPage = lazyWithPreload(() => import('./pages/ServicesPage')) as LazyComponentWithPreload<any>;
const TeamPage = lazyWithPreload(() => import('./pages/TeamPage')) as LazyComponentWithPreload<any>;
const ResultsPage = lazyWithPreload(() => import('./pages/ResultsPage')) as LazyComponentWithPreload<any>;
const ApproachPage = lazyWithPreload(() => import('./pages/ApproachPage')) as LazyComponentWithPreload<any>;
const ContactPage = lazyWithPreload(() => import('./pages/ContactPage')) as LazyComponentWithPreload<any>;
const UpdatesPage = lazyWithPreload(() => import('./pages/UpdatesPage')) as LazyComponentWithPreload<any>;
const BlogPostPage = lazyWithPreload(() => import('./pages/BlogPostPage')) as LazyComponentWithPreload<any>;
const PrivacyPolicyPage = lazyWithPreload(() => import('./pages/PrivacyPolicyPage')) as LazyComponentWithPreload<any>;
const TermsPage = lazyWithPreload(() => import('./pages/TermsPage')) as LazyComponentWithPreload<any>;
const LegislativeCalendarPage = lazyWithPreload(() => import('./pages/LegislativeCalendarPage')) as LazyComponentWithPreload<any>;
const PolicyBriefingsPage = lazyWithPreload(() => import('./pages/PolicyBriefingsPage')) as LazyComponentWithPreload<any>;

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

// Preload the next pages for better UX
const preloadNextPages = () => {
  // Preload the most common pages
  HomePage.preload();
  ServicesPage.preload();
  TeamPage.preload();
  ContactPage.preload();
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
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
        </Router>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;
