import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function generateVercelApi() {
  // 1. Tentukan path source (routes/api) dan target (api/)
  const sourceDir = path.resolve(__dirname, '../../routes/api');
  const targetDir = path.resolve(__dirname, '../../api');

  // 2. Validasi apakah folder source ada
  if (!fs.existsSync(sourceDir)) {
    console.error('\x1b[31m%s\x1b[0m', '❌ Error: Folder routes/api tidak ditemukan!');
    console.log(`Path: ${sourceDir}\n`);
    process.exit(1);
  }

  // 3. Buat folder target /api jika belum ada
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  try {
    // 4. Baca semua file di folder routes/api/
    const files = fs.readdirSync(sourceDir);
    const jsFiles = files.filter((file) => file.endsWith('.js'));

    if (jsFiles.length === 0) {
      console.log('\x1b[33m%s\x1b[0m', '⚠️ Tidak ada file .js ditemukan di folder routes/api/');
      process.exit(0);
    }

    console.log(`\n🚀 Memproses ${jsFiles.length} file route...\n`);

    let createdCount = 0;
    let skippedCount = 0;

    jsFiles.forEach((file) => {
      const fileNameWithoutExt = path.parse(file).name; // Misal: 'books'
      const handlerName = `${fileNameWithoutExt}Handler`; // Misal: 'booksHandler'
      const targetFilePath = path.join(targetDir, file);

      // Template wrapper Vercel Serverless Function
      const wrapperContent = `import ${handlerName} from '../routes/api/${file}';

export default async function handler(req, res) {
  return ${handlerName}(req, res);
}
`;

      // Cek apakah file sudah ada di folder api/
      const isExist = fs.existsSync(targetFilePath);

      // Tulis / Timpa file di folder api/
      fs.writeFileSync(targetFilePath, wrapperContent, 'utf8');

      if (isExist) {
        console.log('\x1b[33m%s\x1b[0m', `  🔄 Updated : api/${file}`);
        skippedCount++;
      } else {
        console.log('\x1b[32m%s\x1b[0m', `  ✨ Created : api/${file}`);
        createdCount++;
      }
    });

    console.log('\n\x1b[32m%s\x1b[0m', '✅ Berhasil generate Vercel API handlers!');
    console.log(`📦 Ringkasan: ${createdCount} dibuat baru, ${skippedCount} diperbarui.\n`);
  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', '❌ Gagal melakukan generate:', error.message);
    process.exit(1);
  }
}

generateVercelApi();
