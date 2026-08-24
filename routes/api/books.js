import { query } from '#resources/helpers/dbHelper.js';
import { parsePrice, isValidPriceRange } from '#resources/helpers/priceHelper.js';

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  try {
    // GET: Ambil semua buku
    if (method === 'GET') {
      const books = await query(`
        SELECT 
          b.*, 
          c.name as category_name, 
          s.name as subcategory_name 
        FROM books b 
        LEFT JOIN categories c ON b.category_id = c.id 
        LEFT JOIN subcategories s ON b.subcategory_id = s.id 
        ORDER BY b.created_at DESC
      `);
      return res.status(200).json({ success: true, data: books });
    }

    // POST: Tambah Buku Baru
    if (method === 'POST') {
      const { 
        category_id, 
        subcategory_id = null, // Extracted
        title, 
        author, 
        description = '', 
        price, 
        stock = 0, 
        cover_image = '', 
        keywords = '', 
        status = 'active' 
      } = req.body;

      // Clean & Validate Price
      const cleanPrice = parsePrice(price);
      if (!isValidPriceRange(cleanPrice)) {
        return res.status(400).json({ 
          success: false, 
          message: 'Harga tidak valid atau melebihi batas maksimal (Rp 99.999.999).' 
        });
      }

      const result = await query(`
        INSERT INTO books (
          category_id, subcategory_id, title, author, description, 
          price, stock, cover_image, keywords, status
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
        RETURNING *
      `, [
        category_id, 
        subcategory_id ? parseInt(subcategory_id, 10) : null, // Fix index $2
        title, 
        author, 
        description, 
        cleanPrice, 
        parseInt(stock, 10) || 0, 
        cover_image, 
        keywords, 
        status
      ]);

      return res.status(201).json({ success: true, data: result[0] });
    }

    // PUT: Update Buku
    if (method === 'PUT') {
      if (!id) return res.status(400).json({ success: false, message: 'ID diperlukan' });

      const { 
        category_id, 
        subcategory_id = null, // Extracted
        title, 
        author, 
        description = '', 
        price, 
        stock = 0, 
        cover_image = '', 
        keywords = '', 
        status = 'active' 
      } = req.body;

      // Clean & Validate Price
      const cleanPrice = parsePrice(price);
      if (!isValidPriceRange(cleanPrice)) {
        return res.status(400).json({ 
          success: false, 
          message: 'Harga tidak valid atau melebihi batas maksimal (Rp 99.999.999).' 
        });
      }

      const result = await query(`
        UPDATE books 
        SET category_id = $1, 
            subcategory_id = $2, 
            title = $3, 
            author = $4, 
            description = $5, 
            price = $6, 
            stock = $7, 
            cover_image = $8, 
            keywords = $9, 
            status = $10
        WHERE id = $11 
        RETURNING *
      `, [
        category_id, 
        subcategory_id ? parseInt(subcategory_id, 10) : null, // Fix subcategory update
        title, 
        author, 
        description, 
        cleanPrice, 
        parseInt(stock, 10) || 0, 
        cover_image, 
        keywords, 
        status, 
        id
      ]);

      if (result.length === 0) {
        return res.status(404).json({ success: false, message: 'Data buku tidak ditemukan.' });
      }

      return res.status(200).json({ success: true, data: result[0] });
    }

    // DELETE: Hapus Buku
    if (method === 'DELETE') {
      if (!id) return res.status(400).json({ success: false, message: 'ID diperlukan' });
      
      const result = await query('DELETE FROM books WHERE id = $1 RETURNING id', [id]);
      if (result.length === 0) {
        return res.status(404).json({ success: false, message: 'Data buku tidak ditemukan.' });
      }

      return res.status(200).json({ success: true, message: 'Buku berhasil dihapus' });
    }

    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  } catch (error) {
    console.error('[BOOKS API ERROR]:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
}
