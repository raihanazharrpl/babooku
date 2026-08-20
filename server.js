// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Import DB Pool untuk di-test saat server jalan
import dbPool from './resources/libs/dbPool.js';

// Import handler API
import loginHandler from './routes/api/login.js';
import registerHandler from './routes/api/register.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 1. Endpoint Login
app.all('/api/login', (req, res) => loginHandler(req, res));

// 2. Endpoint Register
app.all('/api/register', (req, res) => registerHandler(req, res));

// Jalankan Server & Test DB Koneksi
app.listen(PORT, async () => {
  console.log(`🚀 Backend server berjalan di http://localhost:${PORT}`);
  
  try {
    // Coba konek ke Supabase
    const client = await dbPool.connect();
    console.log('✅ Berhasil terhubung ke database Supabase (PostgreSQL)!');
    client.release(); // Lepas kembali koneksi ke pool
  } catch (error) {
    console.error('❌ Gagal terhubung ke database:', error.message);
  }
});
