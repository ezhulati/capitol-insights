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

interface IndustryTagProps {
  children: ReactNode;
}

const IndustryTag: React.FC<IndustryTagProps> = ({ children }) => {
  return (
    <div className="border border-slate-200 bg-white px-5 py-4 rounded-lg shadow-sm transition-all hover:border-gold-300 hover:shadow-md hover:bg-navy-50/30 group">
      <h3 className="font-medium text-navy-900 group-hover:text-gold-700 transition-colors">{children}</h3>
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
        title="Capitol Insights | Texas Government Relations & Lobbying"
        description="Capitol Insights delivers ethical, effective government relations services throughout Texas, transforming policy challenges into strategic advantages for organizations."
        image="https://images.unsplash.com/photo-1585468274952-66591eb14165?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=630"
        canonical="/"
        additionalMetaTags={[
          { name: "keywords", content: "government relations, texas lobbying, legislative advocacy, policy consultants, austin, dallas" },
          { property: "og:site_name", content: "Capitol Insights" }
        ]}
        schemaMarkup={{
          type: "Organization",
          name: "Capitol Insights",
          description: "Capitol Insights delivers ethical, effective government relations services throughout Texas, transforming policy challenges into strategic advantages for organizations.",
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
              Transforming Policy{" "}
              <span className="sm:block">Challenges Into{" "}</span>
              <span className="relative inline-block">
                <span className="relative z-10 text-gold-300">Strategic Advantages</span>
                <span className="absolute -bottom-2 left-0 right-0 h-2 sm:h-3 bg-gold-500/20 -z-0 rounded-sm"></span>
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-white/90 mb-6 sm:mb-8 max-w-2xl leading-relaxed">
              From local municipalities to the State Capitol, Capitol Insights provides effective, ethical government relations services throughout Texas.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-16 sm:mb-8 px-4 py-4 sm:px-1 sm:py-2">
<Link 
  to="/contact" 
  className="btn btn-primary btn-lg group w-full sm:w-auto justify-center sm:justify-start p-8 sm:p-6 whitespace-nowrap"
>
  <span className="whitespace-nowrap">Schedule Assessment</span>
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

      {/* About Section */}
      <section ref={aboutRef} id="about" className="py-16 sm:py-20 md:py-24 bg-white relative">
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-navy-950/10 to-transparent"></div>
        <div className="grain-overlay opacity-[0.02]"></div>
        
        {/* Stats section - Moved down from hero section */}
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
                Direct Communication, <br className="hidden md:block"/> Real Results
              </h2>
              <p className="text-slate-700 mb-4 sm:mb-6 leading-relaxed">
                Unlike firms that make vague promises, we're transparent about what government relations work actually involves. Our team has built authentic relationships with lawmakers over decades, providing us access that benefits our clients.
              </p>
              <p className="text-slate-700 mb-6 sm:mb-8 leading-relaxed">
                We're straightforward about our approach: we connect your organization with the right decision-makers, help you communicate your position clearly, and navigate the legislative process with expertise and integrity.
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
              Focused Expertise, Tailored Approach
            </h2>
            <p className="section-subtitle">
              We don't promise vague "influence" or make exaggerated claims. Instead, we offer specific, practical services that deliver tangible results through ethical advocacy.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <FeatureCard 
              icon={<GanttChart size={24} />}
              title="Direct Capitol Access"
              description="We provide direct, timely access to key decision-makers in Austin, allowing your organization's concerns to be heard by those who matter most."
            />
            
            <FeatureCard 
              icon={<Briefcase size={24} />}
              title="Industry-Specific Expertise"
              description="Our team brings specialized knowledge in key sectors including telecommunications, transportation, healthcare, and energy regulation."
            />
            
            <FeatureCard 
              icon={<Globe size={24} />}
              title="Proactive Threat Detection"
              description="We monitor legislative developments continuously, identifying potential challenges to your interests before they become problematic."
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
                  With over 30 years of government relations experience, Drew has established Capitol Insights as a respected firm in Texas politics. Former CEO of the New Car Dealers Association of Metropolitan Dallas.
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
                  Byron brings over 10 years of experience in government and politics at local, state, and federal levels. His methodical approach helps clients navigate complex policy environments and achieve their objectives.
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
              quote="Capitol Insights provided straightforward guidance through complex legislative challenges. Their team was transparent about what was achievable and delivered exactly what they promised. We saw real, measurable results that positively impacted our organization's bottom line."
              author="Sarah Johnson"
              role="Director of Public Affairs"
              company="Texas Municipal League"
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
            <IndustryTag>Telecommunications</IndustryTag>
            <IndustryTag>Local Municipalities</IndustryTag>
            <IndustryTag>Transportation</IndustryTag>
            <IndustryTag>Information Technology</IndustryTag>
            <IndustryTag>Private Law Enforcement</IndustryTag>
            <IndustryTag>Healthcare</IndustryTag>
            <IndustryTag>Energy & Utilities</IndustryTag>
            <IndustryTag>Education</IndustryTag>
            <IndustryTag>Non-Profit Organizations</IndustryTag>
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

      {/* Why Choose Us Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-white relative">
        <div className="grain-overlay opacity-[0.02]"></div>
        
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-16">
            <span className="inline-block px-3 py-1 bg-gold-100 text-gold-700 rounded-full text-sm font-medium mb-4">
              Why Capitol Insights
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
                <h3 className="text-lg font-semibold text-navy-900">Focused Expertise</h3>
              </div>
              <p className="text-slate-600 leading-relaxed">We don't try to be everything to everyone. Our specialized focus on Texas government relations means deeper expertise and stronger relationships where they matter most.</p>
            </div>
            
            <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center mb-3">
                <div className="bg-gold-50 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mr-4">
                  <Users size={22} className="text-gold-600" />
                </div>
                <h3 className="text-lg font-semibold text-navy-900">Senior-Level Service</h3>
              </div>
              <p className="text-slate-600 leading-relaxed">You'll never be passed off to junior associates. Our principals work directly with clients, bringing decades of experience to every engagement.</p>
            </div>
            
            <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center mb-3">
                <div className="bg-gold-50 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mr-4">
                  <Sparkles size={22} className="text-gold-600" />
                </div>
                <h3 className="text-lg font-semibold text-navy-900">Authentic Relationships</h3>
              </div>
              <p className="text-slate-600 leading-relaxed">Our team has built genuine, longstanding relationships with key decision-makers across Texas government—not just transactional connections.</p>
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
              Ready for Transparent, Effective Advocacy?
            </h2>
            
            <p className="text-lg sm:text-xl text-gold-50 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed">
              Let's discuss how our straightforward, strategic approach to government relations can help advance your policy objectives.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4 sm:px-0">
              <Link 
                to="/contact" 
                className="btn bg-gold-600 text-navy-950 hover:bg-gold-500 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg shadow-lg transition-colors inline-block group relative overflow-hidden w-full sm:w-auto justify-center"
              >
                <div className="flex items-center">
                  <span className="relative z-10 whitespace-nowrap">Schedule Your Policy Assessment</span>
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
            
            <div className="mt-8 sm:mt-10 flex justify-center">
              <a 
                href="tel:+1234567890" 
                className="text-white/80 hover:text-gold-300 transition-colors inline-flex items-center text-sm"
              >
                <Phone size={14} className="mr-2 text-gold-400" />
                <span>Or call us directly for a rapid response</span>
              </a>
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
