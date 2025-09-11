import { Icon } from '@shared/components/icon/Icon';

interface ImagePreviewProps {
  handleClose: () => void;
  src: string;
  alt: string;
}

export default function ImagePreview({
  handleClose,
  src,
  alt,
}: ImagePreviewProps) {
  return (
    <div className='relative w-[8rem] h-[8rem] flex items-center justify-center rounded-[1.6rem]'>
      <img
        className='max-w-full max-h-full cursor-pointer rounded-[1.6rem] flex items-center justify-center object-cover'
        src={src}
        alt={alt}
      />
      <button
        type='button'
        onClick={handleClose}
        className='absolute top-[-0.4rem] right-[-0.4rem] flex px-[0.64rem] py-[0.64rem] bg-grayscale-900 rounded-full'
      >
        <Icon name='ic_close_white' width={12} height={12} />
      </button>
    </div>
  );
}
