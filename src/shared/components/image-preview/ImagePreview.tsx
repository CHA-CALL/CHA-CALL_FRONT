import { Icon } from '@shared/components/icon/Icon';
import { cn } from '@utils/cn';
import type { DraggableSyntheticListeners } from '@dnd-kit/core';

interface ImagePreviewProps {
  handleClose: () => void;
  src?: string;
  alt: string;
  className?: string;
  isMain?: boolean;
  dragListeners?: DraggableSyntheticListeners;
}

export default function ImagePreview({
  handleClose,
  src,
  alt,
  className,
  isMain,
  dragListeners,
  ...props
}: ImagePreviewProps) {
  if (!src) {
    return null;
  }

  return (
    <div
      className={cn(
        'border-grayscale-200 relative flex h-[8rem] w-[8rem] flex-none items-center justify-center rounded-[1.6rem] border',
        className
      )}
      {...props}
    >
      <img
        className='flex h-full w-full cursor-pointer items-center justify-center rounded-[1.6rem] object-cover'
        src={src}
        alt={alt}
        {...dragListeners}
      />
      {isMain && (
        <div className='bg-black70 absolute bottom-[0rem] left-[0rem] right-[0rem] flex h-[2.4rem] items-center justify-center rounded-b-[1.6rem] text-white'>
          대표 이미지
        </div>
      )}
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
