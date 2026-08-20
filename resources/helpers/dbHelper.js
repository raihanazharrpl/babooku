// resources/helpers/dbHelper.js
import dbPool from '#resources/libs/dbPool.js'; // Sesuaikan path jika tidak pakai alias #

/**
 * Fungsi aman untuk menjalankan kueri SQL di PostgreSQL.
 * Gunakan placeholder $1, $2, dst. dan array `params` untuk MENCEGAH SQL INJECTION.
 * Contoh: query('SELECT * FROM users WHERE email = $1', [email])
 */
export async function query(sql, params = []) {
  try {
    // pg menggunakan dbPool.query() dan hasilnya disimpan di property .rows
    const { rows } = await dbPool.query(sql, params);
    return rows;
  } catch (error) {
    // Log detail error di server, tapi sembunyikan dari response client
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
