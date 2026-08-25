import React from 'react';

export default function StorePagination() {
  return (
    <div className="mt-12 flex justify-center">
      <div className="flex items-center gap-2 bg-white border border-merino-300 p-1.5 rounded-xl shadow-sm">
        <button className="px-3 py-1.5 text-sm font-semibold text-venice-blue-400 cursor-not-allowed">Prev</button>
        <button className="w-8 h-8 rounded-lg bg-venice-blue-900 text-merino font-bold text-sm flex items-center justify-center">1</button>
        <button className="px-3 py-1.5 text-sm font-semibold text-venice-blue-800 hover:bg-merino-100 rounded-lg transition-colors">Next</button>
      </div>
    </div>
  );
}
