import express, { Application, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import { studentRouter } from './app/config/module/student/student.router';
import { userRouter } from './app/config/module/user/user.router';
// const port = 3000;

app.use(express.json());
app.use(cors());

app.use('/api/v1/student', studentRouter);
app.use('/api/v1/users', userRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
