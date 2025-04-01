import app from './app';
import { connectDB } from './config/db';
require('dotenv').config();

const PORT = process.env.PORT || 3000;

// Połącz z bazą i uruchom serwer
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});
