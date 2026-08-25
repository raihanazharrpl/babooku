/**
 * Seeder: BookSeeder
 * Description: Mengisi data buku dengan relasi dinamis presisi ke categories, subcategories, & publishers
 */

const booksData = [
  {
    category_slug: 'fiksi',
    subcategory_slug: 'novel',
    publisher_slug: 'gramedia-pustaka-utama',
    title: 'Laut Bercerita',
    author: 'Leila S. Chudori',
    description: 'Mengisahkan tentang aksi dan penghilangan paksa terhadap para aktivis mahasiswa di era Orde Baru.',
    price: 115000,
    stock: 25,
    cover_image: 'books/laut-bercerita.jpg',
    keywords: 'novel, sejarah, fiksi, leila s chudori, aktivis, orde baru',
    status: 'active',
  },
  {
    category_slug: 'fiksi',
    subcategory_slug: 'novel',
    publisher_slug: 'gramedia-pustaka-utama',
    title: 'Bumi Manusia',
    author: 'Pramoedya Ananta Toer',
    description: 'Kisah Minke di era pergerakan nasional awal abad ke-20 dan perjuangannya menembus sekat rasial kolonial.',
    price: 135000,
    stock: 30,
    cover_image: 'books/bumi-manusia.jpg',
    keywords: 'pramoedya ananta toer, minke, sejarah, sastra klasik, indonesia',
    status: 'active',
  },
  {
    category_slug: 'fiksi',
    subcategory_slug: 'novel',
    publisher_slug: 'gramedia-pustaka-utama',
    title: 'Cantik Itu Luka',
    author: 'Eka Kurniawan',
    description: 'Kisah realisme magis Dewi Ayu dan keturunannya yang berlatar masa kolonial hingga pasca-kemerdekaan.',
    price: 128000,
    stock: 18,
    cover_image: 'books/cantik-itu-luka.jpg',
    keywords: 'eka kurniawan, realisme magis, dewi ayu, fiksi, sastra',
    status: 'active',
  },
  {
    category_slug: 'fiksi',
    subcategory_slug: 'novel',
    publisher_slug: 'kpg',
    title: 'Gadis Kretek',
    author: 'Ratih Kumala',
    description: 'Pencarian Soeraja akan Jeng Yah membawa anak-anaknya menelusuri industri kretek dan sejarah keluarga.',
    price: 95000,
    stock: 40,
    cover_image: 'books/gadis-kretek.jpg',
    keywords: 'ratih kumala, gadis kretek, romansa, sejarah, kretek',
    status: 'active',
  },
  {
    category_slug: 'fiksi',
    subcategory_slug: 'novel',
    publisher_slug: 'bentang-pustaka',
    title: 'Laskar Pelangi',
    author: 'Andrea Hirata',
    description: 'Kisah perjuangan 10 anak Laskar Pelangi dan guru mereka di sekolah SD Muhammadiyah Belitung.',
    price: 89000,
    stock: 50,
    cover_image: 'books/laskar-pelangi.jpg',
    keywords: 'andrea hirata, belitung, persahabatan, inspiratif, laskar pelangi',
    status: 'active',
  },
  {
    category_slug: 'fiksi',
    subcategory_slug: 'novel',
    publisher_slug: 'gramedia-pustaka-utama',
    title: 'Hujan',
    author: 'Tere Liye',
    description: 'Novel fiksi ilmiah romansa tentang persahabatan, perpisahan, dan kenangan di dunia masa depan tahun 2042.',
    price: 99000,
    stock: 35,
    cover_image: 'books/hujan-tere-liye.jpg',
    keywords: 'tere liye, hujan, fiksi ilmiah, romance, esok dan maryam',
    status: 'active',
  },
  {
    category_slug: 'fiksi',
    subcategory_slug: 'novel',
    publisher_slug: 'mizan-publishing',
    title: 'Perahu Kertas',
    author: 'Dee Lestari',
    description: 'Kisah tentang Kugy dan Keenan yang saling mencintai namun terhalang oleh berbagai keadaan dan pilihan hidup.',
    price: 105000,
    stock: 22,
    cover_image: 'books/perahu-kertas.jpg',
    keywords: 'dee lestari, kugy, keenan, romansa, perahu kertas',
    status: 'active',
  },
  {
    category_slug: 'fiksi',
    subcategory_slug: 'novel',
    publisher_slug: 'gramedia-pustaka-utama',
    title: 'Home Sweet Loan',
    author: 'Almira Bastari',
    description: 'Suka duka pekerja sandwich generation di Jakarta dalam perjuangan memiliki rumah impian.',
    price: 92000,
    stock: 28,
    cover_image: 'books/home-sweet-loan.jpg',
    keywords: 'almira bastari, metropop, sandwich generation, jakarta, romansa urban',
    status: 'active',
  },
  {
    category_slug: 'fiksi',
    subcategory_slug: 'novel',
    publisher_slug: 'gramedia-pustaka-utama',
    title: 'Funiculi Funicula (Before the Coffee Gets Cold)',
    author: 'Toshikazu Kawaguchi',
    description: 'Kafe misterius di Tokyo yang memungkinkan pengunjungnya kembali ke masa lalu sebelum kopi menjadi dingin.',
    price: 78000,
    stock: 32,
    cover_image: 'books/funiculi-funicula.jpg',
    keywords: 'terjemahan, jepang, fantasy, time travel, heartwarming',
    status: 'active',
  },
  {
    category_slug: 'fiksi',
    subcategory_slug: 'novel',
    publisher_slug: 'penerbit-akad',
    title: 'Dikta dan Hukum',
    author: 'Dhian Prasetyo (Ndhiaa)',
    description: 'Kisah persahabatan sejak kecil antara Dikta dan Nadhira yang diwarnai komitmen, perjodohan, dan kepasrahan.',
    price: 99000,
    stock: 45,
    cover_image: 'books/dikta-dan-hukum.jpg',
    keywords: 'dikta, nadhira, alternate universe, angst, romance, viral',
    status: 'active',
  },
];

