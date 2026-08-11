// routes/api/login.js
import { queryOne } from '../../resources/helpers/dbHelper.js';
import { config } from '../../config/app.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    const { email, password } = req.body;
    
    // --- [DEBUG START] ---
    console.log(`\n[LOGIN ATTEMPT] Email: ${email}`);

    // 1. Ambil data dari MariaDB
    const user = await queryOne('SELECT id, name, email, password, role FROM users WHERE email = ? LIMIT 1', [email]);

    if (!user) {
      console.log(`❌ [DEBUG]: Email '${email}' TIDAK ADA di database.`);
      return res.status(401).json({ success: false, message: 'Kredensial tidak valid.' });
    }

    console.log(`✅ [DEBUG]: User ditemukan! Hash di DB: ${user.password}`);

    // 2. Bandingkan password murni vs hash di DB
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      console.log(`❌ [DEBUG]: Password SALAH. Hash tidak cocok dengan '${password}'.`);
      return res.status(401).json({ success: false, message: 'Kredensial tidak valid.' });
    }

    console.log(`✅ [DEBUG]: Password BENAR! Membuat sesi login...`);
    // --- [DEBUG END] ---

    // 3. Generate Token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      config.app.jwtSecret,
      { expiresIn: '24h' }
    );

    delete user.password;

    return res.status(200).json({
      success: true,
      message: 'Login berhasil',
      token,
      user
    });

  } catch (error) {
    console.error('[API LOGIN ERROR]:', error);
    return res.status(500).json({ success: false, message: 'Terjadi kesalahan internal server.' });
  }
}
