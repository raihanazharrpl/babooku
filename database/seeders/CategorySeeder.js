/**
 * Seeder: CategorySeeder
 * Description: Mengisi data awal untuk categories dan subcategories
 */

const categoriesData = [
  {
    name: 'Fiction',
    slug: 'fiction',
    subcategories: [
      { name: 'Novel', slug: 'novel' },
      { name: 'Short Story (Cerpen)', slug: 'cerpen' },
      { name: 'Comic & Manga', slug: 'comic-manga' },
    ],
  },
  {
    name: 'Non-Fiction',
    slug: 'non-fiction',
    subcategories: [
      { name: 'Self Development', slug: 'self-development' },
      { name: 'Biography', slug: 'biography' },
      { name: 'History', slug: 'history' },
    ],
  },
  {
    name: 'Education',
    slug: 'education',
    subcategories: [
      { name: 'School Books', slug: 'school-books' },
      { name: 'Programming & Tech', slug: 'programming-tech' },
    ],
  },
];

// ----------------------------------------------------
// 🐬 LOGIC SEEDING FOR MYSQL
// ----------------------------------------------------
export async function seedMySQL(connection) {
  let firstCatId = null;
  let firstSubCatId = null;

  for (const cat of categoriesData) {
    // 1. Insert Category
    const [catResult] = await connection.query(
      `INSERT INTO categories (name, slug) 
       VALUES (?, ?) 
       ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id), name=VALUES(name)`,
      [cat.name, cat.slug]
    );

    const categoryId = catResult.insertId;
    if (!firstCatId) firstCatId = categoryId;

    // 2. Insert Subcategories
    for (const sub of cat.subcategories) {
      const [subResult] = await connection.query(
        `INSERT INTO subcategories (category_id, name, slug) 
         VALUES (?, ?, ?) 
         ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id), name=VALUES(name)`,
        [categoryId, sub.name, sub.slug]
      );

      if (!firstSubCatId) firstSubCatId = subResult.insertId;
    }
  }

  console.log('  └─ 🐬 [MySQL] CategorySeeder executed.');
  return { firstCatId, firstSubCatId };
}

// ----------------------------------------------------
// ⚡ LOGIC SEEDING FOR POSTGRESQL / SUPABASE
// ----------------------------------------------------
export async function seedPostgres(client) {
  let firstCatId = null;
  let firstSubCatId = null;

  for (const cat of categoriesData) {
    // 1. Insert Category & Get ID
    const catQuery = `
      INSERT INTO categories (name, slug) 
      VALUES ($1, $2) 
      ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name 
      RETURNING id;
    `;
    const catRes = await client.query(catQuery, [cat.name, cat.slug]);
    const categoryId = catRes.rows[0].id;

    if (!firstCatId) firstCatId = categoryId;

    // 2. Insert Subcategories & Get ID
    for (const sub of cat.subcategories) {
      const subQuery = `
        INSERT INTO subcategories (category_id, name, slug) 
        VALUES ($1, $2, $3) 
        ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name 
        RETURNING id;
      `;
      const subRes = await client.query(subQuery, [categoryId, sub.name, sub.slug]);

      if (!firstSubCatId) firstSubCatId = subRes.rows[0].id;
    }
  }

  console.log('  └─ ⚡ [Postgres] CategorySeeder executed.');
  return { firstCatId, firstSubCatId };
}
