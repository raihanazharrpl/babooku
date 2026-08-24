import { query } from '#resources/helpers/dbHelper.js';

export default async function categoriesHandler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    // Mengambil categories beserta array subcategories-nya
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
      GROUP BY c.id
      ORDER BY c.name ASC
    `);

    return res.status(200).json({ success: true, data: categories });
  } catch (error) {
    console.error('[CATEGORIES API ERROR]:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
}
