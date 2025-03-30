/**
 * Content Provider
 * 
 * This file serves as a bridge between the MDX file system and Sanity CMS.
 * It provides the same interface as the original MDX utilities but can
 * switch between local file content and Sanity CMS content based on configuration.
 */

import { BlogPost, PageContent } from './mdx-sanity';

// Set this to 'sanity' to use Sanity CMS content, or 'local' to use local MDX files
const CONTENT_SOURCE: 'sanity' | 'local' = 'local';

// Fallback blog posts data for use in browser
const fallbackPosts: BlogPost[] = [
  {
    _sys: {
      filename: "texas-legislative-session-2025-preview.mdx",
      basename: "texas-legislative-session-2025-preview",
      relativePath: "texas-legislative-session-2025-preview.mdx"
    },
    id: "texas-legislative-session-2025-preview",
    title: "Texas Legislative Session 2025 - What Organizations Need to Know",
    excerpt: "A comprehensive preview of key issues likely to dominate the upcoming legislative session and how they may impact various sectors.",
    date: "2024-10-15T12:00:00.000Z",
    author: "Drew Campbell",
    authorTitle: "Senior Partner",
    readTime: "6 min read",
    category: "Legislative Preview",
    tags: ["Texas Legislature", "Policy", "Government Affairs"],
    featured: true,
    image: "/uploads/posts/texas-legislative.jpg",
    body: "The 2025 Texas Legislative Session is approaching quickly, and I've spent the last several months in conversation with key legislative leaders about their priorities. What's become abundantly clear is that this session will be unlike any we've seen in recent years—with significant implications for organizations operating in Texas.\n\n## Why This Session Matters More Than Most\n\nHaving worked the Capitol halls for over three decades, I can tell you this isn't hyperbole. The convergence of economic pressures, energy transitions, and post-pandemic realities has created a perfect storm of legislative activity. Organizations that fail to prepare now will find themselves playing catch-up when bills start moving at breakneck pace.\n\nWhen a client recently asked me if they could wait until January to begin their legislative strategy, I had to be blunt: \"By then, many of the decisions that will affect your industry will already be baked into committee priorities.\"\n\n## Economic Development: The Battle for Texas's Competitive Edge\n\nTexas continues to lead the nation in job creation and business relocation—a point of pride that legislators from both parties are determined to maintain. But how we maintain this edge is sparking intense debate.\n\nDuring recent conversations with members of the House Economic Development Committee, I've heard consistent concerns about the structure of business incentive programs. The Chapter 313 replacement debate will likely dominate early committee hearings, with significant differences between House and Senate approaches.\n\nWatch particularly for:\n\n- **Targeted incentive programs** focused on semiconductor manufacturing, critical infrastructure, and advanced technology sectors\n- **Workforce development initiatives** aimed at addressing the skills gap that CEOs consistently cite as their biggest Texas challenge\n- **Infrastructure investment packages** designed to support high-growth regions struggling with transportation and utility capacity\n\nAn executive from a Fortune 500 company recently told me, \"We're making 50-year facility decisions based on what Texas does in this session.\" That's the level of impact we're discussing.\n\n## Energy Policy: Balancing Reliability with Transition\n\nAs the nation's energy leader, Texas faces perhaps the most complex policy challenges in the energy sector. The traumatic failures during Winter Storm Uri remain fresh in legislators' minds, while the rapid growth of renewable energy alongside traditional production creates both opportunities and tensions.\n\nIn my conversations with the Public Utility Commission and ERCOT leadership, several priorities have emerged:\n\n- **Grid reliability improvements** including weatherization requirements, reserve capacity mandates, and critical infrastructure designations\n- **Renewable integration frameworks** that balance the continued growth of wind and solar with grid stability concerns\n- **Regulatory structures for emerging technologies** like battery storage, hydrogen, and small modular nuclear reactors\n\nOne Senator confided, \"We're trying to solve for reliability, affordability, and transition all at once—and the stakeholders for each priority have competing interests.\"\n\n## Healthcare Access: Addressing Critical Gaps\n\nHealthcare policy continues to be a critical concern, with rural healthcare access reaching crisis levels in some regions of the state. After spending time with both provider organizations and rural community leaders, I can report several key issues rising to the top of the agenda:\n\n- **Rural healthcare accessibility** through new funding models, telehealth expansion, and provider incentive programs\n- **Telehealth permanence provisions** that solidify the regulatory changes implemented during the pandemic\n- **Insurance market reforms** aimed at addressing coverage gaps and network adequacy in underserved areas\n\n## The Advocacy Roadmap: How to Prepare Now\n\nAfter guiding hundreds of organizations through legislative sessions, I've developed a clear framework for effective advocacy. The organizations that succeed aren't always the largest or best-funded—they're the ones that prepare methodically and execute strategically.\n\n<strong>1. Identify Your Key Stakeholders</strong>\n\nStart by mapping the legislative ecosystem around your issues. This includes not just committee chairs and members, but the often-overlooked senior staff who shape legislation behind the scenes. Develop a comprehensive stakeholder map that includes:\n\n- Committee leadership and members with jurisdiction over your issues\n- Key agency officials who will implement resulting regulations\n- Staff directors and policy analysts who draft legislation\n- Other organizations and coalitions with aligned interests\n\n<strong>2. Build Strategic Coalitions</strong>\n\nThe most effective advocacy rarely happens in isolation. In my experience, strategic coalition-building amplifies your voice and provides critical mass on key issues. When developing coalitions:\n\n- Seek unexpected allies who bring different constituencies to the table\n- Establish clear coalition governance and messaging discipline early\n- Develop shared resources and intelligence-gathering systems\n- Create a rapid response structure for when opportunities or threats emerge\n\nA healthcare coalition I worked with last session succeeded primarily because they brought together providers, patient advocates, and business interests—giving legislators cover from multiple constituencies to support difficult reforms.\n\n<strong>3. Develop Compelling, Evidence-Based Messaging</strong>\n\nLegislators and their staff are inundated with position papers and talking points. What breaks through is messaging that clearly articulates not just what you want, but how your position benefits constituents and the state's broader interests.\n\nThe most effective approaches:\n\n- Ground arguments in Texas-specific data and examples\n- Articulate constituent impacts across different regions of the state\n- Provide clear, concise one-pagers that staff can quickly digest and reference\n- Develop compelling narratives that make technical issues accessible\n\n<strong>4. Engage Early and Consistently</strong>\n\nThe cardinal mistake I see organizations make is waiting until session begins to establish relationships. By then, it's often too late to shape the fundamental understanding of issues. Begin now by:\n\n- Scheduling interim meetings with key legislators and staff\n- Providing subject matter expertise for interim committee hearings\n- Inviting officials to tour facilities or participate in industry events\n- Building a presence that extends beyond formal lobbying activities\n\n## The Path Forward\n\nThe window for effective pre-session positioning is closing quickly. Organizations that invest in relationship-building and strategic planning now will find themselves with access and credibility when critical decisions are being made.\n\nIn my 30+ years working in the Texas Capitol, I've observed that success rarely comes to those who simply react to legislative developments. It comes to those who help shape the understanding of issues before bills are even drafted.\n\nThe 2025 Texas Legislative Session will present extraordinary challenges and opportunities. The groundwork you lay in the coming months will determine whether your organization can effectively navigate what promises to be a consequential session. The time to begin is now."
  },
  {
    _sys: {
      filename: "healthcare-regulatory-changes-impact.mdx",
      basename: "healthcare-regulatory-changes-impact",
      relativePath: "healthcare-regulatory-changes-impact.mdx"
    },
    id: "healthcare-regulatory-changes-impact",
    title: "Impact of Recent Healthcare Regulatory Changes on Texas Providers",
    excerpt: "An analysis of how recent regulatory changes are affecting healthcare providers across Texas and strategies for adaptation.",
    date: "2024-09-28T12:00:00.000Z",
    author: "Byron Campbell",
    authorTitle: "Healthcare Policy Specialist",
    readTime: "5 min read",
    category: "Healthcare",
    tags: ["Healthcare", "Regulatory", "Compliance"],
    featured: false,
    image: "/uploads/posts/healthcare-regulatory.jpg",
    body: "As a healthcare policy specialist with over two decades of experience in the Texas regulatory environment, I've witnessed numerous policy shifts—but few as consequential as those implemented in the past year. The regulatory landscape for healthcare providers in Texas has undergone a fundamental transformation, creating a complex matrix of challenges and opportunities that demand immediate attention.\n\n## The Regulatory Seismic Shift: What's Actually Happening\n\nIn my analysis, we're not simply seeing incremental policy adjustments. Rather, we're experiencing a comprehensive realignment of healthcare delivery models fueled by post-pandemic realities, technological advances, and demographic pressures unique to Texas.\n\nLet me break down the most significant regulatory developments and their practical implications for providers across the care continuum.\n\n## Telehealth Expansion: Beyond Pandemic Accommodations\n\nThe initial emergency telehealth provisions implemented during COVID-19 have evolved into permanent regulatory frameworks that fundamentally alter care delivery models. Having advised several large health systems on telehealth implementation, I can attest that the current regulatory structure goes far beyond simple pandemic accommodations.\n\nThe Texas Medical Board and Health and Human Services Commission have established a robust telehealth framework with several key provisions:\n\n- **Reimbursement parity requirements** that mandate equivalent payment for virtual visits compared to in-person care, though with important nuances across payer types that providers must carefully navigate\n- **Expanded service eligibility** across previously restricted specialties including behavioral health, chronic disease management, and certain diagnostic services\n- **Modified technology standards** that balance accessibility (particularly for rural populations) with security requirements\n\nDuring a recent consultation with a rural hospital network, we identified over $2.3 million in potential additional annual revenue through optimized telehealth service lines that comply with these new regulations. However, many providers are leaving similar opportunities untapped due to misunderstanding regulatory permissions.\n\n## Staffing Mandates: The Hidden Operational Challenge\n\nPerhaps the most operationally consequential regulations involve staffing requirements that directly impact both quality metrics and bottom-line performance. These changes reflect Texas's attempt to address quality concerns while navigating the reality of healthcare workforce shortages.\n\nKey provisions include:\n\n- **Recalibrated nurse-to-patient ratios** in specific care settings including emergency departments, labor and delivery, and critical care units—requirements that vary based on facility size and designation\n- **Enhanced training and certification mandates** for specialized care areas, particularly in geriatric care, behavioral health integration, and maternal health services\n- **Documentation and reporting requirements** that significantly increase compliance workloads but also create quality improvement opportunities\n\nIn working with a mid-sized hospital system in Central Texas, we found that these staffing regulations increased operational costs by approximately 8.3%—a substantial impact that requires strategic adjustments rather than simple budget absorption.\n\n## Reimbursement Restructuring: The Financial Equation\n\nThe regulatory changes to billing structures and reimbursement mechanisms represent perhaps the most technically complex aspect of the current environment. These modifications demand sophisticated revenue cycle adaptations.\n\nMy analysis of the current reimbursement landscape reveals several critical areas requiring immediate attention:\n\n- **Implementation of new procedure codes** for emerging treatment modalities including advanced remote monitoring, integrated behavioral health, and complex care coordination services\n- **Enhanced documentation requirements** that tie reimbursement to specific quality metrics and outcomes reporting\n- **Price transparency provisions** that affect both direct patient billing and payer contract negotiations\n\nOne physician group I advised increased their clean claims rate by 14% and reduced denial write-offs by over $400,000 annually by implementing targeted workflow changes to address these specific regulatory requirements.\n\n## Strategic Adaptation: Four Proven Approaches\n\nBased on my work with dozens of Texas healthcare organizations navigating these changes, I've identified four core strategies that separate successful adaptation from costly compliance struggles.\n\n<strong>1. Technology Infrastructure Optimization</strong>\n\nSuccessful providers are strategically investing in technology systems that address multiple regulatory requirements simultaneously. Rather than piecemeal solutions, leading organizations are implementing integrated platforms that address:\n\n- Seamless telehealth delivery with appropriate documentation capabilities\n- Automated compliance monitoring for staffing requirements\n- Enhanced revenue cycle management with regulatory intelligence built in\n- Data analytics capabilities that identify both compliance risks and optimization opportunities\n\nA regional health system I recently worked with reduced their compliance management overhead by 23% through targeted technology investments that automated previously manual regulatory monitoring processes.\n\n<strong>2. Workforce Development and Training Realignment</strong>\n\nThe regulatory changes demand not just hiring adjustments but fundamental rethinking of staff development approaches. Effective organizations are implementing:\n\n- Specialized training modules addressing specific regulatory requirements\n- Cross-training initiatives that improve staffing flexibility while maintaining compliance\n- Certification programs that align with new reimbursement opportunities\n- Leadership development focused on regulatory change management\n\nDuring a recent project with a large physician practice, we developed a training matrix that reduced compliance-related productivity losses by 17% while simultaneously improving quality scores tied to value-based payment models.\n\n<strong>3. Proactive Compliance Management Systems</strong>\n\nRather than reactive approaches to regulatory requirements, leading organizations are implementing proactive compliance systems that include:\n\n- Regular structured audits of high-risk regulatory areas\n- Simulation exercises for potential regulatory changes on the horizon\n- Centralized compliance tracking tools that provide real-time visibility\n- Integration of compliance metrics into operational dashboards\n\nOne hospital I advised avoided over $600,000 in potential penalties by identifying and addressing documentation deficiencies before their annual regulatory review.\n\n<strong>4. Strategic Partnership Development</strong>\n\nFinally, forward-thinking providers are recognizing that the complexity of the current regulatory environment exceeds the capacity of many individual organizations. Successful adaptation often involves:\n\n- Formal partnerships with complementary providers to share compliance resources\n- Engagement with specialized legal and consulting services focused on Texas-specific regulations\n- Participation in provider collaboratives that share best practices and advocacy resources\n- Technology partnerships that reduce the burden of internal system development\n\n## The Path Forward: Preparing for Continued Evolution\n\nThe regulatory environment for Texas healthcare providers will undoubtedly continue to evolve. Based on my analysis of pending legislation, agency rulemaking processes, and federal developments, providers should anticipate further changes in several key areas:\n\n- **Value-based care requirements** with increased emphasis on social determinants of health\n- **Interoperability mandates** that go beyond current information sharing requirements\n- **Behavioral health integration regulations** that affect primary care and specialty providers\n- **Site-neutral payment policies** that will reshape care delivery location decisions\n\nOrganizations that view regulatory compliance not merely as a cost center but as a strategic function will find competitive advantages in this evolving landscape.\n\n## Conclusion: From Compliance to Strategic Advantage\n\nIn my experience advising healthcare organizations across Texas, I've observed that the most successful providers approach regulatory changes not simply as compliance hurdles but as catalysts for organizational improvement.\n\nThe current regulatory environment, while challenging, creates opportunities for providers to:\n\n- Expand service offerings through telehealth and new reimbursable services\n- Improve quality outcomes through enhanced staffing and documentation practices\n- Increase financial performance through optimized revenue cycle processes\n- Differentiate from competitors through superior regulatory execution\n\nBy implementing the strategies outlined above, healthcare organizations can transform regulatory challenges into strategic advantages that improve both patient care and organizational viability in an increasingly complex healthcare landscape."
  },
  {
    _sys: {
      filename: "municipal-advocacy-strategies.mdx",
      basename: "municipal-advocacy-strategies",
      relativePath: "municipal-advocacy-strategies.mdx"
    },
    id: "municipal-advocacy-strategies",
    title: "Effective Municipal Advocacy Strategies for 2025",
    excerpt: "Key strategies for organizations to effectively advocate for their interests at the municipal level in Texas.",
    date: "2024-09-10T12:00:00.000Z",
    author: "Drew Campbell",
    authorTitle: "Senior Partner",
    readTime: "4 min read",
    category: "Municipal Affairs",
    tags: ["Local Government", "Advocacy", "Strategy"],
    featured: false,
    image: "/uploads/posts/municipal-advocacy.jpg",
    body: "I still remember the look on my client's face when their $40 million project was suddenly derailed by a municipal zoning decision. \"But we've been focused on the Legislature,\" they told me. \"We never thought the city council would be the problem.\"\n\nIt's a scenario I've witnessed repeatedly during my three decades in Texas government relations. While organizations pour resources into state-level lobbying, they often overlook the municipal bodies making decisions that can immediately impact their bottom line.\n\nTruth is, your next business obstacle is more likely to come from city hall than the state capitol.\n\n## Why Municipal Advocacy Demands Different Strategies\n\nI've worked with organizations across Texas navigating both state and local advocacy challenges. What continually surprises executives is how fundamentally different these environments are—and how strategies effective in Austin often fail spectacularly at the local level.\n\nAfter guiding companies through hundreds of municipal issues ranging from permitting battles to tax incentive negotiations, I've developed a clear framework for success in these distinctive political ecosystems.\n\n## The Municipal Difference: Four Critical Distinctions\n\nBefore diving into specific strategies, it's essential to understand the fundamental differences that make municipal advocacy unique:\n\n### Direct Access with Personal Impact\n\nUnlike state legislators who may represent hundreds of thousands of constituents, council members and commissioners often represent significantly smaller populations. In my experience, this creates both opportunity and challenge—council members are more accessible but also more personally accountable to constituent concerns.\n\nDuring a recent rezoning issue in a mid-sized Texas city, we secured meetings with all council members within two weeks—try getting on nine legislators' calendars that quickly during session. However, each council member also had received dozens of neighborhood calls on the issue, creating intense personal pressure that wouldn't exist for most state-level decisions.\n\n### Community Opinion as Currency\n\nMunicipal officials operate in an environment where community sentiment carries extraordinary weight. I've witnessed objectively beneficial projects defeated solely because the community perception aligned against them.\n\nThis dynamic fundamentally changes the advocacy equation. While state lobbying often revolves around policy arguments and political calculations, municipal advocacy success frequently hinges on community narrative and public perception.\n\nA technology company learned this lesson when their data center project—which would have created minimal traffic while generating significant tax revenue—was rejected primarily because neighboring residents feared (incorrectly) that it would create noise and environmental issues. Their failure to shape community perception early proved fatal to an otherwise viable project.\n\n### Accelerated Timelines\n\nMunicipal decision-making moves at a pace that can catch organizations accustomed to the deliberate rhythm of state government completely off guard. I've seen zoning changes, fee structures, and regulatory requirements advance from proposal to implementation in weeks rather than months.\n\nThis compressed timeline means organizations must establish relationships and monitoring systems before issues emerge. Reactive approaches typically fail at the municipal level because by the time an issue appears on an agenda, it has often developed significant momentum.\n\n### Procedural Variation\n\nPerhaps most challenging is the substantial variation in processes between different Texas municipalities. Each city operates under different charter provisions, council structures, and administrative procedures.\n\nWhile state advocacy follows relatively consistent processes, municipal advocacy requires custom approaches for each jurisdiction. What works in Houston may fail entirely in San Antonio or Dallas due to these structural differences.\n\n## Municipal Priorities Shaping 2025\n\nBased on my ongoing work with city managers, council members, and local officials across Texas, several key issues are positioned to dominate municipal agendas in the coming year:\n\n### Land Use and Development Regulations\n\nTexas cities continue to grapple with extraordinary growth pressures, creating tension between development interests and neighborhood preservation. Recent court decisions and legislative actions have complicated municipal authority in this area, leading many cities to revise their approach.\n\nOrganizations should prepare for:\n- More prescriptive design and compatibility standards\n- Enhanced infrastructure requirements for new developments\n- Increased focus on affordable housing incentives and requirements\n- Growing emphasis on sustainability and resilience standards\n\nIn working with a development client recently, we identified over 20 substantive changes to land use requirements across just three target markets in their expansion plans.\n\n### Business Regulation Evolution\n\nLocal business regulations continue to evolve rapidly as cities respond to emerging business models, technology changes, and community concerns:\n\n- Updated permitting processes for technology-enabled services\n- Revised operating requirements for businesses in mixed-use areas\n- New compliance frameworks for sustainability and employment practices\n- Modified fee structures as cities seek revenue diversification\n\nOne retail client discovered that three different departments had jurisdiction over their proposed operation in a major Texas city, each with conflicting requirements. Navigating these complexities required relationships with staff across multiple divisions.\n\n### Infrastructure Investment Prioritization\n\nWith limited resources and growing needs, municipalities are making consequential decisions about infrastructure investment priorities:\n\n- Transportation funding allocations between modes and neighborhoods\n- Utility capacity investments that determine development feasibility\n- Public facility locations that affect surrounding property values\n- Technology infrastructure decisions that impact business competitiveness\n\nThese decisions create both risks and opportunities for organizations, depending on their ability to effectively advocate for their interests in community-benefit terms.\n\n### Public Safety Resource Allocation\n\nMunicipal public safety decisions directly impact business operations through response capabilities, code enforcement approaches, and public perception of area safety:\n\n- Police deployment models and priorities\n- Fire protection and emergency service coverage\n- Code compliance enforcement strategies\n- Public health and safety programming\n\n## The Municipal Advocacy Playbook: Four Proven Strategies\n\nBased on decades guiding organizations through municipal challenges, I've developed a structured approach that consistently delivers results across different jurisdictions and issues. The organizations that succeed in municipal advocacy consistently implement these four interconnected strategies:\n\n<strong>1. Know Your Audience—Deeply and Personally</strong>\n\nEffective municipal advocacy begins with comprehensive understanding of decision-makers and their motivations. This goes far beyond simple biographical research to develop nuanced understanding of individual priorities, concerns, and influences.\n\nSpecific actions that deliver results include:\n\n- **Researching council members' backgrounds, campaign platforms, and voting histories** to identify patterns and priorities that may affect your issues\n- **Understanding the demographic, economic, and political dynamics of specific council districts** to frame issues in relevant terms for each representative\n- **Identifying and building relationships with department heads and key staff members** who often shape policy recommendations and implementation details\n\nWhen working with a healthcare organization on a facility expansion, we discovered that one council member had previously served on a neighborhood association board that had opposed similar projects. This insight allowed us to proactively address likely concerns before they became formal objections.\n\n<strong>2. Build Authentic Community Coalitions</strong>\n\nThe most powerful municipal advocacy doesn't come directly from the interested organization but through authentic community voices supporting your position. Developing these coalitions requires genuine engagement and relationship-building.\n\nEffective coalition development includes:\n\n- **Establishing partnerships with neighborhood associations** by understanding and addressing their concerns early in your planning process\n- **Engaging with local business organizations** including chambers of commerce, merchant associations, and industry groups that can provide institutional support\n- **Collaborating with community nonprofits** whose missions align with aspects of your objectives, creating mutual benefit opportunities\n\nFor a transportation infrastructure project facing neighborhood opposition, we helped the client develop partnerships with five community organizations by identifying shared interests in improved safety and reduced congestion. These authentic community voices ultimately proved decisive in securing approval.\n\n<strong>3. Localize Your Narrative</strong>\n\nUnlike state advocacy where broad policy arguments often prevail, municipal advocacy succeeds when issues are framed in terms of specific community benefits. This requires translating organizational objectives into neighborhood-level impacts.\n\nSuccessful message localization includes:\n\n- **Framing issues explicitly in terms of community benefit** rather than organizational need, focusing on shared value creation\n- **Providing specific, tangible examples of local impact** through case studies, visual aids, and concrete illustrations\n- **Utilizing hyperlocal data and resident testimonials** that connect your proposal to residents' lived experiences\n\nWhen a retail client faced opposition to a mixed-use development, we commissioned a microeconomic impact study that quantified benefits at the neighborhood level—showing specific effects on local business revenue, property values, and employment opportunities within a 1-mile radius. This hyperlocal approach reframed the entire discussion.\n\n<strong>4. Maintain Consistent Community Presence</strong>\n\nPerhaps the most common municipal advocacy mistake is engaging only when specific issues arise. Successful organizations maintain ongoing presence that builds credibility and relationships before they're needed.\n\nEffective presence-building activities include:\n\n- **Regular attendance at council and committee meetings** even when your specific issues aren't on the agenda, demonstrating community commitment\n- **Thoughtful participation in public comment opportunities** on broader community issues to establish your organization as a constructive community partner\n- **Active engagement in community events and forums** that builds relationships with residents and opinion leaders\n\nOne manufacturing client avoided a potentially costly zoning change because a staff member casually mentioned the proposal to our client's community affairs director during a chamber of commerce event—giving us weeks to engage before the proposal formally emerged.\n\n## Case Study: The Power of Municipal Advocacy in Action\n\nRather than speaking in abstractions, let me share a recent example that demonstrates these principles in action.\n\nA retail and restaurant district in North Texas faced existential threat when the city planned a major infrastructure project that would severely restrict access for nearly 18 months. Initial city plans prioritized construction efficiency over business impact, potentially forcing dozens of small businesses to close permanently.\n\nWorking with the affected businesses, we implemented a comprehensive municipal advocacy strategy:\n\n1. **We thoroughly researched each council member**, identifying their business backgrounds, prior positions on similar issues, and connections to the affected area.\n\n2. **We built a diverse community coalition** including the businesses, nearby neighborhood associations concerned about construction impacts, the local chamber of commerce, and even the high school booster club that depended on restaurant fundraisers.\n\n3. **We developed a hyperlocal impact narrative** supported by specific economic data showing both the value of the businesses to the tax base and the downstream effects of potential closures on community organizations and property values.\n\n4. **We maintained consistent, constructive presence** throughout the planning process, participating in public works committee meetings, hosting community information sessions, and engaging with staff at every opportunity.\n\nMost importantly, we didn't simply oppose the project. Instead, we presented constructive alternatives including a phased construction approach, temporary access accommodations, and signage programs that would minimize business disruption while still accomplishing the infrastructure improvements.\n\nThe result? The city adopted a modified construction plan that added just two months to the timeline but reduced business impact by over 60%. Not a single business closed during construction, and the district actually increased its collective revenue by 4% during the project period through coordinated marketing efforts we helped implement.\n\n## The Municipal Opportunity\n\nAs resources for local governments continue to tighten while responsibilities expand, municipal bodies increasingly look to private organizations as potential partners rather than simply regulated entities. This evolution creates unprecedented opportunities for organizations that position themselves effectively.\n\nIn my experience, the most successful organizations view municipal engagement not as a defensive necessity but as a strategic opportunity to shape their operating environment.\n\nBy demonstrating how your priorities align with community needs and positioning your organization as a solution provider rather than just an interest advocate, you build the foundation for municipal influence that extends far beyond individual issues.\n\nIn an era where state preemption of local authority continues to create tension between governance levels, organizations that can navigate both worlds effectively will maintain critical competitive advantages. The municipal relationships you build today will become invaluable assets as local governments continue to exert substantial influence over your operating environment.\n\nThe organizations that thrive in 2025 and beyond will be those that recognize the distinctive nature of municipal advocacy and invest accordingly in this crucial but often overlooked dimension of government relations."
  }
];

