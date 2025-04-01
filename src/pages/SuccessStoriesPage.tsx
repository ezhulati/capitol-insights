import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Award, 
  BarChart3, 
  Briefcase, 
  Building, 
  CheckCircle2, 
  ChevronRight, 
  FileText, 
  Map, 
  Smartphone, 
  Target
} from 'lucide-react';
import SEO from '../components/SEO';
import { getPageSEO } from '../utils/enhanced-seo';

interface CaseStudyCardProps {
  icon: React.ReactNode;
  title: string;
  client: string;
  challenge: string;
  approach: string;
  result: string;
  industry: string;
  metrics: {
    label: string;
    value: string;
  }[];
}

const CaseStudyCard: React.FC<CaseStudyCardProps> = ({ 
  icon, 
  title, 
  client, 
  challenge, 
  approach, 
  result, 
  industry,
  metrics 
}) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-slate-100">
      <div className="bg-navy-900 p-4 flex items-center">
        <div className="bg-navy-800 p-3 rounded-lg mr-4">
          {icon}
        </div>
        <div>
          <span className="text-xs font-medium text-gold-300">{industry}</span>
          <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>
      </div>
      
      <div className="p-6">
        <div className="mb-4 pb-4 border-b border-slate-100">
          <span className="text-sm font-medium text-navy-600">Client</span>
          <p className="text-navy-900 font-semibold">{client}</p>
        </div>
        
        <div className="space-y-4 mb-5">
          <div>
            <h4 className="flex items-center font-semibold text-navy-900 mb-2">
              <Target size={16} className="text-gold-500 mr-2" />
              Challenge
            </h4>
            <p className="text-slate-700 text-sm">{challenge}</p>
          </div>
          
          <div>
            <h4 className="flex items-center font-semibold text-navy-900 mb-2">
              <Briefcase size={16} className="text-gold-500 mr-2" />
              Our Approach
            </h4>
            <p className="text-slate-700 text-sm">{approach}</p>
          </div>
          
          <div>
            <h4 className="flex items-center font-semibold text-navy-900 mb-2">
              <CheckCircle2 size={16} className="text-gold-500 mr-2" />
              Results
            </h4>
            <p className="text-slate-700 text-sm">{result}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mb-4">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-slate-50 p-3 rounded-lg">
              <p className="text-2xl font-bold text-gold-600">{metric.value}</p>
              <p className="text-xs text-navy-700">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface TestimonialCardProps {
  quote: string;
  title: string;
  company: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, title, company }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-slate-100">
      <div className="mb-4">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gold-400">
          <path d="M11.5 8.5C11.5 6.5 10 5 8 5C6 5 4.5 6.5 4.5 8.5C4.5 10.5 6 12 8 12C10 12 11.5 10.5 11.5 8.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M20 8.5C20 6.5 18.5 5 16.5 5C14.5 5 13 6.5 13 8.5C13 10.5 14.5 12 16.5 12C18.5 12 20 10.5 20 8.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7.5 12V16.5C7.5 17.05 7.95 17.5 8.5 17.5H10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16.5 12V16.5C16.5 17.05 16.05 17.5 15.5 17.5H13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      
      <blockquote className="text-navy-800 italic leading-relaxed mb-4">
        {quote}
      </blockquote>
      
      <div className="border-t border-slate-100 pt-4">
        <p className="font-semibold text-navy-900">{title}</p>
        <p className="text-slate-600 text-sm">{company}</p>
      </div>
    </div>
  );
};

