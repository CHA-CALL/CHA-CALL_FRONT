import BottomSheet from '@components/layout/bottom-sheet/BottomSheet';
import Button from '@components/ui/button/Button';
import { useOwnerChatTemplates } from '@pages/@owner/message-list/hooks/use-owner-message';
import { ROUTES } from '@router/constant/routes';
import { useNavigate } from 'react-router-dom';

interface MessageListBottomSheetProps {
  isOpen: boolean;
  handleSelectQuickMessage: (_message?: string) => void;
  handleCloseBottomSheet: () => void;
}

export default function MessageListBottomSheet({
  isOpen,
  handleSelectQuickMessage,
  handleCloseBottomSheet,
}: MessageListBottomSheetProps) {
  const navigate = useNavigate();
  const { data: messageList } = useOwnerChatTemplates();

  const handleToAddMessageList = () => {
    navigate(ROUTES.MESSAGE_FORM);
  };
  return (
    <BottomSheet
      isOpen={isOpen}
      handleCloseBottomSheet={handleCloseBottomSheet}
      sheetHeight={1000}
    >
      <div className='flex flex-col'>
        <div className='flex flex-row justify-between py-[2rem]'>
          <h2 className='heading-sb-18'>자주 쓰는 문구</h2>
          <Button
            variant='default'
            buttonStyle='edit'
            handleClickButton={handleToAddMessageList}
          >
            + 추가하기
          </Button>
        </div>
        <div className='flex max-h-[30rem] flex-col overflow-y-auto'>
          {messageList?.data?.map((message, index) => (
            <button
              key={message.chatTemplateId}
              type='button'
              className='flex flex-col items-start gap-[0.6rem] py-[1.5rem]'
              onClick={() => handleSelectQuickMessage(message.content)}
            >
              <span className='text-grayscale-700 title-sb-14'>
                {index + 1}
              </span>
              <span className='text-grayscale-700 caption-m-12'>
                {message.content}
              </span>
            </button>
          ))}
        </div>
      </div>
    </BottomSheet>
  );
}
