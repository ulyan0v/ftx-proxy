import fs from 'fs';

export const retry = async (callback, count = 1) => {
  try {
    return await callback();
  } catch (error) {
    if (count > 1) return await retry(callback, count - 1);
    else throw error;
  }
}

export const checkOrCreateFile = path => {
  try {
    const stat = fs.statSync(path);
    if (!stat.isFile()) throw new Error();
  } catch {
    fs.writeFileSync(path, '');
  }
}

export const checkOrCreateDir = path => {
  try {
    const stat = fs.statSync(path);
    if (!stat.isDirectory()) throw new Error();
  } catch {
    fs.mkdirSync(path);
  }
}

export const isNotEmptyObject = obj => {
  return Boolean(Object.keys(obj || {}).length);
}