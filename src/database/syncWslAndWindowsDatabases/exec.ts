import { exec } from 'child_process';

const handleExec = (error: unknown, stdout: string, stderr: string): void => {
  if (error) {
    console.log(`error: ${(error as Error).message}`);
    return;
  }
  if (stderr) {
    console.log(`stderr: ${stderr}`);
    return;
  }
  console.log(`\n${stdout}\n`);
};

exec(`yarn ts-node-dev ${__dirname} --sync-wsl-and-windows-databases`, handleExec);
