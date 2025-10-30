import { useState, useEffect, type ChangeEvent } from 'react';
import type { MenuFormData } from '@pages/@owner/menu/hooks/use-form-validation';
import { useFormContext } from 'react-hook-form';

interface UseMenuFormProps {
  initialImageUrl?: string;
  updateName: (_name: string) => void;
  updateImageUrl: (_image: File | null) => void;
}

export const useMenuForm = ({
  initialImageUrl,
  updateName,
  updateImageUrl,
}: UseMenuFormProps) => {
  const { watch } = useFormContext<MenuFormData>();
  const imageFile = watch('imageUrl');

  const [imageUrl, setImageUrl] = useState<string | null>(initialImageUrl || null);
  const canAdd = !imageUrl;

  useEffect(() => {
    if (imageFile) {
      const newUrl = URL.createObjectURL(imageFile);
      setImageUrl(newUrl);
      return () => URL.revokeObjectURL(newUrl);
    }
    setImageUrl(initialImageUrl || null);
  }, [imageFile, initialImageUrl]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      updateImageUrl(selectedFile);
    }
    e.target.value = '';
  };

  const handleRemoveFile = () => {
    updateImageUrl(null);
  };

  const handleClearName = () => {
    updateName('');
  };

  return {
    imageUrl,
    canAdd,
    handleFileChange,
    handleRemoveFile,
    handleClearName,
  };
};
