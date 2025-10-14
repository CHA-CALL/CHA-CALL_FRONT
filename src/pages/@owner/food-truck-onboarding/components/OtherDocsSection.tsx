import type { OwnerFormData } from '@pages/@owner/food-truck-onboarding/hooks/use-food-truck-input';
import SectionTitle from '@pages/@owner/food-truck-onboarding/components/SectionTitle';
import { OWNER_MEDIA_MAX_COUNT } from '@pages/@owner/food-truck-onboarding/constants/owner';
import ButtonAddImage from '@shared/components/button-add-image/ButtonAddImage';
import { useEffect, useState, type ChangeEvent } from 'react';
import ImagePreview from '@shared/components/image-preview/ImagePreview';
import ErrorText from '@shared/components/error-text/ErrorText';
import { IMAGE_INFO_MESSAGE } from '@shared/constant/image';

interface OtherDocsSectionProps {
  files: File[];
  onChange: (_value: OwnerFormData['otherDocs']) => void;
  error?: string;
}

export default function OtherDocsSection({
  files,
  onChange,
  error,
}: OtherDocsSectionProps) {
  const [imageUrl, setImageUrl] = useState<string[] | null>([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      onChange([...files, selectedFile]);
    }
    e.target.value = '';
  };

  const removeFile = (indexToRemove: number) => {
    const updatedFiles = files.filter((_, index) => index !== indexToRemove);
    onChange(updatedFiles);
  };

  const canAdd = files.length < OWNER_MEDIA_MAX_COUNT.OTHER_DOCS;

  useEffect(() => {
    const urls = files.map(file => URL.createObjectURL(file));
    setImageUrl(urls);

    return () => {
      urls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [files]);

  return (
    <section className='flex w-full flex-col items-start justify-center gap-[1.2rem]'>
      <div className='flex w-full flex-col items-start justify-center gap-[0.2rem]'>
        <SectionTitle
          title='기타 서류'
          maxLength={OWNER_MEDIA_MAX_COUNT.OTHER_DOCS}
          currentLength={files?.length || 0}
        />
        <p className='text-grayscale-500 caption-m-11'>
          영업신고증 (자동차등록증, 위생증, 보건증, 가스완성검사증명서) 필요
        </p>
      </div>
      <div className='scrollbar-hide flex w-full items-start justify-start gap-[1rem] overflow-x-scroll pr-[1rem] pt-[0.8rem]'>
        {canAdd && <ButtonAddImage handleFileChange={handleFileChange} />}
        {files &&
          files.map((_, index) => (
            <ImagePreview
              key={`otherDocs-${index}`}
              handleClose={() => removeFile(index)}
              src={imageUrl?.[index] || undefined}
              alt='otherDocs'
            />
          ))}
      </div>
      <p className='caption-m-12 text-grayscale-300'>{IMAGE_INFO_MESSAGE}</p>
      {error && <ErrorText text={error} />}
    </section>
  );
}
