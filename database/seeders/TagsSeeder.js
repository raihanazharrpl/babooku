/**
 * Seeder: TagsSeeder
 * Description: Mengisi data tag variatif lengkap dengan emoji, slug, dan warna badge
 */

const tagsData = [
  { name: 'Best Seller 🔥', slug: 'best-seller', color: '#EF4444' },     // Red
  { name: 'Rekomendasi ⭐', slug: 'rekomendasi', color: '#F59E0B' },     // Amber
  { name: 'Diskon Besar 💥', slug: 'diskon-besar', color: '#10B981' },   // Emerald
  { name: 'Buku Baru 🆕', slug: 'buku-baru', color: '#3B82F6' },      // Blue
  { name: 'Populer 📈', slug: 'populer', color: '#8B5CF6' },        // Purple
  { name: 'Edisi Terbatas 💎', slug: 'edisi-terbatas', color: '#EC4899' },// Pink
];

export async function seedMySQL(connection) {
  for (const tag of tagsData) {
    await connection.query(
      `INSERT INTO tags (name, slug, color) 
       VALUES (?, ?, ?) 
       ON DUPLICATE KEY UPDATE name=VALUES(name), color=VALUES(color)`,
      [tag.name, tag.slug, tag.color]
    );
  }
  console.log('  └─ 🐬 [MySQL] TagsSeeder executed.');
}

export async function seedPostgres(client) {
  for (const tag of tagsData) {
    await client.query(
      `INSERT INTO tags (name, slug, color) 
       VALUES ($1, $2, $3) 
       ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, color = EXCLUDED.color`,
      [tag.name, tag.slug, tag.color]
    );
  }
  console.log('  └─ ⚡ [Postgres] TagsSeeder executed.');
}
