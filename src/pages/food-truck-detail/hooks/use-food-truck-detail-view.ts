import React, { useEffect, useRef, useState } from 'react';

export default function useFoodTruckDetailView(photoUrl?: string[]) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchMode, setIsSearchMode] = useState(false);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [startImageDragX, setStartImageDragX] = useState(0);
  const [translateImageX, setTranslateImageX] = useState(0);
  const [isImageDragging, setIsImageDragging] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  const [isViewAllLocation, setIsViewAllLocation] = useState(false);

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
    if (!photoUrl || !isImageDragging) return;
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

  const handleViewAllLocation = () => {
    setIsViewAllLocation(!isViewAllLocation);
  };

  const handleCloseSearchMode = () => {
    setIsSearchMode(false);
  };

  const handleOpenSearchMode = () => {
    setIsSearchMode(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 180);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return {
    isScrolled,
    imageRef,
    currentImageIndex,
    translateImageX,
    isViewAllLocation,
    isSearchMode,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleViewAllLocation,
    handleOpenSearchMode,
    handleCloseSearchMode,
  };
}
