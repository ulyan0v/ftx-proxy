import 'selenium-extensions';
import fs from 'fs';
import path from 'path';
import {By, Builder, Browser} from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import chromedriver from 'chromedriver';
import {getExtentions} from './utils.js';
//import Xvfb from 'xvfb';

//const xvfb = new Xvfb();

export const startBrowser = async () => {
  //xvfb.startSync();

  const options = new chrome.Options();
    const extentions = await getExtentions();
    
    options.addExtensions(fs.readFileSync(extentions[0], 'base64'));
    options.addArguments("start-maximized");
    options.addArguments("disable-infobars");
    options.addArguments("--disable-gpu");
    options.addArguments("--disable-dev-shm-usage");
    options.addArguments("--no-sandbox");
    options.addArguments("--remote-debugging-port=4444");
  
    chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());

    const driver = new Builder().forBrowser(Browser.CHROME).withCapabilities(options).build();

    await driver.get('chrome-extension://ibnejdfjmmkpcnlpebklmnkoeoihofec/packages/popup/build/index.html');

    const testEl = await driver.findElement(By.id('root'));

    const text = await testEl.getText()

    driver.quit();
    //xvfb.stopSync();
    return text;
}