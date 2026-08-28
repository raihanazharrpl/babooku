import { sendOtp } from '@/resources/libs/otpBot.js';

export default async function otpHandler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ status: false, message: 'Method Not Allowed' });
  }

  const { phone, code } = req.body;

  if (!phone || !code) {
    return res.status(400).json({ status: false, message: 'Params phone dan code wajib diisi.' });
  }

  try {
    await sendOtp(phone, code);
    return res.json({ status: true, message: `OTP berhasil dikirim ke ${phone}` });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
}
