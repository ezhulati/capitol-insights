import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, FileText, HelpCircle, Landmark } from 'lucide-react';
import SEO from '../components/SEO';

const NotFoundPage: React.FC = () => {
  return (
    <div className="pt-16">
      <SEO 
        title="Page Not Found | Capitol Insights"
        description="The page you're looking for doesn't exist or has been moved."
      />

      <div className="min-h-[75vh] flex items-center">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-8">
              <div className="relative inline-block">
                <span className="text-9xl font-display font-bold text-navy-950/5">404</span>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl sm:text-4xl font-display font-bold text-navy-900">Page Not Found</span>
                </div>
              </div>
            </div>
            
            <p className="text-xl text-slate-700 mb-10">
              The page you're looking for doesn't exist or has been moved.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link 
                to="/" 
                className="btn btn-primary flex items-center"
              >
                <ArrowLeft size={18} className="mr-2" />
                Return to Homepage
              </Link>
              
              <Link 
                to="/contact" 
                className="btn bg-slate-200 hover:bg-slate-300 text-navy-800 flex items-center"
              >
                <HelpCircle size={18} className="mr-2" />
                Contact Support
              </Link>
            </div>
            
            <div className="mb-12">
              <h2 className="text-xl font-bold text-navy-900 mb-6">Helpful Resources</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <Link 
                  to="/resources" 
                  className="p-6 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow flex flex-col items-center text-center"
                >
                  <FileText size={32} className="text-gold-500 mb-4" />
                  <h3 className="font-semibold text-navy-800 mb-2">Resources</h3>
                  <p className="text-sm text-slate-600">Access our collection of policy briefs, guides, and research</p>
                </Link>
                
                <Link 
                  to="/updates" 
                  className="p-6 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow flex flex-col items-center text-center"
                >
                  <Search size={32} className="text-gold-500 mb-4" />
                  <h3 className="font-semibold text-navy-800 mb-2">Latest Updates</h3>
                  <p className="text-sm text-slate-600">Read our latest insights on legislative and policy developments</p>
                </Link>
                
                <Link 
                  to="/services" 
                  className="p-6 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow flex flex-col items-center text-center"
                >
                  <Landmark size={32} className="text-gold-500 mb-4" />
                  <h3 className="font-semibold text-navy-800 mb-2">Services</h3>
                  <p className="text-sm text-slate-600">Explore our government relations and legislative advocacy services</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
