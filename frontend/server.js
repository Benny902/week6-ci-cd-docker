import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 4000;

app.use(express.static(__dirname));

app.listen(port, () => {
  console.log(`Frontend server running at http://localhost:${port}`);
});
