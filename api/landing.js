import landingHandler from '../routes/api/landing.js';

export default async function handler(req, res) {
  return landingHandler(req, res);
}
