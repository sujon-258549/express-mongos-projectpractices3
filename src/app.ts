import express, { Application, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import globalErrorhandlata from './app/madelware/globalErrorhandaler';
import notFound from './app/madelware/notfound';
import router from './app/route';
import cookieParser from 'cookie-parser';
// const port = 3000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:5001' }));

app.use('/api/v1', router);

// error handel
app.use(globalErrorhandlata);

// const test = async (req: Request, res: Response) => {
//   const a = '10';
//   res.send(a);
//   //   Promise.reject();
// };
// app.use('/', test);
//not found

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use(notFound);
export default app;
