/**
 * Seeder: BookSeeder
 * Description: Mengisi data buku riil dengan relasi slug dinamis, variasi format (fisik, ebook, audiobook), weight, & file_url
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
    format: ['physical', 'ebook'],
    file_url: 'ebooks/laut-bercerita.pdf',
    weight: 350,
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
    format: ['physical', 'ebook', 'audiobook'],
    file_url: 'audiobooks/bumi-manusia.mp3',
    weight: 450,
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
    format: ['physical'],
    file_url: null,
    weight: 400,
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
    format: ['physical', 'ebook'],
    file_url: 'ebooks/gadis-kretek.epub',
    weight: 320,
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
    format: ['physical', 'audiobook'],
    file_url: 'audiobooks/laskar-pelangi.mp3',
    weight: 300,
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
    format: ['physical'],
    file_url: null,
    weight: 330,
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
    format: ['physical', 'ebook'],
    file_url: 'ebooks/perahu-kertas.pdf',
    weight: 380,
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
    format: ['physical'],
    file_url: null,
    weight: 290,
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
    format: ['physical', 'ebook'],
    file_url: 'ebooks/funiculi-funicula.epub',
    weight: 250,
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
    format: ['physical'],
    file_url: null,
    weight: 310,
    keywords: 'dikta, nadhira, alternate universe, angst, romance, viral',
    status: 'active',
  },
  {
    category_slug: 'fiksi',
    subcategory_slug: 'novel',
    publisher_slug: 'penerbit-akad',
    title: 'Azzamine',
    author: 'Sophie Aulia',
    description: 'Perjalanan cinta Raden Azzam Al-Baihaqi dan Jasmine yang diawali dari perjodohan tak terduga.',
    price: 95000,
    stock: 30,
    cover_image: 'books/azzamine.jpg',
    format: ['physical', 'ebook'],
    file_url: 'ebooks/azzamine.pdf',
    weight: 300,
    keywords: 'azzamine, perjodohan, islami, romance, wattpad, viral',
    status: 'active',
  },
  {
    category_slug: 'fiksi',
    subcategory_slug: 'novel',
    publisher_slug: 'gagasmedia',
    title: 'Mariposa',
    author: 'Luluk HF',
    description: 'Kisah Acha yang memperjuangkan cinta Iqbal, seorang cowok dingin bagaikan kupu-kupu mariposa.',
    price: 99000,
    stock: 20,
    cover_image: 'books/mariposa.jpg',
    format: ['physical'],
    file_url: null,
    weight: 340,
    keywords: 'luluk hf, mariposa, acha, iqbal, wattpad, teenlit',
    status: 'active',
  },
  {
    category_slug: 'fiksi',
    subcategory_slug: 'novel',
    publisher_slug: 'bentang-pustaka',
    title: 'Orang-Orang Biasa',
    author: 'Andrea Hirata',
    description: 'Aksi perampokan unik dan jenaka yang dilakukan oleh sekelompok sahabat demi membiayai kuliah anak temannya.',
    price: 85000,
    stock: 15,
    cover_image: 'books/orang-orang-biasa.jpg',
    format: ['physical', 'ebook', 'audiobook'],
    file_url: 'audiobooks/orang-orang-biasa.mp3',
    weight: 270,
    keywords: 'andrea hirata, komedi, sosial, kejahatan unik, persahabatan',
    status: 'active',
  },
  {
    category_slug: 'fiksi',
    subcategory_slug: 'novel',
    publisher_slug: 'gramedia-pustaka-utama',
    title: 'Seperti Dendam, Rindu Harus Dibayar Tuntas',
    author: 'Eka Kurniawan',
    description: 'Ajo Kawir, seorang petarung tangguh yang mengalami impotensi, dan perjalanannya menemukan makna keberanian.',
    price: 88000,
    stock: 12,
    cover_image: 'books/seperti-dendam.jpg',
    format: ['physical', 'ebook'],
    file_url: 'ebooks/seperti-dendam.pdf',
    weight: 280,
    keywords: 'eka kurniawan, ajo kawir, aksi, fiksi, adaptasi film',
    status: 'active',
  },
  {
    category_slug: 'non-fiksi',
    subcategory_slug: 'pengembangan-diri',
    publisher_slug: 'gradien-mediatama',
    title: 'Aksara Awan',
    author: 'Syahid Muhammad',
    description: 'Perjalanan pencarian jati diri, pemulihan luka emosional, dan dinamika kesehatan mental anak muda.',
    price: 88000,
    stock: 17,
    cover_image: 'books/aksara-awan.jpg',
    format: ['physical', 'ebook'],
    file_url: 'ebooks/aksara-awan.pdf',
    weight: 260,
    keywords: 'syahid muhammad, kesehatan mental, self-healing, fiksi psikologis',
    status: 'active',
  },
  {
    category_slug: 'fiksi',
    subcategory_slug: 'novel',
    publisher_slug: 'gramedia-pustaka-utama',
    title: 'Selamat Tinggal',
    author: 'Tere Liye',
    description: 'Sintong Pasaribu, mahasiswa tingkat akhir yang bekerja di toko buku bajakan dan pencariannya akan integritas.',
    price: 89000,
    stock: 25,
    cover_image: 'books/selamat-tinggal.jpg',
    format: ['physical'],
    file_url: null,
    weight: 310,
    keywords: 'tere liye, sintong, buku bajakan, integritas, romansa',
    status: 'active',
  },
  {
    category_slug: 'fiksi',
    subcategory_slug: 'novel',
    publisher_slug: 'penerbit-haru',
    title: 'Toko Kelontong Namiya',
    author: 'Keigo Higashino',
    description: 'Tiga pencuri bersembunyi di toko kelontong tua yang menerima surat konsultasi masalah dari masa lalu.',
    price: 90000,
    stock: 21,
    cover_image: 'books/namiya.jpg',
    format: ['physical', 'ebook'],
    file_url: 'ebooks/namiya.epub',
    weight: 350,
    keywords: 'keigo higashino, misteri, jepang, keajaiban, toko kelontong',
    status: 'active',
  },
  {
    category_slug: 'fiksi',
    subcategory_slug: 'novel',
    publisher_slug: 'mizan-publishing',
    title: 'Aroma Karsa',
    author: 'Dee Lestari',
    description: 'Pencarian tanaman misterius Puspa Karsa yang hanya bisa dilacak melalui indra penciuman luar biasa Raras dan Jati.',
    price: 125000,
    stock: 19,
    cover_image: 'books/aroma-karsa.jpg',
    format: ['physical', 'ebook', 'audiobook'],
    file_url: 'audiobooks/aroma-karsa.mp3',
    weight: 420,
    keywords: 'dee lestari, jati wesi, aroma karsa, mitologi, aroma',
    status: 'active',
  },
  {
    category_slug: 'fiksi',
    subcategory_slug: 'puisi-drama',
    publisher_slug: 'gramedia-pustaka-utama',
    title: 'Segi Tiga',
    author: 'Sapardi Djoko Damono',
    description: 'Eksplorasi cinta, takdir, dan batas antara fiksi dan kenyataan lewat penulisan khas Sapardi.',
    price: 75000,
    stock: 10,
    cover_image: 'books/segi-tiga.jpg',
    format: ['physical', 'ebook'],
    file_url: 'ebooks/segi-tiga.pdf',
    weight: 200,
    keywords: 'sapardi djoko damono, segi tiga, sastra, puisi, fiksi',
    status: 'active',
  },
  {
    category_slug: 'fiksi',
    subcategory_slug: 'novel',
    publisher_slug: 'penerbit-romancious',
    title: 'Ananta Prahadi',
    author: 'Risa Saraswati',
    description: 'Kisah kasih tak sampai antara Tania dan Ananta yang polos namun rela melakukan apa saja demi kebahagiaan Tania.',
    price: 82000,
    stock: 22,
    cover_image: 'books/ananta-prahadi.jpg',
    format: ['physical'],
    file_url: null,
    weight: 280,
    keywords: 'risa saraswati, ananta prahadi, romansa, haru, drama',
    status: 'active',
  },
];

// ----------------------------------------------------
// ⚡ LOGIC SEEDING FOR POSTGRESQL / SUPABASE
// ----------------------------------------------------
export async function seedPostgres(client, fallbackCatId, fallbackSubCatId, fallbackPubId) {
  const catRes = await client.query('SELECT id, slug FROM categories');
  const catMap = Object.fromEntries(catRes.rows.map((r) => [r.slug, r.id]));

  const subCatRes = await client.query('SELECT id, slug FROM subcategories');
  const subCatMap = Object.fromEntries(subCatRes.rows.map((r) => [r.slug, r.id]));

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
      (category_id, subcategory_id, publisher_id, title, author, description, price, stock, cover_image, format, file_url, weight, keywords, status) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      ON CONFLICT (id) DO UPDATE SET 
        title = EXCLUDED.title,
        price = EXCLUDED.price, 
        stock = EXCLUDED.stock, 
        format = EXCLUDED.format,
        file_url = EXCLUDED.file_url,
        weight = EXCLUDED.weight,
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
      b.format, // Sent as Array to TEXT[] PostgreSQL
      b.file_url,
      b.weight,
      b.keywords,
      b.status,
    ]);
  }

  console.log('  └─ ⚡ [Postgres] BookSeeder executed (Presisi via Slug Map + Multi-Format).');
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

    // MySQL: Array di-serialize menjadi JSON String
    const formatJson = JSON.stringify(b.format);

    await connection.query(
      `INSERT INTO books 
       (category_id, subcategory_id, publisher_id, title, author, description, price, stock, cover_image, format, file_url, weight, keywords, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE 
          title = VALUES(title),
          price = VALUES(price), 
          stock = VALUES(stock), 
          format = VALUES(format),
          file_url = VALUES(file_url),
          weight = VALUES(weight),
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
        formatJson,
        b.file_url,
        b.weight,
        b.keywords,
        b.status,
      ]
    );
  }

  console.log('  └─ 🐬 [MySQL] BookSeeder executed.');
}
