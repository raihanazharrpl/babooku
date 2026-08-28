import { getSocket } = from '../utils/whatsappSocket.js';

export function listenOtpBot() {
  const sock = getSocket();

  sock.ev.on('messages.upsert', async (m) => {
    const msg = m.messages[0];
    if (!msg.message || msg.key.fromMe) return;

    const from = msg.key.remoteJid;
    const text = msg.message.conversation || msg.message.extendedTextMessage?.text || '';

    if (text.toLowerCase() === 'ping') {
      await sock.sendMessage(from, { text: 'Bot OTP Aktif 🚀' });
    }
  });
}

export async function sendOtp(targetNumber, otpCode) {
  const sock = getSocket();
  const formattedNumber = targetNumber.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
  
  return await sock.sendMessage(formattedNumber, {
    text: `Kode OTP Anda adalah: *${otpCode}*\nJangan bagikan kode ini kepada siapapun.`
  });
}
