import busboy from 'busboy';
import { uploadCover } from '#resources/libs/uploadCover.js';

export default async function uploadHandler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  return new Promise((resolve) => {
    const bb = busboy({ headers: req.headers });
    let fileBuffer = [];
    let mimeType = '';
    let categoryFolder = 'general';
    let subcategoryFolder = ''; 
    let bookTitle = 'book';

    bb.on('field', (name, val) => {
      if (name === 'categoryFolder') categoryFolder = val;
      if (name === 'subcategoryFolder') subcategoryFolder = val;
      if (name === 'bookTitle') bookTitle = val;
    });

    bb.on('file', (name, file, info) => {
      mimeType = info.mimeType;
      file.on('data', (data) => fileBuffer.push(data));
    });

    bb.on('finish', async () => {
      try {
        const buffer = Buffer.concat(fileBuffer);

        if (buffer.length === 0) {
          res.status(400).json({ success: false, message: 'File gambar tidak ditemukan.' });
          return resolve();
        }

        // Gabungkan folder kategori & subkategori (misal: "fiction/novel" atau "fiction")
        const targetFolder = subcategoryFolder && subcategoryFolder !== 'null'
          ? `${categoryFolder}/${subcategoryFolder}`
          : categoryFolder;

        const result = await uploadCover(buffer, mimeType, targetFolder, bookTitle);

        res.status(200).json({ success: true, ...result });
        resolve();
      } catch (error) {
        console.error('[UPLOAD ERROR]:', error.message);
        res.status(500).json({ success: false, message: error.message });
        resolve();
      }
    });

    req.pipe(bb);
  });
}
