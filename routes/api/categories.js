import { query } from '#resources/helpers/dbHelper.js';

export default async function categoriesHandler(req, res) {
  const { method } = req;
  const { id } = req.query;

  try {
    // GET: Ambil semua kategori beserta sub-kategorinya
    if (method === 'GET') {
      const categories = await query(`
        SELECT 
          c.id, 
          c.name, 
          c.slug,
          COALESCE(
            json_agg(
              json_build_object('id', s.id, 'name', s.name, 'slug', s.slug)
            ) FILTER (WHERE s.id IS NOT NULL), '[]'
          ) as subcategories
        FROM categories c
        LEFT JOIN subcategories s ON c.id = s.category_id
        GROUP BY c.id, c.name, c.slug
        ORDER BY c.name ASC
      `);
      return res.status(200).json({ success: true, data: categories });
    }

    // POST: Tambah Kategori Baru
    if (method === 'POST') {
      const { name, slug, subcategories = [] } = req.body;
      
      if (!name || !slug) {
        return res.status(400).json({ success: false, message: 'Nama dan Slug wajib diisi' });
      }

      // 1. Insert ke tabel categories
      const catResult = await query(
        `INSERT INTO categories (name, slug) VALUES ($1, $2) RETURNING id`,
        [name, slug]
      );
      const newCategoryId = catResult[0].id;

      // 2. Insert ke tabel subcategories
      for (const subName of subcategories) {
        if (!subName.trim()) continue;
        const subSlug = subName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        await query(
          `INSERT INTO subcategories (category_id, name, slug) VALUES ($1, $2, $3)`,
          [newCategoryId, subName.trim(), subSlug]
        );
      }

      return res.status(201).json({ success: true, message: 'Kategori berhasil ditambahkan' });
    }

    // PUT: Update Kategori
    if (method === 'PUT') {
      if (!id) return res.status(400).json({ success: false, message: 'ID diperlukan' });
      const { name, slug, subcategories = [] } = req.body;

      // 1. Update tabel categories
      await query(
        `UPDATE categories SET name = $1, slug = $2 WHERE id = $3`,
        [name, slug, id]
      );

      // 2. Refresh subcategories (Hapus lama, insert baru)
      await query(`DELETE FROM subcategories WHERE category_id = $1`, [id]);
      
      for (const subName of subcategories) {
        if (!subName.trim()) continue;
        const subSlug = subName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        await query(
          `INSERT INTO subcategories (category_id, name, slug) VALUES ($1, $2, $3)`,
          [id, subName.trim(), subSlug]
        );
      }

      return res.status(200).json({ success: true, message: 'Kategori berhasil diupdate' });
    }

    // DELETE: Hapus Kategori
    if (method === 'DELETE') {
      if (!id) return res.status(400).json({ success: false, message: 'ID diperlukan' });
      
      await query(`DELETE FROM subcategories WHERE category_id = $1`, [id]);
      const result = await query(`DELETE FROM categories WHERE id = $1 RETURNING id`, [id]);
      
      if (result.length === 0) {
        return res.status(404).json({ success: false, message: 'Data tidak ditemukan.' });
      }

      return res.status(200).json({ success: true, message: 'Kategori berhasil dihapus' });
    }

    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  } catch (error) {
    console.error('[CATEGORIES API ERROR]:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
}
