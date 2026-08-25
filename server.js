// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Handlers
import loginHandler from './routes/api/login.js';
import registerHandler from './routes/api/register.js';
import booksHandler from './routes/api/books.js';
import categoriesHandler from './routes/api/categories.js';
import uploadHandler from './routes/api/upload.js'; // <-- TAMBAHKAN INI
import generateKeywordsHandler from './routes/api/generateKeywords.js';
import tagsHandler from './routes/api/tags.js'; // <-- Tambahkan ini
import discountsHandler from './routes/api/discounts.js'; // <-- Tambahkan ini
import bookLikesHandler from './routes/api/bookLikes.js'; // Impor di bagian atas
import publishersHandler from './routes/api/publishers.js'; // Impor di bagian atas
import landingHandler from './app/Controllers/landing.controller.js';

// Daftarkan di bagian API:

// Tambahkan di bagian daftarkan Endpoint API:

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Endpoint API
app.all('/api/login', (req, res) => loginHandler(req, res));
app.all('/api/register', (req, res) => registerHandler(req, res));
app.all('/api/books', (req, res) => booksHandler(req, res));
app.all('/api/categories', (req, res) => categoriesHandler(req, res));
app.all('/api/upload', (req, res) => uploadHandler(req, res)); // <-- TAMBAHKAN INI
app.all('/api/generate-keywords', (req, res) => generateKeywordsHandler(req, res));
app.all('/api/tags', (req, res) => tagsHandler(req, res)); // <-- Tambahkan ini
app.all('/api/discounts', (req, res) => discountsHandler(req, res));
app.all('/api/books/likes', (req, res) => bookLikesHandler(req, res));
app.all('/api/publishers', (req, res) => publishersHandler(req, res));

app.all('/api/landing', (req, res) => landingHandler(req, res));
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

export default app;
