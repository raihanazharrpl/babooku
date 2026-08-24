import categoriesHandler from '../routes/api/categories.js';

export default async function handler(req, res) {
  return categoriesHandler(req, res);
}
