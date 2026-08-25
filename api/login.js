import loginHandler from '../routes/api/login.js';

export default async function handler(req, res) {
  return loginHandler(req, res);
}
