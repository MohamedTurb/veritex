import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';

const baseUrl = process.env.BASE_URL || 'http://localhost:5173';

const options = new chrome.Options();
options.addArguments('--headless=new');
options.addArguments('--disable-gpu');
options.addArguments('--window-size=1400,900');

let driver;

try {
  driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

  await driver.get(baseUrl);
  await driver.wait(until.elementLocated(By.xpath("//*[contains(., 'Shop by Category')]")), 10000);

  const shopLink = await driver.findElement(By.linkText('Shop'));
  await shopLink.click();

  await driver.wait(until.urlContains('/shop'), 10000);
  await driver.wait(until.elementLocated(By.xpath("//*[self::h1 or self::h2][contains(., 'Shop')]")), 10000);

  console.log('Selenium smoke test passed.');
} catch (error) {
  console.error('Selenium smoke test failed.');
  console.error(error);
  process.exitCode = 1;
} finally {
  if (driver) {
    await driver.quit();
  }
}
