import type { ChangeEvent } from 'react';
import type { FieldError } from 'react-hook-form';
import { MENU_IMAGE_MAX } from '@pages/@owner/menu/constant/menu';
import ErrorText from '@components/error-text/ErrorText';
import ButtonAddImage from '@components/button-add-image/ButtonAddImage';
import ImagePreview from '@components/image-preview/ImagePreview';

interface MenuImageInputProps {
  value: string[];
  error?: FieldError;
  onChange: (_value: File) => void;
  removeImage: (_index: number) => void;
  imageUrls: string[];
}

export default function MenuImageInput({
  value,
  error,
  onChange,
  removeImage,
  imageUrls,
}: MenuImageInputProps) {
  const canAdd = (value.length || 0) < MENU_IMAGE_MAX;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      onChange(selectedFile);
    }
    e.target.value = '';
  };

  const handleRemoveFile = (indexToRemove: number) => {
    removeImage(indexToRemove);
  };

  return (
    <>
      <div className='flex items-center justify-between mb-[0.6rem]'>
        <span className='ml-[0.5rem] title-sb-14 text-grayscale-900'>
          사진 등록
        </span>
        <div className='caption-m-12 flex items-center gap-[0.1rem] mr-[0.5rem]'>
          <p className='text-primary-700'>{value.length || 0}</p>
          <p className='text-grayscale-700'>/</p>
          <p className='text-grayscale-700'>{MENU_IMAGE_MAX}</p>
        </div>
      </div>
      <div className='flex pt-[1rem]'>
        {canAdd && <ButtonAddImage handleFileChange={handleFileChange} />}
        {value &&
          value.map((_, index) => (
            <ImagePreview
              key={`otherDocs-${index}`}
              handleClose={() => handleRemoveFile(index)}
              src={imageUrls?.[index] || undefined}
              alt='otherDocs'
            />
          ))}
      </div>
      {error && (
        <div className='mt-[0.5rem] mb-[0.5rem]'>
          <ErrorText text={error.message || ''} />
        </div>
      )}
    </>
  );
}