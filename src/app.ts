import express, { Application, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import globalErrorhandlata from './app/madelware/globalErrorhandaler';
import notFound from './app/madelware/notfound';
import router from './app/route';
// const port = 3000;

app.use(express.json());
app.use(cors());

app.use('/api/v1', router);

// error handel
app.use(globalErrorhandlata);

const test = async (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
  Promise.reject();
};
app.use('/', test);
//not found
app.use(notFound);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
