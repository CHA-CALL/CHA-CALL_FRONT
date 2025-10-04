import type { ChangeEvent } from 'react';
import ErrorText from '@components/error-text/ErrorText';
import ButtonAddImage from '@components/button-add-image/ButtonAddImage';
import ImagePreview from '@components/image-preview/ImagePreview';

interface MenuImageInputProps {
  value: File | null;
  error?: string;
  onChange: (_value: File | null) => void;
}

export default function MenuImageInput({
  value,
  error,
  onChange,
}: MenuImageInputProps) {
  const canAdd = !value || (value instanceof File && value.size === 0);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      onChange(selectedFile);
    }
    e.target.value = '';
  };

  const handleRemoveFile = () => {
    onChange(null);
  };

  return (
    <>
      <div className='flex items-center justify-between mb-[0.6rem]'>
        <span className='ml-[0.5rem] title-sb-14 text-grayscale-900'>
          사진 등록
        </span>
        <div className='caption-m-12 flex items-center gap-[0.1rem] mr-[0.5rem]'>
          <p className='text-primary-700'>{value ? 1 : 0}</p>
          <p className='text-grayscale-700'>/</p>
          <p className='text-grayscale-700'>{1}</p>
        </div>
      </div>
      <div className='flex pt-[1rem]'>
        {canAdd && (
          <ButtonAddImage handleFileChange={handleFileChange} />
        )}
        {value && value.size > 0 && (
          <ImagePreview
            key='menu-image'
            handleClose={handleRemoveFile}
            src={URL.createObjectURL(value)}
            alt='menu-image'
          />
        )}
      </div>
      {error && (
        <div className='mt-[0.5rem] mb-[0.5rem]'>
          <ErrorText text={error} />
        </div>
      )}
    </>
  );
}
