import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import readline from 'readline';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper function untuk meminta input dari terminal menggunakan Promise
const askQuestion = (query) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) =>
    rl.question(query, (answer) => {
      rl.close();
      resolve(answer.trim().toLowerCase());
    })
  );
};

async function generateSecret() {
  const envPath = path.resolve(__dirname, '../../.env');
  const keyName = 'JWT_SECRET';
  
  let envContent = '';
  let keyExists = false;

  // 1. Cek keberadaan file .env dan JWT_SECRET
  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf8');
    const keyRegex = new RegExp(`^${keyName}=.+`, 'm');
    keyExists = keyRegex.test(envContent);
  }

  // 2. Proteksi Konfirmasi 2x jika key sudah ada
  if (keyExists) {
    console.log(
      '\x1b[33m%s\x1b[0m',
      `⚠️ WARNING: '${keyName}' sudah terpasang di file .env!`
    );
    console.log(
      '\x1b[31m%s\x1b[0m',
      'Mengubah JWT Secret akan menyebabkan semua token/session user yang sedang aktif menjadi INVALID.\n'
    );

    // Konfirmasi Pertama
    const confirm1 = await askQuestion(
      `[1/2] Apakah Anda yakin ingin membuat secret baru? (y/N): `
    );

    if (confirm1 !== 'y' && confirm1 !== 'yes') {
      console.log('\x1b[36m%s\x1b[0m', '🚫 Proses dibatalkan.');
      process.exit(0);
    }

    // Konfirmasi Kedua
    const confirm2 = await askQuestion(
      `[2/2] KONFIRMASI AKHIR: Ketik 'y' sekali lagi untuk menimpa '${keyName}': `
    );

    if (confirm2 !== 'y' && confirm2 !== 'yes') {
      console.log('\x1b[36m%s\x1b[0m', '🚫 Proses dibatalkan pada konfirmasi kedua.');
      process.exit(0);
    }

    console.log('\n🔄 Memproses perubahan...');
  }

  // 3. Generate 64-byte random key dalam format Hex (128 karakter hex)
  const secretKey = crypto.randomBytes(64).toString('hex');

  // 4. Update/Tulis ke file .env
  try {
    if (keyExists) {
      // Timpa nilai JWT_SECRET yang sudah ada
      const keyRegex = new RegExp(`^${keyName}=.*$`, 'm');
      envContent = envContent.replace(keyRegex, `${keyName}=${secretKey}`);
    } else if (fs.existsSync(envPath)) {
      // Tambahkan di baris baru jika .env ada tapi JWT_SECRET belum ada
      envContent += envContent.endsWith('\n')
        ? `${keyName}=${secretKey}\n`
        : `\n${keyName}=${secretKey}\n`;
    } else {
      // Buat file .env baru jika belum ada
      envContent = `${keyName}=${secretKey}\n`;
    }

    fs.writeFileSync(envPath, envContent, 'utf8');

    console.log('\n\x1b[32m%s\x1b[0m', '✅ JWT Secret key successfully generated & saved!');
    console.log(`🔑 Key added/updated in .env as \x1b[36m${keyName}\x1b[0m`);
    console.log(`\nGenerated Secret:\n\x1b[33m${secretKey}\x1b[0m\n`);
  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', '❌ Gagal memperbarui file .env:', error.message);
    process.exit(1);
  }
}

generateSecret();
