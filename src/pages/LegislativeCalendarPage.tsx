
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  ChevronRight, 
  Clock, 
  AlertCircle, 
  FileText,
  Download,
  ExternalLink,
  Info
} from 'lucide-react';
import SEO from '../components/SEO';
import DownloadForm from '../components/DownloadForm';

interface CalendarEventProps {
  date: string;
  title: string;
  description: string;
  type: 'session' | 'deadline' | 'hearing' | 'interim';
}

const CalendarEvent: React.FC<CalendarEventProps> = ({ date, title, description, type }) => {
  const getTypeStyles = () => {
    switch (type) {
      case 'session':
        return 'bg-primary-100 text-primary-700 border-primary-200';
      case 'deadline':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'hearing':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'interim':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="flex items-start gap-4 p-5 bg-white rounded-lg border border-secondary-100 shadow-sm hover:shadow-md transition-all">
      <div className="min-w-[80px] text-center">
        <div className="text-lg font-bold text-secondary-900">{date.split(' ')[0]}</div>
        <div className="text-sm text-secondary-600">{date.split(' ')[1]}</div>
      </div>
      
      <div className="flex-grow">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-lg font-semibold text-secondary-900">{title}</h3>
          <span className={`text-xs px-2 py-0.5 rounded-full ${getTypeStyles()}`}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </span>
        </div>
        <p className="text-secondary-700 text-sm">{description}</p>
      </div>
    </div>
  );
};

const LegislativeCalendarPage = () => {
  const [showDownloadForm, setShowDownloadForm] = useState(false);
  
  // Sample calendar events for the 2025 Texas Legislative Session
  const upcomingEvents: CalendarEventProps[] = [
    {
      date: "Jan 14 2025",
      title: "89th Legislature Convenes",
      description: "The 89th Texas Legislature convenes at noon for the regular session.",
      type: "session"
    },
    {
      date: "Mar 7 2025",
      title: "Bill Filing Deadline",
      description: "Last day for filing bills and joint resolutions other than local bills, emergency appropriations, and bills that have been declared an emergency by the governor.",
      type: "deadline"
    },
    {
      date: "May 26 2025",
      title: "Last Day of Regular Session",
      description: "Sine die - final day of the 140-day regular session.",
      type: "session"
    },
    {
      date: "Jun 22 2025",
      title: "Post-Session Deadline",
      description: "Last day the governor can sign or veto bills passed during the regular legislative session.",
      type: "deadline"
    },
    {
      date: "Sep 1 2025",
      title: "Effective Date",
      description: "Effective date of bills passed during the regular session (unless specified otherwise).",
      type: "deadline"
    }
  ];

  const interimEvents: CalendarEventProps[] = [
    {
      date: "Jun 15 2025",
      title: "Senate Transportation Committee Hearing",
      description: "Interim hearing on transportation infrastructure funding and priorities for the next biennium.",
      type: "hearing"
    },
    {
      date: "Jul 8 2025",
      title: "House Energy Resources Committee",
      description: "Interim hearing on the state of the Texas energy grid and regulatory considerations.",
      type: "hearing"
    },
    {
      date: "Aug 12 2025",
      title: "Interim Charges Released",
      description: "Lieutenant Governor and Speaker of the House release interim charges for committees to study before the next legislative session.",
      type: "interim"
    },
    {
      date: "Sep 23 2025",
      title: "Senate Health & Human Services Committee",
      description: "Interim hearing on healthcare access and affordability in rural Texas communities.",
      type: "hearing"
    },
    {
      date: "Oct 14 2025",
      title: "House Appropriations Committee",
      description: "Interim hearing on state budget priorities and revenue projections for the 2026-2027 biennium.",
      type: "hearing"
    }
  ];

  return (
    <div className="pt-16">
      {/* SEO Configuration */}
      <SEO 
        title="Texas Legislative Calendar | Capitol Insights"
        description="Stay informed about key dates and deadlines for the Texas Legislature. Our comprehensive legislative calendar helps organizations plan their government relations strategy effectively."
        canonical="/legislative-calendar"
        additionalMetaTags={[
          { name: "keywords", content: "texas legislative calendar, legislative session dates, bill filing deadlines, committee hearings, interim charges, texas legislature" },
          { property: "og:site_name", content: "Capitol Insights" }
        ]}
      />

      {/* Calendar Form Modal */}
      {showDownloadForm && (
        <DownloadForm
          title="View Texas Legislative Calendar"
          description="Please provide your information to access the complete Texas Legislative Calendar for 2025-2026 online."
          documentUrl="/downloads/texas-legislative-calendar-2025.html"
          documentTitle="Legislative Calendar (HTML)"
          onClose={() => setShowDownloadForm(false)}
        />
      )}

      {/* Calendar Header */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-5 sm:mb-6 mx-auto w-14 h-14 sm:w-16 sm:h-16 bg-primary-500/20 rounded-full flex items-center justify-center">
              <Calendar size={28} className="text-primary-200" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">Texas Legislative Calendar</h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
              Key dates and deadlines for the Texas Legislature to help you plan your government relations strategy.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Calendar Overview */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container">
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-secondary-50 p-6 sm:p-8 rounded-xl border border-secondary-100 mb-10">
              <div className="flex items-start gap-4">
                <div className="bg-primary-100 p-2 rounded-full mt-1">
                  <Info size={20} className="text-primary-700" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-secondary-900 mb-2">Understanding the Texas Legislative Cycle</h2>
                  <p className="text-secondary-700 mb-4">
                    The Texas Legislature meets in regular session every two years, convening on the second Tuesday in January of odd-numbered years. These regular sessions are limited to 140 days. The Governor can also call special sessions as needed, which can last up to 30 days each.
                  </p>
                  <p className="text-secondary-700">
                    The most important legislative work often happens during the interim period—the 18+ months between regular sessions. This is when committees study issues, hold hearings, and develop recommendations for the next session.
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-secondary-900">89th Legislative Session (2025)</h2>
                <button 
                  onClick={() => setShowDownloadForm(true)}
                  className="text-primary-600 hover:text-primary-700 font-medium flex items-center"
                >
                  <Download size={16} className="mr-1" />
                  <span>View Online Calendar</span>
                </button>
              </div>
              
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <CalendarEvent 
                    key={index}
                    date={event.date}
                    title={event.title}
                    description={event.description}
                    type={event.type}
                  />
                ))}
              </div>
            </div>

            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-secondary-900">Interim Activities (2025)</h2>
                <div className="text-sm text-secondary-600 flex items-center">
                  <Clock size={16} className="mr-1 text-primary-600" />
                  <span>Updated monthly</span>
                </div>
              </div>
              
              <div className="space-y-4">
                {interimEvents.map((event, index) => (
                  <CalendarEvent 
                    key={index}
                    date={event.date}
                    title={event.title}
                    description={event.description}
                    type={event.type}
                  />
                ))}
              </div>
            </div>

            <div className="bg-primary-50 p-6 sm:p-8 rounded-xl border border-primary-100">
              <div className="flex items-start gap-4">
                <div className="bg-primary-100 p-2 rounded-full mt-1">
                  <AlertCircle size={20} className="text-primary-700" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-secondary-900 mb-2">Important Note</h2>
                  <p className="text-secondary-700 mb-4">
                    This calendar provides general guidance on key legislative dates. Committee schedules and hearing dates are subject to change. For the most up-to-date information, we recommend checking the official Texas Legislature Online portal.
                  </p>
                  <a 
                    href="https://capitol.texas.gov/" 
                    className="text-primary-600 hover:text-primary-700 font-medium flex items-center"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Visit Texas Legislature Online</span>
                    <ExternalLink size={16} className="ml-1" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="py-12 sm:py-16 bg-secondary-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              className="text-center mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-secondary-900 mb-4">Additional Resources</h2>
              <p className="text-secondary-700 max-w-2xl mx-auto">
                Access these resources to enhance your understanding of the Texas legislative process and stay informed about developments.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div 
                className="bg-white p-6 rounded-xl border border-secondary-100 shadow-sm hover:shadow-md transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="flex items-center mb-4">
                  <div className="bg-primary-50 p-3 rounded-lg mr-4">
                    <FileText size={20} className="text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900">Policy Briefings</h3>
                </div>
                <p className="text-secondary-700 mb-4">
                  Our policy briefings provide in-depth analysis of key legislative issues and their potential impact on various sectors.
                </p>
                <Link 
                  to="/policy-briefings" 
                  className="text-primary-600 hover:text-primary-700 font-medium flex items-center"
                >
                  <span>View Policy Briefings</span>
                  <ChevronRight size={16} className="ml-1" />
                </Link>
              </motion.div>
              
              <motion.div 
                className="bg-white p-6 rounded-xl border border-secondary-100 shadow-sm hover:shadow-md transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flex items-center mb-4">
                  <div className="bg-primary-50 p-3 rounded-lg mr-4">
                    <Clock size={20} className="text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900">Capitol Watch Updates</h3>
                </div>
                <p className="text-secondary-700 mb-4">
                  Stay informed with our regular updates on legislative developments, regulatory changes, and policy trends.
                </p>
                <Link 
                  to="/updates" 
                  className="text-primary-600 hover:text-primary-700 font-medium flex items-center"
                >
                  <span>Read Capitol Watch</span>
                  <ChevronRight size={16} className="ml-1" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto bg-primary-50 rounded-xl p-6 sm:p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
              <div className="md:col-span-8">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-secondary-900 mb-3 sm:mb-4">Need help navigating the legislative process?</h2>
                <p className="text-secondary-700 mb-4 md:mb-0">
                  Schedule a consultation to discuss how we can help you develop an effective government relations strategy.
                </p>
              </div>
              <div className="md:col-span-4 flex md:justify-end">
                <Link 
                  to="/contact" 
                  className="btn btn-primary btn-lg w-full md:w-auto justify-center whitespace-nowrap"
                >
                  Schedule Consultation
                  <ChevronRight size={18} className="ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LegislativeCalendarPage;
