# babooku
project schools
/**
 * Seeder: BookSeeder
 * Description: Data buku (Novel & Sastra) dengan ID Category, Subcategory, dan Publisher yang presisi
 */

const booksData = [
  {
    category_id: 1,       // Fiction
    subcategory_id: 1,    // Novel
    publisher_id: 2,      // Gramedia Pustaka Utama
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
    category_id: 1,       // Fiction
    subcategory_id: 1,    // Novel
    publisher_id: 2,      // Gramedia Pustaka Utama
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
    category_id: 1,       // Fiction
    subcategory_id: 1,    // Novel
    publisher_id: 2,      // Gramedia Pustaka Utama
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
    category_id: 1,       // Fiction
    subcategory_id: 1,    // Novel
    publisher_id: 7,      // Kepustakaan Populer Gramedia (KPG)
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
    category_id: 1,       // Fiction
    subcategory_id: 1,    // Novel
    publisher_id: 4,      // Bentang Pustaka
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
    category_id: 1,       // Fiction
    subcategory_id: 1,    // Novel
    publisher_id: 2,      // Gramedia Pustaka Utama
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
    category_id: 1,       // Fiction
    subcategory_id: 1,    // Novel
    publisher_id: 3,      // Mizan Publishing
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
    category_id: 1,       // Fiction
    subcategory_id: 1,    // Novel
    publisher_id: 2,      // Gramedia Pustaka Utama
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
    category_id: 1,       // Fiction
    subcategory_id: 1,    // Novel
    publisher_id: 2,      // Gramedia Pustaka Utama
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
    category_id: 1,       // Fiction
    subcategory_id: 1,    // Novel
    publisher_id: 35,     // Penerbit Akad
    title: 'Dikta dan Hukum',
    author: 'Dhian Prasetyo (Ndhiaa)',
    description: 'Kisah persahabatan sejak kecil antara Dikta dan Nadhira yang diwarnai komitmen, perjodohan, dan kepasrahan.',
    price: 99000,
    stock: 45,
    cover_image: 'books/dikta-dan-hukum.jpg',
    keywords: 'dikta, nadhira, alternate universe, angst, romance, viral',
    status: 'active',
  },
  {
    category_id: 1,       // Fiction
    subcategory_id: 1,    // Novel
    publisher_id: 35,     // Penerbit Akad
    title: 'Azzamine',
    author: 'Sophie Aulia',
    description: 'Perjalanan cinta Raden Azzam Al-Baihaqi dan Jasmine yang diawali dari perjodohan tak terduga.',
    price: 95000,
    stock: 30,
    cover_image: 'books/azzamine.jpg',
    keywords: 'azzamine, perjodohan, islami, romance, wattpad, viral',
    status: 'active',
  },
  {
    category_id: 1,       // Fiction
    subcategory_id: 1,    // Novel
    publisher_id: 8,      // GagasMedia
    title: 'Mariposa',
    author: 'Luluk HF',
    description: 'Kisah Acha yang memperjuangkan cinta Iqbal, seorang cowok dingin bagaikan kupu-kupu mariposa.',
    price: 99000,
    stock: 20,
    cover_image: 'books/mariposa.jpg',
    keywords: 'luluk hf, mariposa, acha, iqbal, wattpad, teenlit',
    status: 'active',
  },
  {
    category_id: 1,       // Fiction
    subcategory_id: 1,    // Novel
    publisher_id: 4,      // Bentang Pustaka
    title: 'Orang-Orang Biasa',
    author: 'Andrea Hirata',
    description: 'Aksi perampokan unik dan jenaka yang dilakukan oleh sekelompok sahabat demi membiayai kuliah anak temannya.',
    price: 85000,
    stock: 15,
    cover_image: 'books/orang-orang-biasa.jpg',
    keywords: 'andrea hirata, komedi, sosial, kejahatan unik, persahabatan',
    status: 'active',
  },
  {
    category_id: 1,       // Fiction
    subcategory_id: 1,    // Novel
    publisher_id: 10,     // Gramedia Pustaka Utama
    title: 'Seperti Dendam, Rindu Harus Dibayar Tuntas',
    author: 'Eka Kurniawan',
    description: 'Ajo Kawir, seorang petarung tangguh yang mengalami impotensi, dan perjalanannya menemukan makna keberanian.',
    price: 88000,
    stock: 12,
    cover_image: 'books/seperti-dendam.jpg',
    keywords: 'eka kurniawan, ajo kawir, aksi, fiksi, adaptasi film',
    status: 'active',
  },
  {
    category_id: 2,       // Non-Fiction
    subcategory_id: 6,    // Self Development
    publisher_id: 15,     // Gradien Mediatama
    title: 'Aksara Awan',
    author: 'Syahid Muhammad',
    description: 'Perjalanan pencarian jati diri, pemulihan luka emosional, dan dinamika kesehatan mental anak muda.',
    price: 88000,
    stock: 17,
    cover_image: 'books/aksara-awan.jpg',
    keywords: 'syahid muhammad, kesehatan mental, self-healing, fiksi psikologis',
    status: 'active',
  },
  {
    category_id: 1,       // Fiction
    subcategory_id: 1,    // Novel
    publisher_id: 2,      // Gramedia Pustaka Utama
    title: 'Selamat Tinggal',
    author: 'Tere Liye',
    description: 'Sintong Pasaribu, mahasiswa tingkat akhir yang bekerja di toko buku bajakan dan pencariannya akan integritas.',
    price: 89000,
    stock: 25,
    cover_image: 'books/selamat-tinggal.jpg',
    keywords: 'tere liye, sintong, buku bajakan, integritas, romansa',
    status: 'active',
  },
  {
    category_id: 1,       // Fiction
    subcategory_id: 1,    // Novel
    publisher_id: 21,     // Penerbit Haru
    title: 'Toko Kelontong Namiya',
    author: 'Keigo Higashino',
    description: 'Tiga pencuri bersembunyi di toko kelontong tua yang menerima surat konsultasi masalah dari masa lalu.',
    price: 90000,
    stock: 21,
    cover_image: 'books/namiya.jpg',
    keywords: 'keigo higashino, misteri, jepang, keajaiban, toko kelontong',
    status: 'active',
  },
  {
    category_id: 1,       // Fiction
    subcategory_id: 1,    // Novel
    publisher_id: 3,      // Mizan Publishing
    title: 'Aroma Karsa',
    author: 'Dee Lestari',
    description: 'Pencarian tanaman misterius Puspa Karsa yang hanya bisa dilacak melalui indra penciuman luar biasa Raras dan Jati.',
    price: 125000,
    stock: 19,
    cover_image: 'books/aroma-karsa.jpg',
    keywords: 'dee lestari, jati wesi, aroma karsa, mitologi, aroma',
    status: 'active',
  },
  {
    category_id: 1,       // Fiction
    subcategory_id: 4,    // Poetry & Drama
    publisher_id: 2,      // Gramedia Pustaka Utama
    title: 'Segi Tiga',
    author: 'Sapardi Djoko Damono',
    description: 'Eksplorasi cinta, takdir, dan batas antara fiksi dan kenyataan lewat penulisan khas Sapardi.',
    price: 75000,
    stock: 10,
    cover_image: 'books/segi-tiga.jpg',
    keywords: 'sapardi djoko damono, segi tiga, sastra, puisi, fiksi',
    status: 'active',
  },
  {
    category_id: 1,       // Fiction
    subcategory_id: 1,    // Novel
    publisher_id: 36,     // Penerbit Romancious / Loveable
    title: 'Ananta Prahadi',
    author: 'Risa Saraswati',
    description: 'Kisah kasih tak sampai antara Tania dan Ananta yang polos namun rela melakukan apa saja demi kebahagiaan Tania.',
    price: 82000,
    stock: 22,
    cover_image: 'books/ananta-prahadi.jpg',
    keywords: 'risa saraswati, ananta prahadi, romansa, haru, drama',
    status: 'active',
  },
];


