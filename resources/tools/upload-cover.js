import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { uploadCover } from '../libs/uploadCover.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runBulkUpload() {
  const coversDir = path.resolve(__dirname, '../../storage/images/covers');

  if (!fs.existsSync(coversDir)) {
    console.error(`❌ Folder tidak ditemukan: ${coversDir}`);
    return;
  }

  const files = fs.readdirSync(coversDir).filter((file) =>
    /\.(jpg|jpeg|png|webp)$/i.test(file)
  );

  console.log(`🚀 Mengunggah ${files.length} gambar dari ${coversDir}...\n`);

  for (const file of files) {
    const filePath = path.join(coversDir, file);
    const fileBuffer = fs.readFileSync(filePath);
    
    const ext = path.extname(file).toLowerCase().replace('.', '');
    const mimeType = ext === 'png' ? 'image/png' : 'image/jpeg';
    const bookTitle = file.split('.')[0]; // Nama file sebagai judul dasar

    try {
      const result = await uploadCover(fileBuffer, mimeType, 'general', bookTitle);
      console.log(`✅ [${file}] -> ${result.url}`);
    } catch (err) {
      console.error(`❌ Gagal [${file}]:`, err.message);
    }
  }
}

runBulkUpload();
