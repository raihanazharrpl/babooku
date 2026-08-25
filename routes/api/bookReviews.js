import { query, queryOne } from '#resources/helpers/dbHelper.js';
import jwt from 'jsonwebtoken';
import { database } from '#config/database.js';

// Helper mengekstrak user_id dari JWT Header Token
function getUserIdFromToken(req) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
    const token = authHeader.split(' ')[1];
    const jwtSecret = database?.app?.jwtSecret || process.env.JWT_SECRET;
    const decoded = jwt.verify(token, jwtSecret);
    return decoded.id;
  } catch {
    return null;
  }
}

export default async function bookReviewsHandler(req, res) {
  const { method } = req;

  try {
    // GET: Ambil daftar ulasan & ringkasan rating buku
    if (method === 'GET') {
      const { book_id } = req.query;

      if (!book_id) {
        return res.status(400).json({ success: false, message: 'Parameter book_id diperlukan.' });
      }

      // 1. Ambil daftar ulasan beserta nama user dari JOIN ke tabel users
      const reviews = await query(`
        SELECT 
          r.id, 
          r.user_id, 
          u.name as user_name, 
          r.rating, 
          r.comment, 
          r.created_at
        FROM book_reviews r
        JOIN users u ON r.user_id = u.id
        WHERE r.book_id = $1
        ORDER BY r.created_at DESC
      `, [book_id]);

      // 2. Hitung Rata-Rata Rating & Total Ulasan
      const summary = await queryOne(`
        SELECT 
          COALESCE(ROUND(AVG(rating), 1), 0.0)::float as avg_rating,
          COUNT(*)::int as total_reviews
        FROM book_reviews
        WHERE book_id = $1
      `, [book_id]);

      return res.status(200).json({
        success: true,
        data: {
          book_id: parseInt(book_id, 10),
          average_rating: summary?.avg_rating || 0.0,
          total_reviews: summary?.total_reviews || 0,
          reviews
        }
      });
    }

    // POST: Tambah Ulasan Baru (Wajib Login)
    if (method === 'POST') {
      const userId = getUserIdFromToken(req);

      if (!userId) {
        return res.status(401).json({ success: false, message: 'Kamu harus login terlebih dahulu untuk memberikan ulasan.' });
      }

      const { book_id, rating, comment = '' } = req.body;

      // Validasi Input
      if (!book_id) {
        return res.status(400).json({ success: false, message: 'book_id wajib diisi.' });
      }

      const numericRating = parseInt(rating, 10);
      if (isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
        return res.status(400).json({ success: false, message: 'Rating harus berupa angka antara 1 sampai 5.' });
      }

      // Cek apakah user sudah pernah mengulas buku ini
      const existingReview = await queryOne(
        `SELECT id FROM book_reviews WHERE user_id = $1 AND book_id = $2 LIMIT 1`,
        [userId, book_id]
      );

      if (existingReview) {
        return res.status(409).json({ 
          success: false, 
          message: 'Kamu sudah memberikan ulasan pada buku ini.' 
        });
      }

      // Simpan ulasan baru
      const newReview = await query(`
        INSERT INTO book_reviews (user_id, book_id, rating, comment)
        VALUES ($1, $2, $3, $4)
        RETURNING *
      `, [userId, book_id, numericRating, comment.trim()]);

      return res.status(201).json({
        success: true,
        message: 'Ulasan berhasil ditambahkan!',
        data: newReview[0]
      });
    }

    // DELETE: Hapus Ulasan Sendiri (Wajib Login)
    if (method === 'DELETE') {
      const userId = getUserIdFromToken(req);
      const { id } = req.query; // ID Ulasan

      if (!userId) {
        return res.status(401).json({ success: false, message: 'Akses ditolak.' });
      }

      if (!id) {
        return res.status(400).json({ success: false, message: 'ID Ulasan diperlukan.' });
      }

      // Pastikan ulasan yang dihapus memang milik user tersebut
      const deleted = await query(
        `DELETE FROM book_reviews WHERE id = $1 AND user_id = $2 RETURNING id`,
        [id, userId]
      );

      if (deleted.length === 0) {
        return res.status(404).json({ 
          success: false, 
          message: 'Ulasan tidak ditemukan atau kamu tidak berhak menghapus ulasan ini.' 
        });
      }

      return res.status(200).json({ success: true, message: 'Ulasan berhasil dihapus.' });
    }

    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  } catch (error) {
    console.error('[BOOK REVIEWS API ERROR]:', error);
    
    // Penanganan khusus jika terkena constraint unique DB
    if (error.code === '23505') {
      return res.status(409).json({ success: false, message: 'Kamu sudah memberikan ulasan pada buku ini.' });
    }

    return res.status(500).json({ success: false, message: error.message });
  }
}
