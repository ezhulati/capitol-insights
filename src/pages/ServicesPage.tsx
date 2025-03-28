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
  Landmark,
  Building,
  ChevronRight
} from 'lucide-react';
import SEO from '../components/SEO';

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
      description: "We develop and execute targeted legislative strategies to advance your policy objectives effectively.",
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
      description: "Our team helps navigate complex regulatory processes and ensures your interests are represented in rulemaking procedures.",
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
      description: "We build and maintain relationships with decision-makers at all levels of government to create opportunities for meaningful dialogue.",
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
      description: "We help you understand and meet all legal and regulatory requirements related to lobbying and government interactions.",
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
      description: "We identify and engage with key stakeholders, building coalitions and alliances to strengthen your position on important issues.",
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
      description: "We provide in-depth analysis of proposed legislation and regulations, helping you understand potential impacts on your organization.",
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
      description: "Navigating complex regulations and advocacy for telecom infrastructure and service providers."
    },
    {
      icon: <Building2 size={20} className="text-primary-600" />,
      title: "Local Municipalities",
      description: "Representing cities and local governments in their legislative and regulatory interests."
    },
    {
      icon: <Briefcase size={20} className="text-primary-600" />,
      title: "Transportation",
      description: "Advocating for transportation companies, infrastructure projects, and mobility innovation."
    },
    {
      icon: <Globe size={20} className="text-primary-600" />,
      title: "Information Technology",
      description: "Supporting IT companies on data privacy, cybersecurity, and technology policy matters."
    },
    {
      icon: <ShieldCheck size={20} className="text-primary-600" />,
      title: "Private Law Enforcement",
      description: "Representing security companies and private investigation agencies in regulatory matters."
    },
    {
      icon: <Users size={20} className="text-primary-600" />,
      title: "Healthcare",
      description: "Working with healthcare providers and organizations to navigate complex regulations."
    }
  ];

  return (
    <div className="pt-16">
      {/* SEO Configuration */}
      <SEO 
        title="Expert Government Relations Services | Capitol Insights"
        description="Explore our comprehensive government relations services including legislative advocacy, regulatory affairs, and strategic policy development for Texas organizations."
        image="https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=630"
        canonical="/services"
        additionalMetaTags={[
          { name: "keywords", content: "government relations services, legislative advocacy, lobbying texas, regulatory affairs, policy analysis, coalition building" },
          { property: "og:site_name", content: "Capitol Insights" }
        ]}
      />

      {/* Services Header */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-3 py-1 bg-primary-500/20 text-primary-200 rounded-full text-sm font-medium mb-4">
              Our Services
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 whitespace-nowrap">Government Relations Services</h1>
            <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">
              We provide focused, effective advocacy that delivers real results through transparent communication and strategic action.
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
              Expert Advocacy at Every Level
            </h2>
            <p className="section-subtitle mb-0">
              We focus on delivering concrete, measurable outcomes. Our services provide tangible results through ethical advocacy and strategic relationship building.
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
                Straightforward, Ethical Advocacy
              </h2>
              <p className="text-secondary-700 mb-6">
                We're transparent about what government relations work actually involves. Our approach is straightforward and focused on delivering tangible results for our clients.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-xl font-bold text-primary-600">1</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-secondary-900 mb-2">Assessment</h3>
                    <p className="text-secondary-600">We begin by thoroughly understanding your needs, goals, and the legislative landscape affecting your interests.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-xl font-bold text-primary-600">2</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-secondary-900 mb-2">Strategy Development</h3>
                    <p className="text-secondary-600">We create a customized plan with clear objectives, identifying key stakeholders and potential obstacles.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-xl font-bold text-primary-600">3</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-secondary-900 mb-2">Engagement & Execution</h3>
                    <p className="text-secondary-600">We connect you with decision-makers, represent your interests, and build coalitions to support your objectives.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-xl font-bold text-primary-600">4</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-secondary-900 mb-2">Monitoring & Adaptation</h3>
                    <p className="text-secondary-600">We continuously track developments, adjust strategies as needed, and provide regular progress updates.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Link 
                  to="/approach" 
                  className="btn btn-primary btn-md whitespace-nowrap"
                >
                  <div className="flex items-center">
                    <span>Learn More About Our Approach</span>
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
                      <p className="text-secondary-600 text-sm">We believe in complete honesty about what government relations can and cannot achieve. We provide realistic assessments and never guarantee specific legislative outcomes.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 pb-6 border-b border-secondary-100">
                    <div className="bg-primary-50 p-2 rounded-lg flex-shrink-0 mt-1">
                      <Users size={20} className="text-primary-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary-900 mb-1">Direct Senior Access</h4>
                      <p className="text-secondary-600 text-sm">When you work with Capitol Insights, you deal directly with our senior team members—not junior staff or assistants. Your concerns receive top-level attention.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 pb-6 border-b border-secondary-100">
                    <div className="bg-primary-50 p-2 rounded-lg flex-shrink-0 mt-1">
                      <LineChart size={20} className="text-primary-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary-900 mb-1">Measurable Results</h4>
                      <p className="text-secondary-600 text-sm">We establish clear metrics and provide regular progress reports so you can track our advocacy efforts and their impact on your objectives.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-primary-50 p-2 rounded-lg flex-shrink-0 mt-1">
                      <Scale size={20} className="text-primary-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary-900 mb-1">Conflict Management</h4>
                      <p className="text-secondary-600 text-sm">We're selective about our clients to avoid conflicts of interest, ensuring we can advocate fully for your position without compromise.</p>
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
              Our industry-specific experience provides us with valuable insights into regulatory environments, stakeholder priorities, and policy trends relevant to your organization.
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

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-secondary-900 relative">
        <div className="absolute inset-0 bg-texture bg-cover bg-center opacity-90"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-secondary-900/95 via-secondary-900 to-secondary-900/90"></div>
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto bg-white rounded-xl p-6 sm:p-10 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
              <div className="md:col-span-8">
                <h2 className="text-2xl md:text-3xl font-bold text-secondary-900 mb-3 sm:mb-4">Ready to discuss your needs?</h2>
                <p className="text-secondary-600 mb-4 md:mb-0">
                  Schedule a consultation with our team to explore how our government relations services can help advance your objectives.
                </p>
              </div>
              <div className="md:col-span-4 flex md:justify-end">
                <Link 
                  to="/contact" 
                  className="btn btn-primary btn-lg w-full md:w-auto justify-center"
                >
                  <span className="whitespace-nowrap">Schedule a Consultation</span>
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
