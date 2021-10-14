import path from 'path';
import { Command } from 'commander';
import { serve } from '@jsnote-2g0jy/local-api';

// before publishing this cli to npm, we will using a script set this "NODE_ENV" to production
// After pubishing, this will always be true
// But as we are in development mode, this variable will not be assigned value
// So isProduction will be false
const isProduction = process.env.NODE_ENV === 'production';

export const serveCommand = new Command()
  .command('serve [filename]') // filename is optional
  .description('Open a file for editing')
  .option('-p, --port <number>', 'port to run server on', '4005') // default port is set to 4005
  .action(async (filename = 'notebook.js', options: { port: string }) => {
    try {
      const dir = path.join(process.cwd(), path.dirname(filename));
      await serve(
        parseInt(options.port),
        path.basename(filename),
        dir,
        !isProduction
      );
      // if is in development mode, pass in true to use proxy
      console.log(
        `Opened ${filename}. Navigate to http://localhost:${options.port} to edit the file.`
      );
    } catch (err: any) {
      if (err.code === 'EADDRINUSE') {
        console.error('Port is in use. Try running on a different port.');
      } else {
        console.log('Heres the problem ', err.message);
      }

      // if the program is unsuccessfully activated, force exit
      process.exit(1);
    }
  });

// <> => required
// [] => optional
