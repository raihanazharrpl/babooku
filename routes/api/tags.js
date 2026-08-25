// routes/api/tags.js
import { query } from '#resources/helpers/dbHelper.js';

export default async function tagsHandler(req, res) {
  const { method } = req;
  const { id } = req.query;

  try {
    // GET: Ambil semua tags
    if (method === 'GET') {
      // Kita tambahkan 0 as "usageCount" sebagai placeholder karena belum ada tabel relasi book_tags
      const tags = await query(`SELECT *, 0 as "usageCount" FROM tags ORDER BY created_at DESC`);
      return res.status(200).json({ success: true, data: tags });
    }

    // POST: Buat Tag Baru
    if (method === 'POST') {
      const { name, slug, color } = req.body;
      
      if (!name || !slug) {
        return res.status(400).json({ success: false, message: 'Nama dan Slug wajib diisi.' });
      }

      const result = await query(
        `INSERT INTO tags (name, slug, color) VALUES ($1, $2, $3) RETURNING *`,
        [name, slug, color || '#6B7280']
      );

      return res.status(201).json({ success: true, message: 'Tag berhasil dibuat', data: result[0] });
    }

    // PUT: Update Tag
    if (method === 'PUT') {
      if (!id) return res.status(400).json({ success: false, message: 'ID diperlukan' });
      const { name, slug, color } = req.body;

      const result = await query(
        `UPDATE tags SET name = $1, slug = $2, color = $3 WHERE id = $4 RETURNING *`,
        [name, slug, color, id]
      );

      if (result.length === 0) {
        return res.status(404).json({ success: false, message: 'Tag tidak ditemukan.' });
      }

      return res.status(200).json({ success: true, message: 'Tag berhasil diperbarui', data: result[0] });
    }

    // DELETE: Hapus Tag
    if (method === 'DELETE') {
      if (!id) return res.status(400).json({ success: false, message: 'ID diperlukan' });
      
      const result = await query(`DELETE FROM tags WHERE id = $1 RETURNING id`, [id]);
      
      if (result.length === 0) {
        return res.status(404).json({ success: false, message: 'Tag tidak ditemukan.' });
      }

      return res.status(200).json({ success: true, message: 'Tag berhasil dihapus' });
    }

    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  } catch (error) {
    console.error('[TAGS API ERROR]:', error);
    // Tangani error jika slug sudah ada di database (UNIQUE constraint)
    if (error.code === '23505') {
      return res.status(400).json({ success: false, message: 'Slug URL sudah digunakan. Silakan gunakan nama/slug lain.' });
    }
    return res.status(500).json({ success: false, message: error.message });
  }
}
