import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Lightbulb, 
  CheckCircle2, 
  Shield, 
  ChevronRight, 
  Calendar, 
  PieChart, 
  Users, 
  ClipboardList,
  LineChart,
  MessageSquare,
  Building2,
  Gauge,
  Handshake,
  FileText,
  Megaphone
} from 'lucide-react';
import SEO from '../components/SEO';

const ProcessStep = ({ number, title, description, icon }) => {
  return (
    <div className="relative">
      <div className="flex">
        <div className="mr-6">
          <div className="flex items-center justify-center w-12 h-12 bg-primary-500 rounded-full text-white font-bold text-lg">
            {number}
          </div>
          {number < 4 && (
            <div className="w-0.5 h-16 bg-primary-200 mx-auto mt-4 mb-2"></div>
          )}
        </div>
        
        <div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-secondary-100 mb-12">
            <div className="flex items-start gap-4">
              <div className="bg-primary-50 p-2 rounded-md mt-1">
                {icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-3">{title}</h3>
                <p className="text-secondary-700">{description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ValueCard = ({ icon, title, description }) => {
  return (
    <div className="card p-6 hover:shadow-md transition-all duration-300">
      <div className="flex items-center mb-3">
        <div className="bg-primary-50 p-2 rounded-lg mr-3">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-secondary-900">{title}</h3>
      </div>
      <p className="text-secondary-600 text-sm">{description}</p>
    </div>
  );
};

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  
  return (
    <div className="border-b border-secondary-200 py-5">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="flex w-full justify-between items-center text-left"
      >
        <h3 className="text-lg font-medium text-secondary-900">{question}</h3>
        <span className={`ml-6 flex-shrink-0 text-primary-600 transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronRight size={20} className="rotate-90" />
        </span>
      </button>
      
      {isOpen && (
        <div className="mt-3 text-secondary-700">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

const DifferentiatorCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-secondary-100 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-center mb-3">
        <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mr-4">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-secondary-900">{title}</h3>
      </div>
      <p className="text-secondary-700 text-sm">{description}</p>
    </div>
  );
};

const ApproachPage = () => {
  return (
    <div className="pt-16">
      {/* SEO Configuration */}
      <SEO 
        title="Our Strategic Advocacy Approach | Capitol Insights"
        description="Learn about Capitol Insights' transparent, relationship-driven approach to government relations in Texas and what sets us apart from other lobbying firms."
        image="https://images.unsplash.com/photo-1606857521015-7f9fcf423740?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=630"
        canonical="/approach"
        additionalMetaTags={[
          { name: "keywords", content: "government relations approach, lobbying methodology, ethical advocacy, texas policy strategy, transparent lobbying" },
          { property: "og:site_name", content: "Capitol Insights" }
        ]}
      />

      {/* Approach Header */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-3 py-1 bg-primary-500/20 text-primary-200 rounded-full text-sm font-medium mb-4">
              Our Methodology
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Approach</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              We believe in transparency about our process. Here's how we work to deliver meaningful results through ethical advocacy.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-3 py-1 bg-primary-100 text-primary-600 rounded-full text-sm font-medium mb-4">
                Our Philosophy
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold text-secondary-900 mb-6 leading-tight">
                Clear Communication, <br className="hidden md:block"/> Real Results
              </h2>
              <p className="text-secondary-700 mb-6 leading-relaxed">
                At Capitol Insights, we believe government relations work should be straightforward and transparent. Unlike firms that make vague promises about "influence" or "access," we're clear about what we do: we help you understand the legislative and regulatory landscape, develop effective strategies, and engage with decision-makers in an ethical, results-focused way.
              </p>
              <p className="text-secondary-700 mb-8 leading-relaxed">
                Our approach is built on genuine relationships developed over decades, deep knowledge of policy processes, and a commitment to integrity in every interaction. We won't promise specific outcomes that depend on many variables, but we will provide honest assessments of what's achievable and work tirelessly to advance your interests.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <ValueCard 
                  icon={<Shield size={20} className="text-primary-600" />}
                  title="Ethical Standards"
                  description="We maintain the highest ethical standards in all our government relations work, prioritizing transparency and honesty."
                />
                <ValueCard 
                  icon={<Handshake size={20} className="text-primary-600" />}
                  title="Genuine Relationships"
                  description="Our connections are built on trust and maintained with integrity, not transactional interactions."
                />
                <ValueCard 
                  icon={<LineChart size={20} className="text-primary-600" />}
                  title="Measurable Results"
                  description="We define clear objectives and track progress throughout our engagement."
                />
                <ValueCard 
                  icon={<CheckCircle2 size={20} className="text-primary-600" />}
                  title="Proven Experience"
                  description="With decades of combined experience, we navigate complex political landscapes with confidence."
                />
              </div>
            </div>
            
            <div className="relative mt-6 lg:mt-0">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1606857521015-7f9fcf423740?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80" 
                  alt="Capitol building representing government relations approach" 
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/20 to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-primary-100 rounded-2xl -z-10"></div>
              <div className="absolute -top-6 -left-6 w-40 h-40 bg-secondary-100 rounded-2xl -z-10"></div>
              
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

      {/* Process Section */}
      <section className="py-24 bg-secondary-50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-block px-3 py-1 bg-primary-100 text-primary-600 rounded-full text-sm font-medium mb-4">
              Our Process
            </span>
            <h2 className="section-title">
              A Structured Approach to Government Relations
            </h2>
            <p className="section-subtitle">
              We follow a clear, methodical process designed to maximize your chances of success while providing transparency at every step.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <ProcessStep 
              number={1}
              title="Assessment & Strategic Planning"
              description="We begin with a thorough assessment of your needs, goals, and the legislative landscape affecting your interests. This includes identifying key stakeholders, potential obstacles, and opportunities for effective advocacy."
              icon={<ClipboardList size={24} className="text-primary-600" />}
            />
            
            <ProcessStep 
              number={2}
              title="Targeted Relationship Development"
              description="We help you build and strengthen relationships with decision-makers and influencers who matter to your cause. This includes facilitating introductions, preparing for meetings, and creating opportunities for meaningful dialogue."
              icon={<Users size={24} className="text-primary-600" />}
            />
            
            <ProcessStep 
              number={3}
              title="Strategic Implementation"
              description="We execute your government relations strategy through targeted advocacy, coalition building, and strategic communications. Our team provides representation at hearings, meetings, and other key events to advance your interests."
              icon={<LineChart size={24} className="text-primary-600" />}
            />
            
            <ProcessStep 
              number={4}
              title="Monitoring & Adaptation"
              description="We continuously monitor developments, track progress toward objectives, and provide regular updates. As conditions change, we adapt strategies to ensure ongoing effectiveness and maintain momentum toward your goals."
              icon={<Gauge size={24} className="text-primary-600" />}
            />
          </div>
        </div>
      </section>

      {/* Differentiators Section */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-block px-3 py-1 bg-primary-100 text-primary-600 rounded-full text-sm font-medium mb-4">
              The Capitol Insights Advantage
            </span>
            <h2 className="section-title">
              What Sets Us Apart
            </h2>
            <p className="section-subtitle">
              Our approach to government relations is distinguished by several key factors that contribute to our effectiveness and client satisfaction.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <DifferentiatorCard 
              icon={<Building2 size={24} className="text-primary-600" />}
              title="Direct Principal Access"
              description="You'll work directly with our senior leadership—not junior associates. This ensures you benefit from decades of experience and established relationships."
            />
            
            <DifferentiatorCard 
              icon={<FileText size={24} className="text-primary-600" />}
              title="Transparent Reporting"
              description="We provide detailed, regular reports on all activities and progress toward your objectives, ensuring complete transparency in our work."
            />
            
            <DifferentiatorCard 
              icon={<Megaphone size={24} className="text-primary-600" />}
              title="Integrated Communications"
              description="We integrate strategic communications with lobbying efforts, ensuring consistent messaging that reinforces your policy objectives."
            />
            
            <DifferentiatorCard 
              icon={<Users size={24} className="text-primary-600" />}
              title="Coalition Building Expertise"
              description="We excel at building and managing effective coalitions that amplify your voice and increase your influence on key issues."
            />
            
            <DifferentiatorCard 
              icon={<PieChart size={24} className="text-primary-600" />}
              title="Data-Driven Strategies"
              description="Our approaches are informed by data and evidence, not just relationships, ensuring more effective and persuasive advocacy."
            />
            
            <DifferentiatorCard 
              icon={<Calendar size={24} className="text-primary-600" />}
              title="Proactive Monitoring"
              description="We continuously track legislative and regulatory developments, allowing us to identify opportunities and challenges early."
            />
          </div>
        </div>
      </section>

      {/* Commitments Section */}
      <section className="py-24 bg-secondary-50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-block px-3 py-1 bg-primary-100 text-primary-600 rounded-full text-sm font-medium mb-4">
              Our Commitments
            </span>
            <h2 className="section-title">
              What We Promise Our Clients
            </h2>
            <p className="section-subtitle">
              These are the commitments we make to every client we work with—and we stand by them without exception.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-secondary-100">
              <ul className="space-y-5">
                <li className="flex items-start">
                  <CheckCircle2 size={24} className="text-primary-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-secondary-900 mb-1">Honest Assessment of Possibilities</h3>
                    <p className="text-secondary-700">
                      We will always provide an honest assessment of what's achievable, never making promises we can't keep or guaranteeing specific legislative outcomes that depend on many variables.
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <CheckCircle2 size={24} className="text-primary-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-secondary-900 mb-1">Ethical Advocacy at All Times</h3>
                    <p className="text-secondary-700">
                      We will only use ethical means to advance your interests, maintaining the highest standards of integrity in all our interactions.
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <CheckCircle2 size={24} className="text-primary-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-secondary-900 mb-1">Transparent Fee Structure</h3>
                    <p className="text-secondary-700">
                      We will provide clear, detailed information about our fees and what they cover, with no hidden costs or ambiguous value promises.
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <CheckCircle2 size={24} className="text-primary-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-secondary-900 mb-1">Responsive Communication</h3>
                    <p className="text-secondary-700">
                      We will respond to all client communications within one business day, ensuring you're never left wondering about the status of your matters.
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <CheckCircle2 size={24} className="text-primary-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-secondary-900 mb-1">Detailed Reporting</h3>
                    <p className="text-secondary-700">
                      We will provide regular, detailed reports on all activities, contacts, and progress toward your objectives, ensuring complete transparency.
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <CheckCircle2 size={24} className="text-primary-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-secondary-900 mb-1">Conflict Avoidance</h3>
                    <p className="text-secondary-700">
                      We will not represent clients with directly conflicting interests, ensuring our advocacy on your behalf is never compromised.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-block px-3 py-1 bg-primary-100 text-primary-600 rounded-full text-sm font-medium mb-4">
              Common Questions
            </span>
            <h2 className="section-title">
              Frequently Asked Questions
            </h2>
            <p className="section-subtitle">
              Answers to common questions about our approach to government relations and what to expect when working with us.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <FAQItem 
              question="How long does it typically take to see results from government relations work?"
              answer="Government relations work often operates on legislative and regulatory timelines, which can vary significantly. For state-level legislative initiatives, outcomes often align with legislative sessions, which in Texas occur biennially. Some regulatory matters can move more quickly, while complex legislative changes might require multiple sessions. During our initial consultation, we'll provide a realistic timeline based on your specific objectives."
            />
            
            <FAQItem 
              question="Do you guarantee specific legislative or regulatory outcomes?"
              answer="No reputable government relations firm should guarantee specific outcomes, as policy making involves many factors beyond any single firm's control. What we do guarantee is ethical, strategic advocacy based on genuine relationships and expertise. We provide realistic assessments of what's achievable and work diligently to maximize your chances of success."
            />
            
            <FAQItem 
              question="How do you determine if there's a conflict of interest with other clients?"
              answer="We conduct thorough conflict checks before taking on new clients. We will not represent clients with directly opposing interests on the same issue. When potential conflicts arise, we discuss them transparently and, if necessary, decline representation. Our commitment is to provide undivided loyalty to each client on the matters we handle for them."
            />
            
            <FAQItem 
              question="What makes Capitol Insights different from other government relations firms?"
              answer="Our approach emphasizes direct principal involvement (you'll work with our senior leadership, not junior associates), transparent reporting, ethical advocacy, and realistic expectations. Unlike firms that make vague promises about 'influence,' we focus on specific, practical services that deliver tangible results through genuine relationships and strategic expertise."
            />
            
            <FAQItem 
              question="How do you measure success in government relations work?"
              answer="Success is measured against the specific objectives we establish with you at the outset of our engagement. These may include legislative outcomes, regulatory decisions, relationship development milestones, coalition building progress, or strategic positioning achievements. We provide regular reports tracking progress against these defined metrics."
            />
            
            <FAQItem 
              question="Do you work on a retainer basis or project basis?"
              answer="We offer both retainer and project-based fee arrangements, depending on your needs. Retainer relationships are ideal for ongoing government relations needs, providing continuous monitoring, relationship development, and advocacy. Project-based engagements work well for specific, time-limited initiatives. We'll recommend the approach that best suits your objectives."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-texture bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/95 to-primary-800/90"></div>
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready for Transparent, Effective Advocacy?
            </h2>
            
            <p className="text-xl text-primary-50 mb-10 max-w-2xl mx-auto">
              Let's discuss how our straightforward, strategic approach to government relations can help advance your policy objectives.
            </p>
            
            <div>
              <Link 
                to="/contact" 
                className="btn bg-white text-primary-900 hover:bg-primary-50 font-semibold px-8 py-4 rounded-lg text-lg shadow-lg transition-colors inline-block whitespace-nowrap"
              >
                Schedule Your Policy Assessment
                <ChevronRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ApproachPage;
