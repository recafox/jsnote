import express from 'express';
import { promises as fs } from 'fs';
import path from 'path';

export const downloadRouter = (filename: string, dir: string) => {
  const router = express.Router();
  const fullPath = path.join(dir, filename);
  router.get('/download', async (req, res) => {
    try {
      res.download(fullPath);
    } catch (error) {}
  });
  return router;
};
