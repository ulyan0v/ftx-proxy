import {useBrowser} from '../../utils/browser.js';
import {By, Key} from 'selenium-webdriver';
import * as uuid from 'uuid';

export const createTronWallet = () => {
  return useBrowser(driver => {
    return new Promise(async (resolve, reject) => {
      try {
        await driver.get('chrome-extension://ibnejdfjmmkpcnlpebklmnkoeoihofec/packages/popup/build/index.html');

        const login = uuid.v4();
        const password = uuid.v4();

        const inputs = await driver.findElements(By.tagName('input'));
        await Promise.all(inputs.map(async (input) => await input.sendKeys(password)));

        await (await driver.findElement(By.tagName('button'))).click();
        await (await driver.findElements(By.tagName('button')))[0].click();
        await (await driver.findElement(By.tagName('input'))).sendKeys(login);
        await (await driver.findElement(By.tagName('button'))).click();

        const mnemonicText = await Promise.all(
          (await driver.findElements(By.className('word'))).map(async (word) => await word.getText())
        );

        await (await driver.findElement(By.tagName('button'))).click();

        const confirmMnemonic = await driver.findElements(By.className('word'));
        const confirmMnemonicText = await Promise.all(confirmMnemonic.map(async (word) => await word.getText()));

        if (Array.from(new Set(confirmMnemonicText)).length !== confirmMnemonicText.length) reject();

        await Promise.all(mnemonicText.map(async (word) => {
          const index = confirmMnemonicText.findIndex(confirmWord => confirmWord === word);
          await confirmMnemonic[index].click();
        }));

        await (await driver.findElement(By.tagName('button'))).click();
        await driver.sleep(500);
        await (await driver.findElements(By.className('copy')))[1].click();

        await driver.executeScript(() => {
          Array.from(document.querySelectorAll('.menu')[0].querySelectorAll('.item'))[1].click();
        });

        const confirmPasswordInput = await driver.findElement(By.tagName('input'));
        await confirmPasswordInput.sendKeys(Key.CONTROL, 'v');

        const address = await confirmPasswordInput.getAttribute('value');

        await confirmPasswordInput.clear();
        await confirmPasswordInput.sendKeys(password);
        await (await driver.findElements(By.tagName('button')))[1].click();
        await (await driver.findElements(By.className('option')))[1].click();

        const privateKey = await (await driver.findElement(By.tagName('textarea'))).getAttribute('value');

        await (await driver.findElement(By.tagName('button'))).click();

        resolve({mnemonicText, login, password, address, privateKey});
      } catch {
        reject();
      }
    });
  });
}