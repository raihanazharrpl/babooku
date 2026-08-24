import uploadHandler from '#routes/api/upload.js';

export default async function handler(req, res) {
  return uploadHandler(req, res);
}
