// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Import handler API login yang sudah dibuat
import loginHandler from './routes/api/login.js';
import registerHandler from './routes/api/register.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 1. Endpoint Login (Sudah terhubung ke handler asli)
app.all('/api/login', (req, res) => loginHandler(req, res));

// 2. Endpoint Register Sementara (Mencegah error saat file register.js belum ada)
// app.all('/api/register', (req, res) => {
//   res.status(501).json({
//     success: false,
//     message: 'Endpoint register belum diimplementasikan di backend.'
//   });
// });
app.all('/api/register', (req, res) => registerHandler(req, res));

app.listen(PORT, () => {
  console.log(`🚀 Backend server berjalan di http://localhost:${PORT}`);
});
