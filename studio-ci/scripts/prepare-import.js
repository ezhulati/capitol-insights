/**
 * Script to prepare content for Sanity import by converting MDX files to Sanity-compatible JSON
 */
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const slugify = require('slugify');

// Output directory for the generated JSON files
const outputDir = path.join(__dirname, '../import-data');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Content directories
const contentDirs = {
  posts: path.join(__dirname, '../../content/posts'),
  team: path.join(__dirname, '../../content/team'),
  services: path.join(__dirname, '../../content/services'),
  home: path.join(__dirname, '../../content/home'),
  approach: path.join(__dirname, '../../content/approach'),
  results: path.join(__dirname, '../../content/results'),
  contact: path.join(__dirname, '../../content/contact'),
};

// Function to convert markdown content to Sanity block content
function markdownToBlocks(markdown) {
  return [
    {
      _type: 'block',
      style: 'normal',
      markDefs: [],
      children: [
        {
          _type: 'span',
          text: markdown,
          marks: []
        }
      ]
    }
  ];
}

// Function to create a slug
function createSlug(title) {
  return slugify(title, { lower: true, strict: true });
}

// Function to write a document to a JSON file
function writeDocumentToFile(document, type, slug) {
  const filename = `${type}-${slug}.json`;
  const filePath = path.join(outputDir, filename);
  
  fs.writeFileSync(filePath, JSON.stringify(document, null, 2));
  console.log(`✓ Generated: ${filename}`);
}

