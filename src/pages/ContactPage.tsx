import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, Building, ExternalLink, Info, Clock, Calendar } from 'lucide-react';
import SEO from '../components/SEO';

const ContactPage = () => {
  const location = useLocation();
  const [selectedTeamMember, setSelectedTeamMember] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    interest: 'general',
    message: '',
    preferredDate: '',
    preferredTime: ''
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const member = params.get('member');
    if (member) {
      setSelectedTeamMember(member);
    }
  }, [location]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    // Add form-name field which Netlify requires
    formData.append("form-name", "contact");
    
    // Convert FormData to URL-encoded string
    const urlEncodedData = new URLSearchParams(formData as any).toString();
    
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: urlEncodedData,
    })
      .then(() => {
        console.log("Form successfully submitted");
        setIsSubmitting(false);
        setIsSubmitted(true);
        
        // Reset form after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            name: '',
            email: '',
            phone: '',
            organization: '',
            interest: 'general',
            message: '',
            preferredDate: '',
            preferredTime: ''
          });
        }, 5000);
      })
      .catch((error) => {
        console.error("Form submission error:", error);
        setIsSubmitting(false);
        alert("There was an error submitting the form. Please try again later.");
      });
  };

  return (
    <div className="pt-16">
      {/* SEO Configuration */}
      <SEO 
        title="Schedule Your Policy Assessment | Capitol Insights"
        description="Contact Capitol Insights to schedule a consultation with our government relations experts and discuss your organization's policy objectives and challenges."
        image="https://images.unsplash.com/photo-1564769625688-8478682b7e5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=630"
        canonical="/contact"
        additionalMetaTags={[
          { name: "keywords", content: "texas government relations contact, schedule lobbying consultation, policy assessment, texas lobbying firm" },
          { property: "og:site_name", content: "Capitol Insights" }
        ]}
      />

      {/* Contact Header */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-3 py-1 bg-primary-500/20 text-primary-200 rounded-full text-sm font-medium mb-4">
              Schedule Your Policy Assessment
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">Contact Us</h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
              {selectedTeamMember 
                ? `Connect directly with ${selectedTeamMember.charAt(0).toUpperCase() + selectedTeamMember.slice(1)} to discuss how we can help advance your interests.` 
                : 'Have questions about our government relations services? We\'re here to provide straightforward answers and explore how we can help.'}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-16 sm:py-20 md:py-24 bg-white">
        <div className="container">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            {/* Contact Information */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <h2 className="text-2xl font-bold text-navy-900 mb-6">Our Information</h2>
              
              <div className="space-y-6 sm:space-y-8 mb-10 sm:mb-12">
                <div className="bg-white p-5 sm:p-6 rounded-xl shadow-card border border-slate-100 hover:shadow-md transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="bg-gold-50 p-2 rounded-md mt-1 flex-shrink-0">
                      <Building size={22} className="text-gold-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-navy-900 mb-2">Our Offices</h3>
                      <div className="space-y-4">
                        <div>
                          <p className="font-medium text-navy-900">Dallas</p>
                          <p className="text-slate-600">North Texas Location</p>
                          <a 
                            href="https://maps.google.com" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-gold-600 hover:text-gold-700 text-sm font-medium inline-flex items-center mt-1"
                          >
                            <span>View on map</span>
                            <ExternalLink size={14} className="ml-1" />
                          </a>
                        </div>
                        <div>
                          <p className="font-medium text-navy-900">Austin</p>
                          <p className="text-slate-600">State Capitol Location</p>
                          <a 
                            href="https://maps.google.com" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-gold-600 hover:text-gold-700 text-sm font-medium inline-flex items-center mt-1"
                          >
                            <span>View on map</span>
                            <ExternalLink size={14} className="ml-1" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-5 sm:p-6 rounded-xl shadow-card border border-slate-100 hover:shadow-md transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="bg-gold-50 p-2 rounded-md mt-1 flex-shrink-0">
                      <Info size={22} className="text-gold-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-navy-900 mb-2">Contact Details</h3>
                      <ul className="space-y-3">
                        <li className="flex items-center gap-3">
                          <Phone size={18} className="text-gold-600 flex-shrink-0" />
                          <span className="text-slate-600">Contact for phone details</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <Mail size={18} className="text-gold-600 flex-shrink-0" />
                          <a href="mailto:info@capitol-insights.com" className="text-gold-600 hover:text-gold-700">
                            info@capitol-insights.com
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-5 sm:p-6 rounded-xl shadow-card border border-slate-100 hover:shadow-md transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="bg-gold-50 p-2 rounded-md mt-1 flex-shrink-0">
                      <Clock size={22} className="text-gold-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-navy-900 mb-2">Hours of Operation</h3>
                      <div className="space-y-1 text-slate-600">
                        <p><span className="font-medium text-navy-800">Monday - Friday:</span> 9:00 AM - 5:00 PM CT</p>
                        <p><span className="font-medium text-navy-800">Weekends:</span> Closed</p>
                        <p className="text-sm mt-2 text-slate-500">Available for scheduled meetings outside of regular hours</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-navy-50 p-5 sm:p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-navy-900 mb-4">Our Commitment</h3>
                <p className="text-slate-700 mb-4 leading-relaxed">
                  We respond to all inquiries within one business day. When you reach out to Capitol Insights, you'll speak directly with a senior team member—not an assistant or junior staff member.
                </p>
                <p className="text-slate-700 leading-relaxed">
                  We're selective about the clients we take on to ensure we can provide the highest level of service and avoid conflicts of interest.
                </p>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-slate-100">
                <h2 className="text-2xl font-bold text-navy-900 mb-6">
                  {selectedTeamMember 
                    ? `Contact ${selectedTeamMember.charAt(0).toUpperCase() + selectedTeamMember.slice(1)}` 
                    : 'Schedule Your Policy Assessment'}
                </h2>
                
                {isSubmitted ? (
                  <div className="bg-green-50 border border-green-100 rounded-lg p-6 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-green-800 mb-2">Assessment Scheduled!</h3>
                    <p className="text-green-700 mb-4">
                      Thank you for scheduling your policy assessment. We'll confirm your appointment within one business day.
                    </p>
                    <p className="text-green-600 text-sm">
                      A senior team member will contact you to discuss your policy objectives and how we can help you achieve them.
                    </p>
                  </div>
                ) : (
                  <form 
                    name="contact" 
                    method="POST" 
                    data-netlify="true" 
                    action="/success.html"
                    onSubmit={handleSubmit} 
                    className="space-y-6"
                  >
                    <input type="hidden" name="form-name" value="contact" />
                    <input type="hidden" name="recipient" value="byroncampbell@capitol-insights.com,enrizhulati@gmail.com" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="form-label">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="form-input"
                          placeholder="Jane Smith"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="form-label">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="form-input"
                          placeholder="jane@company.com"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="form-label">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="form-input"
                          placeholder="(555) 123-4567"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="organization" className="form-label">
                          Organization
                        </label>
                        <input
                          type="text"
                          id="organization"
                          name="organization"
                          value={formData.organization}
                          onChange={handleChange}
                          className="form-input"
                          placeholder="Company or Organization"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="interest" className="form-label">
                        Area of Interest *
                      </label>
                      <select
                        id="interest"
                        name="interest"
                        value={formData.interest}
                        onChange={handleChange}
                        required
                        className="form-input"
                      >
                        <option value="general">General Inquiry</option>
                        <option value="legislative">Legislative Advocacy</option>
                        <option value="regulatory">Regulatory Affairs</option>
                        <option value="municipal">Municipal Representation</option>
                        <option value="coalition">Coalition Building</option>
                        <option value="policy">Policy Analysis</option>
                      </select>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="preferredDate" className="form-label">
                          Preferred Date
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Calendar size={18} className="text-slate-400" />
                          </div>
                          <input
                            type="date"
                            id="preferredDate"
                            name="preferredDate"
                            value={formData.preferredDate}
                            onChange={handleChange}
                            className="form-input pl-10"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="preferredTime" className="form-label">
                          Preferred Time
                        </label>
                        <select
                          id="preferredTime"
                          name="preferredTime"
                          value={formData.preferredTime}
                          onChange={handleChange}
                          className="form-input"
                        >
                          <option value="">Select a time</option>
                          <option value="morning">Morning (9AM - 12PM)</option>
                          <option value="afternoon">Afternoon (1PM - 4PM)</option>
                          <option value="flexible">Flexible</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="form-label">
                        Brief Description of Your Policy Needs *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="form-input"
                        placeholder="Please briefly describe your organization and the policy issues you're looking to address..."
                      ></textarea>
                    </div>
                    
                    <div className="text-slate-600 text-sm">
                      <p>* Required fields</p>
                      <p>We respect your privacy and will never share your information with third parties.</p>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full btn btn-primary btn-lg flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''} whitespace-nowrap`}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <Send size={18} />
                          <span>Schedule Your Assessment</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 sm:py-16 bg-slate-50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12">
            <h2 className="section-title">Our Locations</h2>
            <p className="section-subtitle">
              Capitol Insights maintains offices in both Dallas and Austin to better serve our clients throughout Texas.
            </p>
          </div>
          
          <div className="bg-slate-200/50 h-64 sm:h-96 rounded-xl flex items-center justify-center overflow-hidden shadow-sm">
            <div className="w-full h-full relative flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1564769625688-8478682b7e5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Map of Texas" 
                className="w-full h-full object-cover absolute inset-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 to-transparent"></div>
              <div className="relative z-10 p-6 sm:p-8 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg max-w-lg mx-4">
                <h3 className="text-xl font-semibold text-navy-900 mb-4">Serving All of Texas</h3>
                <p className="text-slate-700 mb-6 leading-relaxed">
                  With offices strategically located in Dallas and Austin, Capitol Insights provides comprehensive government relations services throughout the Lone Star State.
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-semibold text-navy-900">Dallas Office</p>
                    <p className="text-slate-600">North Texas Location</p>
                  </div>
                  <div>
                    <p className="font-semibold text-navy-900">Austin Office</p>
                    <p className="text-slate-600">State Capitol Location</p>
                  </div>
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
