import mysql from 'mysql2/promise';

export async function runUserSeeder(connection) {
  const users = [
    // 2 Admin
    ['Admin Utama', 'admin1@babooku.com', 'password123', 'admin', 'Jl. Merdeka No. 1, Jakarta', '081234567890'],
    ['Admin Kedua', 'admin2@babooku.com', 'password123', 'admin', 'Jl. Sudirman No. 12, Bandung', '081234567891'],
    // 3 Customer (User Biasa)
    ['Budi Santoso', 'budi@gmail.com', 'password123', 'customer', 'Jl. Mawar No. 4, Surabaya', '085678901234'],
    ['Siti Rahma', 'siti@gmail.com', 'password123', 'customer', 'Jl. Anggrek No. 8, Yogyakarta', '087890123456'],
    ['Eko Prasetyo', 'eko@gmail.com', 'password123', 'customer', 'Jl. Gajah Mada No. 15, Semarang', '089012345678'],
  ];

  await connection.query(
    `INSERT INTO users (name, email, password, role, address, phone) VALUES ?`,
    [users]
  );

  console.log('  └─ ✅ UserSeeder: 2 Admin & 3 Customer berhasil ditambahkan.');
}
