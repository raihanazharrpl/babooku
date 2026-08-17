import mysql from 'mysql2/promise';
import { config } from '@/config/app.js';

export const dbPool = mysql.createPool({
  ...config.db,
  waitForConnections: true,
  queueLimit: 0,
});
