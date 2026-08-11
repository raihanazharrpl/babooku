// config/app.js
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export const config = {
  app: {
    jwtSecret: process.env.JWT_SECRET || 'fallback_secret_key_sangat_rahasia',
  },
  db: {
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'babooku',
    port: Number(process.env.DB_PORT) || 3306,
    // SSL sangat penting jika nanti connect ke Cloud Database
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
  }
};

// Buat Pool Connection (Mencegah koneksi terputus tiba-tiba)
export const dbPool = mysql.createPool({
  ...config.db,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