// ----------------------------------------------------
// ⚡ LOGIC SEEDING FOR POSTGRESQL / SUPABASE
// ----------------------------------------------------
export async function seedPostgres(client, categoryId, subcategoryId, publisherId) {
  if (!booksData || booksData.length === 0 || !booksData[0].title) {
    console.log('  └─ ⚡ [Postgres] BookSeeder skipped (Data masih kosong).');
    return;
  }

  for (const b of booksData) {
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
      b.category_id || categoryId || 1,
      b.subcategory_id || subcategoryId || null,
      b.publisher_id || publisherId || 1,
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

  console.log('  └─ ⚡ [Postgres] BookSeeder executed.');
}

// ----------------------------------------------------
// 🐬 LOGIC SEEDING FOR MYSQL
// ----------------------------------------------------
export async function seedMySQL(connection, categoryId, subcategoryId, publisherId) {
  if (!booksData || booksData.length === 0 || !booksData[0].title) {
    console.log('  └─ 🐬 [MySQL] BookSeeder skipped (Data masih kosong).');
    return;
  }

  for (const b of booksData) {
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
        b.category_id || categoryId || 1,
        b.subcategory_id || subcategoryId || null,
        b.publisher_id || publisherId || 1,
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

  console.log('  └─ 🐬 [MySQL] BookSeeder executed.');
}
