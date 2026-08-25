import tagsHandler from '../routes/api/tags.js';

export default async function handler(req, res) {
  return tagsHandler(req, res);
}
