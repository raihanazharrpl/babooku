import { createClient } from '@supabase/supabase-js';

// Memanggil environment variable Supabase (URL dan Anon Key)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Membuat instance koneksi Supabase Client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
