import React from 'react';
import { useNavigate } from 'react-router';
import { Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { getAssetUrl } from '#resources/helpers/assetsHelper.js';

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <div className="relative w-full aspect-[3/4] md:aspect-auto md:h-[88vh] overflow-hidden bg-venice-blue-950">
      {/* Background Image dengan Smooth Scale Animasi */}
      <motion.img 
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        src={getAssetUrl('static/wallpaper-landing-page.jpg')} 
        alt="Perpustakaan Babooku" 
        className="absolute inset-0 w-full h-full object-cover object-center transform-gpu"
      />
      
      {/* Dark Overlay untuk menjaga kontras teks dan tombol */}
      <div className="absolute inset-0 bg-gradient-to-b from-venice-blue-950/90 via-venice-blue-950/75 to-venice-blue-950/80 flex flex-col justify-between px-6 pt-12 md:pt-20 pb-28 sm:px-12 md:px-20">
        
        {/* Badge Banner */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="inline-flex items-center gap-2 bg-merino/15 backdrop-blur-md text-merino text-xs md:text-sm font-semibold tracking-widest uppercase px-5 py-2.5 rounded-full border border-merino/25 shadow-xl">
            <Sparkles className="w-4 h-4 text-rock-blue-light" /> Platform Bacaan #1 di Indonesia
          </span>
        </motion.div>

        {/* Hero Content */}
        <div className="max-w-4xl space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-4xl sm:text-6xl md:text-7xl font-display font-black text-white leading-tight drop-shadow-2xl"
          >
            Buka Halaman Baru, <br className="hidden md:block" />
            Jelajahi <span className="text-transparent bg-clip-text bg-gradient-to-r from-rock-blue-light to-rock-blue italic">Dunia Tanpa Batas</span>.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="text-merino-100 text-lg md:text-2xl font-light max-w-2xl leading-relaxed drop-shadow-md"
          >
            Ribuan buku original menunggumu. Dari literatur klasik hingga best-seller masa kini, semua ada di Babooku dengan penawaran terbaik setiap harinya.
          </motion.p>
          
          {/* Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center gap-4 pt-4"
          >
            <motion.button 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/store')}
              className="w-full sm:w-auto bg-rock-blue text-venice-blue-950 px-8 py-4 rounded-xl font-bold hover:bg-rock-blue-light transition-all shadow-xl flex items-center justify-center gap-2 text-lg"
            >
              Mulai Belanja <ArrowRight className="w-5 h-5" />
            </motion.button>

            <motion.button 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/about')}
              className="w-full sm:w-auto bg-white/10 backdrop-blur-md text-white border border-white/40 px-8 py-4 rounded-xl font-semibold hover:bg-white/20 hover:border-white transition-all shadow-lg text-lg"
            >
              Pelajari Babooku
            </motion.button>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
