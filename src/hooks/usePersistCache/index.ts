import { useCallback } from 'react';
import { ApolloCache, NormalizedCacheObject } from '@apollo/client';
import { LocalStorageWrapper, persistCache } from 'apollo3-cache-persist';

interface IReturn {
  cb: (cache: ApolloCache<NormalizedCacheObject>) => Promise<void>;
}

export const usePersistCache = (): IReturn => {
  const cb = useCallback(async (cache: ApolloCache<NormalizedCacheObject>) => {
    try {
      await persistCache({
        cache,
        storage: new LocalStorageWrapper(window.localStorage),
      });
    } catch (error) {
      console.log('Error restoring Apollo cache', error);
    }
  }, []);

  return { cb };
};
