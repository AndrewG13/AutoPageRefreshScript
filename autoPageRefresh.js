// edits should only be made to the following lines ONLY

// *****************************************************************************
// MANDATORY FIELDS: these must be changed for program function
const url = 'https://www.your-url-here.com';
const userScript = `
  setTimeout(() => {

      // Here you will put your code to accomplish whatever you wish...

  }, 5000);
`;
// OPTIONAL FIELDS:  these can be changed or left alone
const browserPath = 'path/to/browser.exe'; // if using this, uncomment line 18
const windowWidth = 1920;
const windowHeight = 1080;
const pageRefreshTime = 600000; // time in milliseconds
// *****************************************************************************


const puppeteer = require('puppeteer');
var resfreshCount = 1;
(async () => {
  // Launch a new browser instance
  const browser = await puppeteer.launch({
    //executablePath: browserPath,
    headless: false
  });

  // Open a new page in the browser
  const page = await browser.newPage();

  // Set the viewport size
  await page.setViewport({ width: windowWidth, height: windowHeight });

  // Navigate to the page you want to refresh
  await page.goto(url);

  // Define the script you want to execute at the start of each page refresh
  const runtimeScript = userScript;

  // Schedule the function to be executed on the specified time schedule
  setInterval(async () => {
    // Refresh the page
    await page.reload({ waitUntil: 'networkidle2' });

    // log to the terminal number of successful page refreshes
    console.log("Page Refresh: " + resfreshCount);
    resfreshCount++;

    // Execute the custom script
    await page.evaluate(runtimeScript);
  }, pageRefreshTime);
})();
