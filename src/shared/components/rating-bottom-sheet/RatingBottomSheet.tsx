import React, { useRef, useState } from 'react';

import BottomSheet from '@components/bottom-sheet/BottomSheet';
import Button from '@components/button/Button';
import { Icon } from '@components/icon/Icon';
import { cn } from '@shared/utils/cn';

interface RatingBottomSheetProps {
  reservationId: number;
  foodTruckId: number;
  isOpen: boolean;
  handleCloseBottomSheet: () => void;
}

const RATES: number[] = [1, 2, 3, 4, 5];

export default function RatingBottomSheet({
  reservationId,
  foodTruckId,
  isOpen,
  handleCloseBottomSheet,
}: RatingBottomSheetProps) {
  const [selectedRate, setSelectedRate] = useState<number>(0);

  const [isDragging, setIsDragging] = useState(false);

  const rowRef = useRef<HTMLDivElement | null>(null);
  const starRefs = useRef<(SVGSVGElement | null)[]>([]);

  // x좌표로부터  판단
  const calcRateFromClientX = (clientX: number) => {
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
  };

  const handleDragStart = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!rowRef.current) return;
    rowRef.current.setPointerCapture(e.pointerId);
    setIsDragging(true);
    setSelectedRate(calcRateFromClientX(e.clientX));
  };

  const handleDragMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setSelectedRate(calcRateFromClientX(e.clientX));
  };

  const handleDragEnd = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!rowRef.current) return;
    try {
      rowRef.current.releasePointerCapture(e.pointerId);
    } catch (error) {
      console.error(error);
    }
    setIsDragging(false);
  };

  const handleRegisterRate = () => {
    alert(
      `${reservationId} / ${foodTruckId}에 대한 별점: ${String(selectedRate)}`
    );
    handleCloseBottomSheet();
  };

  const renderStar = (rate: number) => {
    const isFull = rate <= Math.floor(selectedRate);
    const isHalf = !isFull && selectedRate === rate - 0.5;

    const iconName = isFull
      ? 'ic_star_full'
      : isHalf
        ? 'ic_star_half'
        : 'ic_star';
    const colorClass =
      isFull || isHalf ? 'text-primary-700' : 'text-grayscale-50';

    return (
      <Icon
        key={rate}
        name={iconName}
        className={cn(
          'cursor-pointer outline-none focus:outline-none',
          colorClass
        )}
        width={60}
        height={60}
        ref={el => {
          starRefs.current[rate - 1] = el;
        }}
        aria-hidden='true'
        focusable='false'
      />
    );
  };

  return (
    <BottomSheet
      isOpen={isOpen}
      handleCloseBottomSheet={handleCloseBottomSheet}
      sheetContent={
        <div className='flex flex-col px-[0.5rem]'>
          <div className='flex flex-col gap-[0.2rem] py-[2rem]'>
            <h2 className='heading-sb-18'>예약하신 푸드트럭은 어떠셨나요?</h2>
            <span className='text-grayscale-500 body-m-14'>
              세밀한 평가를 위해 0.5 단위로 선택가능합니다.
            </span>
          </div>

          <div
            ref={rowRef}
            className='mx-auto mb-[5rem] mt-[3rem] flex touch-none flex-row gap-[0.4rem]'
            onPointerDown={handleDragStart}
            onPointerMove={handleDragMove}
            onPointerUp={handleDragEnd}
            onPointerCancel={handleDragEnd}
          >
            {RATES.map(rate => renderStar(rate))}
          </div>

          <Button
            variant='cta'
            buttonStyle={selectedRate === 0 ? 'disabled' : 'active'}
            handleClickButton={handleRegisterRate}
          >
            평점 등록하기
          </Button>
        </div>
      }
      sheetHeight={340}
    />
  );
}
