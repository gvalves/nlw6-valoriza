import fs from 'fs';
import path from 'path';

export const root = path.join(__dirname, '..');
export const database = `${root}/src/database/database.sqlite`;

export const isUsingWsl = (): boolean => {
  if (process.platform !== 'linux') {
    return false;
  }
  return fs.existsSync('/mnt/c/Windows');
};
