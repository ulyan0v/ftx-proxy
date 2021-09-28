import fs from 'fs';
import path from 'path';

export const getExtentions = () => {
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