import BottomSheet from '@layout/bottom-sheet/BottomSheet';
import Button from '@ui/button/Button';

interface LeaveChatBottomSheetProps {
  isOpen: boolean;
  handleLeaveChat: () => void;
  handleCloseBottomSheet: () => void;
}


export default function LeaveChatBottomSheet({
  isOpen,
  handleLeaveChat,
  handleCloseBottomSheet,
}: LeaveChatBottomSheetProps) {
  return (
    <BottomSheet
      isOpen={isOpen}
      sheetHeight={164}
      handleCloseBottomSheet={handleCloseBottomSheet}
    >
      <Button
        variant='cta'
        buttonStyle='sub'
        className='title-sb-14 border-none py-[2rem]'
        handleClickButton={handleLeaveChat}
      >
        나가기
      </Button>
      <Button
        variant='cta'
        buttonStyle='sub'
        handleClickButton={handleCloseBottomSheet}
      >
        취소
      </Button>
    </BottomSheet>
  );
}
