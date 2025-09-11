import { Icon } from '../icon/Icon';

interface ImagePreviewProps {
  handleClose: () => void;
  children: React.ReactNode;
}

export default function ImagePreview({
  handleClose,
  children,
}: ImagePreviewProps) {
  return (
    <div className='relative w-[8rem] h-[8rem] flex items-center flex-shrink-0 rounded-[1.6rem]'>
      <div className='object-cover w-full h-full cursor-pointer rounded-[1.6rem]'>
        {children}
      </div>
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