const SuccessStoriesPage = () => {
  const caseStudies: CaseStudyCardProps[] = [
    {
      icon: <Map size={24} className="text-gold-300" />,
      title: "Regional Transportation Funding Initiative",
      client: "North Texas Transportation Consortium",
      industry: "Transportation & Infrastructure",
      challenge: "The North Texas region faced severe congestion and critical infrastructure needs across multiple jurisdictions. The challenge was to secure state funding in a highly competitive environment where numerous regions were vying for limited transportation dollars.",
      approach: "We developed a comprehensive regional consensus approach that aligned the priorities of 12 municipalities. First, we created data-driven economic impact assessments that quantified the regional benefits. Then we mobilized business community support through targeted advocacy, creating a unified voice. We facilitated direct engagement between local leaders and Transportation Commission leadership, highlighting the projects' statewide significance.",
      result: "Our client secured $450M in state funding allocation—30% higher than initial projections. Beyond the immediate win, we established an ongoing funding mechanism that will generate an additional $1.2B over ten years for regional transportation projects. The coalition structure we built has become a model for other regions seeking to maximize their infrastructure funding.",
      metrics: [
        { label: "Funding Secured", value: "$450M" },
        { label: "Long-term Impact", value: "$1.2B" },
        { label: "Municipalities Aligned", value: "12" },
        { label: "Timeline Acceleration", value: "18 mos" }
      ]
    },
    {
      icon: <Smartphone size={24} className="text-gold-300" />,
      title: "Telecommunications Regulatory Reform",
      client: "Major Telecommunications Provider",
      industry: "Telecommunications & Technology",
      challenge: "Our client needed to navigate a complex regulatory environment that was limiting the deployment of next-generation infrastructure in both urban and rural Texas communities. Existing permitting processes were adding 12-18 months to project timelines and significantly increasing costs.",
      approach: "We developed a comprehensive regulatory reform strategy targeting both legislative and administrative channels. We built a coalition of rural stakeholders by demonstrating the economic development benefits of improved connectivity. Our team created educational materials that simplified complex technical concepts for key decision-makers and drafted model legislation that balanced industry needs with municipal concerns.",
      result: "Successfully passed legislation reducing regulatory barriers by 40%, which accelerated the deployment timeline by 18 months and saved our client approximately $45M in compliance costs. We created a streamlined approval process that has become a model across multiple states, positioning our client as an industry leader in regulatory innovation.",
      metrics: [
        { label: "Regulatory Barrier Reduction", value: "40%" },
        { label: "Cost Savings", value: "$45M" },
        { label: "Timeline Reduction", value: "18 mos" },
        { label: "Rural Areas Impacted", value: "120+" }
      ]
    },
    {
      icon: <Building size={24} className="text-gold-300" />,
      title: "Municipal Public-Private Partnership",
      client: "Regional Development Corporation",
      industry: "Local Government Relations",
      challenge: "Our client sought to establish a public-private partnership with multiple municipalities for an economic development initiative. The project faced local opposition due to environmental concerns, regulatory hurdles across multiple jurisdictions, and skepticism from community stakeholders.",
      approach: "We created a comprehensive stakeholder engagement strategy that directly addressed community concerns through transparent communication. We developed a governance framework with clear accountability measures that gave municipalities appropriate oversight while maintaining project viability. Our team coordinated a joint legislative agenda across public and private entities to secure necessary regulatory approvals.",
      result: "Secured unanimous approval from all five municipal councils—a first in the region's history for a project of this scale. Established an $85M development fund with a streamlined approval process that reduced paperwork by 65%. The project ultimately created 1,200+ jobs while addressing 85% of community concerns through thoughtful modifications to the original plan.",
      metrics: [
        { label: "Development Fund", value: "$85M" },
        { label: "Jobs Created", value: "1,200+" },
        { label: "Approval Process Reduction", value: "65%" },
        { label: "Community Concerns Addressed", value: "85%" }
      ]
    },
    {
      icon: <BarChart3 size={24} className="text-gold-300" />,
      title: "Healthcare Regulatory Compliance Initiative",
      client: "Texas Hospital Association Member",
      industry: "Healthcare",
      challenge: "Our healthcare client faced significant compliance challenges due to new state regulatory requirements that threatened to increase administrative costs by an estimated 30% while potentially restricting patient access to care. The implementation timeline gave providers only 90 days to adapt to complex new rules.",
      approach: "We conducted a comprehensive regulatory impact analysis that identified specific provisions creating undue burdens. Working with subject matter experts, we developed alternative compliance frameworks that would achieve the regulatory intent while minimizing disruption. We then built a coalition of affected providers and patient advocacy groups to present a unified position to regulators.",
      result: "Successfully secured amendments to the most burdensome provisions, reducing the projected compliance cost increase from 30% to just 8%. We also negotiated a phased implementation timeline that extended from 90 days to 12 months, giving providers adequate time to adapt their systems. Our advocacy preserved critical access to care for vulnerable populations while maintaining regulatory compliance.",
      metrics: [
        { label: "Compliance Cost Reduction", value: "22%" },
        { label: "Implementation Timeline", value: "12 mos" },
        { label: "Provider Coalition Size", value: "35+" },
        { label: "Patient Access Preserved", value: "100%" }
      ]
    },
    {
      icon: <FileText size={24} className="text-gold-300" />,
      title: "Education Workforce Development Program",
      client: "Texas Community College Consortium",
      industry: "Education & Workforce Policy",
      challenge: "Our client needed to secure state funding and regulatory approvals for an innovative workforce development initiative spanning multiple community colleges. The program required new statutory authorization and faced skepticism from policymakers concerned about duplication of existing programs.",
      approach: "We mapped the legislative landscape, identifying key champions and potential opposition. Our team developed compelling economic impact data showing the return on investment for the state. We coordinated direct testimony from industry partners highlighting the skills gap that the program would address, and we drafted legislative language that addressed concerns about program overlap.",
      result: "Secured $32 million in funding for the initiative—60% more than initially requested—and unanimous legislative approval for the new statutory framework. The program has now been implemented across 15 community colleges, training over 8,500 students in its first two years and achieving an 87% job placement rate in targeted industries.",
      metrics: [
        { label: "Program Funding", value: "$32M" },
        { label: "Participating Colleges", value: "15" },
        { label: "Students Trained", value: "8,500+" },
        { label: "Job Placement Rate", value: "87%" }
      ]
    }
  ];

  const testimonials: TestimonialCardProps[] = [
    {
      quote: "The Capitol Insights team delivered results that far exceeded our expectations. They didn't just secure additional funding—they built a sustainable coalition that continues to advance our infrastructure priorities year after year.",
      title: "Executive Director",
      company: "North Texas Transportation Consortium"
    },
    {
      quote: "Byron's expertise in telecommunications policy was invaluable as we navigated complex regulatory challenges. His methodical approach and strong relationships with key committee members made the difference in passing critical legislation.",
      title: "Vice President, Government Affairs",
      company: "Texas Telecommunications Association"
    },
    {
      quote: "Drew's transportation expertise and strategic approach helped us secure critical funding that other firms told us was impossible. His straightforward assessment of our position and practical roadmap delivered tangible results.",
      title: "County Administrator",
      company: "Ellis County"
    },
    {
      quote: "We've worked with several government relations firms over the years, but Capitol Insights stands apart in their ethical approach and measurable results. They actually deliver on what they promise.",
      title: "CEO",
      company: "Central Texas Health Partners"
    }
  ];

  return (
    <div className="pt-16">
      {/* Enhanced SEO Configuration */}
      <SEO
        {...getPageSEO({
          pageType: 'results',
          title: "Client Success Stories | Capitol Insights Texas Government Relations",
          description: "Real client success stories showcasing our proven results in transportation, telecommunications, healthcare, and education policy across Texas.",
          image: "/images/texas-capitol.jpg"
        })}
      />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-3 py-1 bg-gold-600/20 text-gold-200 rounded-full text-sm font-medium mb-4">
              PROVEN RESULTS
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">Success Stories</h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
              Real-world examples of how our strategic advocacy and deep relationships have delivered measurable results for clients across Texas.
            </p>
          </div>
        </div>
      </section>

      {/* Metrics Overview */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-navy-50 p-6 rounded-xl text-center">
                <p className="text-3xl md:text-4xl font-bold text-navy-900 mb-2">$750M+</p>
                <p className="text-navy-700">Funding Secured</p>
              </div>
              <div className="bg-navy-50 p-6 rounded-xl text-center">
                <p className="text-3xl md:text-4xl font-bold text-navy-900 mb-2">95%</p>
                <p className="text-navy-700">Success Rate</p>
              </div>
              <div className="bg-navy-50 p-6 rounded-xl text-center">
                <p className="text-3xl md:text-4xl font-bold text-navy-900 mb-2">30+</p>
                <p className="text-navy-700">Bills Passed</p>
              </div>
              <div className="bg-navy-50 p-6 rounded-xl text-center">
                <p className="text-3xl md:text-4xl font-bold text-navy-900 mb-2">40%</p>
                <p className="text-navy-700">Cost Reduction</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Case Studies Section */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="inline-block px-3 py-1 bg-gold-100 text-gold-700 rounded-full text-sm font-medium mb-4">
              CLIENT CASE STUDIES
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-semibold text-navy-900 mb-6 leading-tight">
              Real Results for Real Clients
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed">
              Our success is measured by our clients' achievements. These case studies demonstrate our ability to navigate complex challenges and deliver measurable outcomes.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {caseStudies.map((study, index) => (
              <CaseStudyCard
                key={index}
                icon={study.icon}
                title={study.title}
                client={study.client}
                challenge={study.challenge}
                approach={study.approach}
                result={study.result}
                industry={study.industry}
                metrics={study.metrics}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="inline-block px-3 py-1 bg-navy-100 text-navy-700 rounded-full text-sm font-medium mb-4">
              WHAT CLIENTS SAY
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-semibold text-navy-900 mb-6 leading-tight">
              Client Testimonials
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed">
              Don't just take our word for it. Hear what our clients have to say about working with Capitol Insights.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                quote={testimonial.quote}
                title={testimonial.title}
                company={testimonial.company}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Success Methodology */}
      <section className="py-16 sm:py-20 bg-navy-900 relative">
        <div className="absolute inset-0 bg-texture bg-cover bg-center opacity-20"></div>
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="inline-block px-3 py-1 bg-navy-700 text-white rounded-full text-sm font-medium mb-4">
              OUR METHODOLOGY
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-semibold text-white mb-6 leading-tight">
              The Capitol Insights Success Formula
            </h2>
            <p className="text-lg text-navy-100 leading-relaxed">
              Our consistent success is built on a proven methodology that combines strategic thinking, deep relationships, and measurable outcomes.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-navy-800/80 backdrop-blur-sm p-6 rounded-xl border border-white/10">
              <div className="w-12 h-12 bg-gold-500/20 rounded-full flex items-center justify-center mb-4">
                <Award className="text-gold-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Strategic Preparation</h3>
              <p className="text-navy-100">
                We begin every engagement with comprehensive research and stakeholder mapping, identifying key decision-makers and understanding the full policy landscape before taking action.
              </p>
            </div>
            
            <div className="bg-navy-800/80 backdrop-blur-sm p-6 rounded-xl border border-white/10">
              <div className="w-12 h-12 bg-gold-500/20 rounded-full flex items-center justify-center mb-4">
                <BarChart3 className="text-gold-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Data-Driven Advocacy</h3>
              <p className="text-navy-100">
                We develop compelling arguments backed by robust data and economic impact assessments that resonate with policymakers and provide clear rationales for action.
              </p>
            </div>
            
            <div className="bg-navy-800/80 backdrop-blur-sm p-6 rounded-xl border border-white/10">
              <div className="w-12 h-12 bg-gold-500/20 rounded-full flex items-center justify-center mb-4">
                <Target className="text-gold-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Measurable Outcomes</h3>
              <p className="text-navy-100">
                We set clear metrics for success at the outset and track progress throughout the engagement, enabling us to adapt strategies as needed and demonstrate concrete results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto bg-navy-50 rounded-xl p-8 sm:p-10 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
              <div className="md:col-span-8">
                <h2 className="text-2xl md:text-3xl font-bold text-navy-900 mb-3 sm:mb-4">Ready to Achieve Results?</h2>
                <p className="text-navy-700 mb-4 md:mb-0">
                  Join our success stories. Schedule a consultation with our team to discuss how our proven approach can help your organization navigate the Texas legislative and regulatory landscape.
                </p>
              </div>
              <div className="md:col-span-4 flex md:justify-end">
                <Link 
                  to="/contact" 
                  className="btn btn-primary btn-lg w-full md:w-auto justify-center"
                >
                  <span>Schedule Consultation</span>
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

export default SuccessStoriesPage;
