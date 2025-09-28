import BottomSheet from '../bottom-sheet/BottomSheet';
import Button from '../button/Button';
import { Icon } from '../icon/Icon';

interface RatingBottomSheetProps {
  isOpen: boolean;
  handleCloseBottomSheet: () => void;
}

export default function RatingBottomSheet({
  isOpen,
  handleCloseBottomSheet,
}: RatingBottomSheetProps) {
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
          <div className='mx-auto mb-[5rem] mt-[3rem] flex flex-row'>
            {[1, 2, 3, 4, 5].map(rate => (
              <Icon
                key={rate}
                name='ic_star_half'
                className='text-primary-700'
                width={60}
                height={60}
              />
            ))}
          </div>

          <Button variant='cta' buttonStyle='disabled'>
            평점 등록하기
          </Button>
        </div>
      }
      sheetHeight={340}
    />
  );
}
