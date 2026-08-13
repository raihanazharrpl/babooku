import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper function untuk meminta input dari terminal
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

async function generateEnvExample() {
  const envPath = path.resolve(__dirname, '../../.env');
  const examplePath = path.resolve(__dirname, '../../.env.example');

  // 1. Cek apakah file .env ada
  if (!fs.existsSync(envPath)) {
    console.error('\x1b[31m%s\x1b[0m', '❌ Error: File .env tidak ditemukan!');
    console.log('Pastikan file .env sudah ada di root project sebelum menjalankan command ini.\n');
    process.exit(1);
  }

  // 2. Jika .env.example sudah ada, minta konfirmasi untuk menimpa
  if (fs.existsSync(examplePath)) {
    console.log('\x1b[33m%s\x1b[0m', '⚠️ File .env.example sudah ada!');
    const confirm = await askQuestion(
      'Apakah Anda yakin ingin memperbarui .env.example? (y/N): '
    );

    if (confirm !== 'y' && confirm !== 'yes') {
      console.log('\x1b[36m%s\x1b[0m', '🚫 Proses dibatalkan.');
      process.exit(0);
    }
  }

  try {
    // 3. Baca isi .env
    const envContent = fs.readFileSync(envPath, 'utf8');

    // 4. Transformasi baris demi baris
    const lines = envContent.split(/\r?\n/);
    const exampleLines = lines.map((line) => {
      const trimmed = line.trim();

      // Biarkan baris kosong atau komentar (dimulai dengan #) tetap seperti semula
      if (!trimmed || trimmed.startsWith('#')) {
        return line;
      }

      // Jika ada pasangan KEY=VALUE, ambil KEY-nya saja dan kosongkan nilainya
      const equalIndex = line.indexOf('=');
      if (equalIndex !== -1) {
        const key = line.substring(0, equalIndex);
        return `${key}=`;
      }

      return line;
    });

    const exampleContent = exampleLines.join('\n');

    // 5. Tulis ke .env.example
    fs.writeFileSync(examplePath, exampleContent, 'utf8');

    console.log('\n\x1b[32m%s\x1b[0m', '✅ .env.example berhasil dibuat!');
    console.log(`📄 Path: \x1b[36m.env.example\x1b[0m\n`);
  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', '❌ Gagal membuat .env.example:', error.message);
    process.exit(1);
  }
}

generateEnvExample();
