import { query, queryOne } from '#resources/helpers/dbHelper.js';

export default async function landingHandler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    // 1. Hitung Statistik Utama
    const totalBooksRes = await queryOne(`SELECT COUNT(*)::int as total FROM books WHERE status = 'active'`);
    const totalUsersRes = await queryOne(`SELECT COUNT(*)::int as total FROM users`);
    const avgRatingRes = await queryOne(`SELECT COALESCE(ROUND(AVG(rating), 1), 4.9)::float as avg FROM book_reviews`);
    const totalPublishersRes = await queryOne(`SELECT COUNT(*)::int as total FROM publishers WHERE status = 'active'`);

    // 2. Ambil Top 3 Subkategori dengan Jumlah Buku Terbanyak
    const topSubcategories = await query(`
      SELECT 
        s.id, 
        s.name, 
        COUNT(b.id)::int as book_count
      FROM subcategories s
      JOIN books b ON b.subcategory_id = s.id
      GROUP BY s.id, s.name
      ORDER BY book_count DESC
      LIMIT 3
    `);

    // 3. Ambil 4 Buku Terfavorit Berdasarkan Jumlah Likes (book_likes)
    const topLikedBooks = await query(`
      SELECT 
        b.id, 
        b.title, 
        b.author, 
        b.price, 
        b.cover_image,
        COUNT(l.id)::int as likes_count
      FROM books b
      LEFT JOIN book_likes l ON b.id = l.book_id
      WHERE b.status = 'active'
      GROUP BY b.id
      ORDER BY likes_count DESC, b.created_at DESC
      LIMIT 4
    `);

    return res.status(200).json({
      success: true,
      data: {
        stats: {
          totalBooks: totalBooksRes?.total || 0,
          totalUsers: totalUsersRes?.total || 0,
          avgRating: avgRatingRes?.avg || 4.9,
          totalPublishers: totalPublishersRes?.total || 0
        },
        topSubcategories: topSubcategories || [],
        topLikedBooks: topLikedBooks || []
      }
    });
  } catch (error) {
    console.error('[LANDING API ERROR]:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
}
