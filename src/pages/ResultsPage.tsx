import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Award, 
  ChevronRight, 
  LineChart, 
  Check, 
  FileText, 
  BookOpen,
  BarChart,
  Briefcase,
  Building,
  Users
} from 'lucide-react';
import SEO from '../components/SEO';

const ResultCard = ({ title, challenge, approach, outcome, client, clientRole, company }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-card border border-secondary-100 hover:shadow-md transition-all duration-300">
      <div className="border-b border-secondary-100 p-5 sm:p-6">
        <h3 className="text-xl font-semibold text-secondary-900 mb-1">{title}</h3>
      </div>
      <div className="p-5 sm:p-6 space-y-5 sm:space-y-6">
        <div>
          <h4 className="text-sm uppercase tracking-wider text-secondary-500 font-medium mb-2">Challenge</h4>
          <p className="text-secondary-700">{challenge}</p>
        </div>
        
        <div>
          <h4 className="text-sm uppercase tracking-wider text-secondary-500 font-medium mb-2">Our Approach</h4>
          <p className="text-secondary-700">{approach}</p>
        </div>
        
        <div>
          <h4 className="text-sm uppercase tracking-wider text-secondary-500 font-medium mb-2">Outcome</h4>
          <p className="text-secondary-700">{outcome}</p>
        </div>
        
        <div className="pt-4 border-t border-secondary-100">
          <blockquote className="italic text-secondary-600 mb-3">
            "Capitol Insights provided the expertise and connections we needed to achieve our goals."
          </blockquote>
          <div>
            <p className="font-medium text-secondary-900">{client}</p>
            <p className="text-secondary-500 text-sm">{clientRole}, {company}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ icon, value, label }) => {
  return (
    <div className="bg-white p-5 sm:p-6 rounded-xl border border-secondary-100 shadow-sm flex flex-col items-center text-center hover:shadow-md transition-all duration-300">
      <div className="bg-primary-50 p-3 rounded-full w-fit mb-4">
        {icon}
      </div>
      <h3 className="text-2xl sm:text-3xl font-bold text-primary-600 mb-2">{value}</h3>
      <p className="text-secondary-700">{label}</p>
    </div>
  );
};

const AchievementItem = ({ children }) => {
  return (
    <div className="flex items-start gap-3">
      <div className="bg-primary-50 p-1 rounded-full mt-0.5 flex-shrink-0">
        <Check size={16} className="text-primary-600" />
      </div>
      <p className="text-secondary-700">{children}</p>
    </div>
  );
};

