import { useState, useEffect } from 'react';
import { cn } from '@utils/cn';
import { Icon } from '@components/icon/Icon';

interface ButtonFloatingProps {
  isUp?: boolean;
  container?: HTMLElement | null;
  className?: string;
}

export default function ButtonFloating({
  isUp = true,
  container,
  className,
}: ButtonFloatingProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleScrollToBottom = () => {
    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth',
      });
    } else {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = container ? container.scrollTop : window.scrollY;
      const scrollHeight = container ? container.scrollHeight : document.body.scrollHeight;
      const clientHeight = container ? container.clientHeight : window.innerHeight;

      if (isUp) {
        setIsVisible(scrollTop > 1);
      } else {
        const isNearBottom = scrollTop + clientHeight >= scrollHeight - 10;
        setIsVisible(!isNearBottom);
      }
    };

    const target = container || window;
    handleScroll();
    target.addEventListener('scroll', handleScroll);

    return () => {
      target.removeEventListener('scroll', handleScroll);
    };
  }, [isUp, container]);

  if (!isVisible) {
    return null;
  }

  return (
    <button
      type='button'
      onClick={isUp ? handleScrollToTop : handleScrollToBottom}
      className={cn(
        'fixed bottom-[2.6rem] right-[2.3rem] flex h-[5rem] w-[5rem] items-center justify-center rounded-full bg-white shadow-[0_0_8px_0_rgba(0,0,0,0.08)]',
        className
      )}
    >
      <Icon
        name='ic_up'
        className={isUp ? '' : 'rotate-180'}
      />
    </button>
  );
}
