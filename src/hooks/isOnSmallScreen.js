import { useState, useEffect } from 'react';

const useIsOnSmallScreen = () => {
  const [onSmallScreen, setOnSmallScreen] = useState(false);

  const checkScreenSize = () => {
    setOnSmallScreen(window.innerWidth < 671);
  };

  useEffect(() => {
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  return onSmallScreen;
};

export default useIsOnSmallScreen;
