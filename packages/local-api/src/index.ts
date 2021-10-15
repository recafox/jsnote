import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import path from 'path';
import { createCellsRouter } from './routes/cells';
import { downloadRouter } from './routes/download';

export const serve = (
  port: number,
  filename: string,
  dir: string,
  useProxy: boolean
) => {
  const app = express();
  app.use(createCellsRouter(filename, dir));
  app.use(downloadRouter(filename, dir));
  if (useProxy) {
    app.use(
      createProxyMiddleware({
        target: 'http://localhost:3000',
        ws: true, // web socket
        logLevel: 'silent', // turn off log from middleware
      })
    );
  } else {
    // search in node_modules
    const packagePath = require.resolve(
      '@jsnote-2g0jy/local-client/build/index.html'
    );
    // serve static files (our react app) from this folder in absolute path
    app.use(express.static(path.dirname(packagePath)));
  }

  // express opens port asynchronously
  // use promise so we can do some error handling
  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve).on('error', reject);
  });
};
