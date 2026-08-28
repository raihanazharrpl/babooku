import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Handlers
import loginHandler from './routes/api/login.js';
import registerHandler from './routes/api/register.js';
import booksHandler from './routes/api/books.js';
import categoriesHandler from './routes/api/categories.js';
import uploadHandler from './routes/api/upload.js';
import generateKeywordsHandler from './routes/api/generateKeywords.js';
import tagsHandler from './routes/api/tags.js';
import discountsHandler from './routes/api/discounts.js';
import bookLikesHandler from './routes/api/bookLikes.js';
import publishersHandler from './routes/api/publishers.js';
import landingHandler from './app/Controllers/landing.controller.js';
import ordersHandler from './routes/api/orders.js';
import cartHandler from './routes/api/cart.js';
import otpHandler from './routes/api/otp.js'; // <-- Impor handler OTP

// WA Socket & Bot Integrations
import { initWhatsApp } from './resources/utils/whatsappSocket.js';
import { listenOtpBot } from './resources/libs/otpBot.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Endpoint API
app.all('/api/login', (req, res) => loginHandler(req, res));
app.all('/api/register', (req, res) => registerHandler(req, res));
app.all('/api/books', (req, res) => booksHandler(req, res));
app.all('/api/categories', (req, res) => categoriesHandler(req, res));
app.all('/api/upload', (req, res) => uploadHandler(req, res));
app.all('/api/generate-keywords', (req, res) => generateKeywordsHandler(req, res));
app.all('/api/tags', (req, res) => tagsHandler(req, res));
app.all('/api/discounts', (req, res) => discountsHandler(req, res));
app.all('/api/books/likes', (req, res) => bookLikesHandler(req, res));
app.all('/api/publishers', (req, res) => publishersHandler(req, res));
app.all('/api/orders', (req, res) => ordersHandler(req, res));
app.all('/api/cart', (req, res) => cartHandler(req, res));
app.all('/api/otp', (req, res) => otpHandler(req, res)); // <-- Register endpoint /api/otp

app.all('/api/landing', (req, res) => landingHandler(req, res));

// Inisialisasi WhatsApp Service & Express Server
async function startServer() {
  try {
    // Start WhatsApp Socket Connection
    await initWhatsApp();
    listenOtpBot();

    if (process.env.NODE_ENV !== 'production') {
      const PORT = process.env.PORT || 3000;
      app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
      });
    }
  } catch (err) {
    console.error('Failed to start WhatsApp Service:', err);
  }
}

startServer();

export default app;
