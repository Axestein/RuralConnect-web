// src/components/common/OfflineIndicator.tsx
'use client';

import { useState, useEffect } from 'react';
import { WifiOff } from 'lucide-react';

export default function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div className="bg-yellow-500 text-white py-2 px-4">
      <div className="container mx-auto flex items-center justify-center">
        <WifiOff className="h-5 w-5 mr-2" />
        <span>You are offline. Some features may be limited.</span>
      </div>
    </div>
  );
}