import { useState, useEffect, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@router/constant/routes';
import type { MenuFormData } from '@pages/@owner/menu/hooks/use-form-validation';

interface UseMenuFormProps {
  foodTruckId: string;
  initialImageUrl?: string;
  formData: MenuFormData;
  updateName: (_name: string) => void;
  updateImageUrl: (_image: File | null) => void;
}

export const useMenuForm = ({
  foodTruckId,
  initialImageUrl,
  formData,
  updateName,
  updateImageUrl,
}: UseMenuFormProps) => {
  const navigate = useNavigate();

  const [imageUrl, setImageUrl] = useState<string>(initialImageUrl || '');
  const canAdd = !imageUrl;

  useEffect(() => {
    if (formData.imageUrl) {
      const reader = new FileReader();
      reader.onload = e => {
        setImageUrl(e.target?.result as string);
      };
      reader.readAsDataURL(formData.imageUrl);
    } else {
      setImageUrl(initialImageUrl || '');
    }
  }, [formData.imageUrl, initialImageUrl]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      updateImageUrl(selectedFile);
    }
    e.target.value = '';
  };

  const handleRemoveFile = () => {
    setImageUrl('');
    updateImageUrl(null);
  };

  const handleClearName = () => {
    updateName('');
  };

  const handleClickBack = () => {
    navigate(ROUTES.MENU_LIST(foodTruckId));
  };

  return {
    imageUrl,
    canAdd,
    handleFileChange,
    handleRemoveFile,
    handleClearName,
    handleClickBack,
  };
};
