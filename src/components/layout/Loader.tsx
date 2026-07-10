'use client';

import { useState, useEffect } from 'react';

export default function Loader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const visited = sessionStorage.getItem('visited');

    if (visited) {
      setLoading(false);
      return;
    }

    sessionStorage.setItem('visited', 'true');

    const timer = setTimeout(() => {
      setLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex h-screen w-screen items-center justify-center pointer-events-none">
      {/* loader içeriği */}
    </div>
  );
}
