import { useRef, type ChangeEvent } from 'react';
import { Icon } from '@components/icon/Icon';

interface ButtonAddImageProps {
  handleFileChange?: (_event: ChangeEvent<HTMLInputElement>) => void;
}

export default function ButtonAddImage({
  handleFileChange,
}: ButtonAddImageProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className='flex flex-col w-[8rem] h-[8rem] items-center justify-center rounded-[1.6rem] bg-white border border-grayscale-200 hover:bg-grayscale-50 duration-200 cursor-pointer'
      onClick={handleClick}
    >
      <input
        ref={fileInputRef}
        type='file'
        accept='image/*'
        onChange={handleFileChange}
        className='hidden w-full h-full'
      />
      <Icon name='ic_camera' />
      <span className='caption-m-10 mt-[0.4rem] text-grayscale-300'>
        서류 첨부
      </span>
    </div>
  );
}
