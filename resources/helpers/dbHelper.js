// resources/helpers/dbHelper.js
import { dbPool } from '@/resources/lib/dbPool.js';

/**
 * Fungsi aman untuk menjalankan kueri SQL.
 * Selalu gunakan parameter `?` dan array `params` untuk MENCEGAH SQL INJECTION.
 */
export async function query(sql, params = []) {
  try {
    // .execute() = Prepared Statement (Aman dari Bypass 1=1)
    const [rows] = await dbPool.execute(sql, params);
    return rows;
  } catch (error) {
    // Jangan bocorkan pesan error SQL ke Frontend (Cegah Information Disclosure)
    console.error('[DB ERROR]:', error.message);
    throw new Error('Terjadi kesalahan pada database.');
  }
}

/**
 * Fungsi untuk mengambil tepat 1 baris data (misal: mencari 1 user)
 */
export async function queryOne(sql, params = []) {
  const rows = await query(sql, params);
  return rows.length > 0 ? rows[0] : null;
}
