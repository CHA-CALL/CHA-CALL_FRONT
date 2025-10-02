import { Icon, type IconId } from '@components/icon/Icon';

interface CardButtonProps {
  isHeart?: boolean;
  isLiked?: boolean;
  handleClick: () => void;
  ButtonIcon: IconId;
  className?: string;
}

export default function CardButton({
  isHeart = false,
  isLiked = false,
  handleClick,
  ButtonIcon,
  className,
}: CardButtonProps) {
  return (
    <button
      type='button'
      onClick={handleClick}
      className={className}
    >
      {isHeart
        ? (isLiked
            ? <Icon name='ic_heart_fill' className='text-primary-700' />
            : <Icon name='ic_heart_fill' />
        )
        : <Icon name={ButtonIcon} />
      }
    </button>
  );
}