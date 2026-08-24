import { supabase } from '#resources/utils/supabase.js';

/**
 * Helper khusus upload cover buku ke Supabase Storage
 * 
 * @param {File} file - File gambar dari input form (<input type="file" />)
 * @param {string} categoryFolder - Nama folder kategori (contoh: 'novel_books', 'cerpen_books', 'komik_books')
 * @param {string} bookTitle - Judul buku untuk dibuat slug
 * @returns {Promise<{ filePath: string, publicUrl: string }>} Path file dan Public URL
 */
export async function uploadBookCover(file, categoryFolder, bookTitle) {
  if (!file) throw new Error('File gambar wajib diunggah.');
  if (!categoryFolder) throw new Error('Folder kategori wajib ditentukan.');

  // 1. Ekstrak ekstensi file (.jpg, .png, .webp)
  const fileExt = file.name.split('.').pop().toLowerCase();

  // 2. Format judul buku menjadi slug (contoh: "Laskar Pelangi" -> "laskar-pelangi")
  const slug = bookTitle
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-');

  // 3. Buat UUID unik pendek + timestamp agar nama file 100% bebas bentrok
  const uniqueId = crypto.randomUUID().split('-')[0];
  const timestamp = Date.now();

  // Hasil Path: categories/novel_books/laskar-pelangi-1724152800-a8f3.webp
  const filePath = `categories/${categoryFolder}/${slug}-${timestamp}-${uniqueId}.${fileExt}`;

  // 4. Upload file ke Supabase Storage
  const { data, error } = await supabase.storage
    .from('babooku_covers')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    console.error('[Upload Error]:', error.message);
    throw new Error(`Gagal mengunggah cover: ${error.message}`);
  }

  // 5. Ambil Public URL-nya
  const { data: publicUrlData } = supabase.storage
    .from('babooku_covers')
    .getPublicUrl(filePath);

  return {
    filePath: data.path, // Simpan ini atau URL-nya ke database
    publicUrl: publicUrlData.publicUrl,
  };
}
