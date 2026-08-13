// resources/stores/useAuthStore.js
import { create } from 'zustand'

// Helper untuk cek token awal dari localStorage
const initialToken = localStorage.getItem('token') || null
const initialUser = (() => {
  try {
    const savedUser = localStorage.getItem('user')
    return savedUser ? JSON.parse(savedUser) : null
  } catch (e) {
    return null
  }
})()

export const useAuthStore = create((set) => ({
  user: initialUser,
  token: initialToken,
  isAuthenticated: Boolean(initialToken), // <-- TAMBAHAN PENTING
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

      const textData = await response.text()
      let data = {}
      
      try {
        data = textData ? JSON.parse(textData) : {}
      } catch (parseError) {
        throw new Error('Respons server tidak valid (Bukan JSON).')
      }

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Gagal masuk, periksa kembali data Anda.')
      }

      // Simpan ke localStorage
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))

      // Update state dengan isAuthenticated: true
      set({ 
        user: data.user, 
        token: data.token, 
        isAuthenticated: true, 
        loading: false, 
        error: null 
      })

      return { success: true }
      
    } catch (err) {
      set({ error: err.message, loading: false })
      return { success: false, error: err.message }
    }
  },

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

      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))

      set({ 
        user: data.user, 
        token: data.token, 
        isAuthenticated: true, 
        loading: false, 
        error: null 
      })

      return { success: true }
      
    } catch (err) {
      set({ error: err.message, loading: false })
      return { success: false, error: err.message }
    }
  },

  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    set({ user: null, token: null, isAuthenticated: false, error: null })
  },
}))
