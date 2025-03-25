const puppeteer = require('puppeteer');

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
  const drewElement = await page.evaluate(() => {
    const images = Array.from(document.querySelectorAll('img'));
    return images.find(img => img.alt && img.alt.includes('Drew'));
  });
  
  if (drewElement) {
    await page.screenshot({ path: 'public/uploads/team/drew-campbell.jpg', clip: drewElement.getBoundingClientRect() });
    console.log('Drew Campbell image saved');
  } else {
    console.log('Could not find Drew Campbell image');
  }
  
  // Take screenshot of Byron Campbell's image
  const byronElement = await page.evaluate(() => {
    const images = Array.from(document.querySelectorAll('img'));
    return images.find(img => img.alt && img.alt.includes('Byron'));
  });
  
  if (byronElement) {
    await page.screenshot({ path: 'public/uploads/team/byron-campbell.jpg', clip: byronElement.getBoundingClientRect() });
    console.log('Byron Campbell image saved');
  } else {
    console.log('Could not find Byron Campbell image');
  }
  
  await browser.close();
})();
