import { useState, useEffect, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@router/constant/routes';
import type { MenuFormData } from '@pages/@owner/menu/hooks/use-form-validation';

interface UseMenuFormProps {
  foodTruckId: string;
  initialImageUrl?: string;
  formData: MenuFormData;
  updateName: (_name: string) => void;
  updateImage: (_image: File | null) => void;
}

export const useMenuForm = ({
  foodTruckId,
  initialImageUrl,
  formData,
  updateName,
  updateImage,
}: UseMenuFormProps) => {
  const navigate = useNavigate();

  const [imageUrl, setImageUrl] = useState<string>(initialImageUrl || '');
  const canAdd = !imageUrl;

  useEffect(() => {
    if (formData.image) {
      const reader = new FileReader();
      reader.onload = e => {
        setImageUrl(e.target?.result as string);
      };
      reader.readAsDataURL(formData.image);
    } else {
      setImageUrl(initialImageUrl || '');
    }
  }, [formData.image, initialImageUrl]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      updateImage(selectedFile);
    }
    e.target.value = '';
  };

  const handleRemoveFile = () => {
    setImageUrl('');
    updateImage(null);
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