const ResultsPage = () => {
  const caseStudies = [
    {
      title: "Telecom Infrastructure Bill",
      challenge: "A major telecommunications provider faced regulatory hurdles that limited their ability to expand infrastructure in rural areas of Texas.",
      approach: "We developed a comprehensive strategy that included coalition building with rural advocacy groups, direct engagement with key legislators, and data-driven policy proposals.",
      outcome: "Successfully secured passage of legislation that streamlined permitting processes for rural broadband expansion while maintaining important environmental and safety standards.",
      client: "Sarah Johnson",
      clientRole: "Government Affairs Director",
      company: "Texas Telecommunications Association"
    },
    {
      title: "Municipal Policy Reform",
      challenge: "A coalition of municipalities needed to address state legislation that would have severely restricted local revenue options.",
      approach: "We coordinated a unified response from diverse municipalities, providing expert testimony at committee hearings and facilitating direct communication with key decision-makers.",
      outcome: "Helped secure amendments that preserved essential local authority while addressing legitimate state concerns, creating a more balanced approach.",
      client: "Michael Rodriguez",
      clientRole: "City Manager",
      company: "Central Texas Municipal League"
    },
    {
      title: "Healthcare Regulatory Navigation",
      challenge: "A healthcare provider network faced complex new regulations that threatened to increase compliance costs by over 30%.",
      approach: "We analyzed the proposed regulations, identified specific concerns, and facilitated meetings with regulatory officials to propose practical alternatives.",
      outcome: "Achieved regulatory modifications that reduced compliance burden while maintaining the intent of patient protection, saving our client millions in implementation costs.",
      client: "David Chen",
      clientRole: "Chief Legal Officer",
      company: "Texas Healthcare Coalition"
    }
  ];

  return (
    <div className="pt-16">
      {/* SEO Configuration */}
      <SEO 
        title="Client Success Stories & Case Studies | Capitol Insights"
        description="Discover how Capitol Insights has delivered measurable results for clients across diverse industries through effective, ethical government relations strategies in Texas."
        image="https://images.unsplash.com/photo-1427751840561-9852520f8ce8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=630"
        canonical="/results"
        additionalMetaTags={[
          { name: "keywords", content: "government relations results, lobbying success stories, policy advocacy case studies, texas legislative achievements" },
          { property: "og:site_name", content: "Capitol Insights" }
        ]}
      />

      {/* Results Header */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-3 py-1 bg-primary-500/20 text-primary-200 rounded-full text-sm font-medium mb-4">
              Our Track Record
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">Proven Results</h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
              We let our work speak for itself. Explore how our strategic approach has delivered tangible outcomes for organizations across Texas.
            </p>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-16">
            <span className="inline-block px-3 py-1 bg-primary-100 text-primary-600 rounded-full text-sm font-medium mb-4">
              By The Numbers
            </span>
            <h2 className="section-title">
              Measurable Impact
            </h2>
            <p className="section-subtitle">
              Our results demonstrate our effectiveness in creating positive outcomes for our clients.
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <MetricCard 
              icon={<FileText size={22} className="text-primary-600" />}
              value="150+"
              label="Bills Influenced"
            />
            <MetricCard 
              icon={<Building size={22} className="text-primary-600" />}
              value="45+"
              label="Municipalities Served"
            />
            <MetricCard 
              icon={<Users size={22} className="text-primary-600" />}
              value="30+"
              label="Coalitions Built"
            />
            <MetricCard 
              icon={<BarChart size={22} className="text-primary-600" />}
              value="95%"
              label="Client Success Rate"
            />
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-16 sm:py-20 md:py-24 bg-secondary-50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-16">
            <span className="inline-block px-3 py-1 bg-primary-100 text-primary-600 rounded-full text-sm font-medium mb-4">
              Case Studies
            </span>
            <h2 className="section-title">
              Success Stories
            </h2>
            <p className="section-subtitle">
              Real challenges, strategic approaches, and tangible outcomes from our government relations work.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {caseStudies.map((study, index) => (
              <ResultCard 
                key={index}
                title={study.title}
                challenge={study.challenge}
                approach={study.approach}
                outcome={study.outcome}
                client={study.client}
                clientRole={study.clientRole}
                company={study.company}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Key Achievements */}
      <section className="py-16 sm:py-20 md:py-24 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start">
              <div className="md:col-span-5">
                <span className="inline-block px-3 py-1 bg-primary-100 text-primary-600 rounded-full text-sm font-medium mb-4">
                  Key Achievements
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-secondary-900 mb-5 sm:mb-6">
                  A Legacy of Effective Advocacy
                </h2>
                <p className="text-secondary-700 mb-6 sm:mb-8 leading-relaxed">
                  Over four decades, Capitol Insights has established a track record of helping clients navigate complex legislative and regulatory challenges.
                </p>
                <Link 
                  to="/contact" 
                  className="btn btn-primary btn-lg"
                >
                  Discuss Your Goals
                  <ChevronRight size={18} className="ml-1" />
                </Link>
              </div>
              
              <div className="md:col-span-7">
                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-secondary-100">
                  <div className="space-y-4">
                    <AchievementItem>
                      Successfully advocated for reform of telecommunications regulations, enabling broader service deployment in underserved areas
                    </AchievementItem>
                    <AchievementItem>
                      Secured millions in state funding for critical municipal infrastructure projects through strategic engagement
                    </AchievementItem>
                    <AchievementItem>
                      Protected industry interests during significant regulatory overhaul, preserving operational flexibility while meeting policy objectives
                    </AchievementItem>
                    <AchievementItem>
                      Developed and led coalition of diverse stakeholders to advance shared policy priorities in healthcare access
                    </AchievementItem>
                    <AchievementItem>
                      Defeated harmful legislative proposals that would have imposed significant compliance costs on client industries
                    </AchievementItem>
                    <AchievementItem>
                      Created favorable regulatory framework for emerging technologies through education and stakeholder engagement
                    </AchievementItem>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 sm:py-20 md:py-24 relative">
        <div className="absolute inset-0 bg-secondary-900 bg-texture bg-cover bg-center opacity-90"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-secondary-900/95 via-secondary-900 to-secondary-900/90"></div>
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col items-center text-center mb-10 sm:mb-16">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary-500/20 flex items-center justify-center mb-6 sm:mb-8">
                <Award size={24} className="text-primary-200" />
              </div>
              <blockquote className="text-white text-lg sm:text-xl md:text-2xl font-medium italic mb-6 sm:mb-8 max-w-3xl">
                "Capitol Insights brings substance and integrity to government relations. They don't overpromise, but they consistently deliver results through hard work, authentic relationships, and strategic thinking."
              </blockquote>
              <div>
                <p className="text-white font-medium text-lg">Katherine Reynolds</p>
                <p className="text-primary-200">Executive Director, Texas Association of Businesses</p>
              </div>
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
                <h2 className="text-2xl md:text-3xl font-bold text-secondary-900 mb-3 sm:mb-4">Ready to achieve your policy goals?</h2>
                <p className="text-secondary-700 mb-4 md:mb-0">
                  Schedule your policy assessment with our team and learn how we can help advance your objectives.
                </p>
              </div>
              <div className="md:col-span-4 flex md:justify-end">
<Link 
  to="/contact" 
  className="btn btn-primary btn-lg w-full md:w-auto justify-center items-center whitespace-nowrap"
>
  <span>Schedule Assessment</span>
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

export default ResultsPage;
