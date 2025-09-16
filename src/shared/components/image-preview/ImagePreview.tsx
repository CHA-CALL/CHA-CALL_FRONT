import { Icon } from '@shared/components/icon/Icon';

interface ImagePreviewProps {
  handleClose: () => void;
  src?: string;
  alt: string;
}

export default function ImagePreview({
  handleClose,
  src,
  alt,
}: ImagePreviewProps) {
  if (!src) {
    return null;
  }

  return (
    <div className='relative flex h-[8rem] w-[8rem] flex-shrink-0 items-center justify-center rounded-[1.6rem]'>
      <img
        className='flex h-[8rem] w-[8rem] cursor-pointer items-center justify-center rounded-[1.6rem] object-cover'
        src={src}
        alt={alt}
      />
      <button
        type='button'
        onClick={handleClose}
        className='absolute right-[-0.4rem] top-[-0.4rem] flex rounded-full bg-grayscale-900 px-[0.64rem] py-[0.64rem]'
      >
        <Icon name='ic_close_white' width={12} height={12} />
      </button>
    </div>
  );
}
