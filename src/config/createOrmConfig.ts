import { ConnectionOptions } from 'typeorm';
import fs from 'fs';
import { root, database } from '../constants';

const config: ConnectionOptions = {
  type: 'sqlite',
  database,
  migrations: [`${root}/src/database/migrations/*.ts`],
  entities: [`${root}/src/entities/*.ts`],
  cli: {
    migrationsDir: `${root}/src/database/migrations`,
    entitiesDir: `${root}/src/entities`,
  },
};

fs.writeFileSync(`${root}/ormconfig.json`, JSON.stringify(config, null, 4));
