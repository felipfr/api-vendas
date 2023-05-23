import cors from 'cors';
import express from 'express';
import routes from './routes';

const app = express();

const hostname = 'localhost';
const port = 3333;

app.use(cors());
app.use(express.json());

app.use(routes);

app.listen(port, hostname, () => {
  console.log(
    '\x1b[33m%s\x1b[0m',
    `Server running on http://${hostname}:${port} 🥳`,
  );
});
