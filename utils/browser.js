import 'selenium-extensions';
import fs from 'fs';
import path from 'path';
import {Builder, Browser} from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import chromedriver from 'chromedriver';
import Xvfb from 'xvfb';

const xvfb = new Xvfb();

export const useBrowser = async (callback, params = {}) => {
  const {withXvfb = true} = params;

  withXvfb && xvfb.startSync();

  const options = new chrome.Options();
  const extentions = await getExtentions();
    
  options.addExtensions(fs.readFileSync(extentions[0], 'base64'));
  //options.addArguments("start-maximized");
  options.addArguments("disable-infobars");
  options.addArguments("--disable-gpu");
  options.addArguments("--disable-dev-shm-usage");
  options.addArguments("--no-sandbox");
  options.addArguments("--remote-debugging-port=4444");
  
  chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());

  const driver = new Builder().forBrowser(Browser.CHROME).withCapabilities(options).build();

  let result = null;

  try {
    result = await callback(driver);
  } finally {
    await driver.quit();
    withXvfb && xvfb.stopSync();
  }

  return result;
}

export const getExtentions = () => {
  const extentionFolder = 'extentions';

  return new Promise((resolve, reject) => {
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