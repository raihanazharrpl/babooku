import { query } from '#resources/helpers/dbHelper.js';
import { parsePrice, isValidPriceRange } from '#resources/helpers/priceHelper.js';

export default async function booksHandler(req, res) {
  const { method } = req;
  const { id } = req.query;

  try {
    // 1. GET: Ambil semua buku + JOIN nama penerbit, kategori, dan subkategori
    if (method === 'GET') {
      const books = await query(`
        SELECT 
          b.*, 
          c.name as category_name, 
          s.name as subcategory_name,
          COALESCE(p.name, 'Unknown') as publisher,
          COALESCE(p.name, 'Unknown') as publisher_name
        FROM books b 
        LEFT JOIN categories c ON b.category_id = c.id 
        LEFT JOIN subcategories s ON b.subcategory_id = s.id 
        LEFT JOIN publishers p ON b.publisher_id = p.id
        ORDER BY b.created_at DESC
      `);
      return res.status(200).json({ success: true, data: books });
    }

    // Helper: Cari publisher_id berdasarkan input (baik berupa ID angka maupun String Nama)
    const resolvePublisherId = async (publisherInput) => {
      if (!publisherInput || publisherInput === 'Unknown') return null;
      
      // Jika input sudah berupa ID angka
      if (!isNaN(publisherInput)) return parseInt(publisherInput, 10);

      // Jika input berupa string Nama Penerbit
      const pubResult = await query(
        `SELECT id FROM publishers WHERE name = $1 LIMIT 1`,
        [publisherInput]
      );
      return pubResult.length > 0 ? pubResult[0].id : null;
    };

    // 2. POST: Tambah Buku Baru (Sesuai 11 Kolom DB)
    if (method === 'POST') {
      const { 
        category_id, 
        subcategory_id = null, 
        title, 
        author, 
        publisher = 'Unknown',
        publisher_id = null,
        description = '', 
        price, 
        stock = 0, 
        cover_image = '', 
        keywords = '', 
        status = 'active' 
      } = req.body;

      const cleanPrice = parsePrice(price);
      if (!isValidPriceRange(cleanPrice)) {
        return res.status(400).json({ 
          success: false, 
          message: 'Harga tidak valid atau melebihi batas maksimal (Rp 99.999.999).' 
        });
      }

      const finalPublisherId = publisher_id 
        ? parseInt(publisher_id, 10) 
        : await resolvePublisherId(publisher);

      const result = await query(`
        INSERT INTO books (
          category_id, 
          subcategory_id, 
          publisher_id,
          title, 
          author, 
          description, 
          price, 
          stock, 
          cover_image, 
          keywords, 
          status
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) 
        RETURNING *
      `, [
        category_id ? parseInt(category_id, 10) : null, // $1
        subcategory_id ? parseInt(subcategory_id, 10) : null, // $2
        finalPublisherId, // $3 (publisher_id)
        title, // $4
        author, // $5
        description, // $6
        cleanPrice, // $7
        parseInt(stock, 10) || 0, // $8
        cover_image, // $9
        keywords, // $10
        status // $11
      ]);

      return res.status(201).json({ success: true, data: result[0] });
    }

    // 3. PUT: Update Buku (Sesuai 11 Kolom DB + WHERE id = $12)
    if (method === 'PUT') {
      if (!id) return res.status(400).json({ success: false, message: 'ID diperlukan' });

      const { 
        category_id, 
        subcategory_id = null, 
        title, 
        author, 
        publisher = 'Unknown',
        publisher_id = null,
        description = '', 
        price, 
        stock = 0, 
        cover_image = '', 
        keywords = '', 
        status = 'active' 
      } = req.body;

      const cleanPrice = parsePrice(price);
      if (!isValidPriceRange(cleanPrice)) {
        return res.status(400).json({ 
          success: false, 
          message: 'Harga tidak valid atau melebihi batas maksimal (Rp 99.999.999).' 
        });
      }

      const finalPublisherId = publisher_id 
        ? parseInt(publisher_id, 10) 
        : await resolvePublisherId(publisher);

      const result = await query(`
        UPDATE books 
        SET category_id = $1, 
            subcategory_id = $2, 
            publisher_id = $3,
            title = $4, 
            author = $5, 
            description = $6, 
            price = $7, 
            stock = $8, 
            cover_image = $9, 
            keywords = $10, 
            status = $11
        WHERE id = $12 
        RETURNING *
      `, [
        category_id ? parseInt(category_id, 10) : null, // $1
        subcategory_id ? parseInt(subcategory_id, 10) : null, // $2
        finalPublisherId, // $3
        title, // $4
        author, // $5
        description, // $6
        cleanPrice, // $7
        parseInt(stock, 10) || 0, // $8
        cover_image, // $9
        keywords, // $10
        status, // $11
        id // $12
      ]);

      if (result.length === 0) {
        return res.status(404).json({ success: false, message: 'Data buku tidak ditemukan.' });
      }

      return res.status(200).json({ success: true, data: result[0] });
    }

    // 4. DELETE: Hapus Buku
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
