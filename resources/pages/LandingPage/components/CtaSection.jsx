import React from 'react';
import { useNavigate } from 'react-router';

export default function CtaSection() {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-6 pb-24">
      <div className="bg-venice-blue-800 rounded-[2.5rem] p-10 md:p-20 text-center relative overflow-hidden shadow-2xl">
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-rock-blue/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-merino/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 space-y-6 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black text-merino leading-tight">
            Siap Memulai Petualangan Membacamu Hari Ini?
          </h2>
          <p className="text-rock-blue-light text-lg md:text-xl">
            Daftar sekarang dan dapatkan voucher diskon 20% untuk pembelian pertama kamu di Babooku!
          </p>
          <div className="pt-6 flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => navigate('/auth/register')}
              className="bg-merino text-venice-blue-900 px-10 py-4 rounded-xl font-bold text-lg hover:bg-rock-blue hover:text-venice-blue-950 transition-colors shadow-xl"
            >
              Daftar Gratis
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
