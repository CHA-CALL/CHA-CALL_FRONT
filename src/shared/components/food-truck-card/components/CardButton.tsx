import React from 'react';
import { cn } from '@utils/cn';
import { Icon, type IconId } from '@components/icon/Icon';

interface CardButtonProps {
  isHeart?: boolean;
  isLiked?: boolean;
  handleClick: () => void;
  buttonIcon: IconId;
  className?: string;
}

export default function CardButton({
  isHeart = false,
  isLiked = false,
  handleClick,
  buttonIcon,
  className,
}: CardButtonProps) {
  const handleClickButton = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleClick();
  }

  return (
    <button
      type='button'
      onClick={handleClickButton}
      className={cn(
        'ml-auto text-grayscale-700',
        className,
      )}
    >
      {isHeart
        ? <Icon name='ic_heart_fill' className={isLiked ? 'text-primary-700' : ''} />
        : <Icon name={buttonIcon} />
      }
    </button>
  );
}