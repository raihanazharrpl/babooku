import React from 'react';
import { Library, Users, Star, BookMarked, Loader2 } from 'lucide-react';

export default function StatsSection({ statsData, isLoading }) {
  const stats = [
    { icon: Library, value: `${statsData.totalBooks}+`, label: 'Judul Buku' },
    { icon: Users, value: `${statsData.totalUsers}+`, label: 'Pembaca Setia' },
    { icon: Star, value: `${statsData.avgRating}/5`, label: 'Rating Toko' },
    { icon: BookMarked, value: `${statsData.totalPublishers}+`, label: 'Penerbit Resmi' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 relative z-20 -mt-24 sm:-mt-20">
      <div className="bg-white rounded-3xl p-6 md:p-10 shadow-xl shadow-venice-blue-950/5 border border-merino-300/50 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 divide-x-0 md:divide-x divide-merino-200">
        {stats.map((stat, idx) => (
          <div key={idx} className="flex flex-col items-center text-center space-y-2 md:px-4">
            <div className="p-3 bg-venice-blue-50 text-venice-blue-700 rounded-2xl mb-2">
              <stat.icon className="w-6 h-6 md:w-8 md:h-8" />
            </div>
            <h4 className="text-2xl md:text-3xl font-black text-venice-blue-900">
              {isLoading ? <Loader2 className="w-6 h-6 animate-spin mx-auto text-venice-blue-600" /> : stat.value}
            </h4>
            <p className="text-sm md:text-base font-medium text-venice-blue-600/70">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
