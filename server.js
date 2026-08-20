// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import loginHandler from './routes/api/login.js';
import registerHandler from './routes/api/register.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Endpoint API
app.all('/api/login', (req, res) => loginHandler(req, res));
app.all('/api/register', (req, res) => registerHandler(req, res));

// Hanya jalankan app.listen saat di lingkungan lokal (Local Dev)
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

// WAJIB KETIKA DEPLOY KE VERCEL:
export default app;
