import bookReviewsHandler from '../routes/api/bookReviews.js';

export default async function handler(req, res) {
  return bookReviewsHandler(req, res);
}
