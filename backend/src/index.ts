import express, { Request, Response } from 'express';
import cors from 'cors';
import {getName, login,register,checkLogged} from './controller/AuthController'
import { Secret } from 'jsonwebtoken';
import { auth } from './middleware/auth';
import cookieParser from 'cookie-parser';
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;
const mongoose = require('mongoose')
const mongoDbUrl = process.env.MONGODB_URL 
app.use(cookieParser());
export const SECRET_KEY: Secret = process.env.SECRET || 'default_secret_key';
// Konfiguracja CORS
const corsOptions = {
  origin: 'http://localhost:5173', // Zastąp adresem Twojego frontendu
  credentials: true, // To jest **bardzo ważne** dla wysyłania ciasteczek
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

app.use(express.json());
const protectedRouter = express.Router();
protectedRouter.use(auth);
app.get('/', (_req: Request, res: Response) => {
  res.send('Test typescript');
})
mongoose.connect(mongoDbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connection Successful"))
  .catch((err: unknown) => console.error("Connection Error:", err));
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`); 
})

app.post('/login', login);

app.post('/register', register);

app.get("/test",auth,(req:Request,res:Response) => {
  res.status(200).send("test udany");
})
app.get('/user/name',auth,getName);
app.get('/user/check', auth, checkLogged);