// Process posts
function processPosts() {
  console.log('\nProcessing posts...');
  const postsDir = contentDirs.posts;
  
  if (!fs.existsSync(postsDir)) {
    console.log('Posts directory not found');
    return;
  }
  
  const files = fs.readdirSync(postsDir);
  let processed = 0;
  
  for (const file of files) {
    if (!file.endsWith('.md') && !file.endsWith('.mdx')) continue;
    
    const filePath = path.join(postsDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const { data, content: markdown } = matter(content);
    
    const slug = file.replace(/\.(md|mdx)$/, '');
    
    // Create Sanity document
    const post = {
      _type: 'post',
      title: data.title || 'Untitled Post',
      slug: {
        _type: 'slug',
        current: slug
      },
      publishedAt: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
      excerpt: data.excerpt || '',
      categories: Array.isArray(data.tags) ? data.tags : [],
      body: markdownToBlocks(markdown)
    };
    
    writeDocumentToFile(post, 'post', slug);
    processed++;
  }
  
  console.log(`Processed ${processed} posts`);
}

// Process team members
function processTeam() {
  console.log('\nProcessing team members...');
  const teamDir = contentDirs.team;
  
  if (!fs.existsSync(teamDir)) {
    console.log('Team directory not found');
    return;
  }
  
  // Check for explicit team member files
  const memberFiles = fs.readdirSync(teamDir)
    .filter(file => file !== 'index.mdx' && (file.endsWith('.md') || file.endsWith('.mdx')));
  
  let processed = 0;
  
  // Process individual member files if they exist
  if (memberFiles.length > 0) {
    for (const file of memberFiles) {
      const filePath = path.join(teamDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      const { data, content: markdown } = matter(content);
      
      const slug = file.replace(/\.(md|mdx)$/, '');
      
      const teamMember = {
        _type: 'teamMember',
        name: data.name || data.title || 'Team Member',
        slug: {
          _type: 'slug',
          current: slug
        },
        position: data.position || '',
        bio: markdownToBlocks(markdown),
        order: data.order || processed + 1
      };
      
      writeDocumentToFile(teamMember, 'teamMember', slug);
      processed++;
    }
  } else {
    // Check index.mdx for team members array
    const indexPath = path.join(teamDir, 'index.mdx');
    if (fs.existsSync(indexPath)) {
      const content = fs.readFileSync(indexPath, 'utf8');
      const { data } = matter(content);
      
      if (data.teamMembers && Array.isArray(data.teamMembers)) {
        data.teamMembers.forEach((member, index) => {
          const slug = createSlug(member.name);
          
          const teamMember = {
            _type: 'teamMember',
            name: member.name,
            slug: {
              _type: 'slug',
              current: slug
            },
            position: member.position || '',
            bio: markdownToBlocks(member.bio || ''),
            order: index + 1
          };
          
          writeDocumentToFile(teamMember, 'teamMember', slug);
          processed++;
        });
      }
    }
  }
  
  // If no team members were found, create a sample
  if (processed === 0) {
    console.log('No team members found, creating sample.');
    
    const teamMember = {
      _type: 'teamMember',
      name: 'Sample Team Member',
      slug: {
        _type: 'slug',
        current: 'sample-team-member'
      },
      position: 'Position Title',
      bio: markdownToBlocks('Sample biography text.'),
      order: 1
    };
    
    writeDocumentToFile(teamMember, 'teamMember', 'sample-team-member');
    processed = 1;
  }
  
  console.log(`Processed ${processed} team members`);
}

// Process services
function processServices() {
  console.log('\nProcessing services...');
  const servicesDir = contentDirs.services;
  
  if (!fs.existsSync(servicesDir)) {
    console.log('Services directory not found');
    return;
  }
  
  const indexPath = path.join(servicesDir, 'index.mdx');
  if (!fs.existsSync(indexPath)) {
    console.log('Services index file not found');
    return;
  }
  
  const content = fs.readFileSync(indexPath, 'utf8');
  const { data, content: markdown } = matter(content);
  
  let processed = 0;
  
  // If services array exists, process each service
  if (data.services && Array.isArray(data.services)) {
    data.services.forEach((service, index) => {
      const slug = createSlug(service.title);
      
      const serviceDoc = {
        _type: 'service',
        title: service.title,
        slug: {
          _type: 'slug',
          current: slug
        },
        description: service.description || '',
        content: markdownToBlocks(service.content || ''),
        order: index + 1
      };
      
      writeDocumentToFile(serviceDoc, 'service', slug);
      processed++;
    });
  } else {
    // Create a default service from the content
    const serviceDoc = {
      _type: 'service',
      title: data.title || 'Services',
      slug: {
        _type: 'slug',
        current: 'services'
      },
      description: data.description || '',
      content: markdownToBlocks(markdown),
      order: 1
    };
    
    writeDocumentToFile(serviceDoc, 'service', 'services');
    processed = 1;
  }
  
  console.log(`Processed ${processed} services`);
}

// Process pages
function processPages() {
  console.log('\nProcessing pages...');
  
  const pageDirs = {
    home: contentDirs.home,
    approach: contentDirs.approach,
    results: contentDirs.results,
    contact: contentDirs.contact
  };
  
  let processed = 0;
  
  for (const [pageName, pageDir] of Object.entries(pageDirs)) {
    if (!fs.existsSync(pageDir)) {
      console.log(`${pageName} directory not found`);
      continue;
    }
    
    const indexPath = path.join(pageDir, 'index.mdx');
    if (!fs.existsSync(indexPath)) {
      console.log(`${pageName} index file not found`);
      continue;
    }
    
    const content = fs.readFileSync(indexPath, 'utf8');
    const { data, content: markdown } = matter(content);
    
    const page = {
      _type: 'page',
      title: data.title || pageName.charAt(0).toUpperCase() + pageName.slice(1),
      slug: {
        _type: 'slug',
        current: pageName
      },
      description: data.metaDescription || '',
      content: markdownToBlocks(markdown),
      showInNavigation: true,
      navigationOrder: data.navigationOrder || processed + 1
    };
    
    writeDocumentToFile(page, 'page', pageName);
    processed++;
  }
  
  console.log(`Processed ${processed} pages`);
}

// Run all processing functions
function processAllContent() {
  console.log('Starting content preparation for Sanity import...');
  processPosts();
  processTeam();
  processServices();
  processPages();
  console.log('\nContent preparation completed!');
  console.log(`Output directory: ${outputDir}`);
  console.log('\nTo import this content into Sanity:');
  console.log('1. Log in to Sanity Studio at http://localhost:3333');
  console.log('2. Use the Studio interface to create content based on the generated JSON files');
}

// Run the process
processAllContent();