/**
 * Get all blog posts
 */
export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    // Use the correct data source based on configuration
    if (CONTENT_SOURCE === 'sanity') {
      return import('./mdx-sanity').then(MDXSanity => MDXSanity.getAllPosts());
    } else {
      return Promise.resolve(fallbackPosts);
    }
  } catch (error) {
    console.error("Error getting posts:", error);
    return fallbackPosts;
  }
}

/**
 * Get a blog post by slug
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    // Use the correct data source based on configuration
    if (CONTENT_SOURCE === 'sanity') {
      return import('./mdx-sanity').then(MDXSanity => MDXSanity.getPostBySlug(slug));
    } else {
      // Use fallback data for local mode
      const post = fallbackPosts.find(p => p._sys.basename === slug);
      return Promise.resolve(post || null);
    }
  } catch (error) {
    console.error(`Error getting post with slug ${slug}:`, error);
    const post = fallbackPosts.find(p => p._sys.basename === slug);
    return post || null;
  }
}

/**
 * Get related posts based on category
 */
export async function getRelatedPosts(category: string, currentSlug: string): Promise<BlogPost[]> {
  try {
    // Get all posts
    const allPosts = await getAllPosts();
    
    // Filter posts by category and exclude the current post
    const relatedPosts = allPosts.filter(post => 
      post.category === category && 
      post._sys.basename !== currentSlug
    );
    
    // Return up to 3 related posts
    return relatedPosts.slice(0, 3);
  } catch (error) {
    console.error(`Error getting related posts for category ${category}:`, error);
    return [];
  }
}

