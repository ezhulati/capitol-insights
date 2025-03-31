import { Link } from 'react-router-dom';
import { Mail, Linkedin, Award, Building2, BarChart, FileText, GraduationCap, Calendar } from 'lucide-react';
import SEO from '../components/SEO';
import { getPageSEO } from '../utils/enhanced-seo';
import { generateTeamStructuredData } from '../utils/structured-data';
import { generateTeamMemberPreview } from '../utils/social-preview';
import BreadcrumbNavigation from '../components/BreadcrumbNavigation';
import ResponsiveImage from '../components/ResponsiveImage';

// Define education entry type
type EducationEntry = {
  institution: string;
  degree: string;
  years: string;
  activities?: string;
}

// Define team member shape for strong typing
type TeamMember = {
  id: number;
  name: string;
  title: string;
  bio: string;
  image: string;
  email?: string | null;
  phone?: string | null;
  linkedin?: string | null;
  expertise: string[];
  education: EducationEntry[];
  contactLink: string;
}

const TeamPage = () => {
  const pageData = {
    title: 'Meet Our Team',
    heroHeading: 'Meet the Team',
    heroSubheading: 'Our team brings decades of experience in government relations and lobbying, with authentic connections and specialized knowledge in key policy areas.'
  };
  
  // Team member data
  const fallbackTeamMembers: TeamMember[] = [
    {
      id: 1,
      name: 'Drew Campbell',
      title: 'Senior Partner',
      image: '/uploads/team/drew-campbell.jpg',
      bio: `Drew Campbell brings over forty years of lobbying and government relations expertise to Capitol Insights. With a foundation in agricultural economics from Oklahoma State University and business management from University of Phoenix, Drew applies both technical knowledge and strategic vision to complex legislative challenges.

His career began with the Associated Motor Carriers of Oklahoma before a distinguished twenty-five year tenure as CEO of the New Car Dealers Association of Metropolitan Dallas, where he developed extensive relationships with business leaders and political figures at local, state, and federal levels. During his leadership, the Association grew to represent over 200 dealerships and became one of the most respected industry voices in Texas politics.

As Executive Director of the Dallas Regional Mobility Coalition (DRMC), Drew has been at the forefront of transportation infrastructure policy in North Texas for over a decade. His leadership in DRMC has been instrumental in securing billions in funding for critical regional transportation projects, crafting innovative public-private partnerships, and developing consensus among diverse stakeholders spanning 28 municipalities.

Throughout his career, Drew has maintained a straightforward, relationship-driven approach to government relations. Rather than promising vague "influence," he focuses on practical frameworks and authentic connections that create clear pathways forward. His methodical preparation and strategic timing have helped clients navigate complex policy challenges with consistently successful outcomes.

As Senior Partner at Capitol Insights, Drew leverages his transportation and infrastructure expertise and extensive connections with Texas legislators to deliver results for clients across financial, transportation, healthcare and manufacturing sectors. His longstanding relationships with key committee chairs and agency leadership provide clients with strategic access when it matters most.`,
      expertise: ['Legislative Strategy', 'Transportation Policy', 'Local Government Relations', 'Coalition Building', 'Association Management', 'Media Relations'],
      education: [
        {
          institution: 'Oklahoma State University',
          degree: 'Bachelor of Science, Agricultural Economics and Accounting',
          years: '1975-1978'
        },
        {
          institution: 'University of Phoenix',
          degree: 'Master of Business Administration, MBA',
          years: '2000-2003'
        }
      ],
      contactLink: '/contact?member=drew'
    },
    {
      id: 2,
      name: 'Byron Campbell',
      title: 'Senior Partner',
      image: '/uploads/team/byron-campbell.jpg',
      bio: `Byron Campbell's political acumen was developed through hands-on experience in the corridors of power, beginning with his education at the University of North Texas, where he also demonstrated leadership as a letterman on the football team. His career trajectory reflects a strategic progression through the political landscape at both federal and state levels.

As Legislative Assistant for the Education and Workforce Committee in the U.S. House of Representatives under Chairman John Boehner, Byron gained invaluable insights into federal policy development, particularly in education and workforce issues. He helped craft committee positions on significant legislation and developed expertise in the intricate relationships between federal and state policy implementation.

Byron's campaign experience as Field Director for Pete Sessions for Congress demonstrated his strategic organizational abilities, where he coordinated grassroots operations across 188 precincts in Texas' 32nd Congressional District, exceeding vote goals by over 5,000 votes. This experience honed his understanding of effective messaging and coalition building.

For five years, Byron served as North Texas Regional Director for U.S. Senator Kay Bailey Hutchison, becoming her point man across 54 counties in Northeast Texas. In this pivotal role, he traveled extensively with Sen. Hutchison, coordinated her regional events, and led outreach initiatives to local leaders—meeting regularly with county judges, mayors, city council members, and business leaders. This experience deepened his understanding of how federal decisions impact local communities and established his extensive network across Texas.

Since co-founding Capitol Insights as Senior Partner in 2011, Byron has established himself as an expert in telecommunications, technology policy, and the behind-the-scenes dynamics that drive legislative outcomes. His approach is characterized by methodical education and preparation, breaking down complex political processes for clients and emphasizing early engagement to achieve optimal results.

Byron's commitment to education and community engagement is reflected in his service as Chairman of the University of North Texas Alumni Association's national board of directors from 2014-2016, where he led initiatives to strengthen alumni connections and support educational advancement. His combination of federal and state experience gives clients a comprehensive perspective on policy matters affecting Texas.`,
      expertise: ['Policy Development', 'Regulatory Affairs', 'Telecommunications', 'Technology Policy', 'Federal Relations', 'Campaign Strategy', 'Grassroots Mobilization'],
      education: [
        {
          institution: 'University of North Texas',
          degree: 'Bachelor of Arts, Political Science',
          years: '1999-2004',
          activities: 'Letterman of football team'
        }
      ],
      contactLink: '/contact?member=byron'
    }
  ];
  
  const teamMembers = fallbackTeamMembers;
  const heroHeading = pageData.heroHeading;
  const heroSubheading = pageData.heroSubheading;
  
  return (
    <div className="pt-16">
      {/* Enhanced SEO Configuration */}
      <SEO 
        {...getPageSEO({
          pageType: 'team',
          title: "Meet Our Texas Government Relations Team | Drew & Byron Campbell",
          description: "Our lobbying team brings 40+ years of Texas political expertise with direct relationships to key legislators and agency leadership across transportation, energy, and telecom sectors.",
          image: "/uploads/team/team-page.png",
          additionalMetaTags: [
            { name: "keywords", content: "Drew Campbell lobbyist, Byron Campbell government relations, Texas lobbying team, transportation policy experts, energy sector lobbying, telecommunications advocacy" },
            { property: "og:site_name", content: "Capitol Insights" }
          ]
        })}
        structuredData={generateTeamStructuredData(
          {
            name: "Capitol Insights",
            url: "https://capitol-insights.com",
            logo: "https://capitol-insights.com/images/logo.png",
            description: "Capitol Insights is a leading government relations firm in Texas specializing in transportation policy, telecommunications, and coalition building.",
            sameAs: [
              "https://www.linkedin.com/company/capitol-insights",
              "https://twitter.com/capitolinsights"
            ]
          },
          teamMembers.map(member => ({
            name: member.name,
            jobTitle: member.title,
            description: member.bio.substring(0, 250) + "...",
            image: member.image,
            url: `https://capitol-insights.com/team#${member.name.toLowerCase().replace(' ', '-')}`,
            sameAs: [
              member.linkedin || 
              (member.name === "Drew Campbell" 
                ? "https://www.linkedin.com/in/drew-campbell-19ab7a6/"
                : "https://www.linkedin.com/in/byron-campbell-9b28282b/")
            ]
          }))
        )}
        breadcrumbs={[
          { name: 'Home', url: 'https://capitol-insights.com/' },
          { name: 'Our Team', url: 'https://capitol-insights.com/team' }
        ]}
        includeOrganizationData={true}
        socialPreview={
          generateTeamMemberPreview({
            name: "Capitol Insights Team",
            title: "Texas Government Relations Experts",
            bio: "Our leadership team brings decades of experience in Texas government relations, with expertise in transportation policy, telecommunications, and legislative advocacy.",
            image: "/uploads/team/team-page.png"
          })
        }
      />
      
      {/* Team Header */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-3 py-1 bg-primary-500/20 text-primary-200 rounded-full text-sm font-medium mb-4">
              Our Leadership
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">{heroHeading}</h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
              {heroSubheading}
            </p>
          </div>
        </div>
      </section>
      
      {/* Breadcrumb Navigation */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="container py-3">
          <BreadcrumbNavigation 
            items={[
              { name: 'Home', path: '/' },
              { name: 'Our Team', path: '/team', isLast: true }
            ]}
          />
        </div>
      </div>

      {/* Team Members */}
      <section className="py-16 sm:py-20 md:py-24 bg-white">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <div key={member.id} className="mb-16 sm:mb-24 last:mb-0">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                  <div className="lg:col-span-4">
                    <div className="relative transition-all duration-300 hover:shadow-lg">
                      <div className="rounded-xl overflow-hidden shadow-lg">
                        <ResponsiveImage 
                          src={member.image} 
                          alt={member.name}
                          className="w-full h-auto aspect-square"
                          aspectRatio="1/1"
                          objectFit="cover"
                          generateStructuredData={true}
                          caption={`${member.name} - ${member.title}`}
                          author="Capitol Insights"
                          contentLocation="Austin, Texas"
                          context={`Team member portrait of ${member.name}, ${member.title}`}
                        />
                      </div>
                      <div className="absolute -bottom-4 -right-4 w-28 sm:w-40 h-28 sm:h-40 bg-primary-100 rounded-xl -z-10"></div>
                      {index % 2 === 1 && (
                        <div className="absolute -top-4 -left-4 w-16 sm:w-20 h-16 sm:h-20 bg-secondary-100 rounded-xl -z-10"></div>
                      )}
                    </div>
                  </div>
                  
                  <div className="lg:col-span-8">
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-secondary-900">{member.name}</h2>
                      <p className="text-primary-600 font-medium text-lg">{member.title}</p>
                    </div>
                    
                    <div className="prose max-w-none text-secondary-700 mt-4 mb-6 sm:mb-8">
                      {member.bio.split('\n\n').map((paragraph: string, i: number) => (
                        <p key={i} className="mb-4">{paragraph}</p>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8">
                      <div className="bg-secondary-50 p-4 sm:p-6 rounded-lg">
                        <div className="flex items-center mb-3">
                          <Award size={20} className="text-primary-600 mr-2" />
                          <h3 className="font-semibold text-secondary-900">Areas of Expertise</h3>
                        </div>
                        <ul className="space-y-2">
                          {member.expertise?.map((item, i) => (
                            <li key={i} className="flex items-center text-secondary-700">
                              <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="bg-secondary-50 p-4 sm:p-6 rounded-lg">
                        <div className="flex items-center mb-4">
                          <GraduationCap size={20} className="text-primary-600 mr-2" />
                          <h3 className="font-semibold text-secondary-900">Education</h3>
                        </div>
                        <div className="space-y-4">
                          {member.education.map((edu, eduIndex) => (
                            <div key={eduIndex} className="border-l-2 border-primary-200 pl-4 py-1">
                              <div className="font-medium text-secondary-900">{edu.institution}</div>
                              <div className="text-secondary-700">{edu.degree}</div>
                              <div className="text-secondary-500 text-sm">{edu.years}</div>
                              {edu.activities && (
                                <div className="text-secondary-600 text-sm mt-1 italic">
                                  {edu.activities}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Contact buttons moved to a separate section below the main profile */}
                <div className="mt-16 pt-4 border-t border-slate-100 max-w-md mx-auto">
                  <h3 className="text-center text-lg font-medium text-secondary-900 mb-6">Connect with {member.name.split(' ')[0]}</h3>
                  <div className="flex flex-wrap gap-3 justify-center">
                    <Link 
                      to={member.contactLink || '#'} 
                      className="btn btn-primary btn-md whitespace-nowrap"
                    >
                      <Mail size={18} className="mr-2" />
                      <span>Contact {member.name.split(' ')[0]}</span>
                    </Link>
                    <a 
                      href={member.name === 'Drew Campbell' 
                        ? "https://www.linkedin.com/in/drew-campbell-19ab7a6/" 
                        : "https://www.linkedin.com/in/byron-campbell-9b28282b/"}
                      className="btn btn-secondary btn-md whitespace-nowrap"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <Linkedin size={18} className="mr-2" />
                      <span>LinkedIn</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-16 sm:py-20 md:py-24 bg-secondary-50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-16">
            <span className="inline-block px-3 py-1 bg-primary-100 text-primary-600 rounded-full text-sm font-medium mb-4">
              Our Approach
            </span>
            <h2 className="section-title">How We Work</h2>
            <p className="section-subtitle">
              We believe in transparency about our process and methods. Here's how we approach government relations.
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
              <div className="card p-4 sm:p-6">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                    <FileText size={20} className="text-primary-600" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-secondary-900">1. Assess</h3>
                </div>
                <p className="text-secondary-600 text-sm ml-16 sm:ml-20">
                  We begin with a thorough assessment of your needs, goals, and the legislative landscape.
                </p>
              </div>
              
              <div className="card p-4 sm:p-6">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                    <BarChart size={20} className="text-primary-600" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-secondary-900">2. Strategize</h3>
                </div>
                <p className="text-secondary-600 text-sm ml-16 sm:ml-20">
                  We develop a tailored strategy with clear objectives and stakeholder mapping.
                </p>
              </div>
              
              <div className="card p-4 sm:p-6">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                    <Building2 size={20} className="text-primary-600" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-secondary-900">3. Engage</h3>
                </div>
                <p className="text-secondary-600 text-sm ml-16 sm:ml-20">
                  We connect you with decision-makers and build supporting coalitions.
                </p>
              </div>
              
              <div className="card p-4 sm:p-6">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                    <Calendar size={20} className="text-primary-600" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-secondary-900">4. Adapt</h3>
                </div>
                <p className="text-secondary-600 text-sm ml-16 sm:ml-20">
                  We continuously monitor developments and provide regular progress updates.
                </p>
              </div>
            </div>
            
            <div className="mt-10 sm:mt-16 p-6 sm:p-8 bg-white border border-secondary-100 rounded-xl shadow-card">
              <h3 className="text-xl font-semibold text-secondary-900 mb-4">Our Commitment to Transparency</h3>
              <p className="text-secondary-700 mb-6">
                We believe clients deserve complete honesty about what government relations can and cannot achieve. 
                Unlike firms that promise vague "influence" or exaggerate their connections, we're straightforward about our approach:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="w-5 h-5 bg-primary-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="w-2 h-2 bg-primary-600 rounded-full"></span>
                  </span>
                  <span className="text-secondary-700">
                    <strong className="text-secondary-900">No guarantees of outcomes</strong> – We never promise specific legislative results, as policy-making involves many factors beyond any single firm's control
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="w-5 h-5 bg-primary-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="w-2 h-2 bg-primary-600 rounded-full"></span>
                  </span>
                  <span className="text-secondary-700">
                    <strong className="text-secondary-900">Realistic timelines</strong> – Legislative change often takes multiple sessions, and we're honest about the time investment required
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="w-5 h-5 bg-primary-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="w-2 h-2 bg-primary-600 rounded-full"></span>
                  </span>
                  <span className="text-secondary-700">
                    <strong className="text-secondary-900">Clear fee structures</strong> – We provide transparent pricing without hidden costs or ambiguous value promises
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="w-5 h-5 bg-primary-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="w-2 h-2 bg-primary-600 rounded-full"></span>
                  </span>
                  <span className="text-secondary-700">
                    <strong className="text-secondary-900">Regular reporting</strong> – We provide detailed updates on activities, engagements, and progress toward objectives
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 relative">
        <div className="absolute inset-0 bg-texture bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/95 to-primary-800/90"></div>
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
              Work With Our Team
            </h2>
            
            <p className="text-lg sm:text-xl text-primary-50 mb-8 sm:mb-10 max-w-2xl mx-auto">
              Ready to advance your legislative and regulatory agenda with a team that values transparency and ethical advocacy? Let's start a conversation.
            </p>
            
            <div>
              <Link 
                to="/contact" 
                className="btn bg-white text-primary-900 hover:bg-primary-50 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg shadow-lg transition-colors w-full sm:w-auto inline-flex justify-center whitespace-nowrap"
              >
                Contact Our Team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TeamPage;
