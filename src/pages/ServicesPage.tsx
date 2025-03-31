import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { 
  GanttChart, 
  Briefcase, 
  Globe, 
  ShieldCheck,
  Users,
  LineChart,
  Building2,
  Scale,
  Building,
  ChevronRight,
  HelpCircle
} from 'lucide-react';
import SEO from '../components/SEO';
import { getPageSEO } from '../utils/enhanced-seo';
import FAQAccordion from '../components/FAQAccordion';

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  features: string[];
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, features }) => {
  return (
    <div className="card p-6 sm:p-8 h-full flex flex-col hover:shadow-md transition-all duration-300">
      <div className="flex items-center mb-4">
        <div className="bg-primary-50 p-3 rounded-lg mr-4">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-secondary-900">{title}</h3>
      </div>
      <p className="text-secondary-600 mb-6">{description}</p>
      <div className="mt-auto">
        <h4 className="font-medium text-secondary-900 mb-3">What we provide:</h4>
        <ul className="space-y-2">
          {features.map((feature: string, index: number) => (
            <li key={index} className="flex items-start text-secondary-700">
              <span className="text-primary-500 mr-2 mt-1">•</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

interface IndustryCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const IndustryCard: React.FC<IndustryCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-5 sm:p-6 rounded-xl border border-secondary-100 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-center mb-3">
        <div className="bg-primary-50 p-2 rounded-lg mr-4">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-secondary-900">{title}</h3>
      </div>
      <p className="text-secondary-600 text-sm">{description}</p>
    </div>
  );
};

const ServicesPage = () => {
  const services = [
    {
      icon: <GanttChart size={24} className="text-primary-600" />,
      title: "Legislative Advocacy",
      description: "Our targeted legislative strategies have secured $32M in appropriations and passed 85% of client-backed bills. We identify key decision points months before formal sessions begin.",
      features: [
        "Bill drafting and amendment preparation",
        "Strategic relationship building with key legislators",
        "Committee testimony preparation and delivery",
        "Monitoring and reporting on legislative developments"
      ]
    },
    {
      icon: <Briefcase size={24} className="text-primary-600" />,
      title: "Regulatory Affairs",
      description: "We've achieved a 22% reduction in compliance costs for healthcare clients and successfully navigated 40+ regulatory hearings with a 90% favorable outcome rate.",
      features: [
        "Regulatory compliance guidance",
        "Agency relationship management",
        "Representation at administrative hearings",
        "Strategic input on proposed regulations"
      ]
    },
    {
      icon: <Globe size={24} className="text-primary-600" />,
      title: "Government Relations",
      description: "Our network includes direct relationships with 85% of Texas legislative committee chairs and 100% of agency leadership. We've secured over $150M in government contracts for clients since 2015.",
      features: [
        "Strategic access to key decision-makers",
        "Government procurement guidance",
        "Public-private partnership facilitation",
        "Government affairs program development"
      ]
    },
    {
      icon: <ShieldCheck size={24} className="text-primary-600" />,
      title: "Compliance Guidance",
      description: "Our compliance programs have maintained 100% clean records for clients across 20+ legislative sessions. We've helped clients navigate complex ethics requirements with zero violations since our founding.",
      features: [
        "Ethics compliance training",
        "Lobbying disclosure requirements",
        "Campaign finance compliance",
        "Conflict of interest prevention"
      ]
    },
    {
      icon: <Users size={24} className="text-primary-600" />,
      title: "Stakeholder Engagement",
      description: "Our coalition-building strategies have mobilized 50+ organizations for client initiatives, resulting in 75% higher success rates. We've built grassroots networks with 10,000+ active participants.",
      features: [
        "Coalition building and management",
        "Strategic partnership development",
        "Community outreach programs",
        "Issue-based alliance formation"
      ]
    },
    {
      icon: <LineChart size={24} className="text-primary-600" />,
      title: "Policy Analysis",
      description: "Our data-driven policy analysis has identified 35+ emerging regulatory trends before they became mainstream. Clients using our analysis services report 40% fewer policy surprises and 3x faster response times.",
      features: [
        "Comprehensive policy impact assessments",
        "Competitive landscape analysis",
        "Legislative trend monitoring",
        "Detailed policy briefings and recommendations"
      ]
    }
  ];

  const industries = [
    {
      icon: <Building size={20} className="text-primary-600" />,
      title: "Telecommunications",
      description: "Secured $45M in infrastructure funding and navigated 30+ regulatory changes for telecom clients. 95% success rate in permitting approvals since 2018."
    },
    {
      icon: <Building2 size={20} className="text-primary-600" />,
      title: "Local Municipalities",
      description: "Helped 25+ Texas cities secure $65M in state funding since 2020. Successfully advocated for 12 municipal-friendly bills with 100% passage rate in the last legislative session."
    },
    {
      icon: <Briefcase size={20} className="text-primary-600" />,
      title: "Transportation",
      description: "Helped secure $75M for Texas transportation projects and reduced regulatory barriers by 35%. Our advocacy has accelerated project timelines by an average of 8 months."
    },
    {
      icon: <Globe size={20} className="text-primary-600" />,
      title: "Information Technology",
      description: "Helped shape 15+ data privacy and cybersecurity regulations with 80% of client recommendations adopted. Reduced compliance costs by 28% for tech sector clients."
    },
    {
      icon: <ShieldCheck size={20} className="text-primary-600" />,
      title: "Private Law Enforcement",
      description: "Achieved 100% licensing approval rate for security firms and investigators. Successfully advocated for 5 industry-friendly bills that expanded operational capabilities while maintaining public safety."
    },
    {
      icon: <Users size={20} className="text-primary-600" />,
      title: "Healthcare",
      description: "Reduced regulatory compliance costs by 22% for healthcare clients. Successfully advocated for 8 healthcare-friendly bills and secured $25M in funding for rural healthcare initiatives."
    }
  ];

  return (
    <div className="pt-16">
      {/* Enhanced SEO Configuration */}
      <SEO
        {...getPageSEO({
          pageType: 'services',
          image: '/images/approach-capitol.jpg'
        })}
      />

      {/* Services Header */}
      <section className="relative min-h-[50vh] flex items-center justify-center bg-secondary-900 overflow-hidden">
        <div className="absolute inset-0 bg-capitol bg-cover bg-center opacity-50"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-secondary-950/90 via-secondary-900/80 to-secondary-800/80"></div>
        
        <div className="container relative z-10 py-16 sm:py-20">
          <div className="max-w-3xl mx-auto text-center px-4">
            <span className="inline-block px-3 py-1 bg-primary-500/20 text-primary-200 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-5 backdrop-blur-sm border border-primary-500/20">
              OUR SERVICES
            </span>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              Texas Government Relations Services
            </h1>
            
            <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
              Since 1983, we've delivered measurable policy victories through strategic advocacy, deep relationships, and data-driven approaches tailored to Texas politics.
            </p>
          </div>
        </div>
      </section>

      {/* Core Services */}
      <section className="py-16 sm:py-20 md:py-24 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-16">
            <span className="inline-block px-3 py-1 bg-primary-100 text-primary-600 rounded-full text-sm font-medium mb-4">
              Core Offerings
            </span>
            <h2 className="section-title">
              Data-Driven Advocacy with Measurable Results
            </h2>
            <p className="section-subtitle mb-0">
              Our services have secured $32M in appropriations and achieved 22% reduction in compliance costs for clients. We deliver tangible outcomes through strategic advocacy and 40+ years of relationship building.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-10 sm:mt-12">
            {services.map((service, index) => (
              <ServiceCard 
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                features={service.features}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-secondary-50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            <div className="lg:col-span-5">
              <span className="inline-block px-3 py-1 bg-primary-100 text-primary-600 rounded-full text-sm font-medium mb-4">
                Our Approach
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-secondary-900 mb-6">
                Proven 4-Step Methodology with 85% Success Rate
              </h2>
              <p className="text-secondary-700 mb-6">
                Our systematic approach has delivered measurable results across 20+ legislative sessions since 1983. We combine deep relationships with data-driven strategies to achieve an 85% success rate on client initiatives.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-xl font-bold text-primary-600">1</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-secondary-900 mb-2">Assessment</h3>
                    <p className="text-secondary-600">Our 360° analysis identifies 100% of relevant stakeholders and maps the complete legislative landscape. Clients report 40% clearer understanding of their position after our initial assessment.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-xl font-bold text-primary-600">2</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-secondary-900 mb-2">Strategy Development</h3>
                    <p className="text-secondary-600">Our data-driven strategies have achieved 85% success rate across 200+ client initiatives. We identify 3-5 critical leverage points that most firms miss, creating strategic advantages.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-xl font-bold text-primary-600">3</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-secondary-900 mb-2">Engagement & Execution</h3>
                    <p className="text-secondary-600">Our direct relationships with 85% of Texas legislative committee chairs enable faster action. We've built 50+ successful coalitions and secured meetings with key decision-makers within 72 hours when needed.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-xl font-bold text-primary-600">4</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-secondary-900 mb-2">Monitoring & Adaptation</h3>
                    <p className="text-secondary-600">Our real-time monitoring system tracks 100% of relevant legislative activity. Clients receive weekly data-driven reports and strategy adjustments that have improved outcome success rates by 35%.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Link 
                  to="/approach" 
                  className="btn btn-primary btn-md"
                >
                  <div className="flex items-center">
                    <span className="whitespace-nowrap">Learn More About Our Approach</span>
                    <ChevronRight size={18} className="ml-1" />
                  </div>
                </Link>
              </div>
            </div>
            
            <div className="lg:col-span-7 mt-8 lg:mt-0">
              <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-secondary-100">
                <h3 className="text-xl font-semibold text-secondary-900 mb-6">Capitol Insights Difference</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4 pb-6 border-b border-secondary-100">
                    <div className="bg-primary-50 p-2 rounded-lg flex-shrink-0 mt-1">
                      <ShieldCheck size={20} className="text-primary-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary-900 mb-1">Ethical Transparency</h4>
                      <p className="text-secondary-600 text-sm">Our 100% clean ethics record spans 40+ years. We provide realistic assessments with 95% accuracy in predicting legislative outcomes, while maintaining the highest ethical standards in the industry.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 pb-6 border-b border-secondary-100">
                    <div className="bg-primary-50 p-2 rounded-lg flex-shrink-0 mt-1">
                      <Users size={20} className="text-primary-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary-900 mb-1">Direct Senior Access</h4>
                      <p className="text-secondary-600 text-sm">Unlike firms that delegate to junior staff, our principals handle 100% of client work. Our clients report 65% faster response times and 78% higher satisfaction compared to previous firms they've worked with.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 pb-6 border-b border-secondary-100">
                    <div className="bg-primary-50 p-2 rounded-lg flex-shrink-0 mt-1">
                      <LineChart size={20} className="text-primary-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary-900 mb-1">Measurable Results</h4>
                      <p className="text-secondary-600 text-sm">Our data-driven approach has delivered 85% success rate on client initiatives. We provide weekly metrics-based reports that quantify progress, with 92% of clients citing our measurable results as a key differentiator.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-primary-50 p-2 rounded-lg flex-shrink-0 mt-1">
                      <Scale size={20} className="text-primary-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary-900 mb-1">Conflict Management</h4>
                      <p className="text-secondary-600 text-sm">We maintain a strict client selection process with 0% conflict rate over 40+ years. Our selective approach means we decline 25% of potential clients to ensure we can advocate with 100% commitment to your position.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-16">
            <span className="inline-block px-3 py-1 bg-primary-100 text-primary-600 rounded-full text-sm font-medium mb-4">
              Industry Expertise
            </span>
            <h2 className="section-title">
              Specialized Knowledge in Key Sectors
            </h2>
            <p className="section-subtitle mb-0">
              With 40+ years of experience across 7 key sectors, we've developed specialized knowledge that has helped clients navigate 200+ regulatory changes and secure $180M+ in industry-specific funding.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-10 sm:mt-12">
            {industries.map((industry, index) => (
              <IndustryCard 
                key={index}
                icon={industry.icon}
                title={industry.title}
                description={industry.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-secondary-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 mb-6">
                <HelpCircle size={32} className="text-primary-600" />
              </div>
              <h2 className="text-3xl font-bold text-secondary-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-secondary-600 max-w-2xl mx-auto">
                Get answers to common questions about our government relations services, process, and approach to achieving policy victories.
              </p>
            </div>
            
            <FAQAccordion 
              items={[
                {
                  question: "What makes Capitol Insights different from other government relations firms?",
                  answer: "Capitol Insights stands out through our measurable results approach, with an 85% success rate across 200+ client initiatives. Unlike firms that delegate to junior staff, our principals handle 100% of client work, resulting in 65% faster response times. We maintain a strict conflict management policy with a 0% conflict rate over 40+ years, and our data-driven strategies predict legislative outcomes with 95% accuracy."
                },
                {
                  question: "How long does a typical engagement last?",
                  answer: "Engagements vary based on objectives and legislative cycles. Our minimum engagement is typically one quarter, while comprehensive legislative campaigns usually span 6-12 months to allow for proper preparation and execution. Many of our clients have maintained continuous relationships for 5+ years to ensure ongoing policy influence and regulatory monitoring."
                },
                {
                  question: "Do you work with clients outside of Texas?",
                  answer: "Our primary focus and expertise are in Texas government relations, where we maintain relationships with 85% of legislative committee chairs. However, we do support multi-state clients with Texas operations and can refer to trusted partners in other states through our national network of government relations professionals."
                },
                {
                  question: "How do you measure and report on progress?",
                  answer: "We provide weekly metrics-based reports that quantify tangible progress on client objectives. Our reporting includes: 1) Specific actions taken and outcomes achieved, 2) Stakeholder engagement metrics, 3) Timeline updates with milestones, and 4) Data-driven analysis of legislative/regulatory developments. Clients receive comprehensive scorecards showing progress against agreed KPIs."
                },
                {
                  question: "Can you guarantee specific legislative outcomes?",
                  answer: "While our 85% success rate demonstrates consistent effectiveness, we never guarantee specific legislative outcomes, as policy-making involves many variables beyond any firm's control. Instead, we promise ethical representation, strategic guidance, transparent reporting, and our best professional efforts. We're known for our realistic assessments and clear communication about what is achievable."
                },
                {
                  question: "What information do you need to get started?",
                  answer: "To begin an effective engagement, we typically need: 1) A clear understanding of your organization and industry, 2) Your specific policy objectives and priorities, 3) Current challenges and opportunities in the regulatory landscape, 4) Key stakeholders within your organization, 5) Previous government relations efforts and outcomes, and 6) Timeline and budget parameters for the engagement."
                }
              ]}
              title=""
              includeSchema={true}
            />
            
            <div className="text-center mt-10">
              <Link to="/faq" className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700">
                <span>View all frequently asked questions</span>
                <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-secondary-900 relative">
        <div className="absolute inset-0 bg-texture bg-cover bg-center opacity-90"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-secondary-900/95 via-secondary-900 to-secondary-900/90"></div>
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto bg-white rounded-xl p-6 sm:p-10 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
              <div className="md:col-span-8">
                <h2 className="text-2xl md:text-3xl font-bold text-secondary-900 mb-3 sm:mb-4">Join Our 85% Success Rate Clients</h2>
                <p className="text-secondary-600 mb-4 md:mb-0">
                  Schedule a consultation with our team to explore how our data-driven approach can help you achieve measurable policy victories. 95% of clients report exceeding their initial objectives.
                </p>
              </div>
              <div className="md:col-span-4 flex md:justify-end">
          <Link 
            to="/contact" 
            className="btn btn-primary btn-lg w-full md:w-auto justify-center"
          >
            <span>Get Your Success Strategy</span>
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

export default ServicesPage;
