import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, ExternalLink } from 'lucide-react';
import SEO from '../components/SEO';
import { getPageSEO } from '../utils/enhanced-seo';
import FAQAccordion, { FAQItem } from '../components/FAQAccordion';
import BreadcrumbNavigation from '../components/BreadcrumbNavigation';

/**
 * Comprehensive FAQ page with structured data
 */
const FAQPage: React.FC = () => {
  // Group FAQs by category
  const faqCategories = [
    {
      id: 'general',
      title: 'General Questions',
      faqs: [
        {
          question: 'What services does Capitol Insights provide?',
          answer: (
            <>
              <p>Capitol Insights offers comprehensive government relations services, including:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Strategic legislative advocacy and lobbying</li>
                <li>Regulatory affairs management</li>
                <li>Legislative monitoring and analysis</li>
                <li>Coalition building and stakeholder engagement</li>
                <li>Policy research and development</li>
                <li>Crisis management and issue campaigns</li>
              </ul>
            </>
          )
        },
        {
          question: 'How is Capitol Insights different from other government relations firms?',
          answer: 'Capitol Insights distinguishes itself through its deep Texas roots, established relationships with key decision-makers, and a transparent, ethical approach to government relations. Our senior partners have decades of experience in both state and federal policy development, and we pride ourselves on a proven track record of successful advocacy across multiple sectors.'
        },
        {
          question: 'What industries does Capitol Insights work with?',
          answer: (
            <>
              <p>Our expertise spans multiple industries, with particular depth in:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Transportation and infrastructure</li>
                <li>Telecommunications and technology</li>
                <li>Healthcare policy</li>
                <li>Energy and environment</li>
                <li>Education and workforce issues</li>
                <li>Municipal affairs</li>
              </ul>
            </>
          )
        }
      ]
    },
    {
      id: 'process',
      title: 'Our Process',
      faqs: [
        {
          question: 'How does the legislative advocacy process work?',
          answer: 'Our legislative advocacy process follows a strategic framework: 1) Assessment of your needs and the current policy landscape, 2) Strategy development with clear objectives, 3) Stakeholder and coalition building, 4) Direct advocacy with decision-makers, and 5) Continuous monitoring and adaptation as circumstances evolve. Throughout this process, we maintain regular communication with clients and provide timely updates on developments.'
        },
        {
          question: 'How long does it typically take to achieve legislative goals?',
          answer: 'The timeline for achieving legislative goals varies significantly depending on complexity, political climate, and opposition. Some issues can be addressed within a single legislative session (approximately 5-6 months in Texas), while more complex or controversial matters may require multiple sessions spanning several years. We emphasize realistic timelines and sustainable progress over quick fixes.'
        },
        {
          question: 'What information do you need from clients to get started?',
          answer: 'To begin an effective engagement, we typically need: 1) A clear understanding of your business or organization, 2) The specific challenge or opportunity you\'re facing, 3) Your policy goals and desired outcomes, 4) Any previous government relations efforts you\'ve undertaken, 5) Relevant industry data or research, and 6) Key stakeholders within your organization who will be involved in decision-making.'
        }
      ]
    },
    {
      id: 'engagement',
      title: 'Client Engagement',
      faqs: [
        {
          question: 'How do your fees work?',
          answer: 'Capitol Insights typically operates on a monthly retainer model, with fee structures tailored to the scope and complexity of your specific needs. For legislative session-specific work, we also offer session-based contracts. All fee arrangements are transparent, with clearly defined deliverables and no hidden costs. We\'re happy to discuss fee structures during initial consultations.'
        },
        {
          question: 'How often will we receive updates on our issues?',
          answer: 'We provide regular scheduled updates, typically on a weekly or bi-weekly basis, depending on the pace of developments and client preferences. During active legislative sessions or periods of significant regulatory activity, updates may be more frequent. All clients have direct access to their lead consultant for urgent matters. Our communication approach is tailored to each client\'s preferences and internal processes.'
        },
        {
          question: 'Do you guarantee specific policy outcomes?',
          answer: 'We do not guarantee specific legislative outcomes, as the political process involves many factors beyond any firm\'s control. What we do guarantee is ethical, strategic representation; accurate information; transparent reporting; and our best professional efforts to achieve your goals. We believe in setting realistic expectations and developing multiple pathways to success.'
        }
      ]
    },
    {
      id: 'practical',
      title: 'Practical Information',
      faqs: [
        {
          question: 'Where are your offices located?',
          answer: (
            <>
              <p>Capitol Insights maintains offices in Austin and Dallas:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                <div className="bg-slate-50 p-3 rounded">
                  <strong className="block text-navy-700">Austin Office</strong>
                  <p className="text-sm">
                    1005 Congress Ave Suite 800<br />
                    Austin, TX 78701
                  </p>
                </div>
                <div className="bg-slate-50 p-3 rounded">
                  <strong className="block text-navy-700">Dallas Office</strong>
                  <p className="text-sm">
                    P.O. Box 195892<br />
                    Dallas, TX 75219
                  </p>
                </div>
              </div>
            </>
          )
        },
        {
          question: 'How can I schedule an initial consultation?',
          answer: (
            <>
              <p className="mb-4">
                You can schedule an initial consultation through any of the following methods:
              </p>
              <div className="space-y-2">
                <p className="flex items-center">
                  <Phone size={16} className="text-navy-600 mr-2" />
                  <span>Call us at (214) 213-3443</span>
                </p>
                <p className="flex items-center">
                  <Mail size={16} className="text-navy-600 mr-2" />
                  <span>Email <a href="mailto:contact@capitol-insights.com" className="text-gold-600 hover:underline">contact@capitol-insights.com</a></span>
                </p>
                <p className="flex items-center">
                  <ExternalLink size={16} className="text-navy-600 mr-2" />
                  <span>Complete our <Link to="/contact" className="text-gold-600 hover:underline">online contact form</Link></span>
                </p>
              </div>
            </>
          )
        },
        {
          question: 'What happens during the Texas legislative interim?',
          answer: 'The legislative interim (the period between regular legislative sessions) is a critical time for effective government relations. During this period, we focus on relationship building, interim committee work, agency rulemaking monitoring, coalition development, and strategic planning for the next session. Many successful legislative initiatives begin with groundwork laid during the interim, making it an ideal time to develop and position policy priorities.'
        }
      ]
    }
  ];
  
  // Flatten all FAQs for overall schema
  const allFaqs: FAQItem[] = faqCategories.flatMap(category => 
    category.faqs.map(faq => ({
      question: faq.question,
      answer: typeof faq.answer === 'string' ? faq.answer : 'See website for detailed answer'
    }))
  );

  return (
    <div className="pt-16">
      <SEO 
        {...getPageSEO({
          // Using 'resources' as the page type since 'faq' is not available
          pageType: 'resources',
          title: "Frequently Asked Questions | Texas Government Relations FAQ",
          description: "Get answers to common questions about government relations, legislative advocacy, and our approach to representing client interests in Texas.",
          additionalMetaTags: [
            { name: "keywords", content: "Texas government relations FAQ, lobbying questions, legislative advocacy process, Capitol Insights services" }
          ]
        })}
        // FAQPage schema will be provided by the FAQAccordion component
        breadcrumbs={[
          { name: 'Home', url: 'https://capitol-insights.com/' },
          { name: 'FAQ', url: 'https://capitol-insights.com/faq' }
        ]}
      />

      {/* Hero Section */}
      <section className="bg-navy-900 py-16 relative">
        <div className="absolute inset-0 bg-texture opacity-10"></div>
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Get answers to common questions about government relations, our services, and how we can help your organization navigate the Texas legislative landscape.
            </p>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="container py-3">
          <BreadcrumbNavigation 
            items={[
              { name: 'Home', path: '/' },
              { name: 'FAQ', path: '/faq', isLast: true }
            ]}
          />
        </div>
      </div>

      {/* FAQ Content */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {/* Category links for in-page navigation */}
            <div className="mb-12 flex flex-wrap gap-3 justify-center">
              {faqCategories.map(category => (
                <a 
                  key={category.id}
                  href={`#${category.id}`} 
                  className="inline-flex items-center px-4 py-2 bg-navy-50 hover:bg-navy-100 text-navy-800 rounded-full transition-colors"
                >
                  {category.title}
                </a>
              ))}
            </div>
            
            {/* All FAQs in one schema but visually separated by category */}
            <FAQAccordion 
              items={allFaqs}
              includeSchema={true}
              className="hidden" // Hidden visually, but present for structured data
            />
            
            {/* Display FAQs by category */}
            <div className="space-y-16">
              {faqCategories.map(category => (
                <div key={category.id} id={category.id}>
                  <h2 className="text-2xl font-bold text-navy-800 mb-6 border-b border-slate-200 pb-3">
                    {category.title}
                  </h2>
                  <FAQAccordion 
                    items={category.faqs}
                    includeSchema={false} // Already included once above
                  />
                </div>
              ))}
            </div>
            
            {/* Contact CTA */}
            <div className="mt-16 pt-8 border-t border-slate-200">
              <div className="bg-navy-50 rounded-xl p-8 text-center">
                <h3 className="text-xl font-bold text-navy-800 mb-4">
                  Didn't find what you were looking for?
                </h3>
                <p className="text-navy-700 mb-6 max-w-lg mx-auto">
                  Our team is ready to answer your specific questions about government relations and legislative advocacy in Texas.
                </p>
                <Link to="/contact" className="btn btn-primary">
                  Contact Our Team
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQPage;