// ----------------------------------------------------
// ⚡ LOGIC SEEDING FOR POSTGRESQL / SUPABASE
// ----------------------------------------------------
export async function seedPostgres(client, fallbackCatId, fallbackSubCatId, fallbackPubId) {
  // Ambil Map ID Category & Subcategory
  const catRes = await client.query('SELECT id, slug FROM categories');
  const catMap = Object.fromEntries(catRes.rows.map((r) => [r.slug, r.id]));

  const subCatRes = await client.query('SELECT id, slug FROM subcategories');
  const subCatMap = Object.fromEntries(subCatRes.rows.map((r) => [r.slug, r.id]));

  // Ambil Map ID Publisher
  const pubRes = await client.query('SELECT id, slug FROM publishers');
  const pubMap = Object.fromEntries(pubRes.rows.map((r) => [r.slug, r.id]));

  const defaultCatId = fallbackCatId || catRes.rows[0]?.id || 1;
  const defaultPubId = fallbackPubId || pubRes.rows[0]?.id || 1;

  for (const b of booksData) {
    const categoryId = catMap[b.category_slug] || defaultCatId;
    const subcategoryId = subCatMap[b.subcategory_slug] || fallbackSubCatId || null;
    const publisherId = pubMap[b.publisher_slug] || defaultPubId;

    const query = `
      INSERT INTO books 
      (category_id, subcategory_id, publisher_id, title, author, description, price, stock, cover_image, keywords, status) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      ON CONFLICT (id) DO UPDATE SET 
        title = EXCLUDED.title,
        price = EXCLUDED.price, 
        stock = EXCLUDED.stock, 
        status = EXCLUDED.status;
    `;

    await client.query(query, [
      categoryId,
      subcategoryId,
      publisherId,
      b.title,
      b.author,
      b.description,
      b.price,
      b.stock,
      b.cover_image,
      b.keywords,
      b.status,
    ]);
  }

  console.log('  └─ ⚡ [Postgres] BookSeeder executed (Presisi via Slug Map).');
}

// ----------------------------------------------------
// 🐬 LOGIC SEEDING FOR MYSQL
// ----------------------------------------------------
export async function seedMySQL(connection, fallbackCatId, fallbackSubCatId, fallbackPubId) {
  const [catRows] = await connection.query('SELECT id, slug FROM categories');
  const catMap = Object.fromEntries(catRows.map((r) => [r.slug, r.id]));

  const [subCatRows] = await connection.query('SELECT id, slug FROM subcategories');
  const subCatMap = Object.fromEntries(subCatRows.map((r) => [r.slug, r.id]));

  const [pubRows] = await connection.query('SELECT id, slug FROM publishers');
  const pubMap = Object.fromEntries(pubRows.map((r) => [r.slug, r.id]));

  const defaultCatId = fallbackCatId || catRows[0]?.id || 1;
  const defaultPubId = fallbackPubId || pubRows[0]?.id || 1;

  for (const b of booksData) {
    const categoryId = catMap[b.category_slug] || defaultCatId;
    const subcategoryId = subCatMap[b.subcategory_slug] || fallbackSubCatId || null;
    const publisherId = pubMap[b.publisher_slug] || defaultPubId;

    await connection.query(
      `INSERT INTO books 
       (category_id, subcategory_id, publisher_id, title, author, description, price, stock, cover_image, keywords, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE 
          title = VALUES(title),
          price = VALUES(price), 
          stock = VALUES(stock), 
          status = VALUES(status)`,
      [
        categoryId,
        subcategoryId,
        publisherId,
        b.title,
        b.author,
        b.description,
        b.price,
        b.stock,
        b.cover_image,
        b.keywords,
        b.status,
      ]
    );
  }

  console.log('  └─ 🐬 [MySQL] BookSeeder executed (Presisi via Slug Map).');
}
