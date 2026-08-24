import booksHandler from '../routes/api/books.js';

export default async function handler(req, res) {
  return booksHandler(req, res);
}
