// create-user.js
import { query } from './../helpers/dbHelper.js';
import bcrypt from 'bcryptjs';

async function createUser() {
  try {
    console.log('Membuat hash untuk "password123"...');
    
    // Generate hash ASLI
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    console.log('Hash berhasil dibuat:', hashedPassword);
    console.log('Menyimpan ke MariaDB...');

    await query(
      `INSERT INTO users (name, email, password, role, address, phone) 
       VALUES (?, ?, ?, 'customer', 'Jl. Merdeka', '081234')
       ON DUPLICATE KEY UPDATE password = ?`, // Jika email sudah ada, cukup update passwordnya
       // imput here
      ['Eko Kurniawan', 'eko@gmail.com', hashedPassword, hashedPassword]
    );

    console.log('✅ User "eko@gmail.com" berhasil dibuat/diupdate dan siap digunakan login!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Gagal:', error.message);
    process.exit(1);
  }
}

createUser();
