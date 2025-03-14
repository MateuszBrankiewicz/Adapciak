import express, { Request, Response } from 'express';
import cors from 'cors';
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.get('/', (_req: Request, res: Response) => {
  res.send('Test typescript');
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`); 
})

app.post('/login', (req: Request, res: Response) => {
  console.log(req.body);
  res.send('Login');
});
