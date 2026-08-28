import baileys from '@itsliaaa/baileys';
import pino from 'pino';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = baileys;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let sock = null;

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const question = (text) => new Promise((resolve) => rl.question(text, resolve));

export async function initWhatsApp() {
  const sessionPath = path.join(__dirname, '../../sessions');
  const { state, saveCreds } = await useMultiFileAuthState(sessionPath);

  sock = makeWASocket({
    logger: pino({ level: 'silent' }),
    printQRInTerminal: false,
    auth: state
  });

  sock.ev.on('creds.update', saveCreds);

  if (!sock.authState.creds.registered) {
    const phoneNumber = await question('Masukkan nomor WhatsApp Bot (cth: 628123456789): ');
    setTimeout(async () => {
      const code = await sock.requestPairingCode(phoneNumber.replace(/[^0-9]/g, ''));
      console.log(`\n================================`);
      console.log(`PAIRING CODE ANDA: ${code}`);
      console.log(`================================\n`);
    }, 3000);
  }

  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === 'close') {
      const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
      if (shouldReconnect) initWhatsApp();
    } else if (connection === 'open') {
      console.log('✅ [WA] WhatsApp Client Ready!');
    }
  });

  return sock;
}

export function getSocket() {
  if (!sock) throw new Error("Socket WhatsApp belum diinisialisasi!");
  return sock;
}
