import fs from 'fs';
import path from 'path';
import {checkOrCreateDir, checkOrCreateFile} from './other.js';

const logDir = path.join(process.cwd(), 'log');

checkOrCreateDir(logDir);

export const logInFile = (folder, text) => {
  const fileName = new Date().toLocaleDateString() + '.txt';

  checkOrCreateDir(path.join(logDir, folder));
  checkOrCreateFile(path.join(logDir, folder, fileName));

  fs.appendFileSync(path.join(logDir, folder, fileName), text + '\n');
}