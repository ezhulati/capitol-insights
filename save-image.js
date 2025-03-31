const fs = require('fs');
const https = require('https');

const imageUrl = 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1200&q=80';
const imagePath = 'public/uploads/posts/transportation-funding.jpg';

https.get(imageUrl, (res) => {
  if (res.statusCode === 200) {
    const file = fs.createWriteStream(imagePath);
    res.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log(`Image downloaded successfully: ${imagePath}`);
    });
  } else {
    console.error(`Failed to download image. Status code: ${res.statusCode}`);
  }
}).on('error', (err) => {
  console.error(`Error: ${err.message}`);
});
