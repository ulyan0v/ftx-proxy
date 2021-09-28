import fs from 'fs';
import path from 'path';
import {By, Builder, Browser} from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import chromedriver from 'chromedriver';
import Xvfb from 'xvfb';
import 'selenium-extensions';

const xvfb = new Xvfb();

const getExtentions = () => {
  const extentionFolder = 'extentions';

  return new Promise((resolve, reject) => {
    console.log(process.cwd());
    
    fs.readdir(path.join(process.cwd(), extentionFolder), (error, files) => {
      if (error) reject(error);

      const extentionPaths = files.filter(fileName => {
        const splitedFileName = fileName.split('.');
        const fileType = splitedFileName[splitedFileName.length - 1];

        return fileType === 'crx';
      }).map(file => path.join(process.cwd(), extentionFolder, file));

      extentionPaths.length ? resolve(extentionPaths) : reject(new Error('Extentions not found'));      
    });
  });
}

export const startBrowser = async () => {
  xvfb.startSync();

  const options = new chrome.Options();
    const extentions = await getExtentions();
    
    options.addExtensions(fs.readFileSync(extentions[0], 'base64'));
  
    chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());

    const driver = new Builder().forBrowser(Browser.CHROME).withCapabilities(options).build();

    await driver.get('chrome-extension://ibnejdfjmmkpcnlpebklmnkoeoihofec/packages/popup/build/index.html');

    const testEl = await driver.findElement(By.id('root'));

    const text = await testEl.getText()

    driver.quit();
    xvfb.stopSync();
    return text;
}