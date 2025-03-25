import React from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import { Link } from 'react-router-dom';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps) => {
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
            Return to Homepage
          </Link>
        </div>
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-100">
            <p className="text-sm font-medium text-red-700 mb-2">Error details:</p>
            <p className="text-xs text-red-600 font-mono overflow-auto">{error.message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const AppErrorBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ReactErrorBoundary FallbackComponent={ErrorFallback}>
      {children}
    </ReactErrorBoundary>
  );
};

export default AppErrorBoundary;