import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Ambil nama seeder dari argumen terminal (misal: UserSeeder)
const seederNameInput = process.argv[2];

if (!seederNameInput) {
  console.error('\x1b[31m%s\x1b[0m', '❌ Error: Harap masukkan nama seeder!');
  console.log('Contoh: npm run make:seeder UserSeeder\n');
  process.exit(1);
}

// Format nama seeder (menghilangkan ekstensi jika ditulis manual dan memastikan PascalCase/Huruf Depan Kapital)
let cleanName = seederNameInput.replace(/\.js$/i, '');
cleanName = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);

// Append 'Seeder' di belakang jika user lupa mengetiknya
if (!cleanName.endsWith('Seeder')) {
  cleanName += 'Seeder';
}

const fileName = `${cleanName}.js`;

// 2. Tentukan target folder database/seeders/
const targetDir = path.resolve(__dirname, '../../database/seeders');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// 🔒 FITUR KEAMANAN: Cek apakah seeder dengan nama ini sudah ada
const filePath = path.join(targetDir, fileName);

if (fs.existsSync(filePath)) {
  console.error(
    '\x1b[31m%s\x1b[0m',
    `🚫 Cancelled: Seeder '${fileName}' sudah ada di folder database/seeders/!`
  );
  process.exit(1);
}

// 3. Boilerplate Template Seeder
const functionName = `run${cleanName}`;
const seederTemplate = `import mysql from 'mysql2/promise';

export async function ${functionName}(connection) {
  // Tulis logic query seeder kamu di sini
  // Example:
  // const data = [
  //   ['Nama Data 1', 'value1'],
  //   ['Nama Data 2', 'value2']
  // ];
  // await connection.query('INSERT INTO table_name (column1, column2) VALUES ?', [data]);

  console.log('  └─ ✅ ${cleanName} executed successfully.');
}
`;

// 4. Tulis file
try {
  fs.writeFileSync(filePath, seederTemplate, 'utf8');
  console.log('\x1b[32m%s\x1b[0m', `✅ Seeder created successfully!`);
  console.log(`📄 Path: database/seeders/${fileName}`);
} catch (error) {
  console.error('\x1b[31m%s\x1b[0m', '❌ Gagal membuat file seeder:', error.message);
}
