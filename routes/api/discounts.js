import { query } from '#resources/helpers/dbHelper.js';

export default async function discountsHandler(req, res) {
  const { method } = req;
  const { id } = req.query;

  try {
    // GET: Ambil daftar diskon
    if (method === 'GET') {
      const discounts = await query(`SELECT * FROM discounts ORDER BY created_at DESC`);
      return res.status(200).json({ success: true, data: discounts });
    }

    // POST: Tambah diskon baru
    if (method === 'POST') {
      const { name, type, value, start_date, end_date } = req.body;

      if (!name || !type || !value || !start_date || !end_date) {
        return res.status(400).json({ success: false, message: 'Semua field wajib diisi.' });
      }

      const result = await query(
        `INSERT INTO discounts (name, type, value, start_date, end_date) 
         VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [name, type, value, start_date, end_date]
      );

      return res.status(201).json({ success: true, data: result[0] });
    }

    // DELETE: Hapus diskon
    if (method === 'DELETE') {
      if (!id) return res.status(400).json({ success: false, message: 'ID diperlukan' });
      await query(`DELETE FROM discounts WHERE id = $1`, [id]);
      return res.status(200).json({ success: true, message: 'Diskon berhasil dihapus' });
    }

    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  } catch (error) {
    console.error('[DISCOUNTS API ERROR]:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
}
