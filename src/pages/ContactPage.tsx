import React, { useState, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Calendar, 
  ChevronRight, 
  FileText, 
  Check,
  Loader
} from 'lucide-react';
import SEO from '../components/SEO';
import { getPageSEO } from '../utils/enhanced-seo';
import { generateOrganizationStructuredData } from '../utils/structured-data';

// Helper components
const CheckMarkIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Check className={className} />
);

const Spinner: React.FC<{ className?: string }> = ({ className }) => (
  <Loader className={`${className} animate-spin`} />
);

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  organization: string;
  practiceArea: string;
  message: string;
  urgency: string;
  budget: string;
  interest: string[];
  timeframe: string;
  howHeard: string;
}

const ContactPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialPracticeArea = searchParams.get('service') || '';
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    organization: '',
    practiceArea: initialPracticeArea,
    message: '',
    urgency: '',
    budget: '',
    interest: [],
    timeframe: '',
    howHeard: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission for demo
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      if (formRef.current) {
        formRef.current.reset();
      }
      // Reset form data
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        organization: '',
        practiceArea: '',
        message: '',
        urgency: '',
        budget: '',
        interest: [],
        timeframe: '',
        howHeard: '',
      });
    }, 1500);
  };

  // Practice area data
  const practiceAreas = [
    { id: 'transportation', label: 'Transportation & Infrastructure' },
    { id: 'telecom', label: 'Telecommunications & Technology' },
    { id: 'healthcare', label: 'Healthcare Policy' },
    { id: 'education', label: 'Education & Workforce' },
    { id: 'energy', label: 'Energy & Environment' },
    { id: 'municipal', label: 'Municipal Affairs' },
    { id: 'custom-research', label: 'Custom Research & Analysis' },
  ];

  return (
    <div className="pt-16">
      <SEO 
        {...getPageSEO({
          pageType: 'contact',
          title: "Contact Our Texas Government Relations Team | Capitol Insights",
          description: "Connect with our government relations team today. Capitol Insights provides strategic lobbying and legislative advocacy services across Texas.",
          additionalMetaTags: [
            { name: "keywords", content: "Texas government relations contact, Capitol Insights Austin office, Capitol Insights Dallas office, legislative advocacy contact" }
          ]
        })}
        structuredData={generateOrganizationStructuredData()}
        breadcrumbs={[
          { name: 'Home', url: 'https://capitol-insights.com/' },
          { name: 'Contact', url: 'https://capitol-insights.com/contact' }
        ]}
        includeOrganizationData={true}
      />

      {/* Hero Section */}
      <section className="pt-16 pb-12 sm:pb-16 md:pt-20 bg-navy-900 relative">
        <div className="absolute inset-0 bg-capitol bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-950/95 to-navy-900"></div>
        <div className="grain-overlay opacity-20"></div>
        
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 bg-gold-600/20 text-gold-200 rounded-full text-sm font-medium mb-4 backdrop-blur-sm">
              GET IN TOUCH
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Contact Capitol Insights
            </h1>
            <p className="text-lg text-white/90 mb-8">
              Whether you're facing legislative challenges or seeking strategic opportunities, our team is ready to help your organization navigate the complex landscape of Texas government.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
              <a href="tel:2142133443" className="flex items-center text-white/80 hover:text-gold-300">
                <Phone size={18} className="mr-2 text-gold-400" />
                <span>(214) 213-3443</span>
              </a>
              <a href="mailto:contact@capitol-insights.com" className="flex items-center text-white/80 hover:text-gold-300">
                <Mail size={18} className="mr-2 text-gold-400" />
                <span>contact@capitol-insights.com</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Form Column */}
              <div className="lg:col-span-7 xl:col-span-8">
                {/* Tab Navigation */}
                <div className="mb-8 border-b border-slate-200">
                  <div className="flex space-x-6">
                    <button 
                      onClick={() => setActiveTab('general')}
                      className={`pb-3 px-2 font-medium ${
                        activeTab === 'general' 
                          ? 'text-gold-600 border-b-2 border-gold-500' 
                          : 'text-slate-600 hover:text-navy-800'
                      }`}
                    >
                      General Inquiry
                    </button>
                    <button 
                      onClick={() => setActiveTab('assessment')}
                      className={`pb-3 px-2 font-medium ${
                        activeTab === 'assessment' 
                          ? 'text-gold-600 border-b-2 border-gold-500' 
                          : 'text-slate-600 hover:text-navy-800'
                      }`}
                    >
                      Schedule Assessment
                    </button>
                    <button 
                      onClick={() => setActiveTab('custom')}
                      className={`pb-3 px-2 font-medium ${
                        activeTab === 'custom' 
                          ? 'text-gold-600 border-b-2 border-gold-500' 
                          : 'text-slate-600 hover:text-navy-800'
                      }`}
                    >
                      Custom Research
                    </button>
                  </div>
                </div>

                {/* Contact Form or Success Message */}
                {isSubmitted ? (
                  <div className="bg-green-50 border border-green-100 p-8 rounded-xl">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                        <CheckMarkIcon className="text-green-600 w-8 h-8" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-3">Thank You for Contacting Us!</h2>
                      <p className="text-gray-700 mb-6">
                        Your message has been received. A member of our team will be in touch shortly.
                      </p>
                      <button
                        onClick={() => setIsSubmitted(false)}
                        className="btn btn-primary"
                      >
                        Send Another Message
                      </button>
                    </div>
                  </div>
                ) : (
                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-navy-800 mb-4">Contact Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 mb-1">
                            First Name *
                          </label>
                          <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            required
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2.5 rounded-lg border border-slate-300"
                          />
                        </div>
                        <div>
                          <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 mb-1">
                            Last Name *
                          </label>
                          <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            required
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2.5 rounded-lg border border-slate-300"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                            Email Address *
                          </label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2.5 rounded-lg border border-slate-300"
                          />
                        </div>
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">
                            Phone Number
                          </label>
                          <input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2.5 rounded-lg border border-slate-300"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-navy-800 mb-4">Services & Practice Areas</h3>
                      <div>
                        <label htmlFor="practiceArea" className="block text-sm font-medium text-slate-700 mb-1">
                          Select Practice Area *
                        </label>
                        <select
                          id="practiceArea"
                          name="practiceArea"
                          required
                          value={formData.practiceArea}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 rounded-lg border border-slate-300"
                        >
                          <option value="">Select a practice area</option>
                          {practiceAreas.map(area => (
                            <option key={area.id} value={area.id}>{area.label}</option>
                          ))}
                          <option value="other">Other / Not Sure</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-navy-800 mb-4">Your Message</h3>
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">
                          How can we help you? *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={5}
                          value={formData.message}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 rounded-lg border border-slate-300"
                          placeholder="Please describe your needs or questions..."
                        ></textarea>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="mt-8">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full btn btn-lg bg-navy-800 hover:bg-navy-900 text-white"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center">
                            <Spinner className="w-5 h-5 mr-3" />
                            Sending...
                          </span>
                        ) : (
                          <span>Send Message</span>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
              
              {/* Contact Info Column */}
              <div className="lg:col-span-5 xl:col-span-4">
                {/* Contact Info Card */}
                <div className="bg-navy-800 rounded-xl overflow-hidden shadow-lg mb-8">
                  <div className="p-8">
                    <h3 className="text-xl font-bold text-white mb-6">Contact Information</h3>
                    <div className="space-y-6">
                      <div className="flex items-start">
                        <div className="bg-navy-700 p-3 rounded-lg mr-4">
                          <MapPin size={20} className="text-gold-400" />
                        </div>
                        <div>
                          <h4 className="font-medium text-white mb-1">Austin Office</h4>
                          <p className="text-navy-100 text-sm">
                            1005 Congress Ave Suite 800<br />
                            Austin, TX 78701
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-navy-700 p-3 rounded-lg mr-4">
                          <MapPin size={20} className="text-gold-400" />
                        </div>
                        <div>
                          <h4 className="font-medium text-white mb-1">Dallas Office</h4>
                          <p className="text-navy-100 text-sm">
                            P.O. Box 195892<br />
                            Dallas, TX 75219
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-navy-700 p-3 rounded-lg mr-4">
                          <Mail size={20} className="text-gold-400" />
                        </div>
                        <div>
                          <h4 className="font-medium text-white mb-1">Email</h4>
                          <a href="mailto:contact@capitol-insights.com" className="text-navy-100 text-sm hover:text-gold-300 transition-colors">
                            contact@capitol-insights.com
                          </a>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-navy-700 p-3 rounded-lg mr-4">
                          <Phone size={20} className="text-gold-400" />
                        </div>
                        <div>
                          <h4 className="font-medium text-white mb-1">Phone</h4>
                          <a href="tel:2142133443" className="text-navy-100 text-sm hover:text-gold-300 transition-colors">
                            (214) 213-3443
                          </a>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-navy-700 p-3 rounded-lg mr-4">
                          <Clock size={20} className="text-gold-400" />
                        </div>
                        <div>
                          <h4 className="font-medium text-white mb-1">Hours</h4>
                          <p className="text-navy-100 text-sm">
                            Monday-Friday: 8:30am - 5:30pm<br />
                            <span className="text-gold-300">Legislative Session:</span><br />
                            Monday-Friday: 7:30am - 7:00pm
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Links to Resources */}
                <div className="bg-slate-50 rounded-xl overflow-hidden shadow-sm border border-slate-100 p-6">
                  <h3 className="text-lg font-semibold text-navy-800 mb-4">Helpful Resources</h3>
                  <ul className="space-y-3">
                    <li>
                      <Link to="/resources" className="flex items-center text-navy-700 hover:text-gold-600 transition-colors">
                        <FileText size={16} className="mr-2 text-gold-500" />
                        <span>Download Legislative Resources</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/legislative-calendar" className="flex items-center text-navy-700 hover:text-gold-600 transition-colors">
                        <Calendar size={16} className="mr-2 text-gold-500" />
                        <span>Legislative Calendar</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/updates" className="flex items-center text-navy-700 hover:text-gold-600 transition-colors">
                        <ChevronRight size={16} className="mr-2 text-gold-500" />
                        <span>Latest Updates & Insights</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
