import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function generateCloudflareApi() {
  // 1. Path source (routes/api) dan target (functions/api)
  const sourceDir = path.resolve(__dirname, '../../routes/api');
  const targetDir = path.resolve(__dirname, '../../functions/api');

  // 2. Validasi keberadaan folder source
  if (!fs.existsSync(sourceDir)) {
    console.error('\x1b[31m%s\x1b[0m', '❌ Error: Folder routes/api tidak ditemukan!');
    console.log(`Path: ${sourceDir}\n`);
    process.exit(1);
  }

  // 3. Buat folder target functions/api jika belum ada
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

    console.log(`\n🚀 Memproses ${jsFiles.length} file route untuk Cloudflare Functions...\n`);

    let createdCount = 0;
    let skippedCount = 0;

    jsFiles.forEach((file) => {
      const fileNameWithoutExt = path.parse(file).name;
      const handlerName = `${fileNameWithoutExt}Handler`;
      const targetFilePath = path.join(targetDir, file);

      // Template wrapper Cloudflare Pages Function (Web Standard)
      const wrapperContent = `import ${handlerName} from '../../routes/api/${file}';

export async function onRequest(context) {
  const { request, env } = context;

  try {
    // Memanggil handler dengan parameter Request dan Context Environment
    const response = await ${handlerName}(request, env);
    return response;
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
`;

      const isExist = fs.existsSync(targetFilePath);

      // Tulis file di folder functions/api/
      fs.writeFileSync(targetFilePath, wrapperContent, 'utf8');

      if (isExist) {
        console.log('\x1b[33m%s\x1b[0m', `  🔄 Updated : functions/api/${file}`);
        skippedCount++;
      } else {
        console.log('\x1b[32m%s\x1b[0m', `  ✨ Created : functions/api/${file}`);
        createdCount++;
      }
    });

    console.log('\n\x1b[32m%s\x1b[0m', '✅ Berhasil generate Cloudflare Functions handlers!');
    console.log(`📦 Ringkasan: ${createdCount} dibuat baru, ${skippedCount} diperbarui.\n`);
  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', '❌ Gagal melakukan generate:', error.message);
    process.exit(1);
  }
}

generateCloudflareApi();
