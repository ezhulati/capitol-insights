import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, ChevronRight } from 'lucide-react';
import SEO from '../components/SEO';

const TermsPage = () => {
  return (
    <div className="pt-16">
      {/* SEO Configuration */}
      <SEO 
        title="Terms of Service | Capitol Insights"
        description="Capitol Insights Terms of Service: The terms and conditions that govern your use of our website and services."
        canonical="/terms"
        additionalMetaTags={[
          { name: "keywords", content: "terms of service, terms and conditions, legal terms, website terms, service agreement" },
          { property: "og:site_name", content: "Capitol Insights" }
        ]}
      />

      {/* Terms Header */}
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
              <FileText size={28} className="text-primary-200" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">Terms of Service</h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
              Please read these terms carefully before using our website or services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Terms Content */}
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
              
              <h2>Acceptance of Terms</h2>
              <p>
                These Terms of Service ("Terms") govern your access to and use of the Capitol Insights website and services. By accessing or using our website or services, you agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, you may not access or use our website or services.
              </p>
              
              <h2>Changes to Terms</h2>
              <p>
                We may revise and update these Terms from time to time at our sole discretion. All changes are effective immediately when posted, and apply to all access to and use of the website thereafter. Your continued use of the website following the posting of revised Terms means that you accept and agree to the changes.
              </p>
              
              <h2>Accessing the Website</h2>
              <p>
                We reserve the right to withdraw or amend this website, and any service or material we provide on the website, in our sole discretion without notice. We will not be liable if for any reason all or any part of the website is unavailable at any time or for any period.
              </p>
              
              <h2>Intellectual Property Rights</h2>
              <p>
                The website and its entire contents, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio, and the design, selection, and arrangement thereof), are owned by Capitol Insights, its licensors, or other providers of such material and are protected by United States and international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
              </p>
              <p>
                These Terms permit you to use the website for your personal, non-commercial use only. You must not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our website, except as follows:
              </p>
              <ul>
                <li>Your computer may temporarily store copies of such materials in RAM incidental to your accessing and viewing those materials</li>
                <li>You may store files that are automatically cached by your web browser for display enhancement purposes</li>
                <li>You may print or download one copy of a reasonable number of pages of the website for your own personal, non-commercial use and not for further reproduction, publication, or distribution</li>
                <li>If we provide social media features with certain content, you may take such actions as are enabled by such features</li>
              </ul>
              
              <h2>Prohibited Uses</h2>
              <p>
                You may use the website only for lawful purposes and in accordance with these Terms. You agree not to use the website:
              </p>
              <ul>
                <li>In any way that violates any applicable federal, state, local, or international law or regulation</li>
                <li>For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way</li>
                <li>To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail," "chain letter," "spam," or any other similar solicitation</li>
                <li>To impersonate or attempt to impersonate Capitol Insights, a Capitol Insights employee, another user, or any other person or entity</li>
                <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the website, or which, as determined by us, may harm Capitol Insights or users of the website or expose them to liability</li>
              </ul>
              
              <h2>User Contributions</h2>
              <p>
                The website may contain message boards, chat rooms, personal web pages or profiles, forums, bulletin boards, and other interactive features that allow users to post, submit, publish, display, or transmit to other users or other persons content or materials on or through the website. All User Contributions must comply with the Content Standards set out in these Terms.
              </p>
              
              <h2>Content Standards</h2>
              <p>
                These content standards apply to any and all User Contributions and use of Interactive Services. User Contributions must in their entirety comply with all applicable federal, state, local, and international laws and regulations.
              </p>
              <p>
                Without limiting the foregoing, User Contributions must not:
              </p>
              <ul>
                <li>Contain any material that is defamatory, obscene, indecent, abusive, offensive, harassing, violent, hateful, inflammatory, or otherwise objectionable</li>
                <li>Promote sexually explicit or pornographic material, violence, or discrimination based on race, sex, religion, nationality, disability, sexual orientation, or age</li>
                <li>Infringe any patent, trademark, trade secret, copyright, or other intellectual property or other rights of any other person</li>
                <li>Violate the legal rights (including the rights of publicity and privacy) of others or contain any material that could give rise to any civil or criminal liability under applicable laws or regulations</li>
                <li>Promote any illegal activity, or advocate, promote, or assist any unlawful act</li>
                <li>Cause annoyance, inconvenience, or needless anxiety or be likely to upset, embarrass, alarm, or annoy any other person</li>
                <li>Impersonate any person, or misrepresent your identity or affiliation with any person or organization</li>
                <li>Involve commercial activities or sales, such as contests, sweepstakes, and other sales promotions, barter, or advertising</li>
                <li>Give the impression that they emanate from or are endorsed by us or any other person or entity, if this is not the case</li>
              </ul>
              
              <h2>Reliance on Information Posted</h2>
              <p>
                The information presented on or through the website is made available solely for general information purposes. We do not warrant the accuracy, completeness, or usefulness of this information. Any reliance you place on such information is strictly at your own risk. We disclaim all liability and responsibility arising from any reliance placed on such materials by you or any other visitor to the website, or by anyone who may be informed of any of its contents.
              </p>
              
              <h2>Disclaimer of Warranties</h2>
              <p>
                YOU UNDERSTAND AND AGREE THAT YOUR USE OF THE WEBSITE, ITS CONTENT, AND ANY SERVICES OR ITEMS OBTAINED THROUGH THE WEBSITE IS AT YOUR OWN RISK. THE WEBSITE, ITS CONTENT, AND ANY SERVICES OR ITEMS OBTAINED THROUGH THE WEBSITE ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.
              </p>
              
              <h2>Limitation of Liability</h2>
              <p>
                IN NO EVENT WILL CAPITOL INSIGHTS, ITS AFFILIATES, OR THEIR LICENSORS, SERVICE PROVIDERS, EMPLOYEES, AGENTS, OFFICERS, OR DIRECTORS BE LIABLE FOR DAMAGES OF ANY KIND, UNDER ANY LEGAL THEORY, ARISING OUT OF OR IN CONNECTION WITH YOUR USE, OR INABILITY TO USE, THE WEBSITE, ANY WEBSITES LINKED TO IT, ANY CONTENT ON THE WEBSITE OR SUCH OTHER WEBSITES, INCLUDING ANY DIRECT, INDIRECT, SPECIAL, INCIDENTAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES.
              </p>
              
              <h2>Governing Law and Jurisdiction</h2>
              <p>
                These Terms and your use of the website shall be governed by and construed in accordance with the laws of the State of Texas, without regard to its conflict of law principles. Any legal suit, action, or proceeding arising out of, or related to, these Terms or the website shall be instituted exclusively in the federal courts of the United States or the courts of the State of Texas.
              </p>
              
              <h2>Contact Information</h2>
              <p>
                Questions or comments about the website or these Terms of Service may be directed to:
              </p>
              <p>
                Email: <a href="mailto:info@capitol-insights.com">info@capitol-insights.com</a><br />
                Address: Capitol Insights, Dallas, TX
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

export default TermsPage;