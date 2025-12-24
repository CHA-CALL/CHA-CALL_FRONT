import { useState } from 'react';

export const useBottomSheet = () => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const handleOpenBottomSheet = () => {
    setIsBottomSheetOpen(true);
  };

  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };

  return {
    isBottomSheetOpen,
    handleOpenBottomSheet,
    handleCloseBottomSheet,
  };
};
