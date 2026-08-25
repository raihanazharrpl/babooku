/**
 * Sanitasi dan ubah input harga (string/number) menjadi Number murni yang aman untuk DB.
 * Contoh dari Form Input: "95.000", "Rp 95.000" -> 95000
 * 
 * @param {string|number} value - Nilai harga dari input form
 * @returns {number} Angka murni
 */
export function parsePrice(value) {
  if (!value) return 0;
  
  // Jika sudah number, langsung pastikan positif
  if (typeof value === 'number') return Math.max(0, value);

  // Jika string dari input form, hapus semua karakter selain angka
  const cleanString = String(value).replace(/[^0-9]/g, '');
  const parsed = parseFloat(cleanString);

  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Format angka atau string desimal dari DB menjadi rupiah untuk tampilan UI Frontend.
 * Contoh dari DB: "100000.00" atau 100000 -> "Rp 100.000"
 * 
 * @param {number|string} amount - Nilai angka dari DB (misal: "100000.00")
 * @returns {string} String terformat Rupiah
 */
export function formatRupiah(amount) {
  if (amount === null || amount === undefined || amount === '') return 'Rp 0';

  // Parse string "100000.00" langsung ke desimal tanpa menghapus titik
  const numericValue = typeof amount === 'number' ? amount : parseFloat(amount);

  if (isNaN(numericValue)) return 'Rp 0';

  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(numericValue);
}

/**
 * Validasi apakah harga tidak melebihi batas PostgreSQL DECIMAL(10, 2)
 * Maksimal: Rp 99.999.999
 * 
 * @param {number|string} value - Nilai harga yang akan divalidasi
 * @returns {boolean} True jika dalam rentang aman
 */
export function isValidPriceRange(value) {
  const numericValue = parsePrice(value);
  return numericValue >= 0 && numericValue <= 99999999;
}
