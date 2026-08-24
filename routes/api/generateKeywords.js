import { GoogleGenAI, Type } from '@google/genai';

export default async function generateKeywordsHandler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const { title, author, description } = req.body;

  if (!title) {
    return res.status(400).json({ success: false, message: 'Judul buku wajib diisi.' });
  }

  try {
    // Inisialisasi SDK Gemini (otomatis membaca GEMINI_API_KEY dari .env)
    const ai = new GoogleGenAI({});

    const prompt = `
      Berikan minimal 10-15 keywords pencarian relevan dan relevan tinggi untuk buku berikut:
      - Judul: ${title}
      - Penulis: ${author || 'Tidak diketahui'}
      - Deskripsi: ${description || 'Tidak ada deskripsi'}
      
      Kata kunci harus mencakup genre, topik utama, sinonim, dan target pembaca. 
      Kembalikan dalam bahasa Indonesia, dipisahkan dengan koma.
    `;

    // Menggunakan model Gemini 2.5 Flash dengan Structured Outputs (JSON Schema)
    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            keywords: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Daftar minimal 10 kata kunci relevan',
            },
          },
          required: ['keywords'],
        },
      },
    });

    const result = JSON.parse(response.text);
    // Gabungkan array kata kunci menjadi string dipisahkan koma
    const keywordsString = result.keywords.join(', ');

    return res.status(200).json({
      success: true,
      keywords: keywordsString,
    });
  } catch (error) {
    console.error('[GEMINI API ERROR]:', error);
    return res.status(500).json({ success: false, message: 'Gagal generate keywords dengan AI.' });
  }
}
