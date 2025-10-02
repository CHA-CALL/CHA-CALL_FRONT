import React, { useCallback, useRef, useState } from 'react';

import { RATES } from '@shared/constant/rate';

interface UseStarRatingProps {
  reservationId: number;
  foodTruckId: number;
  handleCloseBottomSheet: () => void;
}

export default function useStarRating({
  reservationId,
  foodTruckId,
  handleCloseBottomSheet,
}: UseStarRatingProps) {
  const [selectedRate, setSelectedRate] = useState<number>(0);

  const [isDragging, setIsDragging] = useState(false);

  const rowRef = useRef<HTMLDivElement | null>(null);
  const starRefs = useRef<(SVGSVGElement | null)[]>([]);

  // x좌표로부터  판단
  const calculateRateFromClientX = useCallback(
    (clientX: number) => {
      const stars = starRefs.current.filter(Boolean) as SVGSVGElement[];
      if (!stars.length) return selectedRate;

      // 각 별 범위 검사
      for (let i = 0; i < stars.length; i++) {
        const rect = stars[i].getBoundingClientRect();
        if (clientX >= rect.left && clientX <= rect.right) {
          const isLeftHalf = clientX < rect.left + rect.width / 2;
          const rate = RATES[i];
          return isLeftHalf ? rate - 0.5 : rate;
        }
      }

      // 별 사이의 공백을 드래그할 때: 가장 가까운 쪽으로
      let nearestIdx = 0;
      let nearestDist = Infinity;
      stars.forEach((star, i) => {
        const rect = star.getBoundingClientRect();
        const center = rect.left + rect.width / 2;
        const dist = Math.abs(center - clientX);
        if (dist < nearestDist) {
          nearestDist = dist;
          nearestIdx = i;
        }
      });
      const nearestRect = stars[nearestIdx].getBoundingClientRect();
      const isLeftHalf = clientX < nearestRect.left + nearestRect.width / 2;
      const rate = RATES[nearestIdx];
      return isLeftHalf ? rate - 0.5 : rate;
    },
    [selectedRate]
  );

  const handleDragStart = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!rowRef.current) return;
      rowRef.current.setPointerCapture(e.pointerId);
      setIsDragging(true);
      setSelectedRate(calculateRateFromClientX(e.clientX));
    },
    [calculateRateFromClientX]
  );

  const handleDragMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDragging) return;
      setSelectedRate(calculateRateFromClientX(e.clientX));
    },
    [isDragging, calculateRateFromClientX]
  );

  const handleDragEnd = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!rowRef.current) return;
    try {
      rowRef.current.releasePointerCapture(e.pointerId);
    } catch (error) {
      console.error(error);
    }
    setIsDragging(false);
  }, []);

  const handleRegisterRate = useCallback(() => {
    alert(
      `${reservationId} / ${foodTruckId}에 대한 별점: ${String(selectedRate)}`
    );
    handleCloseBottomSheet();
  }, [reservationId, foodTruckId, selectedRate, handleCloseBottomSheet]);

  return {
    selectedRate,
    rowRef,
    starRefs,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
    handleRegisterRate,
  };
}
