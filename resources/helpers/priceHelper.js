/**
 * Sanitasi dan ubah input harga (string/number) menjadi Number murni yang aman untuk DB.
 * Contoh: "95.000", "Rp 95,000", "95000.00" -> 95000
 * 
 * @param {string|number} value - Nilai harga dari input form
 * @returns {number} Angka murni
 */
export function parsePrice(value) {
  if (!value) return 0;
  
  // Jika sudah number, langsung kembalikan
  if (typeof value === 'number') return Math.max(0, value);

  // Jika string, hapus semua karakter selain angka
  const cleanString = String(value).replace(/[^0-9]/g, '');
  const parsed = parseFloat(cleanString);

  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Format angka dari DB menjadi rupiah untuk tampilan UI Frontend.
 * Contoh: 95000 -> "Rp 95.000"
 * 
 * @param {number|string} amount - Nilai angka dari DB
 * @returns {string} String terformat Rupiah
 */
export function formatRupiah(amount) {
  const numericValue = parsePrice(amount);
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
 * @param {number|string} value 
 * @returns {boolean}
 */
export function isValidPriceRange(value) {
  const numericValue = parsePrice(value);
  return numericValue >= 0 && numericValue <= 99999999;
}
