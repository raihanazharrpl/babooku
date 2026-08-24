import { queryOne } from '#resources/helpers/dbHelper.js';
import { database } from '#config/database.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    const { email, password } = req.body;

    // 1. Validasi Input Kosong
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email dan password wajib diisi!' 
      });
    }

    console.log(`\n🔑 [LOGIN ATTEMPT] Try login for: ${email}`);

    // 2. Cari User di Database
    const user = await queryOne(
      'SELECT id, name, email, password, role FROM users WHERE email = $1 LIMIT 1', 
      [email]
    );

    // ERROR SPESIFIK 1: Email Tidak Ditemukan
    if (!user) {
      console.log(`❌ [LOGIN FAILED]: Email '${email}' TIDAK TERDAFTAR.`);
      return res.status(404).json({ 
        success: false, 
        message: `Email '${email}' belum terdaftar di sistem Babooku.` 
      });
    }

    console.log(`👤 [USER FOUND]: ${user.name} (${user.role})`);

    // 3. Cek Password Hash
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    // ERROR SPESIFIK 2: Password Salah
    if (!isPasswordValid) {
      console.log(`❌ [LOGIN FAILED]: Password untuk '${email}' SALAH.`);
      return res.status(401).json({ 
        success: false, 
        message: 'Password yang kamu masukkan salah!' 
      });
    }

    // 4. Generate JWT Token
    const jwtSecret = database?.app?.jwtSecret || process.env.JWT_SECRET;
    
    if (!jwtSecret) {
      console.error('⚠️ [CONFIG ERROR]: JWT_SECRET belum diset di config/env!');
      return res.status(500).json({ 
        success: false, 
        message: 'Server Error: Konfigurasi JWT Secret belum dipasang.' 
      });
    }

    const token = jwt.sign(
      { id: user.id, name: user.name, role: user.role },
      jwtSecret,
      { expiresIn: '24h' }
    );

    // Hapus hash password dari response demi keamanan
    delete user.password;

    console.log(`🎉 [LOGIN SUCCESS]: ${user.email} berhasil masuk.`);

    return res.status(200).json({
      success: true,
      message: 'Login berhasil!',
      token,
      user
    });

  } catch (error) {
    console.error('💥 [API LOGIN ERROR]:', error.message);
    return res.status(500).json({ 
      success: false, 
      message: `Terjadi kesalahan server: ${error.message}` 
    });
  }
}
