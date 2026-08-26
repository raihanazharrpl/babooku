import { query, queryOne } from '#resources/helpers/dbHelper.js';
import jwt from 'jsonwebtoken';
import { database } from '#config/database.js';

// Helper mengekstrak user_id dari JWT Header Token secara presisi
function getUserIdFromToken(req) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
    const token = authHeader.split(' ')[1];
    const jwtSecret = database?.app?.jwtSecret || process.env.JWT_SECRET || 'babooku_jwt_secret_key_2026';
    const decoded = jwt.verify(token, jwtSecret);
    return decoded.id ? parseInt(decoded.id, 10) : null;
  } catch (err) {
    console.error('[JWT VERIFY ERROR]:', err.message);
    return null;
  }
}

export default async function cartHandler(req, res) {
  const { method } = req;
  const userId = getUserIdFromToken(req);

  if (!userId) {
    return res.status(401).json({ 
      success: false, 
      message: 'Sesi kamu telah berakhir. Silakan login kembali.' 
    });
  }

  try {
    // 1. GET: Ambil item keranjang belanja milik user (Diurutkan berdasarkan c.id DESC)
    if (method === 'GET') {
      const items = await query(`
        SELECT 
          c.id, 
          c.book_id, 
          c.quantity, 
          b.title, 
          b.price, 
          b.stock, 
          b.cover_image,
          b.author,
          (b.price * c.quantity) as subtotal
        FROM cart_items c
        JOIN books b ON c.book_id = b.id
        WHERE c.user_id = $1
        ORDER BY c.id DESC
      `, [userId]);

      const totalAmount = items.reduce((sum, item) => sum + Number(item.subtotal), 0);
      const totalItems = items.reduce((sum, item) => sum + Number(item.quantity), 0);

      return res.status(200).json({
        success: true,
        data: { 
          items: items || [], 
          total_items: totalItems, 
          total_amount: totalAmount 
        }
      });
    }

    // 2. POST: Tambah atau Akumulasi Kuantitas Buku di Keranjang
    if (method === 'POST') {
      const { book_id, quantity = 1 } = req.body;

      if (!book_id) {
        return res.status(400).json({ success: false, message: 'book_id wajib diisi.' });
      }

      const numericBookId = parseInt(book_id, 10);
      const qty = parseInt(quantity, 10);

      // Cek ketersediaan buku & stok
      const book = await queryOne(`SELECT id, stock, title FROM books WHERE id = $1`, [numericBookId]);
      if (!book) {
        return res.status(404).json({ success: false, message: 'Buku tidak ditemukan.' });
      }

      // Cek apakah buku sudah ada di keranjang user
      const existingCart = await queryOne(
        `SELECT id, quantity FROM cart_items WHERE user_id = $1 AND book_id = $2`,
        [userId, numericBookId]
      );

      let resultItem;

      if (existingCart) {
        // Jika sudah ada -> UPDATE kuantitasnya
        const newQty = Math.min(existingCart.quantity + qty, book.stock);
        const updated = await query(`
          UPDATE cart_items 
          SET quantity = $1
          WHERE id = $2 AND user_id = $3
          RETURNING *
        `, [newQty, existingCart.id, userId]);
        resultItem = updated[0];
      } else {
        // Jika belum ada -> INSERT baru
        const initialQty = Math.min(qty, book.stock);
        const inserted = await query(`
          INSERT INTO cart_items (user_id, book_id, quantity)
          VALUES ($1, $2, $3)
          RETURNING *
        `, [userId, numericBookId, initialQty]);
        resultItem = inserted[0];
      }

      return res.status(200).json({
        success: true,
        message: `"${book.title}" berhasil ditambahkan ke keranjang!`,
        data: resultItem
      });
    }

    // 3. PUT: Update Kuantitas Item
    if (method === 'PUT') {
      const { cart_id, quantity } = req.body;
      const newQty = parseInt(quantity, 10);

      if (newQty <= 0) {
        await query(`DELETE FROM cart_items WHERE id = $1 AND user_id = $2`, [parseInt(cart_id, 10), userId]);
        return res.status(200).json({ success: true, message: 'Item dihapus dari keranjang.' });
      }

      const updated = await query(`
        UPDATE cart_items 
        SET quantity = $1
        WHERE id = $2 AND user_id = $3
        RETURNING *
      `, [newQty, parseInt(cart_id, 10), userId]);

      return res.status(200).json({ success: true, message: 'Jumlah berhasil diperbarui.', data: updated[0] });
    }

    // 4. DELETE: Hapus Item Keranjang
    if (method === 'DELETE') {
      const { id } = req.query;
      await query(`DELETE FROM cart_items WHERE id = $1 AND user_id = $2`, [parseInt(id, 10), userId]);
      return res.status(200).json({ success: true, message: 'Item berhasil dihapus.' });
    }

    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  } catch (error) {
    console.error('[CART API ERROR]:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
}
