// resources/stores/useAuthStore.js
import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true, error: null })

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      // [PENTING]: Cegah error "Unexpected end of JSON input"
      // Kita ambil text mentah dulu, baru diubah ke JSON.
      const textData = await response.text()
      
      let data = {}
      try {
        data = textData ? JSON.parse(textData) : {}
      } catch (parseError) {
        // Jika response bukan JSON (misal HTML error halaman Vercel), tangkap disini
        throw new Error('Respons server tidak valid (Bukan JSON).')
      }

      // Cek Status HTTP (400, 401, 500)
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Gagal masuk, periksa kembali data Anda.')
      }

      // Berhasil
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))

      set({ user: data.user, token: data.token, loading: false, error: null })
      return { success: true }
      
    } catch (err) {
      set({ error: err.message, loading: false })
      return { success: false, error: err.message }
    }
  },

  // === TAMBAHKAN FUNGSI REGISTER INI ===
  register: async (name, email, password) => {
    set({ loading: true, error: null })

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })

      const textData = await response.text()
      
      let data = {}
      try {
        data = textData ? JSON.parse(textData) : {}
      } catch (parseError) {
        throw new Error('Respons server tidak valid (Bukan JSON).')
      }

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Gagal mendaftar, silakan periksa data Anda.')
      }

      // Auto-Login setelah mendaftar
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))

      set({ user: data.user, token: data.token, loading: false, error: null })
      return { success: true }
      
    } catch (err) {
      set({ error: err.message, loading: false })
      return { success: false, error: err.message }
    }
  },

  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    set({ user: null, token: null, error: null })
  },
}))