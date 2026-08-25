/**
 * Seeder: UsersSeeder
 * Description: Mengisi data dummy users variatif (Admin & Customers)
 */

import bcrypt from 'bcryptjs';

const usersList = [
  { name: 'Eko', role: 'admin', address: 'Jl. Merdeka No. 1, Jakarta', phone: '081234567890' },
  { name: 'Budi', role: 'customer', address: 'Jl. Sudirman No. 45, Bandung', phone: '082198765432' },
  { name: 'Siti', role: 'customer', address: 'Jl. Pemuda No. 12, Surabaya', phone: '085712345678' },
  { name: 'Rian', role: 'customer', address: 'Jl. Diponegoro No. 8, Yogyakarta', phone: '089611223344' },
];

export async function seedMySQL(connection) {
  for (const user of usersList) {
    const email = `${user.name.toLowerCase()}@gmail.com`;
    const rawPassword = `${user.name.toLowerCase()}123`;
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    await connection.query(
      `INSERT INTO users (name, email, password, role, address, phone) 
       VALUES (?, ?, ?, ?, ?, ?) 
       ON DUPLICATE KEY UPDATE name=VALUES(name), role=VALUES(role)`,
      [user.name, email, hashedPassword, user.role, user.address, user.phone]
    );
  }
  console.log('  └─ 🐬 [MySQL] UsersSeeder executed.');
}

export async function seedPostgres(client) {
  for (const user of usersList) {
    const email = `${user.name.toLowerCase()}@gmail.com`;
    const rawPassword = `${user.name.toLowerCase()}123`;
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    await client.query(
      `INSERT INTO users (name, email, password, role, address, phone) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name, role = EXCLUDED.role`,
      [user.name, email, hashedPassword, user.role, user.address, user.phone]
    );
  }
  console.log('  └─ ⚡ [Postgres] UsersSeeder executed.');
}
