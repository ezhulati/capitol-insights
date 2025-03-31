import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Map, 
  Smartphone, 
  Building, 
  GraduationCap, 
  Lightbulb,
  ChevronRight,
  Users,
  BarChart3,
  Briefcase,
  FileText,
  Target,
  Check,
  Award
} from 'lucide-react';
import SEO from '../components/SEO';
import { getPageSEO } from '../utils/enhanced-seo';

interface PracticeAreaCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  achievements: string[];
  contactLink: string;
}

const PracticeAreaCard: React.FC<PracticeAreaCardProps> = ({ icon, title, description, achievements, contactLink }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-slate-100">
      <div className="bg-navy-900 p-4 flex items-center">
        <div className="bg-navy-800 p-3 rounded-lg mr-4">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-white">{title}</h3>
      </div>
      
      <div className="p-6">
        <p className="text-slate-700 mb-6 leading-relaxed">{description}</p>
        
        <h4 className="font-semibold text-navy-800 mb-3 flex items-center">
          <Award size={18} className="text-gold-500 mr-2" />
          Notable Achievements
        </h4>
        
        <ul className="space-y-2 mb-6">
          {achievements.map((achievement, index) => (
            <li key={index} className="flex items-start">
              <Check size={16} className="text-gold-500 mt-1 mr-2 flex-shrink-0" />
              <span className="text-slate-700 text-sm">{achievement}</span>
            </li>
          ))}
        </ul>
        
        <Link 
          to={contactLink} 
          className="btn btn-primary w-full justify-center"
        >
          Discuss Your {title} Needs
          <ChevronRight size={18} className="ml-1" />
        </Link>
      </div>
    </div>
  );
};

interface CaseStudyCardProps {
  title: string;
  client: string;
  challenge: string;
  solution: string;
  result: string;
  area: string;
}

const CaseStudyCard: React.FC<CaseStudyCardProps> = ({ title, client, challenge, solution, result, area }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-slate-100">
      <div className="bg-navy-50 p-5">
        <span className="inline-block px-3 py-1 bg-navy-100 text-navy-800 rounded-full text-xs font-medium mb-3">
          {area}
        </span>
        <h3 className="text-xl font-bold text-navy-900 mb-1">{title}</h3>
        <p className="text-navy-700 text-sm">Client: {client}</p>
      </div>
      
      <div className="p-6">
        <div className="mb-4">
          <h4 className="font-semibold text-navy-800 mb-2 flex items-center">
            <Target size={16} className="text-gold-500 mr-2" />
            Challenge
          </h4>
          <p className="text-slate-700 text-sm">{challenge}</p>
        </div>
        
        <div className="mb-4">
          <h4 className="font-semibold text-navy-800 mb-2 flex items-center">
            <Briefcase size={16} className="text-gold-500 mr-2" />
            Our Approach
          </h4>
          <p className="text-slate-700 text-sm">{solution}</p>
        </div>
        
        <div>
          <h4 className="font-semibold text-navy-800 mb-2 flex items-center">
            <BarChart3 size={16} className="text-gold-500 mr-2" />
            Results
          </h4>
          <p className="text-slate-700 text-sm">{result}</p>
        </div>
      </div>
    </div>
  );
};

