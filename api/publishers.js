import publishersHandler from '../routes/api/publishers.js';

export default async function handler(req, res) {
  return publishersHandler(req, res);
}
