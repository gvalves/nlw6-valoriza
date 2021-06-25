import fs from 'fs';
import { config } from 'dotenv';
import { Command } from 'commander';
import chalk from 'chalk';

import { databasePath } from '../constants';

config();

type PlatformType = 'wsl' | 'windows';

const { WINDOWS_DATABASE_PATH } = process.env;

const logger = {
  warn(msg: string): void {
    console.log(`[${chalk.yellow('WARNING')}] ${msg}`);
  },
  error(msg: string): void {
    console.log(`[${chalk.red('ERROR')}] ${msg}`);
  },
};

const syncWslAndWinDatabaseWhenUsingWsl = (): void => {
  syncWslAndWinDatabaseWhenUsingWslBy('wsl');
};

const syncWslAndWinDatabaseWhenUsingWslBy = (platform: PlatformType): void => {
  if (!isUsingWsl()) {
    return;
  }
  syncWslAndWinDatabase(platform);
};

const isUsingWsl = (): boolean => {
  if (process.platform !== 'linux') {
    return false;
  }
  return fs.existsSync('/mnt/c/Windows/System32/wsl.exe');
};

const syncWslAndWinDatabase = (sourcePlatform: PlatformType): void => {
  const wslDatabasePath = databasePath;
  const windowsDatabasePath = getWindowsDatabasePath();

  if (!WINDOWS_DATABASE_PATH) {
    logger.warn(
      `If your windows database isn't in ${windowsDatabasePath} you must set WINDOWS_DATABASE_PATH in .env file`
    );
  }

  if (!fs.existsSync(windowsDatabasePath)) {
    logger.error(`Folder ${windowsDatabasePath} doesn't exists`);
    logger.error('Cannot update database for beekeeper');
  }

  if (sourcePlatform === 'wsl') {
    fs.copyFileSync(wslDatabasePath, windowsDatabasePath);
  } else if (sourcePlatform === 'windows') {
    fs.copyFileSync(windowsDatabasePath, wslDatabasePath);
  }
};

const getWindowsDatabasePath = (): string => {
  const defaultPath = databasePath.replace(/^\/home/, '/mnt/c/Users');
  const defaultDir = defaultPath.replace(/\/(?!.*\/).+$/, '');
  return defaultPath.replace(defaultDir, WINDOWS_DATABASE_PATH ?? defaultDir);
};

const runWhenIsMain = () => {
  if (require.main !== module) return;

  const cli = new Command();
  cli.option(
    '-s, --sync-wsl-and-windows-db-by <source>',
    'Sync WSL and Windows databases using one of them as source',
    'wsl'
  );

  cli.parse(process.argv);

  const options = cli.opts();
  const sourcePlatform: PlatformType = options.syncWslAndWindowsDbBy;

  if (isValidPlatform(sourcePlatform)) {
    syncWslAndWinDatabaseWhenUsingWslBy(sourcePlatform);
  }
};

const isValidPlatform = (platform: PlatformType) => platform === 'windows' || platform === 'wsl';

runWhenIsMain();

export { syncWslAndWinDatabaseWhenUsingWsl };
