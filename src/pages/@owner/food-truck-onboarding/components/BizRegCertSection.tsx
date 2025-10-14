import ButtonAddImage from '@shared/components/button-add-image/ButtonAddImage';
import { OWNER_MEDIA_MAX_COUNT } from '@pages/@owner/food-truck-onboarding/constants/owner';
import SectionTitle from '@pages/@owner/food-truck-onboarding/components/SectionTitle';
import type { OwnerFormData } from '@pages/@owner/food-truck-onboarding/hooks/use-food-truck-input';
import { useEffect, useState, type ChangeEvent } from 'react';
import ImagePreview from '@shared/components/image-preview/ImagePreview';
import ErrorText from '@shared/components/error-text/ErrorText';
import { IMAGE_INFO_MESSAGE } from '@shared/constant/image';

interface BizRegCertSectionProps {
  file: OwnerFormData['bizRegCert'];
  onChange: (_value: OwnerFormData['bizRegCert']) => void;
  error?: string;
}

export default function BizRegCertSection({
  file,
  onChange,
  error,
}: BizRegCertSectionProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      onChange(selectedFile);
    }
    e.target.value = '';
  };

  const handleRemoveFile = () => {
    onChange(undefined);
  };

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        setImageUrl(e.target?.result as string);
      };
      reader.onerror = () => {
        setImageUrl(null);
      };
      reader.readAsDataURL(file);
    } else {
      setImageUrl(null);
    }
  }, [file]);

  return (
    <section className='flex w-full flex-col items-start justify-center gap-[1.2rem]'>
      <SectionTitle
        title='사업자 등록증'
        maxLength={OWNER_MEDIA_MAX_COUNT.BIZ_REG_CERT}
        currentLength={file ? 1 : 0}
      />
      {!file && <ButtonAddImage handleFileChange={handleFileChange} />}
      {file && (
        <ImagePreview
          handleClose={handleRemoveFile}
          src={imageUrl || undefined}
          alt='bizRegCert'
        />
      )}
      <p className='caption-m-12 text-grayscale-300'>{IMAGE_INFO_MESSAGE}</p>
      {error && <ErrorText text={error} />}
    </section>
  );
}
