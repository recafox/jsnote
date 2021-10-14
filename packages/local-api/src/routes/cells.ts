import express from 'express';
import { promises as fs } from 'fs';
import path from 'path';

interface Cell {
  id: string;
  content: string;
  type: 'text' | 'code';
}

/**
 * 
 [{"id":"00fkq","type":"text","content":"# JSNote\n\nThis is an interactive coding environment. A small tool for you to write notes about React and more!\n\n## How to Use?\n- Click any text cell (**including this one**) to edit it\n- The code in each code editor is all joined together into one single file\n- You can use a special method \"show\" to show any React component, string, number, or any HTML element\n- Re-order or delete cells using the buttons on the top right panel\n- Add new cell by clicking on the buttons on the divider between each cell\n\n\nEnjoy!!"},{"id":"t6bch","type":"code","content":"const SayHello = () => {\r\n  return (\r\n    <div>\r\n      <h1>Hi!!</h1>\r\n      <h2>Show me what u goooooot</h2>\r\n    </div>\r\n  )\r\n}\r\n\r\nshow(<SayHello/>);"}]
 */

function convertJSONtoText(json: string): string {
  const text = JSON.parse(json);
  const result = '';
  return '';
}

export const createCellsRouter = (filename: string, dir: string) => {
  const router = express.Router();
  router.use(express.json());

  const fullPath = path.join(dir, filename);

  router.get('/cells', async (req, res) => {
    try {
      // Read the file
      let result = await fs.readFile(fullPath, { encoding: 'utf-8' });
      res.send(JSON.parse(result));
    } catch (err: any) {
      if (err.code === 'ENOENT') {
        const defaultText = [
          {
            id: '00fkq',
            type: 'text',
            content:
              '# JSNote\n\nThis is an interactive coding environment. A small tool for you to write notes about React and more!\n\n## How to Use?\n- Click any text cell (**including this one**) to edit it\n- The code in each code editor is all joined together into one single file\n- You can use a special method "show" to show any React component, string, number, or any HTML element\n- Re-order or delete cells using the buttons on the top right panel\n- Add new cell by clicking on the buttons on the divider between each cell\n\n\nEnjoy!',
          },
          {
            id: 't6bch',
            type: 'code',
            content:
              'const SayHello = () => {\r\n  return (\r\n    <div>\r\n      <h1>Hi!!</h1>\r\n      <h2>Show me what u goooooot</h2>\r\n    </div>\r\n  )\r\n}\r\n\r\nshow(<SayHello/>);',
          },
        ];
        await fs.writeFile(fullPath, JSON.stringify(defaultText), 'utf-8');
        let result = await fs.readFile(fullPath, { encoding: 'utf-8' });
        console.log('result is ', result);
        res.send(JSON.parse(result));
      } else {
        throw err;
      }
    }
  });

  router.post('/cells', async (req, res) => {
    // Take the list of cells from the request obj
    // serialize them
    const { cells }: { cells: Cell[] } = req.body;
    // Write the cells into the file
    await fs.writeFile(fullPath, JSON.stringify(cells), 'utf-8');

    res.send({ status: 'ok' });
  });

  return router;
};
