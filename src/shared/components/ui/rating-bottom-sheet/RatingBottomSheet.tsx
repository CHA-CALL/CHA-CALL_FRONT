import BottomSheet from '@layout/bottom-sheet/BottomSheet';
import Button from '@ui/button/Button';
import { Icon } from '@icon/Icon';
import { cn } from '@utils/cn';
import { RATES } from '@constant/rate';

import useStarRating from '@shared/components/layout/rating-bottom-sheet/hooks/use-star-rating';

interface RatingBottomSheetProps {
  reservationId: number;
  foodTruckId: number;
  isOpen: boolean;
  handleCloseBottomSheet: () => void;
}

export default function RatingBottomSheet({
  reservationId,
  foodTruckId,
  isOpen,
  handleCloseBottomSheet,
}: RatingBottomSheetProps) {
  const {
    selectedRate,
    rowRef,
    starRefs,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
    handleRegisterRate,
  } = useStarRating({
    reservationId,
    foodTruckId,
    handleCloseBottomSheet,
  });

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
      sheetHeight={340}
    >
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
          role='slider'
          aria-label='별점'
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
    </BottomSheet>
  );
}
