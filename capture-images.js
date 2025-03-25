import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  
  // Set viewport size
  await page.setViewport({ width: 1200, height: 800 });
  
  // Navigate to the team page
  await page.goto('https://capitol-insights.com/team/');
  
  // Wait for images to load
  await page.waitForSelector('img', { timeout: 5000 }).catch(() => console.log('Timeout waiting for images'));
  
  // Scroll down to see the team members
  await page.evaluate(() => {
    window.scrollBy(0, 500);
  });
  
  // Wait a bit for scrolling to complete
  await new Promise(r => setTimeout(r, 1000));
  
  // Take screenshot of Drew Campbell's image
  const drewRect = await page.evaluate(() => {
    const images = Array.from(document.querySelectorAll('img'));
    const img = images.find(img => img.src && img.src.includes('drew-campbell-thumb.jpg'));
    if (!img) return null;
    
    const rect = img.getBoundingClientRect();
    return {
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: rect.height
    };
  });
  
  if (drewRect) {
    await page.screenshot({ path: 'public/uploads/team/drew-campbell.jpg', clip: drewRect });
    console.log('Drew Campbell image saved');
  } else {
    console.log('Could not find Drew Campbell image');
  }
  
  // Take screenshot of Byron Campbell's image
  const byronRect = await page.evaluate(() => {
    const images = Array.from(document.querySelectorAll('img'));
    const img = images.find(img => img.src && img.src.includes('byron-campbell-thumb.jpg'));
    if (!img) return null;
    
    const rect = img.getBoundingClientRect();
    return {
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: rect.height
    };
  });
  
  if (byronRect) {
    await page.screenshot({ path: 'public/uploads/team/byron-campbell.jpg', clip: byronRect });
    console.log('Byron Campbell image saved');
  } else {
    console.log('Could not find Byron Campbell image');
  }
  
  await browser.close();
})();
