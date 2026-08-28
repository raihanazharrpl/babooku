// resources/components/Helper/ScrollToTop.jsx
import { useEffect } from 'react'
import { useLocation } from 'react-router'

export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    // Reset scroll window utama
    window.scrollTo(0, 0)
    
    // Reset scroll pada elemen main (jika ada scrollbar internal)
    const mainElement = document.querySelector('main')
    if (mainElement) {
      mainElement.scrollTop = 0
    }
  }, [pathname])

  return null
}
