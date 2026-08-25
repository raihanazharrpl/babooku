import { query } from '#resources/helpers/dbHelper.js';

export default async function publishersHandler(req, res) {
  const { method } = req;
  const { id } = req.query;

  try {
    // 1. GET: Ambil Semua Penerbit
    if (method === 'GET') {
      const { search, status } = req.query;
      
      let sql = `SELECT *, 0 as total_books FROM publishers`;
      const params = [];
      const conditions = [];

      if (search) {
        params.push(`%${search}%`);
        conditions.push(`(name ILIKE $${params.length} OR slug ILIKE $${params.length} OR email ILIKE $${params.length})`);
      }

      if (status) {
        params.push(status);
        conditions.push(`status = $${params.length}`);
      }

      if (conditions.length > 0) {
        sql += ` WHERE ` + conditions.join(' AND ');
      }

      sql += ` ORDER BY name ASC`;

      const publishers = await query(sql, params);
      return res.status(200).json({ success: true, data: publishers });
    }

    // 2. POST: Tambah Penerbit Baru
    if (method === 'POST') {
      const { 
        name, 
        slug, 
        logo = null, 
        email = null,
        phone = null,
        website = null, 
        address = null, 
        description = null,
        is_official = false,
        status = 'active'
      } = req.body;

      if (!name || !name.trim()) {
        return res.status(400).json({ success: false, message: 'Nama penerbit wajib diisi.' });
      }

      const cleanName = name.trim();
      const generatedSlug = (slug || cleanName)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

      const result = await query(
        `INSERT INTO publishers (
          name, slug, logo, email, phone, website, address, description, is_official, status
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING *`,
        [
          cleanName, 
          generatedSlug, 
          logo, 
          email ? email.trim() : null, 
          phone ? phone.trim() : null, 
          website ? website.trim() : null, 
          address ? address.trim() : null, 
          description ? description.trim() : null, 
          Boolean(is_official), 
          status || 'active'
        ]
      );

      return res.status(201).json({
        success: true,
        message: 'Penerbit berhasil ditambahkan!',
        data: result[0]
      });
    }

    // 3. PUT: Update Data Penerbit
    if (method === 'PUT') {
      if (!id) return res.status(400).json({ success: false, message: 'ID penerbit diperlukan.' });

      const { 
        name, 
        slug, 
        logo = null, 
        email = null,
        phone = null,
        website = null, 
        address = null, 
        description = null,
        is_official = false,
        status = 'active'
      } = req.body;

      if (!name || !name.trim()) {
        return res.status(400).json({ success: false, message: 'Nama penerbit wajib diisi.' });
      }

      const cleanName = name.trim();
      const generatedSlug = (slug || cleanName)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

      const result = await query(
        `UPDATE publishers 
         SET name = $1, 
             slug = $2, 
             logo = $3, 
             email = $4, 
             phone = $5, 
             website = $6, 
             address = $7, 
             description = $8, 
             is_official = $9, 
             status = $10
         WHERE id = $11
         RETURNING *`,
        [
          cleanName, 
          generatedSlug, 
          logo, 
          email ? email.trim() : null, 
          phone ? phone.trim() : null, 
          website ? website.trim() : null, 
          address ? address.trim() : null, 
          description ? description.trim() : null, 
          Boolean(is_official), 
          status || 'active', 
          id
        ]
      );

      if (result.length === 0) {
        return res.status(404).json({ success: false, message: 'Penerbit tidak ditemukan.' });
      }

      return res.status(200).json({
        success: true,
        message: 'Data penerbit berhasil diperbarui!',
        data: result[0]
      });
    }

    // 4. DELETE: Hapus Penerbit
    if (method === 'DELETE') {
      if (!id) return res.status(400).json({ success: false, message: 'ID penerbit diperlukan.' });

      const result = await query(`DELETE FROM publishers WHERE id = $1 RETURNING id`, [id]);

      if (result.length === 0) {
        return res.status(404).json({ success: false, message: 'Penerbit tidak ditemukan.' });
      }

      return res.status(200).json({ success: true, message: 'Penerbit berhasil dihapus.' });
    }

    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  } catch (error) {
    console.error('[PUBLISHERS API ERROR]:', error);

    if (error.code === '23505') {
      return res.status(400).json({ 
        success: false, 
        message: 'Nama atau Slug penerbit sudah terdaftar. Silakan gunakan nama lain.' 
      });
    }

    return res.status(500).json({ success: false, message: error.message });
  }
}
