import React, { useEffect, useRef, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { 
  GanttChart, 
  Briefcase, 
  Globe, 
  ChevronRight, 
  ShieldCheck,
  Users,
  ChevronDown,
  Star,
  Phone,
  PieChart,
  Clock
} from 'lucide-react';
import SEO from '../components/SEO';
import { getPageSEO } from '../utils/enhanced-seo';
import OptimizedImage from '../components/OptimizedImage';
import ImprovedLeadMagnetForm from '../components/ImprovedLeadMagnetForm';

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

interface TestimonialCardProps {
  quote: string;
  organization: string;
  location?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, organization, location }) => {
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
        <p className="font-semibold text-navy-900">{organization}</p>
        {location && <p className="text-slate-500 text-sm">{location}</p>}
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

interface StatProps {
  value: string;
  label: string;
}

const Stat: React.FC<StatProps> = ({ value, label }) => {
  return (
    <div className="text-center p-4">
      <div className="text-4xl font-display font-bold text-gold-600 mb-2">{value}</div>
      <div className="text-navy-700 font-medium">{label}</div>
    </div>
  );
};

const HomePage: React.FC = () => {
  const servicesRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  
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
        {...getPageSEO({
          pageType: 'home',
          additionalMetaTags: [
            {
              name: "keywords",
              content: "Texas government relations, Texas lobbying, Austin legislative advocacy, government affairs Texas"
            }
          ]
        })}
      />

      {/* Hero Section */}
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
                href="tel:2142133443"
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

      {/* Guide Section */}
      <section className="py-16 sm:py-20 bg-slate-50 relative">
        <div className="container">
          <ImprovedLeadMagnetForm 
            title="The Texas Legislative Influence Guide: Strategies for Effective Advocacy"
            subtitle="By Drew Campbell & Byron Campbell, Capitol Insights"
            description="After four decades in Texas politics and helping secure billions in funding for our clients, we've distilled our approach into a practical guide that reveals the proven strategies for effective legislative advocacy."
            bulletPoints={[
              "The Legislative Relationship Timeline: The strategic engagement calendar that successful organizations follow between sessions",
              "The Three Levels of Influence: Why building relationships with staff and subject matter experts is often as critical as connecting with lawmakers",
              "The Coalition Framework: How to transform individual priorities into regional consensus",
              "The Issue Framing Matrix: Converting technical expertise into compelling policy narratives",
              "The Legislative Session Strategy: Maximizing impact during the intense 140-day period"
            ]}
            ctaText="GET THE GUIDE"
            downloadUrl="/downloads/texas-legislative-advocacy-guide.html"
            pdfUrl="/files/texas-legislative-influence-guide-2025.html"
            className="w-full"
          />
        </div>
      </section>

      {/* About Section */}
      <div ref={aboutRef} id="about">
        <section className="py-16 sm:py-20 md:py-24 bg-white relative">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-semibold text-navy-900 mb-6 leading-tight">
                The Legislative Advocacy That Actually Works
              </h2>
              <p className="text-lg sm:text-xl text-slate-700 mb-4 leading-relaxed">
                We don't measure success by meetings scheduled.
                <br />We measure it by bills amended, funding secured, and crises averted.
              </p>
              <p className="text-lg text-slate-700 mb-8">
                Our clients repeatedly achieve legislative outcomes that seemed impossible — because we didn't start working when the session began. We started months earlier.
              </p>
            </div>
            
            {/* Stats Section */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16">
              <Stat value="40+" label="Years Experience" />
              <Stat value="100%" label="State Influence" />
              <Stat value="100%" label="Bipartisan Access" />
              <Stat value="95%" label="Success Rate" />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div>
                <h3 className="text-2xl font-display font-semibold text-navy-900 mb-6">
                  Capitol Insiders Working For Your Bottom Line
                </h3>
                <h4 className="text-xl font-semibold text-gold-600 mb-4">
                  Strategic Access, Measurable Impact
                </h4>
                <p className="text-slate-700 mb-6">
                  In Texas politics, timing is everything. Our team has cultivated authentic relationships with key lawmakers over 40+ years, providing direct access that translates into tangible results for our clients.
                </p>
                <p className="text-slate-700 mb-8">
                  We've guided organizations through 20+ legislative sessions with a methodical approach: identifying your three key priorities, connecting you with decision-makers who matter, and navigating the legislative process with data-driven precision.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <ValueCard 
                    icon={<ShieldCheck size={20} />} 
                    title="Ethical Advocacy" 
                    description="We maintain the highest ethical standards in all our government relations work."
                  />
                  <ValueCard 
                    icon={<Users size={20} />} 
                    title="Genuine Relationships" 
                    description="Our connections are built on trust and maintained with integrity."
                  />
                  <ValueCard 
                    icon={<PieChart size={20} />} 
                    title="Measurable Results" 
                    description="We define clear objectives and track progress throughout our engagement."
                  />
                  <ValueCard 
                    icon={<Clock size={20} />} 
                    title="Proven Experience" 
                    description="With decades of combined experience, we navigate complex political landscapes with confidence."
                  />
                </div>
              </div>
              
              <div className="relative mt-6 lg:mt-0">
                <div className="relative z-10 rounded-2xl overflow-hidden shadow-xl">
                  <OptimizedImage 
                    src="/images/texas-capitol.jpg" 
                    alt="The Texas State Capitol building" 
                    objectFit="cover"
                    loading="eager"
                    fetchPriority="high"
                    width={800}
                    height={600}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px"
                    aspectRatio="4/3"
                    decoding="sync"
                  />
                </div>
                <div className="mt-4">
                  <blockquote className="text-navy-800 italic text-lg border-l-4 border-gold-500 pl-4">
                    <p className="leading-relaxed">
                      "I've spent 30+ years learning one truth: while policy debates happen in Austin, real influence grows from local roots."
                    </p>
                    <footer className="mt-2 text-navy-600 font-medium not-italic">
                      — President, Capitol Insights
                    </footer>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Services Section */}
      <div ref={servicesRef} id="services">
        <section className="py-16 sm:py-20 md:py-24 bg-slate-50 relative">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-16">
              <span className="inline-block px-3 py-1 bg-gold-100 text-gold-700 rounded-full text-sm font-medium mb-4">
                Our Services
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-semibold text-navy-900 mb-6 leading-tight">
                Texas-Focused Expertise, Measurable Outcomes
              </h2>
              <p className="text-lg text-slate-700 mb-4">
                Our specialized knowledge of Texas government has secured $32M in appropriations and achieved 22% reduction in compliance costs through strategic advocacy and deep policy expertise.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
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
            
            <div className="mt-12 text-center">
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
      </div>
      
      {/* Testimonials Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-white relative">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-semibold text-navy-900 mb-6 leading-tight">
              Client Success Stories
            </h2>
            <p className="text-slate-700 mb-8">
              Our clients consistently report significant improvements in their legislative outcomes after partnering with us.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <TestimonialCard 
              quote="Their approach to building relationships with key committee members made all the difference when our priorities competed for legislative attention. Their strategic framework turned potential competitors into allies."
              organization="Municipal Leadership Coalition"
              location="North Texas"
            />
            <TestimonialCard 
              quote="Capitol Insights brings a powerful perspective to our advocacy efforts. Their complementary expertise in both policy development and relationship management gives us a distinct advantage."
              organization="Energy Industry Association"
              location="Texas"
            />
            <TestimonialCard 
              quote="We appreciate their measurable results and clear communication throughout the entire process. Their strategic guidance has been invaluable for our organization."
              organization="Transportation Authority"
              location="Central Texas"
            />
          </div>
          
          <div className="mt-12 text-center">
            <Link 
              to="/contact" 
              className="btn btn-primary btn-lg"
            >
              <span>Schedule Consultation</span>
              <ChevronRight size={18} className="ml-1" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-navy-950 text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-semibold text-white mb-6 leading-tight">
              Ready to Protect Your Interests in the Texas Legislature?
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Most legislative advocacy fails because it starts too late.
              <br />
              We've spent decades building the relationships that deliver results when they matter most.
            </p>
            <Link to="/contact" className="btn btn-lg bg-gold-600 hover:bg-gold-500 text-navy-950 font-semibold">
              SCHEDULE A CONSULTATION
            </Link>
            <p className="mt-6 text-white/60">
              <Link to="/services" className="text-gold-400 hover:text-gold-300 underline underline-offset-4">
                Learn about our approach
              </Link>
              &nbsp; • &nbsp;
              <a href="tel:2142133443" className="text-gold-400 hover:text-gold-300 underline underline-offset-4">
                Or call us directly for a rapid response
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
