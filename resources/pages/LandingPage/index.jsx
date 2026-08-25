import React, { useState, useEffect } from 'react';
import HeroSection from './components/HeroSection.jsx';
import StatsSection from './components/StatsSection.jsx';
import FeaturesSection from './components/FeaturesSection.jsx';
import TopCategoriesSection from './components/TopCategoriesSection.jsx';
import TopBooksSection from './components/TopBooksSection.jsx';
import CtaSection from './components/CtaSection.jsx';

export default function LandingPage() {
  const [landingData, setLandingData] = useState({
    stats: { totalBooks: 0, totalUsers: 0, avgRating: 4.9, totalPublishers: 0 },
    topSubcategories: [],
    topLikedBooks: []
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchLandingData();
  }, []);

  const fetchLandingData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/landing');
      const json = await res.json();
      if (json.success) {
        setLandingData(json.data);
      }
    } catch (error) {
      console.error('Gagal mengambil data landing page:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-merino-50 overflow-x-hidden font-sans text-venice-blue-950">
      <HeroSection />
      <StatsSection statsData={landingData.stats} isLoading={isLoading} />
      <FeaturesSection />
      <TopCategoriesSection categories={landingData.topSubcategories} isLoading={isLoading} />
      <TopBooksSection books={landingData.topLikedBooks} isLoading={isLoading} />
      <CtaSection />
    </div>
  );
}
