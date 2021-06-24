import fs from 'fs';
import { config } from 'dotenv';

import { isUsingWsl } from '../../config/wsl';
import { database } from '../../constants';

config();

const syncWslAndWindowsDatabases = () => {
  if (process.platform !== 'linux' || !isUsingWsl) {
    return;
  }

  const src = database;
  const dest = database.replace(/^\/home/, '/mnt/c/Users');
  const destDir = dest.replace(/\/(?!.*\/).+$/, '');
  const finalDestDir = process.env.WINDOWS_DATABASE_PATH ?? destDir;

  if (!fs.existsSync(finalDestDir)) {
    console.error(`Folder ${finalDestDir} not exists`);
    console.error('Cannot update database for beekeeper');
    return;
  }

  fs.copyFileSync(src, dest.replace(destDir, finalDestDir));
};

const SyncWslAndWindowsDatabases = (
  // eslint-disable-next-line
  target: any,
  // eslint-disable-next-line
  key: string,
  // eslint-disable-next-line
  descriptor: PropertyDescriptor,
): void => {
  syncWslAndWindowsDatabases();
};

if (process.argv.includes('--sync-wsl-and-windows-databases')) {
  syncWslAndWindowsDatabases();
}

export { syncWslAndWindowsDatabases, SyncWslAndWindowsDatabases };
