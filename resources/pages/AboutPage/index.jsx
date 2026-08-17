// resources/pages/AboutPage/index.jsx
import React from 'react'
import { 
  Users, Code, Wrench, Search, FileText, Target, 
  CheckCircle2, Clock, Sparkles, BookOpen, Layers
} from 'lucide-react'

export default function AboutPage() {

  // DATA KELOMPOK & PEMBAGIAN TIM
  const teamSections = [
    {
      title: 'A. Tim Utama (Core / Developer & Designer)',
      desc: 'Memegang kendali penuh atas pembuatan website secara keseluruhan, mulai dari kodingan, desain UI/UX visual, hingga penyusunan dokumentasi sistem online.',
      icon: Code,
      badgeColor: 'bg-venice-blue-900 text-merino border-venice-blue-800',
      members: [
        { name: 'Raihan A', role: 'Pembuat Utama Website, Desain UI/UX & Dokumentasi Online', status: 'process' }
      ]
    },
    {
      title: 'B. Tim Helper & Tool Support',
      desc: 'Membantu menyediakan akses tools/platform pendukung berbayar (AI Pro & Canva Pro) untuk mempermudah proses pembuatan website dan desain.',
      icon: Wrench,
      badgeColor: 'bg-rock-blue/20 text-venice-blue-950 border-rock-blue/40',
      members: [
        { name: 'Arvin', role: 'Membantu menyediakan AI Pro untuk pembuatan website', status: 'done' },
        { name: 'Aditya', role: 'Membantu menyediakan akun Canva Pro untuk desain', status: 'done' }
      ]
    },
    {
      title: 'C. Tim Riset & Konten (Searching & Rangkuman)',
      desc: 'Mencari, mengumpulkan, memvalidasi, dan merangkum data buku beserta atributnya (judul, cover, ISBN, deskripsi, harga) agar siap dimasukkan ke database.',
      icon: Search,
      badgeColor: 'bg-merino text-venice-blue-950 border-merino-300',
      members: [
        { name: 'Dzikrie', role: 'Searching & Perangkuman Data Buku', status: 'done' },
        { name: 'Revan', role: 'Searching & Perangkuman Data Buku', status: 'done' },
        { name: 'Raka', role: 'Membantu Searching & Rangkuman Data', status: 'done' },
        { name: 'Rizki', role: 'Membantu Searching & Rangkuman Data', status: 'done' }
      ]
    },
    {
      title: 'D. Tim Konsep & Visi Misi',
      desc: 'Merumuskan landasan ide, tujuan utama, latar belakang, serta poin Visi & Misi dari proyek website yang dibuat.',
      icon: Target,
      badgeColor: 'bg-venice-blue-50 text-venice-blue-900 border-venice-blue-200',
      members: [
        { name: 'Azzam', role: 'Merumuskan Visi & Misi Proyek', status: 'done' },
        { name: 'Nugi', role: 'Merumuskan Visi & Misi Proyek', status: 'done' }
      ]
    },
    {
      title: 'E. Tim Laporan & Dokumentasi Fisik',
      desc: 'Menyusun dan menulis ulang seluruh lembar laporan fisik/cetak secara rapi sesuai dengan format tugas yang ditentukan.',
      icon: FileText,
      badgeColor: 'bg-white text-venice-blue-900 border-merino-300',
      members: [
        { name: 'Sabrina', role: 'Penulisan Ulang Lembar Laporan Fisik', status: 'done' },
        { name: 'Auriza', role: 'Penulisan Ulang Lembar Laporan Fisik', status: 'done' }
      ]
    }
  ]

  return (
    <div className="bg-merino-50 min-h-screen font-sans text-venice-blue-950 pb-20">
      
      {/* 1. HERO HEADER PORTFOLIO */}
      <div className="bg-gradient-to-r from-venice-blue-950 via-venice-blue-900 to-venice-blue-800 text-merino py-12 md:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-rock-blue/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center space-y-3 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-merino/10 backdrop-blur-md text-rock-blue-light text-xs font-semibold uppercase tracking-wider border border-merino/20">
            <Sparkles className="w-3.5 h-3.5" /> Laporan Tugas Kelompok 1
          </span>
          <h1 className="text-3xl md:text-5xl font-black">
            Dokumentasi & Portofolio Proyek Babooku
          </h1>
          <p className="text-merino-200 text-sm md:text-base max-w-2xl mx-auto font-light">
            Penjelasan rinci mengenai struktur pengerjaan tugas, pembagian peran anggota kelompok, serta arah Visi dan Misi platform.
          </p>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 space-y-12">
        
        {/* 2. VISI & MISI SECTION */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-merino-300/60 shadow-md space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl font-bold text-venice-blue-900 flex items-center justify-center gap-2">
              <Target className="w-6 h-6 text-rock-blue-dark" /> Visi & Misi Proyek
            </h2>
            <p className="text-xs text-venice-blue-700/80">Landasan utama dikembangkannya platform toko buku online Babooku.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* CARD VISI */}
            <div className="bg-merino-50 p-6 rounded-2xl border border-merino-300/80 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-rock-blue-dark bg-white px-3 py-1 rounded-md border border-merino-200">
                Visi Kelompok
              </span>
              <p className="text-sm text-venice-blue-950 font-medium leading-relaxed pt-1">
                "Mewujudkan platform e-commerce literasi terdepan di Indonesia yang memberikan kemudahan akses buku original dalam berbagai format (Fisik & Digital) untuk membangun masyarakat gemar membaca."
              </p>
            </div>

            {/* CARD MISI */}
            <div className="bg-venice-blue-50 p-6 rounded-2xl border border-venice-blue-100 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-venice-blue-900 bg-white px-3 py-1 rounded-md border border-venice-blue-200">
                Misi Utama
              </span>
              <ul className="text-xs text-venice-blue-900 space-y-2 list-disc list-inside leading-relaxed pt-1">
                <li>Menyediakan platform belanja buku yang aman, modern, dan intuitif.</li>
                <li>Menjamin keaslian (100% Original) dari seluruh katalog buku yang dijual.</li>
                <li>Mendukung variasi format modern seperti E-Book dan Audiobook.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 3. PEMBAGIAN TIM & TUGAS */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-merino-300 pb-4">
            <div>
              <h2 className="text-2xl font-bold text-venice-blue-900 flex items-center gap-2">
                <Users className="w-6 h-6 text-rock-blue-dark" /> Pembagian Tugas & Tim Kerja
              </h2>
              <p className="text-xs text-venice-blue-700/80 mt-1">Struktur organisasi dan rincian peranan 11 anggota Kelompok 1.</p>
            </div>
            <span className="text-xs font-mono font-bold bg-venice-blue-900 text-merino px-3 py-1.5 rounded-xl hidden sm:inline-block">
              Total: 11 Anggota
            </span>
          </div>

          <div className="space-y-6">
            {teamSections.map((sec, idx) => {
              const Icon = sec.icon
              return (
                <div key={idx} className="bg-white rounded-3xl p-6 border border-merino-300/60 shadow-sm space-y-4">
                  
                  {/* Header Sub-Tim */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-merino-200">
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-xl border ${sec.badgeColor}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-base text-venice-blue-950">{sec.title}</h3>
                        <p className="text-xs text-venice-blue-700/80">{sec.desc}</p>
                      </div>
                    </div>
                  </div>

                  {/* List Anggota di Sub-Tim Ini */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                    {sec.members.map((mem, mIdx) => (
                      <div key={mIdx} className="bg-merino-50/60 p-3.5 rounded-2xl border border-merino-200 flex items-center justify-between gap-3">
                        <div className="space-y-0.5">
                          <h4 className="font-bold text-sm text-venice-blue-950">{mem.name}</h4>
                          <p className="text-xs text-venice-blue-700/80">{mem.role}</p>
                        </div>

                        {/* Status Badge */}
                        <div className="shrink-0">
                          {mem.status === 'done' ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Selesai
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg">
                              <Clock className="w-3.5 h-3.5" /> Proses
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              )
            })}
          </div>
        </div>

      </div>

    </div>
  )
}
