import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const MAX_ASSET_SIZE = 25 * 1024 * 1024; // 25 MB Limit untuk Ebook & Audiobook

/**
 * Helper Universal Upload (Covers, Ebooks, Audiobooks)
 */
export async function uploadCover(fileBuffer, mimeType, targetFolder = 'general', bookTitle = 'book', folderType = 'covers') {
  const isDigitalAsset = folderType === 'ebooks' || folderType === 'audiobooks';
  
  // 1. Validasi Ukuran File Khusus Digital Asset (25MB)
  if (isDigitalAsset && fileBuffer.length > MAX_ASSET_SIZE) {
    throw new Error('Ukuran file aset digital melebihi batas maksimum 25MB.');
  }

  // 2. Tentukan Bucket & Prefix Folder Utama (pdf/ mp3/ atau covers)
  let bucketName = 'babooku_covers';
  let formatPrefix = '';
  let ext = mimeType.split('/')[1] || 'jpg';

  if (isDigitalAsset) {
    bucketName = 'babooku_ebook_audiobook';
    if (mimeType.includes('audio') || mimeType.includes('mpeg') || mimeType.includes('mp3')) {
      formatPrefix = 'mp3';
      ext = 'mp3';
    } else {
      formatPrefix = 'pdf';
      ext = mimeType.includes('epub') ? 'epub' : 'pdf';
    }
  }

  // 3. Format Judul Unik Berbasis Timestamp
  const cleanTitle = bookTitle
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/[\s-]+/g, '-');

  const timestamp = Date.now();
  const fileName = `${timestamp}-${cleanTitle}.${ext}`;

  // 4. Susun Hirarki Folder: {pdf|mp3}/{categoryFolder}/{subcategoryFolder}/{fileName}
  let filePath = isDigitalAsset
    ? `${formatPrefix}/${targetFolder}/${fileName}`
    : `${targetFolder}/${fileName}`;

  filePath = filePath.replace(/\/+/g, '/'); // Clean double slashes

  // 5. Upload ke Supabase Storage
  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(filePath, fileBuffer, {
      contentType: mimeType,
      upsert: true,
    });

  if (error) {
    throw new Error(`Gagal upload ke Supabase Storage (${bucketName}): ${error.message}`);
  }

  // 6. Ambil URL Publik
  const { data: publicUrlData } = supabase.storage
    .from(bucketName)
    .getPublicUrl(filePath);

  return {
    path: filePath,
    url: publicUrlData.publicUrl,
  };
}
