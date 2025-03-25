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
  
  // Take screenshot of the entire page
  await page.screenshot({ path: 'public/uploads/team/team-page.png' });
  console.log('Team page screenshot saved');
  
  await browser.close();
})();
