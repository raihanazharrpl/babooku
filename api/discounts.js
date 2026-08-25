import discountsHandler from '../routes/api/discounts.js';

export default async function handler(req, res) {
  return discountsHandler(req, res);
}
