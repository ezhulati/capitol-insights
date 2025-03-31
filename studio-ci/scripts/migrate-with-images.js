/**
 * Script to import existing content from MDX files into Sanity with proper image handling
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

// Function to create a slug
function createSlug(title) {
  return slugify(title, { lower: true, strict: true });
}

// Generate a document ID based on type and slug
function generateDocId(type, slug) {
  return `${type}.${slug}`;
}

// Helper function to check if a file exists
function fileExists(filePath) {
  try {
    return fs.existsSync(filePath);
  } catch (err) {
    return false;
  }
}

// Function to upload an image to Sanity
async function uploadImage(imagePath, altText = '') {
  try {
    if (!fileExists(imagePath)) {
      console.log(`Image not found: ${imagePath}`);
      return null;
    }

    // Read image file
    const imageBuffer = fs.readFileSync(imagePath);
    
    // Upload image to Sanity
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: path.basename(imagePath),
      title: altText || path.basename(imagePath, path.extname(imagePath))
    });
    
    console.log(`✓ Uploaded image: ${path.basename(imagePath)}`);
    
    // Return a reference to the uploaded image
    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id
      }
    };
  } catch (error) {
    console.error(`Error uploading image ${imagePath}:`, error.message);
    return null;
  }
}

// Function to create a basic block from markdown
function markdownToBasicBlock(markdown) {
  return [
    {
      _type: 'block',
      style: 'normal',
      markDefs: [],
      children: [
        {
          _type: 'span',
          text: markdown || '',
          marks: []
        }
      ]
    }
  ];
}

// Import posts
async function importPosts() {
  console.log('\nImporting posts...');
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
    
    const slug = file.replace(/\.(md|mdx)$/, '');
    
    // Check for featured image
    let featuredImage = null;
    if (data.image && data.image.startsWith('/')) {
      const imagePath = path.join(__dirname, '../../public', data.image);
      featuredImage = await uploadImage(imagePath, data.title);
    } else {
      // Try to find the image in a standard location
      const possibleImagePath = path.join(__dirname, '../../public/uploads/posts', `${slug}.jpg`);
      if (fileExists(possibleImagePath)) {
        featuredImage = await uploadImage(possibleImagePath, data.title);
      }
    }
    
    // Create Sanity document
    try {
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
        categories: Array.isArray(data.tags) ? data.tags : [],
        body: markdownToBasicBlock(markdown),
      };
      
      // Add featured image if available
      if (featuredImage) {
        post.featuredImage = featuredImage;
      }
      
      const result = await client.createOrReplace(post);
      console.log(`✓ Imported post: ${result.title}`);
    } catch (error) {
      console.error(`Error importing post ${file}:`, error.message);
    }
  }
}

// Import team members
async function importTeam() {
  console.log('\nImporting team members...');
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
        // Convert filename to name (e.g., "byron-campbell.jpg" to "Byron Campbell")
        let name = file.replace('.jpg', '').replace(/-/g, ' ');
        // Capitalize each word
        name = name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        
        const slug = file.replace('.jpg', '').toLowerCase();
        const imagePath = path.join(teamUploadsDir, file);
        
        // Upload the image
        const image = await uploadImage(imagePath, name);
        
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
            bio: markdownToBasicBlock('Team member bio.'),
            order: 1
          };
          
          // Add image if available
          if (image) {
            teamMember.image = image;
          }
          
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
    const slug = createSlug(member.name);
    
    // Look for member image
    let image = null;
    const possibleImagePath = path.join(__dirname, '../../public/uploads/team', `${slug}.jpg`);
    if (fileExists(possibleImagePath)) {
      image = await uploadImage(possibleImagePath, member.name);
    }
    
    try {
      const teamMember = {
        _id: generateDocId('teamMember', slug),
        _type: 'teamMember',
        name: member.name,
        slug: {
          _type: 'slug',
          current: slug
        },
        position: member.position || '',
        bio: markdownToBasicBlock(member.bio || ''),
        order: i + 1
      };
      
      // Add image if available
      if (image) {
        teamMember.image = image;
      }
      
      const result = await client.createOrReplace(teamMember);
      console.log(`✓ Imported team member: ${result.name}`);
    } catch (error) {
      console.error(`Error importing team member ${member.name}:`, error.message);
    }
  }
}

// Import services
async function importServices() {
  console.log('\nImporting services...');
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
    const slug = createSlug(service.title);
    
    // Look for service icon
    let icon = null;
    const possibleIconPath = path.join(__dirname, '../../public/images/services', `${slug}.svg`);
    if (fileExists(possibleIconPath)) {
      icon = await uploadImage(possibleIconPath, service.title);
    }
    
    try {
      const serviceDoc = {
        _id: generateDocId('service', slug),
        _type: 'service',
        title: service.title,
        slug: {
          _type: 'slug',
          current: slug
        },
        description: service.description || '',
        content: markdownToBasicBlock(service.content || ''),
        order: i + 1
      };
      
      // Add icon if available
      if (icon) {
        serviceDoc.icon = icon;
      }
      
      const result = await client.createOrReplace(serviceDoc);
      console.log(`✓ Imported service: ${result.title}`);
    } catch (error) {
      console.error(`Error importing service ${service.title}:`, error.message);
    }
  }
}

// Import pages
async function importPages() {
  console.log('\nImporting pages...');
  
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
    
    // Look for page image
    let featuredImage = null;
    if (data.image && data.image.startsWith('/')) {
      const imagePath = path.join(__dirname, '../../public', data.image);
      featuredImage = await uploadImage(imagePath, data.title);
    } else {
      // Try standard locations
      const possibleImagePaths = [
        path.join(__dirname, '../../public/images', `${pageName}.jpg`),
        path.join(__dirname, '../../public/images', `${pageName}-hero.jpg`),
        path.join(__dirname, '../../public/images', `${pageName}-background.jpg`)
      ];
      
      for (const imgPath of possibleImagePaths) {
        if (fileExists(imgPath)) {
          featuredImage = await uploadImage(imgPath, data.title || pageName);
          break;
        }
      }
    }
    
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
        content: markdownToBasicBlock(markdown),
        showInNavigation: true,
        navigationOrder: data.navigationOrder || 0
      };
      
      // Add featured image if available
      if (featuredImage) {
        page.featuredImage = featuredImage;
      }
      
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
    console.log('Starting content migration with image support...');
    await importPosts();
    await importTeam();
    await importServices();
    await importPages();
    console.log('\nContent migration completed!');
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
