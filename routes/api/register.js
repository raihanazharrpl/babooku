import { query, queryOne } from '#resources/helpers/dbHelper.js';
import { database } from '#config/database.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    const { name, email, password } = req.body;

    // 1. Validasi Input Dasar
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Semua kolom wajib diisi.' });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ success: false, message: 'Format email tidak valid.' });
    }
    if (password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password minimal 6 karakter.' });
    }

    // 2. Cek apakah email sudah terdaftar (Ubah ? jadi $1)
    const existingUser = await queryOne('SELECT id FROM users WHERE email = $1 LIMIT 1', [email]);
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'Email sudah terdaftar. Silakan gunakan email lain atau login.' });
    }

    // 3. Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Insert data ke Database Postgres (Gunakan RETURNING id)
    const rows = await query(
      'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id',
      [name, email, hashedPassword, 'customer']
    );

    const newUserId = rows[0].id; // Ambil ID dari RETURNING id

    // 5. Generate JWT Token
    const token = jwt.sign(
      { id: newUserId, role: 'customer' },
      database.app.jwtSecret,
      { expiresIn: '24h' }
    );

    const user = {
      id: newUserId,
      name,
      email,
      role: 'customer'
    };

    return res.status(201).json({
      success: true,
      message: 'Pendaftaran berhasil!',
      token,
      user
    });

  } catch (error) {
    console.error('[API REGISTER ERROR]:', error);
    return res.status(500).json({ success: false, message: 'Terjadi kesalahan pada server.' });
  }
}
