/**
 * Script to import existing content from MDX files into Sanity
 */
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { createClient } = require('@sanity/client');
const slugify = require('slugify');

// Initialize Sanity client
const client = createClient({
  projectId: 'bowvx6js',
  dataset: 'production',
  token: process.env.SANITY_API_TOKEN, // Set this environment variable before running
  apiVersion: '2023-05-03',
  useCdn: false
});

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
  // A simple conversion - in production, you'd want to use a proper markdown parser
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

// Generate a document ID based on type and slug
function generateDocId(type, slug) {
  return `${type}.${slug}`;
}

// Import posts
async function importPosts() {
  console.log('Importing posts...');
  const postsDir = contentDirs.posts;
  
  if (!fs.existsSync(postsDir)) {
    console.log('Posts directory not found');
    return;
  }
  
  const files = fs.readdirSync(postsDir);
  
  for (const file of files) {
    if (!file.endsWith('.md') && !file.endsWith('.mdx')) continue;
    
    const filePath = path.join(postsDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const { data, content: markdown } = matter(content);
    
    // Create Sanity document
    try {
      const slug = file.replace(/\.(md|mdx)$/, '');
      const post = {
        _id: generateDocId('post', slug),
        _type: 'post',
        title: data.title || 'Untitled',
        slug: {
          _type: 'slug',
          current: slug
        },
        publishedAt: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
        excerpt: data.excerpt || '',
        categories: data.tags || [],
        body: markdownToBlocks(markdown)
      };
      
      const result = await client.createOrReplace(post);
      console.log(`✓ Imported post: ${result.title}`);
    } catch (error) {
      console.error(`Error importing post ${file}:`, error.message);
    }
  }
}

// Import team members
async function importTeam() {
  console.log('Importing team members...');
  const teamDir = contentDirs.team;
  
  if (!fs.existsSync(teamDir)) {
    console.log('Team directory not found');
    return;
  }
  
  // Get the index.mdx which might contain team members data
  const indexPath = path.join(teamDir, 'index.mdx');
  if (!fs.existsSync(indexPath)) {
    console.log('Team index file not found');
    return;
  }
  
  const content = fs.readFileSync(indexPath, 'utf8');
  const { data } = matter(content);
  
  // Assuming team members might be in the frontmatter as an array
  const teamMembers = data.teamMembers || [];
  
  if (teamMembers.length === 0) {
    // Try to find team members in public/uploads/team directory
    const teamUploadsDir = path.join(__dirname, '../../public/uploads/team');
    if (fs.existsSync(teamUploadsDir)) {
      const files = fs.readdirSync(teamUploadsDir);
      const jpgFiles = files.filter(file => file.endsWith('.jpg') && !file.includes('team-page'));
      
      for (const file of jpgFiles) {
        const name = file.replace('.jpg', '').replace(/-/g, ' ');
        const slug = file.replace('.jpg', '').toLowerCase();
        
        try {
          const teamMember = {
            _id: generateDocId('teamMember', slug),
            _type: 'teamMember',
            name: name,
            slug: {
              _type: 'slug',
              current: slug
            },
            position: 'Team Member',
            bio: markdownToBlocks('Team member bio.'),
            order: 1
          };
          
          const result = await client.createOrReplace(teamMember);
          console.log(`✓ Imported team member: ${result.name}`);
        } catch (error) {
          console.error(`Error importing team member ${name}:`, error.message);
        }
      }
    }
    return;
  }
  
  for (let i = 0; i < teamMembers.length; i++) {
    const member = teamMembers[i];
    
    try {
      const slug = createSlug(member.name);
      const teamMember = {
        _id: generateDocId('teamMember', slug),
        _type: 'teamMember',
        name: member.name,
        slug: {
          _type: 'slug',
          current: slug
        },
        position: member.position || '',
        bio: markdownToBlocks(member.bio || ''),
        order: i + 1
      };
      
      const result = await client.createOrReplace(teamMember);
      console.log(`✓ Imported team member: ${result.name}`);
    } catch (error) {
      console.error(`Error importing team member ${member.name}:`, error.message);
    }
  }
}

// Import services
async function importServices() {
  console.log('Importing services...');
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
  
  // Assuming services might be in the frontmatter as an array
  const services = data.services || [];
  
  for (let i = 0; i < services.length; i++) {
    const service = services[i];
    
    try {
      const slug = createSlug(service.title);
      const serviceDoc = {
        _id: generateDocId('service', slug),
        _type: 'service',
        title: service.title,
        slug: {
          _type: 'slug',
          current: slug
        },
        description: service.description || '',
        content: markdownToBlocks(service.content || ''),
        order: i + 1
      };
      
      const result = await client.createOrReplace(serviceDoc);
      console.log(`✓ Imported service: ${result.title}`);
    } catch (error) {
      console.error(`Error importing service ${service.title}:`, error.message);
    }
  }
}

// Import pages
async function importPages() {
  console.log('Importing pages...');
  
  const pageDirs = {
    home: contentDirs.home,
    approach: contentDirs.approach,
    results: contentDirs.results,
    contact: contentDirs.contact
  };
  
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
    
    try {
      const page = {
        _id: generateDocId('page', pageName),
        _type: 'page',
        title: data.title || pageName.charAt(0).toUpperCase() + pageName.slice(1),
        slug: {
          _type: 'slug',
          current: pageName
        },
        description: data.metaDescription || '',
        content: markdownToBlocks(markdown),
        showInNavigation: true,
        navigationOrder: data.navigationOrder || 0
      };
      
      const result = await client.createOrReplace(page);
      console.log(`✓ Imported page: ${result.title}`);
    } catch (error) {
      console.error(`Error importing page ${pageName}:`, error.message);
    }
  }
}

// Run all import functions
async function importAllContent() {
  try {
    await importPosts();
    await importTeam();
    await importServices();
    await importPages();
    console.log('Content import completed!');
  } catch (error) {
    console.error('Error importing content:', error);
  }
}

// Check if token is provided
if (!process.env.SANITY_API_TOKEN) {
  console.error('Please set the SANITY_API_TOKEN environment variable');
  process.exit(1);
}

// Run the import
importAllContent();
