import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import inquirer from 'inquirer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  // 1. Ambil nama seeder dari CLI argumen jika ada
  let seederNameInput = process.argv[2];

  if (!seederNameInput) {
    const answer = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Masukkan nama seeder (contoh: UserSeeder atau CategorySeeder):',
        validate: (input) => (input.trim() ? true : 'Nama seeder tidak boleh kosong!'),
      },
    ]);
    seederNameInput = answer.name;
  }

  // Format nama seeder (PascalCase & akhiran 'Seeder')
  let cleanName = seederNameInput.replace(/\.js$/i, '').trim();
  cleanName = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);

  if (!cleanName.endsWith('Seeder')) {
    cleanName += 'Seeder';
  }

  const fileName = `${cleanName}.js`;
  const targetDir = path.resolve(__dirname, '../../database/seeders');

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const filePath = path.join(targetDir, fileName);

  if (fs.existsSync(filePath)) {
    console.error(
      '\x1b[31m%s\x1b[0m',
      `🚫 Cancelled: Seeder '${fileName}' sudah ada di folder database/seeders/!`
    );
    process.exit(1);
  }

  // 2. Boilerplate Template Seeder Multi-Database (MySQL & Postgres)
  const seederTemplate = `/**
 * Seeder: ${cleanName}
 * Description: Isikan deskripsi data yang dimasukkan di sini.
 */

// Logic Seeding untuk MySQL
export async function seedMySQL(connection) {
  // Contoh query MySQL:
  // await connection.query(
  //   \`INSERT INTO example (name) VALUES (?) ON DUPLICATE KEY UPDATE name=VALUES(name)\`,
  //   ['Sample Data']
  // );

  console.log('  └─ 🐬 [MySQL] ${cleanName} executed.');
}

// Logic Seeding untuk PostgreSQL / Supabase
export async function seedPostgres(client) {
  // Contoh query Postgres:
  // await client.query(
  //   \`INSERT INTO example (name) VALUES ($1) ON CONFLICT (name) DO NOTHING\`,
  //   ['Sample Data']
  // );

  console.log('  └─ ⚡ [Postgres] ${cleanName} executed.');
}
`;

  // 3. Tulis file
  try {
    fs.writeFileSync(filePath, seederTemplate, 'utf8');
    console.log('\x1b[32m%s\x1b[0m', `✅ Seeder created successfully!`);
    console.log(`📄 Path: database/seeders/${fileName}`);
  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', '❌ Gagal membuat file seeder:', error.message);
  }
}

main();