/**
 * Get page content
 */
export async function getPageContent(pagePath: string): Promise<PageContent | null> {
  try {
    // Use the correct data source based on configuration
    if (CONTENT_SOURCE === 'sanity') {
      return import('./mdx-sanity').then(MDXSanity => MDXSanity.getPageContent(pagePath));
    } else {
      // Use mock data for local mode
      const mockPageContent: PageContent = {
        _sys: {
          filename: "index.mdx",
          basename: "index",
          relativePath: `${pagePath}/index.mdx`
        },
        title: `${pagePath.charAt(0).toUpperCase() + pagePath.slice(1)} Page`,
        body: "Content will be provided by Sanity CMS in production"
      };
      
      return Promise.resolve(mockPageContent);
    }
  } catch (error) {
    console.error(`Error getting content for page ${pagePath}:`, error);
    return null;
  }
}

/**
 * Render markdown content
 * 
 * This handles both markdown string content and Sanity portable text content
 */
export function renderMarkdown(content: string | any) {
  try {
    // Check if we're using Sanity and if content appears to be JSON/portable text
    if (CONTENT_SOURCE === 'sanity' && (typeof content === 'string' && content.startsWith('['))) {
      try {
        // If it's a string but actually contains serialized JSON (from Sanity)
        const parsedContent = JSON.parse(content);
        
        // Return the parsed structure directly (already in the format we need)
        if (Array.isArray(parsedContent)) {
          return parsedContent.map((block, index) => {
            if (block._type === 'block') {
              const style = block.style || 'normal';
              const text = block.children
                .map((child: any) => child.text)
                .join('');
                
              if (style === 'h1') {
                return { type: 'h1', content: text, key: index };
              } else if (style === 'h2') {
                return { type: 'h2', content: text, key: index };
              } else if (style === 'h3') {
                return { type: 'h3', content: text, key: index };
              } else {
                return { type: 'p', content: text, key: index };
              }
            }
            
            // For images and other block types
            return { type: 'p', content: '[Complex content]', key: index };
          });
        }
      } catch (jsonError) {
        // If it's not valid JSON, fall back to regular markdown parsing
        console.warn("Content appeared to be JSON but couldn't be parsed:", jsonError);
      }
    }

    // Basic markdown parser for regular markdown content
    if (!content || typeof content !== 'string') {
      return [{ type: 'p', content: '', key: 0 }];
    }

    // Split content by line breaks
    const lines = content.split('\n');
    const result = [];
    let currentList: string[] = [];
    let listType = '';
    let key = 0;

    // Process each line
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmedLine = line.trim();

      // Skip empty lines
      if (trimmedLine === '') {
        // If we're building a list, finish it
        if (currentList.length > 0) {
          result.push({
            type: listType,
            items: [...currentList],
            key: key++,
          });
          currentList = [];
          listType = '';
        }
        continue;
      }

      // Handle headings
      if (trimmedLine.startsWith('# ')) {
        result.push({
          type: 'h1',
          content: trimmedLine.substring(2),
          key: key++,
          id: trimmedLine.substring(2).toLowerCase().replace(/[^\w]+/g, '-'),
        });
      } else if (trimmedLine.startsWith('## ')) {
        result.push({
          type: 'h2',
          content: trimmedLine.substring(3),
          key: key++,
          id: trimmedLine.substring(3).toLowerCase().replace(/[^\w]+/g, '-'),
        });
      } else if (trimmedLine.startsWith('### ')) {
        result.push({
          type: 'h3',
          content: trimmedLine.substring(4),
          key: key++,
          id: trimmedLine.substring(4).toLowerCase().replace(/[^\w]+/g, '-'),
        });
      }
      // Handle unordered lists
      else if (trimmedLine.startsWith('- ')) {
        // If we're starting a new list or continuing a list of a different type
        if (listType !== 'ul') {
          // If we have a previous list, add it to results
          if (currentList.length > 0) {
            result.push({
              type: listType,
              items: [...currentList],
              key: key++,
            });
            currentList = [];
          }
          listType = 'ul';
        }
        currentList.push(trimmedLine.substring(2));
      }
      // Handle ordered lists (basic support for numbers only)
      else if (/^\d+\.\s/.test(trimmedLine)) {
        // If we're starting a new list or continuing a list of a different type
        if (listType !== 'ol') {
          // If we have a previous list, add it to results
          if (currentList.length > 0) {
            result.push({
              type: listType,
              items: [...currentList],
              key: key++,
            });
            currentList = [];
          }
          listType = 'ol';
        }
        // Extract the content after the number and period
        const content = trimmedLine.replace(/^\d+\.\s/, '');
        currentList.push(content);
      }
      // Handle paragraphs
      else {
        // If we have a list in progress, finish it
        if (currentList.length > 0) {
          result.push({
            type: listType,
            items: [...currentList],
            key: key++,
          });
          currentList = [];
          listType = '';
        }
        
        // Check if this is a continuation of previous paragraph or a new one
        if (result.length > 0 && result[result.length - 1].type === 'p' && lines[i-1]?.trim() !== '') {
          // Append to existing paragraph with a space
          result[result.length - 1].content += ' ' + trimmedLine;
        } else {
          // Create new paragraph
          result.push({
            type: 'p',
            content: trimmedLine,
            key: key++,
          });
        }
      }
    }

    // If we have a list in progress at the end, add it
    if (currentList.length > 0) {
      result.push({
        type: listType,
        items: [...currentList],
        key: key++,
      });
    }

    return result;
  } catch (error) {
    console.error("Error rendering markdown:", error);
    return [{ type: 'p', content: "Error rendering content", key: 0 }];
  }
}

/**
 * For components that need to directly access MDX files (legacy support)
 */
export function getMdxFiles(dir: string): string[] {
  // Simplified version for browser
  return [];
}

/**
 * For components that need to directly access MDX content (legacy support)
 */
export function getMdxContent(filePath: string) {
  // Simplified version for browser
  return {
    frontmatter: {},
    content: "",
    slug: ""
  };
}
