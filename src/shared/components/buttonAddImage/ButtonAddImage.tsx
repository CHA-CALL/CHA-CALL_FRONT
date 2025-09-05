import { useRef, type ChangeEvent } from 'react';
import { Icon } from '@components/icon/Icon';
import { cn } from '@utils/cn';

interface ButtonAddImageProps {
  onFileSelect?: (_file: File) => void
  multiple?: boolean
}

export default function ButtonAddImage({
  onFileSelect,
  multiple = false,
}: ButtonAddImageProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      if (multiple) {
        Array.from(files).forEach(file => onFileSelect?.(file));
      } else {
        onFileSelect?.(files[0]);
      }
    }
    event.target.value = '';
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type='file'
        accept='image/*'
        multiple={multiple}
        onChange={handleFileChange}
        className='hidden'
      />
      <button
        type='button'
        onClick={handleButtonClick}
        className={cn(
          'flex flex-col items-center',
          'pl-[2.1rem] pr-[2rem] pt-[2.1rem] pb-[1.8rem] rounded-[1.6rem]',
          'bg-white border border-grayscale-200',
          'hover:bg-grayscale-50 duration-200',
        )}
      >
        <Icon name='ic_camera' />
        <span className='mt-[0.6rem] text-grayscale-300 text-[1rem]'>
          서류 첨부
        </span>
      </button>
    </>
  )
}
