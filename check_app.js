const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    
    // Listen for console messages
    page.on('console', msg => {
      console.log('CONSOLE:', msg.type(), msg.text());
    });
    
    // Listen for errors
    page.on('error', err => {
      console.log('ERROR:', err.message);
    });
    
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
    
    const title = await page.title();
    console.log('Page title:', title);
    
    const content = await page.content();
    console.log('Page loaded successfully');
    
    await browser.close();
  } catch (error) {
    console.error('Error:', error.message);
  }
})();
