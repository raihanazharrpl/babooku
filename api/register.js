import registerHandler from '../routes/api/register.js';

export default async function handler(req, res) {
  return registerHandler(req, res);
}
