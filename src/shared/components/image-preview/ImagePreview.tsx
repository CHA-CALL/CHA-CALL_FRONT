import { Icon } from '@shared/components/icon/Icon';
import { cn } from '@utils/cn';

interface ImagePreviewProps {
  handleClose: () => void;
  src?: string;
  alt: string;
  className?: string;
}

export default function ImagePreview({
  handleClose,
  src,
  alt,
  className,
  ...props
}: ImagePreviewProps) {
  if (!src) {
    return null;
  }

  return (
    <div
      className={cn(
        'relative flex h-[8rem] w-[8rem] flex-none items-center justify-center rounded-[1.6rem]',
        className
      )}
      {...props}
    >
      <img
        className='flex h-full w-full cursor-pointer items-center justify-center rounded-[1.6rem] object-cover'
        src={src}
        alt={alt}
      />
      <button
        type='button'
        onClick={handleClose}
        className='bg-grayscale-900 absolute right-[-0.4rem] top-[-0.4rem] flex rounded-full px-[0.64rem] py-[0.64rem]'
      >
        <Icon name='ic_close_white' width={12} height={12} />
      </button>
    </div>
  );
}
