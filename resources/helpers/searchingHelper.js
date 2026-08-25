/**
 * Helper untuk menangani perubahan input pencarian.
 * @param {string} value - Nilai input teks dari user
 * @param {Function} setSearchQuery - Function state setter React
 */
export function handleSearchInput(value, setSearchQuery) {
  setSearchQuery(value);
}

/**
 * Memfilter daftar buku berdasarkan kata kunci pencarian (Judul, Penulis, ISBN).
 * @param {Array} books - List buku asli dari state/API
 * @param {string} query - Kata kunci pencarian
 * @returns {Array} - List buku yang sudah difilter
 */
export function filterBooksBySearch(books = [], query = '') {
  if (!query || query.trim() === '') return books;

  const cleanQuery = query.toLowerCase().trim();

  return books.filter((book) => {
    const titleMatch = book.title?.toLowerCase().includes(cleanQuery);
    const authorMatch = book.author?.toLowerCase().includes(cleanQuery);
    const isbnMatch = book.isbn?.toLowerCase().includes(cleanQuery);
    const publisherMatch = book.publisher_name?.toLowerCase().includes(cleanQuery);

    return titleMatch || authorMatch || isbnMatch || publisherMatch;
  });
}
