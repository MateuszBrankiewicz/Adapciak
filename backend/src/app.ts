import express, { Request, Response } from 'express';
import cookieParser from "cookie-parser";
import { auth } from "./service/AuthService";
import cors from "cors";
import {Router} from 'express';
import authRoutes from './routes/authRoutes';
import adRoutes from './routes/adRoutes';
const app = express();
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.get('/', (_req: Request, res: Response) => {
  res.send('Test TypeScript');
});

app.get('/test', auth, (_req: Request, res: Response) => {
  res.status(200).send("Test udany");
});

app.use('/user', authRoutes);
app.use('/ads', adRoutes);

export default app;