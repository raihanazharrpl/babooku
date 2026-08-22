import { supabase } from '#resources/utils/supabase.js';

/**
 * Mengambil Public URL dari bucket manapun
 * @param {string} bucketName - 'babooku_assets' atau 'babooku_covers'
 * @param {string} filePath - Path file di dalam bucket
 */
export function getStorageUrl(bucketName, filePath) {
  if (!filePath) return '';

  if (filePath.startsWith('http')) return filePath;

  const { data } = supabase.storage
    .from(bucketName)
    .getPublicUrl(filePath);

  return data.publicUrl;
}

export const getAssetUrl = (path) => getStorageUrl('babooku_assets', path);
export const getCoverUrl = (path) => getStorageUrl('babooku_covers', path);
