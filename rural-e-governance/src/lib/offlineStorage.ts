// src/lib/cache/offlineStorage.ts

export class OfflineCache {
  private static instance: OfflineCache;
  private cacheName = 'tutor-cache-v1';

  static getInstance(): OfflineCache {
    if (!OfflineCache.instance) {
      OfflineCache.instance = new OfflineCache();
    }
    return OfflineCache.instance;
  }

  async saveResponse(question: string, answer: string, language: string): Promise<void> {
    if (typeof window === 'undefined') return;
    
    const cache = await caches.open(this.cacheName);
    const key = `${question}-${language}`;
    const response = new Response(JSON.stringify({
      answer,
      timestamp: Date.now(),
      language
    }));
    await cache.put(key, response);
  }

  async getResponse(question: string, language: string): Promise<string | null> {
    if (typeof window === 'undefined') return null;
    
    const cache = await caches.open(this.cacheName);
    const key = `${question}-${language}`;
    const cached = await cache.match(key);
    
    if (cached) {
      const data = await cached.json();
      // Check if cache is less than 7 days old
      if (Date.now() - data.timestamp < 7 * 24 * 60 * 60 * 1000) {
        return data.answer;
      }
    }
    return null;
  }

  async clearCache(): Promise<void> {
    if (typeof window === 'undefined') return;
    const cache = await caches.open(this.cacheName);
    const keys = await cache.keys();
    await Promise.all(keys.map(key => cache.delete(key)));
  }
}