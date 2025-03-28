import React, { useEffect, useRef, ReactNode, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { 
  Landmark, 
  Users, 
  GanttChart, 
  Briefcase, 
  Globe, 
  ChevronRight, 
  Award,
  LineChart,
  ShieldCheck,
  Handshake,
  Clock,
  CheckCircle2,
  MapPin,
  ArrowRight,
  ChevronDown,
  Star,
  Target,
  Sparkles,
  Phone
} from 'lucide-react';
import SEO from '../components/SEO';

interface FeatureCardProps {
  icon: ReactElement;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="card p-6 sm:p-8 hover:border-gold-200 hover:shadow-md group transition-all duration-300">
      <div className="flex items-center mb-4">
        <div className="bg-gold-50 p-3 rounded-lg group-hover:bg-gold-100 transition-colors mr-4">
          {React.cloneElement(icon, { className: "text-gold-600" })}
        </div>
        <h3 className="text-xl font-semibold text-navy-900 group-hover:text-gold-700 transition-colors">{title}</h3>
      </div>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </div>
  );
};

interface IndustryCardProps {
  title: string;
  description: string;
}

const IndustryCard: React.FC<IndustryCardProps> = ({ title, description }) => {
  return (
    <div className="border border-slate-200 bg-white p-5 rounded-lg shadow-sm transition-all hover:border-gold-300 hover:shadow-md hover:bg-navy-50/30 group">
      <h3 className="font-medium text-navy-900 group-hover:text-gold-700 transition-colors mb-2">{title}</h3>
      <p className="text-slate-600 text-sm">{description}</p>
    </div>
  );
};

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  company: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, author, role, company }) => {
  return (
    <div className="card p-6 sm:p-8 h-full flex flex-col hover:shadow-md transition-all duration-300">
      <div className="flex items-center mb-4">
        <Star size={16} className="text-gold-500 fill-gold-500" />
        <Star size={16} className="text-gold-500 fill-gold-500" />
        <Star size={16} className="text-gold-500 fill-gold-500" />
        <Star size={16} className="text-gold-500 fill-gold-500" />
        <Star size={16} className="text-gold-500 fill-gold-500" />
      </div>
      <blockquote className="mb-6 flex-grow quote">
        <p className="text-navy-800 italic leading-relaxed">"{quote}"</p>
      </blockquote>
      <div className="pt-4 border-t border-slate-100">
        <p className="font-semibold text-navy-900">{author}</p>
        <p className="text-slate-500 text-sm">{role}, {company}</p>
      </div>
    </div>
  );
};

interface ValueCardProps {
  icon: ReactElement;
  title: string;
  description: string;
}

const ValueCard: React.FC<ValueCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 group">
      <div className="flex items-center mb-3">
        <div className="bg-gold-50 p-2 rounded-lg group-hover:bg-gold-100 transition-colors mr-3">
          {React.cloneElement(icon, { className: "text-gold-600" })}
        </div>
        <h3 className="text-lg font-semibold text-navy-900 group-hover:text-gold-700 transition-colors">{title}</h3>
      </div>
      <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
};

interface MetricCardProps {
  icon: ReactElement;
  value: string;
  label: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ icon, value, label }) => {
  return (
    <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 group">
      <div className="flex items-center mb-3">
        <div className="bg-gold-50 p-3 rounded-full group-hover:bg-gold-100 transition-colors duration-250 mr-3">
          {React.cloneElement(icon, { className: "text-gold-600" })}
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold text-gold-600 font-display">{value}</h3>
      </div>
      <p className="text-slate-700 font-medium">{label}</p>
    </div>
  );
};

