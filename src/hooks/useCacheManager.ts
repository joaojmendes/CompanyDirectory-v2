import { useCallback } from 'react';
import { useIndexedDBCache } from '@spteck/m365-hooks';

export interface ICacheManager {
  clearAllCaches: () => Promise<void>;
  // Organization cache methods
  orgCache: {
    getData: (key: string) => Promise<unknown>;
    setData: (key: string, data: unknown) => Promise<void>;
    deleteData: (key: string) => Promise<void>;
    clearAllCache: () => Promise<void>;
  };
}

/**
 * Advanced cache management hook for Company Directory
 * Provides centralized cache operations and performance monitoring
 */
export const useCacheManager = (): ICacheManager => {
  // Organization chart data cache with 2 hour expiration
  const orgCache = useIndexedDBCache(2 * 60 * 60 * 1000);

  /**
   * Clear all application caches
   */
  const clearAllCaches = useCallback(async (): Promise<void> => {
    try {
      await orgCache.clearAllCache();
    } catch (error) {
      console.error('[CacheManager] Error clearing caches:', error);
      throw error;
    }
  }, [orgCache]);

  return {
    clearAllCaches,
    orgCache: {
      getData: orgCache.getData,
      setData: orgCache.setData,
      deleteData: orgCache.deleteData,
      clearAllCache: orgCache.clearAllCache,
    },
  };
};

/**
 * Cache key generation utilities
 */
export const CacheKeys = {
  /**
   * Generate cache key for user data
   */
  userData: (userPrincipalName: string): string => 
    `user_${userPrincipalName}`,

  /**
   * Generate cache key for direct reports
   */
  directReports: (userPrincipalName: string, page?: string): string => 
    `directReports_${userPrincipalName}_${page || 'initial'}`,

  /**
   * Generate cache key for peers
   */
  peers: (userPrincipalName: string, page?: string): string => 
    `peers_${userPrincipalName}_${page || 'initial'}`,

  /**
   * Generate cache key for managers
   */
  managers: (userPrincipalName: string): string => 
    `managers_${userPrincipalName}`,

  /**
   * Generate cache key for search results
   */
  search: (query: string, filters?: string): string => 
    `search_${query}_${filters || 'none'}`,

  /**
   * Generate cache key for organization tree
   */
  orgTree: (rootUserId: string, depth: number = 3): string => 
    `orgTree_${rootUserId}_depth${depth}`,
};

/**
 * Cache performance monitoring utilities
 */
export const CacheMonitor = {
  logCacheAccess: (_operation: string, _key: string, _hit: boolean): void => {
    // Performance monitoring - no-op in production
  },

  logCachePerformance: (_operation: string, _key: string, _duration: number): void => {
    // Performance monitoring - no-op in production
  },
};
