import React, { useRef, useState } from 'react';

export default function useImageDrag(photoUrl: string[]) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [startImageDragX, setStartImageDragX] = useState(0);
  const [translateImageX, setTranslateImageX] = useState(0);
  const [isImageDragging, setIsImageDragging] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setStartImageDragX(clientX);
    setIsImageDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isImageDragging) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const deltaX = clientX - startImageDragX;
    setTranslateImageX(deltaX);
  };

  const handleTouchEnd = () => {
    if (!isImageDragging) return;
    if (translateImageX > 50 && currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    } else if (
      translateImageX < -50 &&
      currentImageIndex < photoUrl.length - 1
    ) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
    setTranslateImageX(0);
    setIsImageDragging(false);
  };

  return {
    imageRef,
    currentImageIndex,
    translateImageX,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
}
