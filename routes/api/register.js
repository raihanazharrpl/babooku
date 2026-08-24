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

    // 1. Validasi Input Kebutuhan Dasar
    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Nama lengkap wajib diisi.' });
    }
    if (!email || !email.trim()) {
      return res.status(400).json({ success: false, message: 'Email wajib diisi.' });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ success: false, message: `Format email '${email}' tidak valid.` });
    }
    if (!password) {
      return res.status(400).json({ success: false, message: 'Password wajib diisi.' });
    }
    if (password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password terlalu pendek, minimal 6 karakter.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();

    console.log(`\n📝 [REGISTER ATTEMPT] Trying to register: ${cleanEmail}`);

    // 2. Cek Duplikasi Email di PostgreSQL
    const existingUser = await queryOne('SELECT id FROM users WHERE email = $1 LIMIT 1', [cleanEmail]);
    
    if (existingUser) {
      console.log(`❌ [REGISTER FAILED]: Email '${cleanEmail}' SUDAH TERDAFTAR.`);
      return res.status(409).json({ 
        success: false, 
        message: `Email '${cleanEmail}' sudah terdaftar. Silakan gunakan email lain atau login.` 
      });
    }

    // 3. Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Insert data ke Database Postgres
    const rows = await query(
      'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id',
      [cleanName, cleanEmail, hashedPassword, 'customer']
    );

    if (!rows || rows.length === 0) {
      throw new Error('Gagal menyimpan user ke database (Tabel tidak mengembalikan ID).');
    }

    const newUserId = rows[0].id;

    // 5. Check & Fallback JWT Secret Key
    const jwtSecret = database?.app?.jwtSecret || process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error('⚠️ [CONFIG ERROR]: JWT_SECRET belum diset di config/env!');
      return res.status(500).json({ 
        success: false, 
        message: 'Server Error: Konfigurasi JWT Secret belum dipasang.' 
      });
    }

    // 6. Generate JWT Token
    const token = jwt.sign(
      { id: newUserId, name: cleanName, role: 'customer' },
      jwtSecret,
      { expiresIn: '24h' }
    );

    const user = {
      id: newUserId,
      name: cleanName,
      email: cleanEmail,
      role: 'customer'
    };

    console.log(`🎉 [REGISTER SUCCESS]: Account created for ${cleanEmail} (ID: ${newUserId})`);

    return res.status(201).json({
      success: true,
      message: 'Pendaftaran akun berhasil!',
      token,
      user
    });

  } catch (error) {
    console.error('💥 [API REGISTER ERROR]:', error.message);
    return res.status(500).json({ 
      success: false, 
      message: `Terjadi kesalahan internal server: ${error.message}` 
    });
  }
}
