import { useEffect } from 'react';

const useBodyScrollLock = (shouldLock: boolean | null) => {
  useEffect(() => {
    if (shouldLock) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [shouldLock]);
};

export default useBodyScrollLock;