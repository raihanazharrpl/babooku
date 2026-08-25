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
      { name: 'Poetry & Drama', slug: 'poetry-drama' },
      { name: 'Light Novel', slug: 'light-novel' },
    ],
  },
  {
    name: 'Non-Fiction',
    slug: 'non-fiction',
    subcategories: [
      { name: 'Self Development', slug: 'self-development' },
      { name: 'Biography & Memoir', slug: 'biography-memoir' },
      { name: 'History & Culture', slug: 'history-culture' },
      { name: 'Philosophy & Psychology', slug: 'philosophy-psychology' },
      { name: 'Essays & Criticism', slug: 'essays-criticism' },
    ],
  },
  {
    name: 'Education & Academic',
    slug: 'education-academic',
    subcategories: [
      { name: 'School Books', slug: 'school-books' },
      { name: 'Programming & Tech', slug: 'programming-tech' },
      { name: 'College Textbooks', slug: 'college-textbooks' },
      { name: 'Language Learning', slug: 'language-learning' },
      { name: 'Dictionaries', slug: 'dictionaries' },
    ],
  },
  {
    name: 'Business & Economics',
    slug: 'business-economics',
    subcategories: [
      { name: 'Finance & Investment', slug: 'finance-investment' },
      { name: 'Entrepreneurship', slug: 'entrepreneurship' },
      { name: 'Management & Leadership', slug: 'management-leadership' },
      { name: 'Marketing & Sales', slug: 'marketing-sales' },
    ],
  },
  {
    name: 'Religion & Spirituality',
    slug: 'religion-spirituality',
    subcategories: [
      { name: 'Islamic Books', slug: 'islamic-books' },
      { name: 'Christianity & Theology', slug: 'christianity-theology' },
      { name: 'Spirituality & Mindfulness', slug: 'spirituality-mindfulness' },
    ],
  },
  {
    name: 'Children & Young Adult',
    slug: 'children-young-adult',
    subcategories: [
      { name: 'Picture Books', slug: 'picture-books' },
      { name: 'Early Readers', slug: 'early-readers' },
      { name: 'Young Adult (YA) Fiction', slug: 'ya-fiction' },
      { name: 'Activity Books', slug: 'activity-books' },
    ],
  },
  {
    name: 'Lifestyle & Hobby',
    slug: 'lifestyle-hobby',
    subcategories: [
      { name: 'Cooking & Food', slug: 'cooking-food' },
      { name: 'Health & Fitness', slug: 'health-fitness' },
      { name: 'Crafts & Photography', slug: 'crafts-photography' },
      { name: 'Travel & Guide', slug: 'travel-guide' },
    ],
  },
  {
    name: 'Art, Architecture & Design',
    slug: 'art-architecture-design',
    subcategories: [
      { name: 'Graphic Design & Illustration', slug: 'graphic-design-illustration' },
      { name: 'Interior & Architecture', slug: 'interior-architecture' },
      { name: 'Fashion & Beauty', slug: 'fashion-beauty' },
    ],
  },
  {
    name: 'Science & Technology',
    slug: 'science-technology',
    subcategories: [
      { name: 'Popular Science', slug: 'popular-science' },
      { name: 'Engineering', slug: 'engineering' },
      { name: 'Environment & Nature', slug: 'environment-nature' },
    ],
  },
  {
    name: 'Social Sciences & Law',
    slug: 'social-sciences-law',
    subcategories: [
      { name: 'Law & Politics', slug: 'law-politics' },
      { name: 'Sociology & Anthropology', slug: 'sociology-anthropology' },
      { name: 'Media & Communications', slug: 'media-communications' },
    ],
  },
  {
    name: 'Buku Paket SD / MI',
    slug: 'buku-paket-sd-mi',
    subcategories: [
      { name: 'Kelas 1 SD/MI', slug: 'sd-kelas-1' },
      { name: 'Kelas 2 SD/MI', slug: 'sd-kelas-2' },
      { name: 'Kelas 3 SD/MI', slug: 'sd-kelas-3' },
      { name: 'Kelas 4 SD/MI', slug: 'sd-kelas-4' },
      { name: 'Kelas 5 SD/MI', slug: 'sd-kelas-5' },
      { name: 'Kelas 6 SD/MI', slug: 'sd-kelas-6' },
    ],
  },
  {
    name: 'Buku Paket SMP / MTs',
    slug: 'buku-paket-smp-mts',
    subcategories: [
      { name: 'Kelas 7 SMP/MTs (Kelas 1)', slug: 'smp-kelas-7' },
      { name: 'Kelas 8 SMP/MTs (Kelas 2)', slug: 'smp-kelas-8' },
      { name: 'Kelas 9 SMP/MTs (Kelas 3)', slug: 'smp-kelas-9' },
    ],
  },
  {
    name: 'Buku Paket SMA / SMK / MA',
    slug: 'buku-paket-sma-smk-ma',
    subcategories: [
      { name: 'Kelas 10 SMA/SMK/MA (Kelas 1)', slug: 'sma-kelas-10' },
      { name: 'Kelas 11 SMA/SMK/MA (Kelas 2)', slug: 'sma-kelas-11' },
      { name: 'Kelas 12 SMA/SMK/MA (Kelas 3)', slug: 'sma-kelas-12' },
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
