import generateKeywordsHandler from '../routes/api/generateKeywords.js';

export default async function handler(req, res) {
  return generateKeywordsHandler(req, res);
}