const HomePage = () => {
  const servicesRef = useRef<HTMLElement | null>(null);
  const aboutRef = useRef<HTMLElement | null>(null);
  
  useEffect(() => {
    if (window.location.hash === '#services' && servicesRef.current) {
      servicesRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (window.location.hash === '#about' && aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const scrollToAbout = () => {
    if (aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="pt-16">
      <SEO 
        title="Capitol Insights | 40+ Years of Texas Legislative Relationships"
        description="When legislation threatens your business, will you be introducing yourself to lawmakers or activating relationships you've already built? Capitol Insights has spent four decades building the relationships that turn legislative challenges into opportunities."
        image="https://images.unsplash.com/photo-1585468274952-66591eb14165?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=630"
        canonical="/"
        additionalMetaTags={[
          { name: "keywords", content: "Texas government relations, legislative advocacy, Drew Campbell, Byron Campbell, Dallas Regional Mobility Coalition, North Texas Commission, Texas lobbying, policy consultants" },
          { property: "og:site_name", content: "Capitol Insights" }
        ]}
        schemaMarkup={{
          type: "Organization",
          name: "Capitol Insights",
          description: "When legislation threatens your business, will you be introducing yourself to lawmakers or activating relationships you've already built? Capitol Insights has spent four decades building the relationships that turn legislative challenges into opportunities.",
          url: "https://capitol-insights.com",
          image: "https://images.unsplash.com/photo-1585468274952-66591eb14165?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=630"
        }}
      />

      <section className="relative min-h-[80vh] sm:min-h-[90vh] flex items-center">
        <div className="absolute inset-0 bg-capitol bg-cover bg-center">
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-950/85 to-navy-900/80"></div>
          <div className="grain-overlay opacity-10"></div>
        </div>
        
        <div className="container relative z-10 py-10 sm:py-20">
          <div className="max-w-3xl">
            <div>
              <span className="inline-block px-3 sm:px-4 py-1 bg-gold-600/20 text-gold-200 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-5 backdrop-blur-sm border border-gold-500/20">
                YOUR DIRECT LINE TO TEXAS GOVERNMENT
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4 sm:mb-6 leading-tight">
              <span className="sm:block">40+ Years of Legislative</span>
              <span className="relative inline-block">
                <span className="relative z-10 text-gold-300">Relationships Working for You</span>
                <span className="absolute -bottom-2 left-0 right-0 h-2 sm:h-3 bg-gold-500/20 -z-0 rounded-sm"></span>
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-white/90 mb-6 sm:mb-8 max-w-2xl leading-relaxed">
              <strong>When legislation threatens your business, will you be introducing yourself to lawmakers... or activating relationships you've already built?</strong>
            </p>
            
            <p className="text-lg sm:text-xl text-white/90 mb-6 sm:mb-8 max-w-2xl leading-relaxed">
              At Capitol Insights, we've spent four decades building the relationships that turn legislative challenges into opportunities.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-16 sm:mb-8 px-4 py-4 sm:px-1 sm:py-2">
              <Link 
                to="/contact" 
                className="btn btn-primary btn-lg group w-full sm:w-auto justify-center sm:justify-start p-8 sm:p-6 whitespace-nowrap"
              >
                <span className="whitespace-nowrap">GET STARTED</span>
                <ChevronRight size={18} className="ml-1 inline-block group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/services" 
                className="btn btn-lg bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 w-full sm:w-auto justify-center p-8 sm:p-6"
              >
                Explore Services
              </Link>
            </div>
            
            <div className="mt-2 sm:mt-6 pb-4">
              <a 
                href="tel:+1234567890" 
                className="inline-flex items-center text-white/70 hover:text-gold-300 text-sm transition-colors"
              >
                <Phone size={14} className="mr-2 text-gold-400" />
                <span>Call for rapid response</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="absolute left-0 right-0 bottom-0 w-full h-20 bg-gradient-to-t from-navy-950 to-transparent"></div>
        
        <div className="hidden sm:block absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white">
          <button 
            onClick={scrollToAbout}
            className="flex items-center group relative hover:scale-105 transition-transform duration-300"
            aria-label="Scroll to learn more about Capitol Insights"
          >
            <div className="absolute -inset-4 rounded-full opacity-0 group-hover:opacity-10 bg-white transition-opacity duration-300"></div>
            <span className="text-sm font-medium text-white group-hover:text-gold-300 transition-colors tracking-wide uppercase mr-3">
              Learn More
            </span>
            
            <div className="relative flex items-center justify-center">
              <div className="absolute -inset-1 rounded-full bg-gold-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative w-10 h-10 flex items-center justify-center rounded-full border border-white/30 group-hover:border-gold-400 bg-navy-900/50 backdrop-blur-sm group-hover:bg-navy-800/70 transition-all">
                <ChevronDown size={18} className="text-white group-hover:text-gold-300 transition-colors" />
              </div>
            </div>
          </button>
        </div>
      </section>

      {/* Legislative Advocacy Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-white relative">
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-navy-950/10 to-transparent"></div>
        <div className="grain-overlay opacity-[0.02]"></div>
        
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-semibold text-navy-900 mb-6 leading-tight">
              The Legislative Advocacy That Actually Works
            </h2>
            <p className="text-lg sm:text-xl text-slate-700 mb-4 leading-relaxed">
              We don't measure success by meetings scheduled.
              <br />We measure it by bills amended, funding secured, and crises averted.
            </p>
            <p className="text-lg sm:text-xl text-slate-700 mb-8 leading-relaxed">
              <strong>Our clients repeatedly achieve legislative outcomes that seemed impossible —</strong> because we didn't start working when the session began. We started months earlier.
            </p>
          </div>
        </div>
        
        {/* Stats section */}
        <div className="container mb-16 sm:mb-20">
          <div className="px-2 sm:px-0">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 bg-navy-800/90 backdrop-blur-md rounded-lg sm:rounded-xl p-3 sm:p-6 border border-white/5 shadow-lg">
              <div className="text-center text-white px-2 py-1">
                <div className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gold-200">40+</div>
                <p className="text-xs sm:text-sm text-white/80">Years Experience</p>
              </div>
              <div className="text-center text-white px-2 py-1">
                <div className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gold-200">100%</div>
                <p className="text-xs sm:text-sm text-white/80">State Influence</p>
              </div>
              <div className="text-center text-white px-2 py-1">
                <div className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gold-200">100%</div>
                <p className="text-xs sm:text-sm text-white/80">Bipartisan Access</p>
              </div>
              <div className="text-center text-white px-2 py-1">
                <div className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gold-200">95%</div>
                <p className="text-xs sm:text-sm text-white/80">Success Rate</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div>
              <span className="inline-block px-3 py-1 bg-gold-100 text-gold-700 rounded-full text-sm font-medium mb-4">
                Capitol Insiders Working For Your Bottom Line
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-semibold text-navy-900 mb-6 leading-tight">
                Strategic Access, <br className="hidden md:block"/> Measurable Impact
              </h2>
              <p className="text-slate-700 mb-4 sm:mb-6 leading-relaxed">
                In Texas politics, timing is everything. Our team has cultivated authentic relationships with key lawmakers over 40+ years, providing direct access that translates into tangible results for our clients.
              </p>
              <p className="text-slate-700 mb-6 sm:mb-8 leading-relaxed">
                We've guided organizations through 20+ legislative sessions with a methodical approach: identifying your three key priorities, connecting you with decision-makers who matter, and navigating the legislative process with data-driven precision.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <ValueCard 
                  icon={<ShieldCheck size={20} />} 
                  title="Ethical Advocacy" 
                  description="We maintain the highest ethical standards in all our government relations work."
                />
                <ValueCard 
                  icon={<Handshake size={20} />} 
                  title="Genuine Relationships" 
                  description="Our connections are built on trust and maintained with integrity."
                />
                <ValueCard 
                  icon={<LineChart size={20} />} 
                  title="Measurable Results" 
                  description="We define clear objectives and track progress throughout our engagement."
                />
                <ValueCard 
                  icon={<Award size={20} />} 
                  title="Proven Experience" 
                  description="With decades of combined experience, we navigate complex political landscapes with confidence."
                />
              </div>
            </div>
            
            <div className="relative mt-6 lg:mt-0">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1523292562811-8fa7962a78c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80" 
                  alt="The Texas State Capitol building" 
                  className="w-full h-auto aspect-[4/3] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/20 to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-gold-100 rounded-2xl -z-10"></div>
              <div className="absolute -top-6 -left-6 w-40 h-40 bg-slate-100 rounded-2xl -z-10"></div>
              
              <div className="absolute bottom-4 left-4 right-4 bg-navy-950/90 backdrop-blur-sm p-4 rounded-lg border border-white/10 text-white">
                <div className="flex items-start gap-3">
                  <div className="text-4xl text-gold-400 font-display leading-none mt-1">"</div>
                  <div>
                    <p className="text-sm leading-relaxed text-white/90">
                      I've spent 30+ years learning one truth: while policy debates happen in Austin, real influence grows from local roots.
                    </p>
                    <p className="text-xs text-gold-300 mt-2 font-medium">— Drew Campbell, President</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section ref={servicesRef} id="services" className="py-16 sm:py-20 md:py-24 bg-slate-50 relative">
        <div className="grain-overlay opacity-[0.02]"></div>
        
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-16">
            <span className="inline-block px-3 py-1 bg-gold-100 text-gold-700 rounded-full text-sm font-medium mb-4">
              Our Services
            </span>
            <h2 className="section-title">
              Texas-Focused Expertise, Measurable Outcomes
            </h2>
            <p className="section-subtitle">
              Our specialized knowledge of Texas government has secured $32M in appropriations and achieved 22% reduction in compliance costs through strategic advocacy and deep policy expertise.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <FeatureCard 
              icon={<GanttChart size={24} />}
              title="Direct Capitol Access"
              description="When you need to be heard in Austin, timing matters. Our established relationships with key committee chairs and legislative leadership ensure your priorities receive attention when it counts most."
            />
            
            <FeatureCard 
              icon={<Briefcase size={24} />}
              title="Industry-Specific Expertise"
              description="With specialized knowledge across 7 key sectors, we understand the regulatory nuances that impact your business. This expertise has helped clients navigate complex policy environments since 1983."
            />
            
            <FeatureCard 
              icon={<Globe size={24} />}
              title="Proactive Opportunity Identification"
              description="Our 24/7 legislative monitoring has helped clients secure early advantages in emerging policy areas. We identify both threats and opportunities months before they appear on competitors' radar."
            />
          </div>
          
          <div className="mt-12 sm:mt-16 text-center">
            <Link 
              to="/services" 
              className="btn btn-primary btn-lg group transition-all"
            >
              View All Services
              <ChevronRight size={18} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Results Metrics Section */}
      <section className="py-16 sm:py-20 bg-white relative">
        <div className="grain-overlay opacity-[0.02]"></div>
        
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-12">
            <span className="inline-block px-3 py-1 bg-gold-100 text-gold-700 rounded-full text-sm font-medium mb-4">
              By The Numbers
            </span>
            <h2 className="section-title">
              Proven Results That Speak For Themselves
            </h2>
            <p className="section-subtitle">
              Our track record demonstrates our effectiveness in creating positive outcomes for our clients.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <MetricCard 
              icon={<Award size={24} />}
              value="40+"
              label="Years Experience"
            />
            <MetricCard 
              icon={<MapPin size={24} />}
              value="2"
              label="Strategic Offices"
            />
            <MetricCard 
              icon={<Clock size={24} />}
              value="24/7"
              label="Legislative Monitoring"
            />
            <MetricCard 
              icon={<CheckCircle2 size={24} />}
              value="95%"
              label="Success Rate"
            />
          </div>
          
          <div className="mt-12 sm:mt-16 p-5 sm:p-6 bg-navy-50 rounded-xl border border-navy-100 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="bg-navy-100 p-3 rounded-lg flex-shrink-0">
                <LineChart size={24} className="text-navy-700" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-navy-900 mb-1">Measurable Success</h3>
                <p className="text-navy-700 leading-relaxed mb-0">
                  We measure success by your bottom-line results: $32M in appropriations secured in the last legislative session and 22% reduction in compliance costs for healthcare clients.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Preview Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-slate-50 relative">
        <div className="grain-overlay opacity-[0.02]"></div>
        
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-12">
            <span className="inline-block px-3 py-1 bg-gold-100 text-gold-700 rounded-full text-sm font-medium mb-4">
              Meet Our Team
            </span>
            <h2 className="section-title">
              Capitol Experts With Real Relationships
            </h2>
            <p className="section-subtitle">
              Our leadership brings decades of experience and established relationships with key decision-makers throughout Texas.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 group">
              <div className="aspect-[4/3] relative overflow-hidden">
                <img 
                  src="/uploads/team/drew-campbell.jpg" 
                  alt="Drew Campbell - President of Capitol Insights" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-xl font-bold text-white">Drew Campbell</h3>
                  <p className="text-gold-300">President</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-slate-700 mb-4 leading-relaxed">
                  Drew brings 40+ years of lobbying experience, including a 25-year tenure as CEO of the New Car Dealers Association of Metropolitan Dallas. His longstanding relationships with Texas legislators and deep understanding of the transportation sector have helped secure billions in funding for critical infrastructure projects.
                </p>
                <Link 
                  to="/team" 
                  className="text-gold-600 font-medium inline-flex items-center hover:text-gold-700 group"
                >
                  <span>Learn more</span>
                  <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 group">
              <div className="aspect-[4/3] relative overflow-hidden">
                <img 
                  src="/uploads/team/byron-campbell.jpg" 
                  alt="Byron Campbell - Senior Partner at Capitol Insights" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-xl font-bold text-white">Byron Campbell</h3>
                  <p className="text-gold-300">Senior Partner</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-slate-700 mb-4 leading-relaxed">
                  Byron has extensive experience in government relations at local, state, and federal levels. His expertise with the Texas Association of Water Companies and Advanced Power Alliance gives clients unparalleled access to the energy and water sectors.
                </p>
                <Link 
                  to="/team" 
                  className="text-gold-600 font-medium inline-flex items-center hover:text-gold-700 group"
                >
                  <span>Learn more</span>
                  <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Link 
              to="/team" 
              className="btn btn-primary btn-lg group transition-all"
            >
              Meet Our Full Team
              <ChevronRight size={18} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-white relative">
        <div className="grain-overlay opacity-[0.02]"></div>
        
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-16">
            <span className="inline-block px-3 py-1 bg-gold-100 text-gold-700 rounded-full text-sm font-medium mb-4">
              Client Success Stories
            </span>
            <h2 className="section-title">
              What Our Clients Say
            </h2>
            <p className="section-subtitle">
              We let our results and relationships speak for themselves. Here's what organizations we've worked with have to say about our approach.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <TestimonialCard 
              quote="Capitol Insights' approach to building relationships with key committee members made all the difference when our priorities competed for legislative attention. Their strategic framework turned our competitors into allies."
              author="City Council Member"
              role="City of Coppell"
              company="DRMC Chair"
            />
          </div>
          
          <div className="mt-10 sm:mt-12 text-center">
            <Link 
              to="/results" 
              className="text-gold-600 font-medium inline-flex items-center hover:text-gold-700 group"
            >
              <span>View more success stories</span>
              <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section id="industries" className="py-16 sm:py-20 md:py-24 bg-slate-50 relative">
        <div className="grain-overlay opacity-[0.02]"></div>
        
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-16">
            <span className="inline-block px-3 py-1 bg-gold-100 text-gold-700 rounded-full text-sm font-medium mb-4">
              Industries We Serve
            </span>
            <h2 className="section-title">
              Specialized Experience Across Sectors
            </h2>
            <p className="section-subtitle">
              We've built expertise in key industries, allowing us to provide informed, effective advocacy tailored to your specific regulatory environment.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <IndustryCard 
              title="Transportation & Infrastructure" 
              description="Drew's decades of experience with transportation interests and role as Executive Director of the Dallas Regional Mobility Coalition give us unmatched insight into infrastructure challenges."
            />
            <IndustryCard 
              title="Regional Government Relations" 
              description="Our work with the North Texas Commission and instrumental role in launching the North Texas Advocacy Coalition has positioned us as leaders in regional government advocacy."
            />
            <IndustryCard 
              title="Automobile Industry" 
              description="Drew's 25-year leadership of the New Car Dealers Association gives us deep expertise in automotive regulatory issues."
            />
            <IndustryCard 
              title="Water Resource Management" 
              description="Byron's engagement with the Texas Association of Water Companies gives clients direct access to critical water policy discussions."
            />
            <IndustryCard 
              title="Energy & Utilities" 
              description="Through Advanced Power Alliance and other initiatives, we've built strong connections throughout the energy sector."
            />
            <IndustryCard 
              title="Financial Services" 
              description="Capitol Insights represents major financial interests, navigating complex regulatory environments."
            />
            <IndustryCard 
              title="Manufacturing & Trade" 
              description="Our established relationships with state manufacturing leaders ensure your industry concerns are represented effectively."
            />
            <IndustryCard 
              title="Tourism & Hospitality" 
              description="Byron's connections with Visit Dallas and similar organizations provide specialized insight into tourism policy."
            />
            <IndustryCard 
              title="Healthcare & Medical Services" 
              description="We help healthcare providers navigate changing regulatory landscapes while preserving quality patient care."
            />
          </div>
          
          <div className="mt-12 sm:mt-16 p-5 sm:p-6 bg-white rounded-xl border border-slate-200 max-w-4xl mx-auto shadow-sm">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="bg-gold-50 p-4 rounded-lg flex-shrink-0">
                <Landmark size={28} className="text-gold-600" />
              </div>
              <div className="flex-grow text-center md:text-left">
                <h3 className="text-lg font-semibold text-navy-900 mb-2">Need industry-specific guidance?</h3>
                <p className="text-slate-700 leading-relaxed mb-4 md:mb-0">
                  Contact us for a customized approach to your sector's unique regulatory challenges.
                </p>
              </div>
              <div className="flex-shrink-0 w-full md:w-auto">
                <Link 
                  to="/contact" 
                  className="btn btn-primary btn-md whitespace-nowrap group w-full md:w-auto justify-center"
                >
                  <span>Schedule Consultation</span>
                  <ChevronRight size={16} className="ml-1 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We're Different Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-white relative">
        <div className="grain-overlay opacity-[0.02]"></div>
        
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-16">
            <span className="inline-block px-3 py-1 bg-gold-100 text-gold-700 rounded-full text-sm font-medium mb-4">
              How We're Different
            </span>
            <h2 className="section-title">
              The Capitol Insights Difference
            </h2>
            <p className="section-subtitle">
              What sets us apart from other government relations firms in Texas?
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center mb-3">
                <div className="bg-gold-50 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mr-4">
                  <Target size={22} className="text-gold-600" />
                </div>
                <h3 className="text-lg font-semibold text-navy-900">Relationship-First Approach</h3>
              </div>
              <p className="text-slate-600 leading-relaxed">Most firms scramble during session. We've already laid the groundwork through strategic relationship building 6-12 months in advance.</p>
            </div>
            
            <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center mb-3">
                <div className="bg-gold-50 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mr-4">
                  <Users size={22} className="text-gold-600" />
                </div>
                <h3 className="text-lg font-semibold text-navy-900">Proven Track Record</h3>
              </div>
              <p className="text-slate-600 leading-relaxed">We've served as the lobbying firm for the North Texas Commission for years and were instrumental in launching the North Texas Advocacy Coalition.</p>
            </div>
            
            <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center mb-3">
                <div className="bg-gold-50 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mr-4">
                  <Sparkles size={22} className="text-gold-600" />
                </div>
                <h3 className="text-lg font-semibold text-navy-900">Executive Director Experience</h3>
              </div>
              <p className="text-slate-600 leading-relaxed">Drew Campbell serves as Executive Director of the Dallas Regional Mobility Coalition, giving us unmatched insight into regional transportation needs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Texas Legislative Timeline Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-slate-50 relative">
        <div className="grain-overlay opacity-[0.02]"></div>
        
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-16">
            <span className="inline-block px-3 py-1 bg-gold-100 text-gold-700 rounded-full text-sm font-medium mb-4">
              Insider Knowledge
            </span>
            <h2 className="section-title">
              The Texas Legislative Timeline Nobody Tells You About
            </h2>
            <p className="section-subtitle">
              The Texas Legislature meets for 140 days starting January of odd-numbered years.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-md">
            <div className="mb-6 text-center">
              <p className="text-lg text-navy-800 font-medium">Most organizations wait until January to start building relationships with lawmakers.</p>
              <p className="text-xl text-gold-600 font-bold mt-2">By then, it's already too late.</p>
            </div>
            
            <div className="border-t border-b border-slate-200 py-6 my-6">
              <p className="text-navy-800 text-center">
                The real legislative work happens during the interim—the 18+ months when the Legislature isn't in session.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-8">
              <Link 
                to="/approach" 
                className="btn btn-primary btn-lg group transition-all"
              >
                Learn Our Approach
                <ChevronRight size={18} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-texture bg-cover bg-center relative">
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/95 to-navy-800/90"></div>
        <div className="grain-overlay"></div>
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-3 py-1 bg-white/10 text-white rounded-full text-sm font-medium mb-4 backdrop-blur-sm border border-white/10">
              Let's Work Together
            </span>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white mb-4 sm:mb-6">
              Ready to Protect Your Interests in the Texas Legislature?
            </h2>
            
            <p className="text-lg sm:text-xl text-gold-50 mb-4 sm:mb-6 max-w-2xl mx-auto leading-relaxed">
              Most legislative advocacy fails because it starts too late.
            </p>
            
            <p className="text-lg sm:text-xl text-gold-50 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed">
              We've spent decades building the relationships that deliver results when they matter most.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4 sm:px-0">
              <Link 
                to="/contact" 
                className="btn bg-gold-600 text-navy-950 hover:bg-gold-500 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg shadow-lg transition-colors inline-block group relative overflow-hidden w-full sm:w-auto justify-center"
              >
                <div className="flex items-center">
                  <span className="relative z-10 whitespace-nowrap">SCHEDULE A CONSULTATION</span>
                  <ChevronRight size={18} className="ml-2 relative z-10 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
              <Link
                to="/approach"
                className="text-white hover:text-gold-300 font-medium transition-colors flex items-center group"
              >
                <span>Learn about our approach</span>
                <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            <div className="mt-8 sm:mt-10 flex flex-col items-center">
              <a 
                href="tel:+1234567890" 
                className="text-white/80 hover:text-gold-300 transition-colors inline-flex items-center text-sm mb-4"
              >
                <Phone size={14} className="mr-2 text-gold-400" />
                <span>Or call us directly for a rapid response</span>
              </a>
              
              <p className="text-white/70 text-sm max-w-2xl text-center">
                With offices in Dallas and Austin, the partners of Capitol Insights shape legislative and regulatory agendas with a 40-year reputation for orchestrating smart solutions, delivering results, and maintaining integrity.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Define missing Shield component
const Shield: React.FC<React.ComponentProps<typeof ShieldCheck>> = (props) => {
  return <ShieldCheck {...props} />;
};

export default HomePage;
