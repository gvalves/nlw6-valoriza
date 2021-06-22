import fs from 'fs';

import { database } from '../constants';

const updateDatabase = (): void => {
  fs.copyFileSync(database, database.replace(/^\/home/, '/mnt/c/Users'));
};

export { updateDatabase };
