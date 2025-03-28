import React, { useState } from 'react';
import { X, Download, User, Mail, Building } from 'lucide-react';

interface DownloadFormProps {
  title: string;
  description: string;
  pdfUrl: string;
  pdfTitle: string;
  onClose: () => void;
}

const DownloadForm: React.FC<DownloadFormProps> = ({ 
  title, 
  description, 
  pdfUrl, 
  pdfTitle,
  onClose 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    industry: '',
  });
  
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    industry: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      valid = false;
    }
    
    if (!formData.industry.trim()) {
      newErrors.industry = 'Industry is required';
      valid = false;
    }
    
    setErrors(newErrors);
    return valid;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      // In a real implementation, you would send this data to your server
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // In a real implementation, you might track this download for analytics
      // For now, we'll just simulate the download after a short delay
      setTimeout(() => {
        // In a real implementation, this would be a direct link to the PDF
        window.open(pdfUrl, '_blank');
      }, 1000);
    }, 1500);
  };
  
  const industries = [
    'Select your industry',
    'Healthcare',
    'Energy',
    'Transportation',
    'Technology',
    'Telecommunications',
    'Education',
    'Financial Services',
    'Real Estate',
    'Manufacturing',
    'Retail',
    'Hospitality',
    'Non-Profit',
    'Government',
    'Legal Services',
    'Other'
  ];

  return (
    <div className="fixed inset-0 bg-secondary-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-bold text-secondary-900">{title}</h2>
            <button 
              onClick={onClose}
              className="text-secondary-500 hover:text-secondary-700 transition-colors"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>
          
          {!isSubmitted ? (
            <>
              <p className="text-secondary-700 mb-6">{description}</p>
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-secondary-700 mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User size={16} className="text-secondary-400" />
                      </div>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`block w-full pl-10 pr-3 py-2 border ${
                          errors.name ? 'border-red-500' : 'border-secondary-300'
                        } rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500`}
                        placeholder="Your name"
                      />
                    </div>
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-secondary-700 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail size={16} className="text-secondary-400" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`block w-full pl-10 pr-3 py-2 border ${
                          errors.email ? 'border-red-500' : 'border-secondary-300'
                        } rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500`}
                        placeholder="you@example.com"
                      />
                    </div>
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="industry" className="block text-sm font-medium text-secondary-700 mb-1">
                      Industry
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Building size={16} className="text-secondary-400" />
                      </div>
                      <select
                        id="industry"
                        name="industry"
                        value={formData.industry}
                        onChange={handleChange}
                        className={`block w-full pl-10 pr-3 py-2 border ${
                          errors.industry ? 'border-red-500' : 'border-secondary-300'
                        } rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 appearance-none bg-none`}
                      >
                        {industries.map((industry, index) => (
                          <option 
                            key={index} 
                            value={index === 0 ? '' : industry}
                            disabled={index === 0}
                          >
                            {industry}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-secondary-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    {errors.industry && <p className="mt-1 text-sm text-red-600">{errors.industry}</p>}
                  </div>
                </div>
                
                <div className="mt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${
                      isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        <Download size={16} className="mr-2" />
                        Download {pdfTitle}
                      </>
                    )}
                  </button>
                </div>
                
                <div className="mt-4 text-xs text-center text-secondary-500">
                  By downloading this document, you agree to our{' '}
                  <a href="/privacy" className="text-primary-600 hover:text-primary-700">
                    Privacy Policy
                  </a>{' '}
                  and{' '}
                  <a href="/terms" className="text-primary-600 hover:text-primary-700">
                    Terms of Service
                  </a>
                </div>
              </form>
            </>
          ) : (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download size={24} className="text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">Thank You!</h3>
              <p className="text-secondary-700 mb-6">
                Your download should begin automatically. If it doesn't,{' '}
                <a 
                  href={pdfUrl} 
                  className="text-primary-600 hover:text-primary-700 font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  click here
                </a>.
              </p>
              <button
                onClick={onClose}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Close this window
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DownloadForm;
