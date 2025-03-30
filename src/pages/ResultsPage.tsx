import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Award, 
  ChevronRight, 
  Check, 
  FileText, 
  BarChart,
  Building,
  Users
} from 'lucide-react';
import SEO from '../components/SEO';
import { getPageSEO } from '../utils/enhanced-seo';

interface ResultCardProps {
  title: string;
  challenge: string;
  approach: string;
  outcome: string;
  client: string;
  clientRole: string;
  company: string;
}

const ResultCard = ({ title, challenge, approach, outcome, client, clientRole, company }: ResultCardProps) => {
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
            {title === "Dallas Regional Mobility Coalition" ? 
              "\"Drew's strategic approach and deep relationships with key legislators helped us secure critical funding that will benefit our region for decades.\"" :
             title === "North Texas Commission Water Infrastructure" ?
              "\"The Capitol Insights team's ability to build consensus among diverse stakeholders was instrumental in securing increased funding despite a challenging budget year.\"" :
              "\"Their understanding of both the legislative process and the auto industry's unique challenges made all the difference in preserving our business model.\""
            }
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

interface MetricCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
}

const MetricCard = ({ icon, value, label }: MetricCardProps) => {
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

interface AchievementItemProps {
  children: React.ReactNode;
}

const AchievementItem = ({ children }: AchievementItemProps) => {
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
      title: "Dallas Regional Mobility Coalition",
      challenge: "Five counties, 27 municipal members, and competing transportation priorities with limited state funding. The Dallas Regional Mobility Coalition (DRMC) needed to advance critical mobility projects in Dallas, Denton, Collin, Rockwall, and Ellis counties.",
      approach: "As Executive Director, Drew Campbell built a strategic framework connecting local governments with state legislators 14 months before session. We organized site visits to show lawmakers congested corridors firsthand and developed county-specific economic impact data.",
      outcome: "Secured $412M in new transportation funding and accelerated three major corridor projects by bypassing traditional TxDOT sequencing.",
      client: "City Council Member",
      clientRole: "DRMC Chair",
      company: "City of Coppell"
    },
    {
      title: "North Texas Commission Water Infrastructure",
      challenge: "The North Texas Commission, representing businesses, cities, counties, chambers of commerce, economic development entities and higher education institutions, faced fragmented advocacy efforts across the region. Water infrastructure challenges were becoming critical as population surged.",
      approach: "Drawing on our role as longstanding lobbying firm for the North Texas Commission, we convened a pre-session coalition of water authorities and municipal leaders, connected directly with House and Senate Natural Resources committee staff, prepared data-driven briefs showing immediate economic impact of water infrastructure, and leveraged Byron's expertise with the Texas Association of Water Companies to build industry support.",
      outcome: "Not only did water infrastructure remain funded despite budget cuts in other areas, but a 12% increase in water development funding was secured with bipartisan support.",
      client: "Executive Director",
      clientRole: "Regional Planning",
      company: "North Texas Commission"
    },
    {
      title: "New Car Dealers Association Advocacy",
      challenge: "Proposed legislation threatened to disrupt the franchise model for auto dealers across Texas, potentially impacting thousands of jobs and local tax revenue in communities statewide.",
      approach: "Drew Campbell, leveraging his 25-year tenure as CEO of the New Car Dealers Association, coordinated testimony from dealers across diverse districts and prepared economic impact data showing the community investment of local dealerships.",
      outcome: "Successfully preserved the franchise model while incorporating reasonable modernizations that benefited both dealers and consumers.",
      client: "Board Chairman",
      clientRole: "Government Affairs",
      company: "Texas Automobile Dealers Association"
    }
  ];

  return (
    <div className="pt-16">
      {/* Enhanced SEO Configuration */}
      <SEO 
        {...getPageSEO({
          pageType: 'results',
          title: "Government Relations Success Stories & Measurable Results | Capitol Insights",
          description: "Our government relations achievements include $412M for Dallas mobility, 12% increase for water infrastructure, and protecting auto dealers through strategic Texas lobbying.",
          image: "/images/texas-capitol.jpg",
          additionalMetaTags: [
            { name: "keywords", content: "government relations case studies, Texas lobbying success, DRMC funding, North Texas Commission, water infrastructure funding, auto dealer protection, measurable lobbying results" },
            { property: "og:site_name", content: "Capitol Insights" }
          ]
        })}
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
                  className="btn btn-primary btn-lg whitespace-nowrap"
                >
                  Discuss Your Goals
                  <ChevronRight size={18} className="ml-1" />
                </Link>
              </div>
              
              <div className="md:col-span-7">
                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-secondary-100">
                  <div className="space-y-4">
                    <AchievementItem>
                      Secured $412M in transportation funding for the Dallas Regional Mobility Coalition, accelerating three major corridor projects
                    </AchievementItem>
                    <AchievementItem>
                      Achieved 12% increase in water infrastructure funding for the North Texas Commission despite budget cuts in other areas
                    </AchievementItem>
                    <AchievementItem>
                      Successfully preserved the franchise model for the Texas Automobile Dealers Association while incorporating modernizations
                    </AchievementItem>
                    <AchievementItem>
                      Helped 25+ Texas cities secure $65M in state funding since 2020 with 100% passage rate for municipal-friendly bills
                    </AchievementItem>
                    <AchievementItem>
                      Reduced regulatory compliance costs by 22% for healthcare clients while successfully advocating for 8 healthcare-friendly bills
                    </AchievementItem>
                    <AchievementItem>
                      Shaped 15+ data privacy regulations with 80% of client recommendations adopted, reducing compliance costs by 28%
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
                "Drew's relationships at the Transportation Committee level—built through years of consistent engagement—made all the difference when competing priorities came before legislators. His approach to building coalitions across counties turned potential competitors into allies."
              </blockquote>
              <div>
                <p className="text-white font-medium text-lg">Michael Anderson</p>
                <p className="text-primary-200">City Council Member, City of Coppell, DRMC Chair</p>
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
  <span className="whitespace-nowrap">Schedule Assessment</span>
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
