import { query, queryOne } from '#resources/helpers/dbHelper.js';
import jwt from 'jsonwebtoken';
import { database } from '#config/database.js';

// Helper sederhana untuk ekstrak user_id dari JWT Header (opsional/jika ada token)
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

export default async function bookLikesHandler(req, res) {
  const { method } = req;

  try {
    // GET: Ambil statistik likes buku
    if (method === 'GET') {
      const { book_id } = req.query;

      if (!book_id) {
        return res.status(400).json({ success: false, message: 'Parameter book_id diperlukan' });
      }

      // Hitung total like untuk buku ini
      const countResult = await queryOne(
        `SELECT COUNT(*)::int as total_likes FROM book_likes WHERE book_id = $1`,
        [book_id]
      );

      // Cek apakah user yang memanggil API ini sudah like buku ini (jika login)
      let isLikedByUser = false;
      const userId = getUserIdFromToken(req);

      if (userId) {
        const userLike = await queryOne(
          `SELECT id FROM book_likes WHERE user_id = $1 AND book_id = $2 LIMIT 1`,
          [userId, book_id]
        );
        isLikedByUser = !!userLike;
      }

      return res.status(200).json({
        success: true,
        data: {
          book_id: parseInt(book_id, 10),
          total_likes: countResult?.total_likes || 0,
          is_liked: isLikedByUser
        }
      });
    }

    // POST: Toggle Like / Unlike (Wajib Login)
    if (method === 'POST') {
      const userId = getUserIdFromToken(req);

      if (!userId) {
        return res.status(401).json({ success: false, message: 'Kamu harus login terlebih dahulu untuk menyukai buku ini.' });
      }

      const { book_id } = req.body;

      if (!book_id) {
        return res.status(400).json({ success: false, message: 'book_id wajib diisi.' });
      }

      // Cek apakah user sudah pernah like buku ini sebelumnya
      const existingLike = await queryOne(
        `SELECT id FROM book_likes WHERE user_id = $1 AND book_id = $2 LIMIT 1`,
        [userId, book_id]
      );

      if (existingLike) {
        // Jika SUDAH LIKE -> UNLIKE (Hapus dari DB)
        await query(`DELETE FROM book_likes WHERE id = $1`, [existingLike.id]);
        
        const countResult = await queryOne(
          `SELECT COUNT(*)::int as total_likes FROM book_likes WHERE book_id = $1`,
          [book_id]
        );

        return res.status(200).json({
          success: true,
          message: 'Batal menyukai buku.',
          is_liked: false,
          total_likes: countResult?.total_likes || 0
        });
      } else {
        // Jika BELUM LIKE -> LIKE (Tambah ke DB)
        await query(
          `INSERT INTO book_likes (user_id, book_id) VALUES ($1, $2)`,
          [userId, book_id]
        );

        const countResult = await queryOne(
          `SELECT COUNT(*)::int as total_likes FROM book_likes WHERE book_id = $1`,
          [book_id]
        );

        return res.status(201).json({
          success: true,
          message: 'Berhasil menyukai buku!',
          is_liked: true,
          total_likes: countResult?.total_likes || 0
        });
      }
    }

    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  } catch (error) {
    console.error('[BOOK LIKES API ERROR]:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
}
