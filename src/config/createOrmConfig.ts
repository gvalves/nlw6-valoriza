import { ConnectionOptions } from 'typeorm';
import fs from 'fs';
import { rootPath, databasePath } from '../constants';

const config: ConnectionOptions = {
  type: 'sqlite',
  database: databasePath,
  migrations: [`${rootPath}/src/database/migrations/*.ts`],
  entities: [`${rootPath}/src/entities/*.ts`],
  cli: {
    migrationsDir: `${rootPath}/src/database/migrations`,
    entitiesDir: `${rootPath}/src/entities`,
  },
};

fs.writeFileSync(`${rootPath}/ormconfig.json`, JSON.stringify(config, null, 4));
