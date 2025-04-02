import React, { Suspense, ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import SkipToContent from './components/SkipToContent';
import BackToTop from './components/BackToTop';

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

// Lazy-loaded page components
const HomePage = React.lazy(() => import('./pages/HomePage'));
const ServicesPage = React.lazy(() => import('./pages/ServicesPage'));
const TeamPage = React.lazy(() => import('./pages/TeamPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));
const ResultsPage = React.lazy(() => import('./pages/ResultsPage'));
const ApproachPage = React.lazy(() => import('./pages/ApproachPage'));
const UpdatesPage = React.lazy(() => import('./pages/UpdatesPage'));
const ResourcesPage = React.lazy(() => import('./pages/ResourcesPage'));
const FAQPage = React.lazy(() => import('./pages/FAQPage'));
const BlogPostPage = React.lazy(() => import('./pages/BlogPostPage'));
const PracticeAreasPage = React.lazy(() => import('./pages/PracticeAreasPage'));
const SuccessStoriesPage = React.lazy(() => import('./pages/SuccessStoriesPage'));

// Route wrapper component
const RouteWrapper = ({ children }: { children: ReactNode }) => {
  const location = useLocation();

  return <>{children}</>;
};

// Main App component
const App = () => {
  return (
    <ErrorBoundary>
      <Router>
        <HelmetProvider>
          <div className="flex flex-col min-h-screen">
            <SkipToContent />
            <Header />
            <main id="main-content" className="flex-grow">
              <Suspense fallback={<LoadingComponent />}>
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
              </Suspense>
            </main>
            <Footer />
            <BackToTop />
          </div>
        </HelmetProvider>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
