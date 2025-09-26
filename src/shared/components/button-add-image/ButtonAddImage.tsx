import { useRef, type ChangeEvent } from 'react';
import { Icon } from '@components/icon/Icon';
import { cn } from '@shared/utils/cn';

interface ButtonAddImageProps {
  handleFileChange?: (_event: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export default function ButtonAddImage({
  handleFileChange,
  className,
}: ButtonAddImageProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <button
      type='button'
      className={cn(
        'border-grayscale-200 hover:bg-grayscale-50 flex h-[8rem] w-[8rem] flex-none flex-shrink-0 cursor-pointer flex-col items-center justify-center rounded-[1.6rem] border bg-white duration-200',
        className
      )}
      onClick={handleClick}
    >
      <input
        ref={fileInputRef}
        type='file'
        accept='image/*'
        onChange={handleFileChange}
        className='hidden h-full w-full'
      />
      <Icon name='ic_camera' className='text-grayscale-300' />
      <span className='text-grayscale-300 caption-m-10 mt-[0.4rem]'>
        서류 첨부
      </span>
    </button>
  );
}
