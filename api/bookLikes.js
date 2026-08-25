import bookLikesHandler from '../routes/api/bookLikes.js';

export default async function handler(req, res) {
  return bookLikesHandler(req, res);
}
