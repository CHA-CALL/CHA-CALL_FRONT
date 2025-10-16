import BottomSheet from '@components/bottom-sheet/BottomSheet';
import Button from '@components/button/Button';
import { SORT_OPTIONS, SORT_TYPES } from '@pages/@owner/menu/constant/menu-list-sort';

interface ListSortBottomSheetProps {
  isBottomSheetOpen: boolean;
  handleCloseBottomSheet: () => void;
  handleSortByLatest: () => void;
  handleSortByOldest: () => void;
}
export default function ListSortBottomSheet({
  isBottomSheetOpen,
  handleCloseBottomSheet,
  handleSortByLatest,
  handleSortByOldest,
}: ListSortBottomSheetProps
) {
  return (
    <BottomSheet
      isOpen={isBottomSheetOpen}
      handleCloseBottomSheet={handleCloseBottomSheet}
      sheetHeight={200}
    >
      <>
        <button
          type='button'
          onClick={handleSortByLatest}
          className='w-full p-[2rem] title-sb-14 text-grayscale-700 border-b border-grayscale-100'
        >
          {SORT_OPTIONS[SORT_TYPES.LATEST]}
        </button>
        <button
          type='button'
          onClick={handleSortByOldest}
          className='w-full p-[2rem] title-sb-14 text-grayscale-700'
        >
          {SORT_OPTIONS[SORT_TYPES.OLDEST]}
        </button>
        <Button
          variant='cta'
          buttonStyle='sub'
          handleClickButton={handleCloseBottomSheet}
        >
          취소
        </Button>
      </>
    </BottomSheet>
  );
}