import { createClient } from '@supabase/supabase-js';

// Supabase Client versi Admin (Server-side Only)
const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

/**
 * Upload cover buku ke Supabase Storage via Server/Backend
 * @param {Buffer} fileBuffer - Data binary file gambar
 * @param {string} mimeType - Tipe file (image/png, image/jpeg, dll)
 * @param {string} categoryFolder - Folder kategori (misal: 'novels')
 * @param {string} bookTitle - Judul buku untuk dijadikan slug
 */
export async function uploadCover(fileBuffer, mimeType, categoryFolder, bookTitle) {
  if (!fileBuffer || fileBuffer.length === 0) {
    throw new Error('File gambar tidak boleh kosong.');
  }

  const fileExt = mimeType.split('/')[1] || 'jpg';
  const slug = bookTitle
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-');

  const uniqueId = crypto.randomUUID().split('-')[0];
  const filePath = `categories/${categoryFolder}/${slug}-${Date.now()}-${uniqueId}.${fileExt}`;

  // Upload menggunakan Service Role Key (Bypass RLS)
  const { data, error } = await supabaseAdmin.storage
    .from('babooku_covers')
    .upload(filePath, fileBuffer, {
      contentType: mimeType,
      upsert: false,
    });

  if (error) {
    throw new Error(`Upload Supabase Gagal: ${error.message}`);
  }

  // Dapatkan Public URL
  const { data: publicUrlData } = supabaseAdmin.storage
    .from('babooku_covers')
    .getPublicUrl(filePath);

  return {
    filePath: data.path,
    publicUrl: publicUrlData.publicUrl,
  };
}
