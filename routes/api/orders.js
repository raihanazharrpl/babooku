import { query, queryOne } from '#resources/helpers/dbHelper.js';
import jwt from 'jsonwebtoken';
import { database } from '#config/database.js';

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

export default async function ordersHandler(req, res) {
  const { method } = req;
  const userId = getUserIdFromToken(req);

  if (!userId) {
    return res.status(401).json({ success: false, message: 'Silakan login terlebih dahulu.' });
  }

  try {
    // 1. GET: Ambil daftar pesanan milik user
    if (method === 'GET') {
      const { id } = req.query;

      // Skenario Detail Pesanan
      if (id) {
        const order = await queryOne(
          `SELECT * FROM orders WHERE id = $1 AND user_id = $2`,
          [id, userId]
        );

        if (!order) {
          return res.status(404).json({ success: false, message: 'Pesanan tidak ditemukan.' });
        }

        const items = await query(`
          SELECT 
            oi.*, 
            b.title, 
            b.cover_image, 
            b.author
          FROM order_items oi
          JOIN books b ON oi.book_id = b.id
          WHERE oi.order_id = $1
        `, [id]);

        return res.status(200).json({
          success: true,
          data: { ...order, items }
        });
      }

      // Skenario Semua Daftar Pesanan User
      const orders = await query(`
        SELECT 
          o.*, 
          COUNT(oi.id)::int as total_items
        FROM orders o
        LEFT JOIN order_items oi ON o.id = oi.order_id
        WHERE o.user_id = $1
        GROUP BY o.id
        ORDER BY o.created_at DESC
      `, [userId]);

      return res.status(200).json({ success: true, data: orders });
    }

    // 2. POST: Checkout dari Keranjang Belanja
    if (method === 'POST') {
      const { shipping_address } = req.body;

      if (!shipping_address || !shipping_address.trim()) {
        return res.status(400).json({ success: false, message: 'Alamat pengiriman wajib diisi.' });
      }

      // Ambil item keranjang belanja user saat ini
      const cartItems = await query(`
        SELECT c.book_id, c.quantity, b.price, b.stock, b.title
        FROM cart_items c
        JOIN books b ON c.book_id = b.id
        WHERE c.user_id = $1
      `, [userId]);

      if (cartItems.length === 0) {
        return res.status(400).json({ success: false, message: 'Keranjang belanja kamu masih kosong.' });
      }

      // Validasi Stok Buku
      for (const item of cartItems) {
        if (item.stock < item.quantity) {
          return res.status(400).json({
            success: false,
            message: `Stok buku "${item.title}" tidak mencukupi (Tersisa: ${item.stock}).`
          });
        }
      }

      // Hitung Total Pembayaran
      const totalAmount = cartItems.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0);

      // A. Buat Header Pesanan di tabel orders
      const orderResult = await query(`
        INSERT INTO orders (user_id, total_amount, shipping_address, status)
        VALUES ($1, $2, $3, 'pending')
        RETURNING *
      `, [userId, totalAmount, shipping_address.trim()]);

      const newOrder = orderResult[0];

      // B. Masukkan Rincian Item ke tabel order_items & Potong Stok Buku
      for (const item of cartItems) {
        await query(`
          INSERT INTO order_items (order_id, book_id, quantity, price_at_purchase)
          VALUES ($1, $2, $3, $4)
        `, [newOrder.id, item.book_id, item.quantity, item.price]);

        await query(`
          UPDATE books 
          SET stock = stock - $1 
          WHERE id = $2
        `, [item.quantity, item.book_id]);
      }

      // C. Bersihkan Keranjang Belanja User
      await query(`DELETE FROM cart_items WHERE user_id = $1`, [userId]);

      return res.status(201).json({
        success: true,
        message: 'Pesanan berhasil dibuat! Silakan lanjutkan pembayaran.',
        data: newOrder
      });
    }

    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  } catch (error) {
    console.error('[ORDERS API ERROR]:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
}
