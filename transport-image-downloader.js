const https = require('https');
const fs = require('fs');

// URL for a highway/transportation image
const url = 'https://images.pexels.com/photos/210291/pexels-photo-210291.jpeg?cs=srgb&dl=pexels-pixabay-210291.jpg&fm=jpg&w=1200&h=800';
const filePath = './public/uploads/posts/transportation-funding.jpg';

https.get(url, (res) => {
  if (res.statusCode !== 200) {
    console.error(`Failed to download image: Status code ${res.statusCode}`);
    return;
  }

  const fileStream = fs.createWriteStream(filePath);
  res.pipe(fileStream);

  fileStream.on('finish', () => {
    fileStream.close();
    console.log(`Image downloaded successfully to ${filePath}`);
  });
}).on('error', (err) => {
  console.error(`Error downloading image: ${err.message}`);
});
