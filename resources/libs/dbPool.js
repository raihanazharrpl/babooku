// resources/libs/dbPool.js
import pg from 'pg';
import { database } from '#config/database.js';

const { Pool } = pg;

// Inisialisasi pool PostgreSQL
const pool = new Pool({
  connectionString: database.db.connectionString,
  ssl: database.db.ssl,
});

export default pool;
