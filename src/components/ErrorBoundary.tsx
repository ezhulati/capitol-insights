import React from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import { Link } from 'react-router-dom';
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react';
import analytics from '../utils/analytics';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps) => {
  // Log error to analytics with more details
  React.useEffect(() => {
    analytics.event({
      action: 'error',
      category: 'Error',
      label: error.name,
      value: 1,
      nonInteraction: true,
      error_message: error.message,
      error_stack: error.stack,
      page_url: window.location.href,
      user_agent: navigator.userAgent
    });
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
      <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200 max-w-md w-full">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle size={28} className="text-red-600" />
        </div>
        <h1 className="text-2xl font-display font-bold text-navy-900 mb-4 text-center">Something went wrong</h1>
        <p className="text-slate-700 mb-6 text-center">
          We apologize for the inconvenience. Please try refreshing the page or returning to the homepage.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={resetErrorBoundary}
            className="btn btn-primary btn-md justify-center"
          >
            <RefreshCw size={16} className="mr-2" />
            Try Again
          </button>
          <Link
            to="/"
            className="btn btn-secondary btn-md justify-center"
          >
            <Home size={16} className="mr-2" />
            Return to Homepage
          </Link>
        </div>
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-100">
            <div className="flex items-center gap-2 mb-2">
              <Bug size={16} className="text-red-600" />
              <p className="text-sm font-medium text-red-700">Error details:</p>
            </div>
            <div className="space-y-2">
              <p className="text-xs text-red-600 font-mono overflow-auto">
                <span className="font-semibold">Name:</span> {error.name}
              </p>
              <p className="text-xs text-red-600 font-mono overflow-auto">
                <span className="font-semibold">Message:</span> {error.message}
              </p>
              <p className="text-xs text-red-600 font-mono overflow-auto">
                <span className="font-semibold">Stack:</span>
                <pre className="mt-1 whitespace-pre-wrap">{error.stack}</pre>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const AppErrorBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const handleError = (error: Error, info: React.ErrorInfo) => {
    // Log error to analytics with component stack
    analytics.event({
      action: 'error',
      category: 'Error',
      label: error.name,
      value: 1,
      nonInteraction: true,
      error_message: error.message,
      error_stack: error.stack,
      component_stack: info.componentStack,
      page_url: window.location.href,
      user_agent: navigator.userAgent
    });
  };

  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={handleError}
    >
      {children}
    </ReactErrorBoundary>
  );
};

export default AppErrorBoundary;