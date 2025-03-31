const fs = require('fs');
const axios = require('axios');
const path = require('path');

async function downloadImage(url, outputPath) {
  try {
    // Create directory if it doesn't exist
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // Download image
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream'
    });
    
    // Save to file
    const writer = fs.createWriteStream(outputPath);
    response.data.pipe(writer);
    
    return new Promise((resolve, reject) => {
      writer.on('finish', () => {
        console.log(`Image downloaded successfully to ${outputPath}`);
        resolve();
      });
      writer.on('error', reject);
    });
  } catch (error) {
    console.error(`Error downloading image: ${error.message}`);
  }
}

// Download transportation image
downloadImage(
  'https://images.pexels.com/photos/2569/highway-road-travel-fog.jpg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=1',
  'public/uploads/posts/transportation-funding.jpg'
);

// Download municipal advocacy image - more appropriate city council/government building
downloadImage(
  'https://images.pexels.com/photos/1652561/pexels-photo-1652561.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=1',
  'public/uploads/posts/municipal-advocacy.jpg'
);
