import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

export const useTitle = (title: string): void => {
  useIsomorphicLayoutEffect((): void => {
    if (title.trim().length > 0) {
      document.title = title.trim();
    }
  }, [title]);
};
