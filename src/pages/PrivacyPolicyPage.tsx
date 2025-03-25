import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, ChevronRight } from 'lucide-react';
import SEO from '../components/SEO';

const PrivacyPolicyPage = () => {
  return (
    <div className="pt-16">
      {/* SEO Configuration */}
      <SEO 
        title="Privacy Policy | Capitol Insights"
        description="Capitol Insights Privacy Policy: Learn how we collect, use, and protect your personal information when you use our website and services."
        canonical="/privacy"
        additionalMetaTags={[
          { name: "keywords", content: "privacy policy, data protection, information collection, personal data, government relations privacy" },
          { property: "og:site_name", content: "Capitol Insights" }
        ]}
      />

      {/* Privacy Policy Header */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-5 sm:mb-6 mx-auto w-14 h-14 sm:w-16 sm:h-16 bg-primary-500/20 rounded-full flex items-center justify-center">
              <Shield size={28} className="text-primary-200" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">Privacy Policy</h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
              Capitol Insights is committed to protecting your privacy and ensuring the security of your personal information.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container">
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="prose prose-lg max-w-none sm:px-0 px-4">
              <p>
                Last Updated: October 15, 2024
              </p>
              
              <h2>Introduction</h2>
              <p>
                Capitol Insights ("we," "us," or "our") respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
              </p>
              <p>
                Please read this Privacy Policy carefully. By accessing or using our website or services, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy. If you do not agree with our policies and practices, please do not use our website or services.
              </p>
              
              <h2>Information We Collect</h2>
              <p>
                We collect information that you provide directly to us, information we collect automatically when you use our website, and information from third-party sources.
              </p>
              
              <h3>Information You Provide to Us</h3>
              <p>
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul>
                <li>Complete forms on our website, including contact forms and newsletter subscriptions</li>
                <li>Request information about our services</li>
                <li>Correspond with us by phone, email, or otherwise</li>
                <li>Participate in surveys, promotions, or events</li>
              </ul>
              <p>
                The types of information we may collect include:
              </p>
              <ul>
                <li>Contact information (such as name, email address, phone number, and mailing address)</li>
                <li>Professional information (such as job title, company name, and industry)</li>
                <li>Communications preferences</li>
                <li>Any other information you choose to provide</li>
              </ul>
              
              <h3>Information We Collect Automatically</h3>
              <p>
                When you access or use our website, we may automatically collect certain information about your device and usage, including:
              </p>
              <ul>
                <li>Device information (such as your IP address, browser type, operating system, and device type)</li>
                <li>Usage information (such as pages visited, time spent on the site, and links clicked)</li>
                <li>Location information (such as your general geographic location based on your IP address)</li>
              </ul>
              <p>
                We may use cookies, web beacons, and similar technologies to collect this information. You can control cookies through your browser settings, but disabling cookies may limit your ability to use some features of our website.
              </p>
              
              <h2>How We Use Your Information</h2>
              <p>
                We may use the information we collect for various purposes, including to:
              </p>
              <ul>
                <li>Provide, maintain, and improve our website and services</li>
                <li>Respond to your inquiries and fulfill your requests</li>
                <li>Send you updates, newsletters, and marketing communications</li>
                <li>Personalize your experience on our website</li>
                <li>Analyze usage patterns and improve our website and services</li>
                <li>Protect against, identify, and prevent fraud and other unauthorized activity</li>
                <li>Comply with legal obligations and enforce our terms and policies</li>
              </ul>
              
              <h2>How We Share Your Information</h2>
              <p>
                We may share your information in the following circumstances:
              </p>
              <ul>
                <li>With service providers who perform services on our behalf</li>
                <li>With professional advisors, such as lawyers, auditors, and insurers</li>
                <li>With government authorities when required by law or to protect our rights</li>
                <li>In connection with a business transaction, such as a merger, acquisition, or sale of assets</li>
              </ul>
              <p>
                We do not sell your personal information to third parties for their marketing purposes.
              </p>
              
              <h2>Your Choices</h2>
              <p>
                You have certain choices regarding how we use your information:
              </p>
              <ul>
                <li>You can opt out of receiving marketing communications by following the unsubscribe instructions in our emails</li>
                <li>You can update or correct your personal information by contacting us</li>
                <li>You can request access to, or deletion of, your personal information by contacting us</li>
              </ul>
              
              <h2>Data Security</h2>
              <p>
                We implement reasonable security measures to protect your personal information from unauthorized access, use, or disclosure. However, no data transmission or storage system is 100% secure, and we cannot guarantee the security of your information.
              </p>
              
              <h2>Children's Privacy</h2>
              <p>
                Our website and services are not directed to children under 16, and we do not knowingly collect personal information from children under 16. If we learn that we have collected personal information from a child under 16, we will promptly delete it.
              </p>
              
              <h2>Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will post the updated Privacy Policy on this page and update the "Last Updated" date.
              </p>
              
              <h2>Contact Us</h2>
              <p>
                If you have any questions or concerns about this Privacy Policy or our privacy practices, please contact us at:
              </p>
              <p>
                Email: <a href="mailto:info@capitol-insights.com">info@capitol-insights.com</a><br />
                Mail: Capitol Insights, Privacy Office, Dallas, TX
              </p>
            </div>
            
            <div className="mt-10 sm:mt-12 flex justify-center">
              <Link 
                to="/contact" 
                className="btn btn-primary btn-lg w-full sm:w-auto justify-center"
              >
                Contact Us With Questions
                <ChevronRight size={18} className="ml-1" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;