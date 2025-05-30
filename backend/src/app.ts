import express, { Request, Response } from 'express';
import cookieParser from "cookie-parser";
import { auth } from "./service/AuthService";
import cors from "cors";
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import adRoutes from './routes/adRoutes';
import formFillersRoutes from './routes/formFillersRoutes';
import messageRoutes from './routes/messageRoutes';
import favoriteRoutes from './routes/favoriteRoute'
const app = express();

app.use(cookieParser());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(express.json());
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
app.use('/formFillers', formFillersRoutes);
app.use('/message', auth, messageRoutes);
app.use('/favorite',auth,favoriteRoutes);
app.use('/userprofile',userRoutes);
export default app;
