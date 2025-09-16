import { useState, useEffect } from 'react';
import { Icon } from '@components/icon/Icon';

export default function ButtonFloating() {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsVisible(scrollTop > 1);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <button
      type='button'
      onClick={handleScrollToTop}
      className={`
        fixed bottom-[2.6rem] right-[2.4rem] w-[5rem] h-[5rem]
        flex items-center justify-center pr-[0.1rem] pb-[0.3rem]
        rounded-full bg-white shadow-[0_0_8px_0_rgba(0,0,0,0.08)]
      `}
    >
      <Icon name='ic_up' />
    </button>
  );
};
