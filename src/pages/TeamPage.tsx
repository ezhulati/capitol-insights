import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Linkedin, Award, Building2, BarChart, FileText, GraduationCap, Calendar } from 'lucide-react';
import client from '../tina-client';
import SEO from '../components/SEO';

// Define types for team members
interface TeamMember {
  id?: number;
  name: string;
  title: string;
  bio: string;
  image: string;
  email?: string | null;
  phone?: string | null;
  linkedin?: string | null;
  expertise: string[];
  education: string;
  contactLink: string;
}

interface TeamPageData {
  title: string;
  heroHeading: string;
  heroSubheading: string;
  teamMembers?: {
    name?: string;
    title?: string;
    bio?: string;
    image?: string;
    email?: string | null;
    phone?: string | null;
    linkedin?: string | null;
  }[];
}

const TeamPage = () => {
  const [pageData, setPageData] = useState<TeamPageData>({
    title: 'Meet Our Team',
    heroHeading: 'Meet the Team',
    heroSubheading: 'Our team brings decades of experience in government relations and lobbying, with authentic connections and specialized knowledge in key policy areas.',
    teamMembers: []
  });
  const [loading, setLoading] = useState<boolean>(true);
  
  // Fetch team page data from Tina CMS
  useEffect(() => {
    const fetchTeamPage = async () => {
      try {
        const response = await client.teamPage({ relativePath: 'index.mdx' });
        if (response.data.teamPage) {
          setPageData({
            title: response.data.teamPage.title,
            heroHeading: response.data.teamPage.heroHeading,
            heroSubheading: response.data.teamPage.heroSubheading,
            teamMembers: response.data.teamPage.teamMembers?.map(member => ({
              name: member?.name,
              title: member?.title,
              bio: member?.bio,
              image: member?.image,
              email: member?.email,
              phone: member?.phone,
              linkedin: member?.linkedin
            })) || []
          });
        }
      } catch (err) {
        console.error('Error fetching team page:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTeamPage();
  }, []);
  // Process the team members data
  const processedTeamMembers = pageData.teamMembers?.map((member, index) => ({
    id: index + 1,
    name: member?.name || '',
    title: member?.title || '',
    bio: member?.bio || '',
    image: member?.image || '',
    email: member?.email,
    phone: member?.phone,
    linkedin: member?.linkedin,
    expertise: ['Legislative Strategy', 'Transportation Policy', 'Local Government Relations', 'Coalition Building'],
    education: member?.name?.includes('Drew') ? 
      'B.A. Political Science, University of Texas' : 
      'J.D., Southern Methodist University; B.A. Government, University of Texas',
    contactLink: `/contact?member=${member?.name?.split(' ')[0]?.toLowerCase()}`
  })) || [];
  
  // Fallback data in case CMS data is not available
  const fallbackTeamMembers = [
    {
      id: 1,
      name: 'Drew Campbell',
      title: 'Senior Partner',
      image: '/uploads/team/drew-campbell.jpg',
      bio: `Drew Campbell brings over 30 years of government relations experience to Capitol Insights. As a founding partner, he has established the firm as a respected voice in Texas politics.

Prior to founding Capitol Insights, Drew served as CEO of the New Car Dealers Association of Metropolitan Dallas and worked with the Associated Motor Carriers of Oklahoma, where he developed extensive knowledge of transportation policy and regulation.

Drew's approach is straightforward and relationship-driven. He doesn't promise miracles or claim special influence—instead, he leverages decades of experience and genuine connections to help clients navigate complex legislative environments.`,
      expertise: ['Legislative Strategy', 'Transportation Policy', 'Local Government Relations', 'Coalition Building'],
      education: 'B.A. Political Science, University of Texas',
      contactLink: '/contact?member=drew'
    },
    {
      id: 2,
      name: 'Byron Campbell',
      title: 'Senior Partner',
      image: '/uploads/team/byron-campbell.jpg',
      bio: `Byron Campbell has dedicated over 10 years to understanding and navigating the intersection of policy, politics, and business. His experience spans local, state, and federal government, giving him valuable perspective on how decisions at each level impact organizations.

Byron's approach to government relations is methodical and transparent. He helps clients develop realistic goals, identify key stakeholders, and create strategic communication plans that resonate with decision-makers.

Prior to joining Capitol Insights, Byron worked as a legislative director in the Texas House of Representatives and as a policy advisor for a state agency, where he gained firsthand knowledge of the legislative process and regulatory environment.`,
      expertise: ['Policy Development', 'Regulatory Affairs', 'Telecommunications', 'Technology Policy'],
      education: 'J.D., Southern Methodist University; B.A. Government, University of Texas',
      contactLink: '/contact?member=byron'
    }
  ];
  
  // Use fallback data if CMS data is not available
  const teamMembers = processedTeamMembers.length ? processedTeamMembers : fallbackTeamMembers;
  const heroHeading = pageData.heroHeading || 'Meet the Team';
  const heroSubheading = pageData.heroSubheading || 'Our team brings decades of experience in government relations and lobbying, with authentic connections and specialized knowledge in key policy areas.';
  
  if (loading) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FileText size={48} className="text-slate-300 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-navy-900 mb-2">Loading team information...</h2>
        </div>
      </div>
    );
  }
  
  return (
    <div className="pt-16">
      {/* SEO Configuration */}
      <SEO 
        title={pageData.title || "Our Team | Capitol Insights"}
        description="Meet the experienced team at Capitol Insights who bring decades of expertise in government relations and policy advocacy throughout Texas."
        image="/uploads/team/team-page.png"
        canonical="/team"
        additionalMetaTags={[
          { name: "keywords", content: "government relations team, texas lobbyists, policy experts, drew campbell, byron campbell" },
          { property: "og:site_name", content: "Capitol Insights" }
        ]}
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
                        <img 
                          src={member.image} 
                          alt={member.name} 
                          className="w-full h-auto object-cover aspect-square"
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
                        <div className="flex items-center mb-3">
                          <GraduationCap size={20} className="text-primary-600 mr-2" />
                          <h3 className="font-semibold text-secondary-900">Education</h3>
                        </div>
                        <p className="text-secondary-700">{member.education}</p>
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
                      className="btn btn-primary btn-md"
                    >
                      <Mail size={18} className="mr-2" />
                      <span>Contact {member.name.split(' ')[0]}</span>
                    </Link>
                    <a 
                      href="#" 
                      className="btn btn-secondary btn-md"
                      rel="noopener noreferrer"
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
              <div className="card p-4 sm:p-6 flex flex-col items-center text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <FileText size={20} className="text-primary-600" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-secondary-900 mb-2">1. Assess</h3>
                <p className="text-secondary-600 text-sm">
                  We begin with a thorough assessment of your needs, goals, and the legislative landscape.
                </p>
              </div>
              
              <div className="card p-4 sm:p-6 flex flex-col items-center text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <BarChart size={20} className="text-primary-600" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-secondary-900 mb-2">2. Strategize</h3>
                <p className="text-secondary-600 text-sm">
                  We develop a tailored strategy with clear objectives and stakeholder mapping.
                </p>
              </div>
              
              <div className="card p-4 sm:p-6 flex flex-col items-center text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Building2 size={20} className="text-primary-600" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-secondary-900 mb-2">3. Engage</h3>
                <p className="text-secondary-600 text-sm">
                  We connect you with decision-makers and build supporting coalitions.
                </p>
              </div>
              
              <div className="card p-4 sm:p-6 flex flex-col items-center text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Calendar size={20} className="text-primary-600" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-secondary-900 mb-2">4. Adapt</h3>
                <p className="text-secondary-600 text-sm">
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
                className="btn bg-white text-primary-900 hover:bg-primary-50 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg shadow-lg transition-colors w-full sm:w-auto inline-flex justify-center"
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
