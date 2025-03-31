import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Twitter, Linkedin, Landmark, ChevronRight, Clock } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-navy-950 text-white">
      <div className="container pt-16 pb-8 sm:pt-20 sm:pb-10 md:pt-24 md:pb-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Branding & Social Section */}
          <div className="lg:col-span-5">
            <Link to="/" className="flex items-center space-x-3 mb-6 group">
              <div className="w-10 h-10 flex items-center justify-center bg-gold-600 text-navy-950 rounded-md overflow-hidden transition-all duration-300 group-hover:bg-gold-500">
                <Landmark size={20} className="mt-1" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-display font-semibold tracking-tight text-white group-hover:text-gold-300 transition-colors duration-300">Capitol Insights</span>
                <span className="text-xs uppercase tracking-wider text-gold-400">Texas Government Relations</span>
              </div>
            </Link>
            
            <p className="text-slate-300 max-w-md mb-6 leading-relaxed">
              Providing ethical, effective government relations since 1983. We connect organizations with legislative decision-makers to create meaningful policy impact throughout Texas.
            </p>
            
            <div className="flex space-x-3 mb-8">
              <a 
                href="https://twitter.com" 
                className="w-10 h-10 rounded-full bg-navy-800 flex items-center justify-center hover:bg-gold-600 transition-all duration-300" 
                aria-label="Twitter"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Twitter size={18} />
              </a>
              <a 
                href="https://www.linkedin.com/in/byron-campbell-9b28282b/" 
                className="w-10 h-10 rounded-full bg-navy-800 flex items-center justify-center hover:bg-gold-600 transition-all duration-300" 
                aria-label="LinkedIn"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Linkedin size={18} />
              </a>
            </div>
            
            <div className="pt-6 border-t border-navy-800">
              <h3 className="text-lg font-display font-semibold mb-4 text-white">Schedule a Consultation</h3>
              <Link 
                to="/contact" 
                className="bg-gold-600 hover:bg-gold-500 text-navy-950 font-medium px-5 py-3 rounded-lg inline-flex items-center group transition-all"
              >
                <span>Get Your Policy Assessment</span>
                <ChevronRight size={16} className="ml-1 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
          
          {/* Navigation Section */}
          <div className="lg:col-span-2 sm:col-span-1">
            <h3 className="text-lg font-display font-semibold mb-5 text-white">
              Navigation
            </h3>
            <ul className="space-y-3">
              {[
                { to: "/", label: "Home" },
                { to: "/services", label: "Services" },
                { to: "/team", label: "Our Team" },
                { to: "/results", label: "Results" },
                { to: "/approach", label: "Our Approach" },
                { to: "/contact", label: "Contact" }
              ].map((link) => (
                <li key={link.to}>
                  <Link 
                    to={link.to} 
                    className="text-slate-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Resources Section */}
          <div className="lg:col-span-2 sm:col-span-1">
            <h3 className="text-lg font-display font-semibold mb-5 text-white">
              Resources
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/updates" className="text-slate-300 hover:text-white transition-colors">
                  Capitol Watch
                </Link>
              </li>
              <li>
                <Link to="/legislative-calendar" className="text-slate-300 hover:text-white transition-colors">
                  Legislative Calendar
                </Link>
              </li>
              <li>
                <Link to="/policy-briefings" className="text-slate-300 hover:text-white transition-colors">
                  Policy Briefings
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-slate-300 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-slate-300 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-slate-300 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Section */}
          <div className="lg:col-span-3">
            <h3 className="text-lg font-display font-semibold mb-5 text-white">
              Contact Us
            </h3>
            <ul className="space-y-5">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="text-gold-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">Austin Office</p>
                  <p className="text-slate-300">1005 Congress Ave Suite 800</p>
                  <p className="text-slate-300">Austin, TX 78701</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="text-gold-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">Dallas Office</p>
                  <p className="text-slate-300">P.O. Box 195892</p>
                  <p className="text-slate-300">Dallas, TX 75219</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Clock size={20} className="text-gold-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">Monday-Friday: 9am-5pm CT</p>
                  <p className="text-slate-300">Weekends: Closed</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Phone size={20} className="text-gold-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">Contact for Details</p>
                  <p className="text-slate-300">Office Hours: 9am-5pm CT</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Mail size={20} className="text-gold-400 mt-1 flex-shrink-0" />
                <div>
                  <a 
                    href="mailto:byroncampbell@capitol-insights.com"
                    className="text-white font-medium hover:text-gold-300 transition-colors"
                  >
                    byroncampbell@capitol-insights.com
                  </a>
                  <p className="text-slate-300">For general inquiries</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="mt-10 pt-8 border-t border-navy-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 items-center">
              <p className="text-slate-400 text-sm">
                &copy; {currentYear} Capitol Insights. All rights reserved.
              </p>
              <div className="flex space-x-4 text-sm text-slate-500">
                <Link to="/privacy" className="hover:text-slate-300 transition-colors">Privacy</Link>
                <Link to="/terms" className="hover:text-slate-300 transition-colors">Terms</Link>
              </div>
            </div>
            <p className="text-slate-400 text-sm text-center md:text-right">
              <span className="font-display italic">Where Texas Decision-Makers Meet Texas Decision-Shapers</span>
            </p>
          </div>
        </div>
      </div>
      {/* Back to top button removed - now using the global BackToTop component */}
    </footer>
  );
};

export default Footer;