const PracticeAreasPage = () => {
  const practiceAreas = [
    {
      icon: <Map size={24} className="text-gold-300" />,
      title: "Transportation & Infrastructure",
      description: "Our firm has been at the forefront of Texas transportation policy for over three decades. With Drew Campbell serving as Executive Director of the Dallas Regional Mobility Coalition, we offer unparalleled expertise in infrastructure funding, regional mobility planning, and transportation regulatory frameworks.",
      achievements: [
        "Secured over $2 billion in funding for North Texas transportation infrastructure projects",
        "Successfully advocated for key amendments to SB 312, streamlining project delivery timelines by 30%",
        "Developed coalition of 28 municipalities to support regional infrastructure priorities",
        "Helped clients navigate complex environmental review processes, reducing approval timelines by 25%"
      ],
      contactLink: "/contact?area=transportation"
    },
    {
      icon: <Smartphone size={24} className="text-gold-300" />,
      title: "Telecommunications & Technology",
      description: "In an era of rapid technological change, our team has helped telecommunications companies and technology firms navigate the complex regulatory landscape in Texas. We've successfully represented AT&T, Cisco, and numerous technology companies seeking to grow their footprint in the state.",
      achievements: [
        "Secured regulatory approvals for deployment of 5G infrastructure across 15 Texas municipalities",
        "Successfully advocated for legislation protecting technology companies from burdensome regulations",
        "Helped telecom clients navigate PUCT proceedings with 92% success rate",
        "Developed strategic partnerships between tech companies and state agencies, creating $45M in new contract opportunities"
      ],
      contactLink: "/contact?area=telecom"
    },
    {
      icon: <Building size={24} className="text-gold-300" />,
      title: "Local Government Relations",
      description: "Our decades-long relationships with county judges, mayors, and city council members across Texas enable us to effectively represent clients seeking to navigate local regulatory challenges or pursue municipal contracts and partnerships.",
      achievements: [
        "Helped clients secure over $120M in municipal contracts across Texas",
        "Successfully navigated permitting processes in 32 Texas cities with 95% approval rate",
        "Developed public-private partnerships generating $85M in local economic development",
        "Created strategic engagement plans that reduced regulatory friction by 40% for development projects"
      ],
      contactLink: "/contact?area=local"
    },
    {
      icon: <GraduationCap size={24} className="text-gold-300" />,
      title: "Education & Workforce Policy",
      description: "Drawing on Byron Campbell's experience with the House Education and Workforce Committee, we offer specialized expertise in education policy, workforce development initiatives, and higher education funding and regulation.",
      achievements: [
        "Secured $32M in funding for workforce development programs across Texas",
        "Successfully advocated for legislation expanding community college training partnerships",
        "Helped higher education institutions navigate regulatory changes with 100% compliance rate",
        "Developed innovative public-private workforce initiatives impacting over 15,000 students"
      ],
      contactLink: "/contact?area=education"
    },
    {
      icon: <Lightbulb size={24} className="text-gold-300" />,
      title: "Emerging Industries",
      description: "Our firm stays ahead of developing industries and policy areas, including renewable energy, cannabis regulation, and innovative healthcare delivery. We help forward-thinking organizations navigate uncertain regulatory terrain and shape developing policy frameworks.",
      achievements: [
        "Successfully positioned clients at the forefront of Texas' renewable energy policy discussions",
        "Helped healthcare innovators secure regulatory approvals for novel care delivery models",
        "Developed regulatory frameworks for emerging cannabis markets that protected client interests",
        "Created strategic positioning for clients in carbon capture and sequestration initiatives"
      ],
      contactLink: "/contact?area=emerging"
    }
  ];

  const caseStudies = [
    {
      title: "Regional Transportation Funding Initiative",
      client: "North Texas Transportation Consortium",
      challenge: "Secure state funding for critical infrastructure improvements across multiple jurisdictions facing severe congestion and maintenance backlogs.",
      solution: "Developed a regional consensus approach that aligned priorities of 12 municipalities. Created data-driven economic impact assessments and mobilized business community support. Facilitated direct engagement with Transportation Commission leadership.",
      result: "Secured $450M in state funding allocation, 30% higher than initial projections. Established ongoing funding mechanism that will generate an additional $1.2B over ten years.",
      area: "Transportation & Infrastructure"
    },
    {
      title: "Telecommunications Regulatory Reform",
      client: "Major Telecommunications Provider",
      challenge: "Navigate complex regulatory environment limiting deployment of next-generation infrastructure in urban and rural communities.",
      solution: "Developed comprehensive regulatory reform strategy targeting both legislative and administrative channels. Built coalition of rural stakeholders showing economic benefits. Created educational materials for key decision-makers.",
      result: "Successfully passed legislation reducing regulatory barriers by 40%. Accelerated deployment timeline by 18 months. Created streamlined approval process now used as model across multiple states.",
      area: "Telecommunications & Technology"
    },
    {
      title: "Municipal Public-Private Partnership",
      client: "Regional Development Corporation",
      challenge: "Establish public-private partnership with multiple municipalities for economic development initiative facing local opposition and regulatory hurdles.",
      solution: "Created stakeholder engagement strategy addressing community concerns. Developed transparent governance framework with accountability measures. Coordinated joint legislative agenda across public and private entities.",
      result: "Secured unanimous approval from all five municipal councils. Established $85M development fund with streamlined approval process. Created 1,200+ jobs while addressing 85% of community concerns.",
      area: "Local Government Relations"
    }
  ];

  return (
    <div className="pt-16">
      {/* Enhanced SEO Configuration */}
      <SEO
        {...getPageSEO({
          pageType: 'services',
          title: "Specialized Texas Government Relations Practice Areas | Capitol Insights",
          description: "Our specialized expertise spans transportation, telecommunications, local government, education policy, and emerging industries with proven success securing billions in funding and favorable policy outcomes.",
          image: "/images/texas-capitol.jpg"
        })}
      />

      {/* Practice Areas Header */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-3 py-1 bg-gold-600/20 text-gold-200 rounded-full text-sm font-medium mb-4">
              SPECIALIZED EXPERTISE
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">Our Practice Areas</h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
              Decades of specialized expertise in key policy areas, delivering proven results through strategic advocacy and deep relationships.
            </p>
          </div>
        </div>
      </section>

      {/* Practice Areas Grid */}
      <section className="py-16 sm:py-20 md:py-24 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-16">
            <span className="inline-block px-3 py-1 bg-gold-100 text-gold-700 rounded-full text-sm font-medium mb-4">
              SPECIALIZED KNOWLEDGE
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-semibold text-navy-900 mb-6 leading-tight">
              Five Core Areas of Texas Policy Expertise
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed max-w-2xl mx-auto">
              Our advocacy is built on deep domain expertise in key policy areas that matter most to Texas organizations. We don't just know the political players—we understand the technical details and regulatory frameworks that drive successful outcomes.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {practiceAreas.map((area, index) => (
              <PracticeAreaCard
                key={index}
                icon={area.icon}
                title={area.title}
                description={area.description}
                achievements={area.achievements}
                contactLink={area.contactLink}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-navy-50 relative">
        <div className="grain-overlay opacity-[0.02]"></div>
        
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10 sm:mb-16">
              <span className="inline-block px-3 py-1 bg-navy-200 text-navy-700 rounded-full text-sm font-medium mb-4">
                OUR APPROACH
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-semibold text-navy-900 mb-6 leading-tight">
                How We Drive Success Across Practice Areas
              </h2>
              <p className="text-lg text-navy-700 leading-relaxed max-w-2xl mx-auto">
                Our specialized expertise is matched with a systematic approach that consistently delivers results for organizations across all practice areas.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-navy-100">
                <div className="w-12 h-12 bg-navy-100 rounded-full flex items-center justify-center mb-4">
                  <Target size={24} className="text-navy-700" />
                </div>
                <h3 className="text-xl font-semibold text-navy-900 mb-3">Deep Domain Knowledge</h3>
                <p className="text-navy-700">
                  With specialized expertise in each practice area, we understand the technical intricacies, regulatory frameworks, and key stakeholders that drive policy outcomes.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-navy-100">
                <div className="w-12 h-12 bg-navy-100 rounded-full flex items-center justify-center mb-4">
                  <Users size={24} className="text-navy-700" />
                </div>
                <h3 className="text-xl font-semibold text-navy-900 mb-3">Strategic Relationships</h3>
                <p className="text-navy-700">
                  We've cultivated authentic relationships with subject-matter experts, committee leadership, and agency officials who drive decisions in each specialized area.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-navy-100">
                <div className="w-12 h-12 bg-navy-100 rounded-full flex items-center justify-center mb-4">
                  <FileText size={24} className="text-navy-700" />
                </div>
                <h3 className="text-xl font-semibold text-navy-900 mb-3">Evidence-Based Advocacy</h3>
                <p className="text-navy-700">
                  We ground our advocacy in data, research, and economic impact assessments that resonate with policymakers and create compelling rationales for action.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-16">
            <span className="inline-block px-3 py-1 bg-gold-100 text-gold-700 rounded-full text-sm font-medium mb-4">
              SUCCESS STORIES
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-semibold text-navy-900 mb-6 leading-tight">
              Client Success Stories
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed max-w-2xl mx-auto">
              Real-world examples of how our specialized expertise has delivered measurable results for clients across our practice areas.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <CaseStudyCard
                key={index}
                title={study.title}
                client={study.client}
                challenge={study.challenge}
                solution={study.solution}
                result={study.result}
                area={study.area}
              />
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link 
              to="/results" 
              className="btn btn-primary btn-lg group transition-all"
            >
              View More Client Results
              <ChevronRight size={18} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-navy-900 relative">
        <div className="absolute inset-0 bg-texture bg-cover bg-center opacity-90"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/95 via-navy-900 to-navy-800/90"></div>
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-8 sm:p-10 shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
                <div className="md:col-span-8">
                  <h2 className="text-2xl sm:text-3xl font-bold text-navy-900 mb-3 sm:mb-4">Need Specialized Advocacy?</h2>
                  <p className="text-slate-700 mb-6 md:mb-0">
                    Schedule a consultation to discuss your specific needs with our practice area specialists. Our targeted expertise has delivered 95% success rates across all specialized domains.
                  </p>
                </div>
                <div className="md:col-span-4 flex md:justify-end">
                  <Link 
                    to="/contact" 
                    className="btn btn-primary btn-lg w-full md:w-auto justify-center"
                  >
                    Schedule Consultation
                    <ChevronRight size={18} className="ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PracticeAreasPage;
