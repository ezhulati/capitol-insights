import React, { useState } from 'react';
import { ArrowRight, Download, FileText } from 'lucide-react';

interface LeadMagnetFormProps {
  title: string;
  subtitle: string;
  description: string;
  bulletPoints: string[];
  ctaText: string;
  downloadUrl: string;
  className?: string;
}

const LeadMagnetForm: React.FC<LeadMagnetFormProps> = ({
  title,
  subtitle,
  description,
  bulletPoints,
  ctaText,
  downloadUrl,
  className = '',
}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [industry, setIndustry] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Validate form
    if (!email || !name) {
      setError('Please fill in all required fields');
      setIsSubmitting(false);
      return;
    }

    try {
      // Send lead data to backend or email service
      // This endpoint is redirected to /.netlify/functions/lead-capture via netlify.toml configuration
      const response = await fetch('/api/lead-capture', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          industry: industry || 'Not specified',
          leadSource: 'Website Lead Magnet',
          downloadedGuide: title,
          downloadUrl,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      // If successful, mark as submitted and redirect to download
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Redirect to the download URL
      window.location.href = downloadUrl;
      
      // Track this conversion in analytics without sending PII
      try {
        if (typeof window !== 'undefined' && (window as any).gtag) {
          // Check if we should anonymize data based on environment variable
          const shouldAnonymize = process.env.ANALYTICS_ANONYMIZE_IP === 'true';
          const shouldSendPII = process.env.ANALYTICS_SEND_PII === 'true';
          
          // Create analytics event with non-PII data
          const analyticsData: Record<string, any> = {
            'event_category': 'lead_generation',
            'event_label': title,
            'anonymize_ip': shouldAnonymize
          };
          
          // Only include PII if explicitly allowed
          if (shouldSendPII) {
            analyticsData.lead_email = email;
            analyticsData.lead_name = name;
            analyticsData.lead_industry = industry || 'Not specified';
          }
          
          // Send the event
          (window as any).gtag('event', 'lead_magnet_download', analyticsData);
        }
      } catch (e) {
        console.error('Analytics error:', e);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      
      // Even if the API call fails, we'll still give the user access to the download
      // but log the error for debugging
      setIsSubmitting(false);
      setIsSubmitted(true);
      window.location.href = downloadUrl;
    }
  };

  return (
    <div className={`bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden ${className}`}>
      <div className="flex flex-col md:flex-row">
        {/* Content Section */}
        <div className="p-6 md:p-8 md:w-3/5">
          <div className="flex items-center mb-4">
            <div className="bg-gold-50 p-2 rounded-lg mr-3">
              <FileText size={20} className="text-gold-600" />
            </div>
            <span className="text-sm font-medium text-gold-700 bg-gold-50 px-3 py-1 rounded-full">
              FEATURED GUIDE
            </span>
          </div>
          
          <h3 className="text-xl md:text-2xl font-bold text-navy-900 mb-2">{title}</h3>
          <p className="text-gold-700 font-medium mb-4">{subtitle}</p>
          
          <p className="text-slate-700 mb-4">{description}</p>
          
          <ul className="mb-6 space-y-2">
            {bulletPoints.map((point, index) => (
              <li key={index} className="flex items-start">
                <div className="text-gold-500 mr-2 mt-1">•</div>
                <span className="text-slate-700 text-sm">{point}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Form Section */}
        <div className="bg-navy-50 p-6 md:p-8 md:w-2/5">
          {!isSubmitted ? (
            <>
              <h4 className="text-navy-900 font-semibold mb-4">Get Instant Access</h4>
              <p className="text-slate-600 text-sm mb-4">Enter your information below to receive the guide immediately.</p>
              
              {error && (
                <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-4 text-sm">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-navy-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                    placeholder="Your name"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-navy-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                    placeholder="you@company.com"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="industry" className="block text-sm font-medium text-navy-700 mb-1">
                    Industry
                  </label>
                  <select
                    id="industry"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                  >
                    <option value="">Select your industry</option>
                    <option value="Transportation">Transportation & Infrastructure</option>
                    <option value="Government">Regional Government</option>
                    <option value="Automotive">Automobile Industry</option>
                    <option value="Water">Water Resource Management</option>
                    <option value="Energy">Energy & Utilities</option>
                    <option value="Finance">Financial Services</option>
                    <option value="Manufacturing">Manufacturing & Trade</option>
                    <option value="Tourism">Tourism & Hospitality</option>
                    <option value="Healthcare">Healthcare & Medical Services</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gold-600 hover:bg-gold-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      {ctaText} <ArrowRight size={16} className="ml-1" />
                    </span>
                  )}
                </button>
                
                <p className="text-xs text-slate-500 mt-4 text-center">
                  By submitting, you'll also receive our monthly Texas legislative insights.
                  We respect your privacy and will never share your information.
                </p>
              </form>
            </>
          ) : (
            <div className="text-center py-6">
              <div className="bg-green-100 p-3 rounded-full inline-flex items-center justify-center mb-4">
                <Download size={24} className="text-green-600" />
              </div>
              <h4 className="text-navy-900 font-semibold mb-2">Thank You!</h4>
              <p className="text-slate-600 mb-4">Your guide is downloading now.</p>
              <p className="text-slate-600 text-sm">
                If your download doesn't start automatically,{' '}
                <a href={downloadUrl} className="text-gold-600 hover:text-gold-700 font-medium">
                  click here
                </a>
                .
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeadMagnetForm;
