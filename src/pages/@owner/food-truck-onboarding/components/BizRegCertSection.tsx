import ButtonAddImage from '@ui/button-add-image/ButtonAddImage';
import { OWNER_MEDIA_MAX_COUNT } from '@pages/@owner/food-truck-onboarding/constants/owner';
import SectionTitle from '@pages/@owner/food-truck-onboarding/components/SectionTitle';
import type { OwnerFormData } from '@pages/@owner/food-truck-onboarding/hooks/use-food-truck-input';
import { useEffect, useState, type ChangeEvent } from 'react';
import ImagePreview from '@ui/image-preview/ImagePreview';
import ErrorText from '@form/error-text/ErrorText';

interface BizRegCertSectionProps {
  file: OwnerFormData['bizRegCert'];
  onChange: (_value: File | undefined) => void;
  error?: string;
}

export default function BizRegCertSection({
  file,
  onChange,
  error,
}: BizRegCertSectionProps) {
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      onChange(selectedFile);
    }
    e.target.value = '';
  };

  const handleRemoveFile = () => {
    onChange(undefined);
    setImageUrl(undefined);
  };

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      return () => {
        URL.revokeObjectURL(url);
      };
    } else {
      setImageUrl(undefined);
    }
  }, [file]);

  return (
    <section className='flex w-full flex-col items-start justify-center gap-[1.6rem]'>
      <SectionTitle
        title='사업자 등록증'
        maxLength={OWNER_MEDIA_MAX_COUNT.BIZ_REG_CERT}
        currentLength={imageUrl ? 1 : 0}
      />
      {!imageUrl && <ButtonAddImage handleFileChange={handleFileChange} />}
      {imageUrl && (
        <ImagePreview
          handleClose={handleRemoveFile}
          src={imageUrl || undefined}
          alt='bizRegCert'
        />
      )}
      {error && <ErrorText text={error} />}
    </section>
  );
}
