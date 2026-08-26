import cartHandler from '../routes/api/cart.js';

export default async function handler(req, res) {
  return cartHandler(req, res);
}
