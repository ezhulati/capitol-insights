import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Linkedin, Twitter, ExternalLink } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import ResponsiveImage from './ResponsiveImage';
import { generatePersonStructuredData } from '../utils/structured-data';

interface EducationEntry {
  institution: string;
  degree: string;
  years: string;
  activities?: string;
  url?: string;
}

interface SocialLink {
  type: 'linkedin' | 'twitter' | 'facebook' | 'email' | 'website';
  url: string;
  label?: string;
}

export interface TeamMemberProps {
  id: string;
  name: string;
  title: string;
  bio: string | React.ReactNode;
  image: string;
  expertise?: string[];
  education?: EducationEntry[];
  socialLinks?: SocialLink[];
  contactLink?: string;
  location?: string;
  areaServed?: string[];
  showStructuredData?: boolean;
  showSocialPreview?: boolean;
}

/**
 * TeamMember component for displaying team member information with proper schema markup
 * 
 * This component provides standardized presentation of team member information
 * along with proper person schema and social preview metadata.
 */
const TeamMember: React.FC<TeamMemberProps> = ({
  id,
  name,
  title,
  bio,
  image,
  expertise = [],
  education = [],
  socialLinks = [],
  contactLink,
  location = 'Austin, Texas',
  showStructuredData = true,
  showSocialPreview = false
}) => {
  // Get short bio for metadata
  
  // Extract short bio for metadata
  const shortBio = typeof bio === 'string'
    ? bio.substring(0, 250) + '...'
    : '';
  
  // Get social profiles in the format expected by schema
  const sameAs = socialLinks
    .filter(link => link.type !== 'email')
    .map(link => link.url);
  
  // Get email if available
  const email = socialLinks.find(link => link.type === 'email')?.url;
  
  // Generate alumni info for structured data
  
  // Generate alumni info for structured data
  const alumniOf = education.map(edu => ({
    name: edu.institution,
    url: edu.url
  }));

  return (
    <div id={id} className="team-member">
      {/* Add structured data */}
      {showStructuredData && (
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify(
              generatePersonStructuredData({
                name: name,
                jobTitle: title,
                description: shortBio || `${name} is ${title} at Capitol Insights.`,
                image: image,
                url: `https://capitol-insights.com/team#${id}`,
                sameAs: sameAs,
                email: email?.replace('mailto:', ''),
                alumniOf: alumniOf,
                knowsAbout: expertise,
                worksFor: {
                  name: "Capitol Insights",
                  url: "https://capitol-insights.com",
                  sameAs: [
                    "https://www.linkedin.com/company/capitol-insights",
                    "https://twitter.com/capitolinsights"
                  ]
                }
              })
            )}
          </script>
        </Helmet>
      )}
      
      {/* Add social preview metadata if requested */}
      {showSocialPreview && (
        <Helmet>
          {/* OpenGraph tags */}
          <meta property="og:title" content={`${name} - ${title} | Capitol Insights`} />
          <meta property="og:description" content={shortBio || `${name} is ${title} at Capitol Insights.`} />
          <meta property="og:image" content={image} />
          <meta property="og:url" content={`https://capitol-insights.com/team#${id}`} />
          <meta property="og:type" content="profile" />
          
          {/* Twitter Card tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={`${name} - ${title} | Capitol Insights`} />
          <meta name="twitter:description" content={shortBio || `${name} is ${title} at Capitol Insights.`} />
          <meta name="twitter:image" content={image} />
        </Helmet>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Image Column */}
        <div className="lg:col-span-4">
          <div className="relative transition-all duration-300 hover:shadow-lg">
            <div className="rounded-xl overflow-hidden shadow-lg">
              <ResponsiveImage 
                src={image} 
                alt={`${name}, ${title} at Capitol Insights`}
                className="w-full h-auto aspect-square"
                aspectRatio="1/1"
                objectFit="cover"
                generateStructuredData={true}
                caption={`${name} - ${title}`}
                author="Capitol Insights"
                contentLocation={location}
                context={`Team member portrait of ${name}, ${title}`}
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-28 sm:w-40 h-28 sm:h-40 bg-primary-100 rounded-xl -z-10"></div>
          </div>
          
          {/* Social Links (Only visible on smaller screens) */}
          <div className="mt-6 lg:hidden">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Connect with {name.split(' ')[0]}</h3>
            <div className="flex flex-wrap gap-3">
              {/* Contact Link if provided */}
              {contactLink && (
                <Link 
                  to={contactLink} 
                  className="btn btn-primary btn-sm whitespace-nowrap"
                >
                  <Mail size={16} className="mr-2" />
                  <span>Contact</span>
                </Link>
              )}
              
              {/* Social Links */}
              {socialLinks.map((link, i) => (
                <SocialButton key={i} link={link} />
              ))}
            </div>
          </div>
        </div>
        
        {/* Content Column */}
        <div className="lg:col-span-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{name}</h2>
            <p className="text-primary-600 font-medium text-lg">{title}</p>
          </div>
          
          {/* Bio */}
          <div className="prose max-w-none text-gray-700 mt-4 mb-6 sm:mb-8">
            {typeof bio === 'string' 
              ? bio.split('\n\n').map((paragraph, i) => (
                  <p key={i} className="mb-4">{paragraph}</p>
                ))
              : bio
            }
          </div>
          
          {/* Expertise & Education */}
          {(expertise.length > 0 || education.length > 0) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8">
              {/* Areas of Expertise */}
              {expertise.length > 0 && (
                <div className="bg-gray-50 p-4 sm:p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-3">Areas of Expertise</h3>
                  <ul className="space-y-2">
                    {expertise.map((item, i) => (
                      <li key={i} className="flex items-center text-gray-700">
                        <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Education */}
              {education.length > 0 && (
                <div className="bg-gray-50 p-4 sm:p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-4">Education</h3>
                  <div className="space-y-4">
                    {education.map((edu, i) => (
                      <div key={i} className="border-l-2 border-primary-200 pl-4 py-1">
                        <div className="font-medium text-gray-900">{edu.institution}</div>
                        <div className="text-gray-700">{edu.degree}</div>
                        <div className="text-gray-500 text-sm">{edu.years}</div>
                        {edu.activities && (
                          <div className="text-gray-600 text-sm mt-1 italic">
                            {edu.activities}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* Social Links (Only visible on larger screens) */}
          <div className="hidden lg:block mt-8 pt-4 border-t border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Connect with {name.split(' ')[0]}</h3>
            <div className="flex flex-wrap gap-3">
              {/* Contact Link if provided */}
              {contactLink && (
                <Link 
                  to={contactLink} 
                  className="btn btn-primary btn-sm whitespace-nowrap"
                >
                  <Mail size={16} className="mr-2" />
                  <span>Contact</span>
                </Link>
              )}
              
              {/* Social Links */}
              {socialLinks.map((link, i) => (
                <SocialButton key={i} link={link} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Helper component to render social media buttons with proper icons
 */
const SocialButton: React.FC<{ link: SocialLink }> = ({ link }) => {
  const getIcon = () => {
    switch (link.type) {
      case 'linkedin':
        return <Linkedin size={16} className="mr-2" />;
      case 'twitter':
        return <Twitter size={16} className="mr-2" />;
      case 'email':
        return <Mail size={16} className="mr-2" />;
      default:
        return <ExternalLink size={16} className="mr-2" />;
    }
  };
  
  const getLabel = () => {
    if (link.label) return link.label;
    
    switch (link.type) {
      case 'linkedin':
        return 'LinkedIn';
      case 'twitter':
        return 'Twitter';
      case 'email':
        return 'Email';
      case 'website':
        return 'Website';
      default:
        return 'Visit';
    }
  };
  
  return (
    <a 
      href={link.url}
      className="btn btn-secondary btn-sm whitespace-nowrap"
      rel="noopener noreferrer"
      target={link.type === 'email' ? '_self' : '_blank'}
    >
      {getIcon()}
      <span>{getLabel()}</span>
    </a>
  );
};

export default TeamMember;
