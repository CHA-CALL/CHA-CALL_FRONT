import BottomSheet from '@layout/bottom-sheet/BottomSheet';
import Button from '@ui/button/Button';
import ButtonIcon from '@ui/button-icon/ButtonIcon';

interface ChatTemplatesBottomSheetProps {
  isOpen: boolean;
  templates: string[];
  handleAddTemplate: () => void;
  handleCloseBottomSheet: () => void;
}

export default function ChatTemplatesBottomSheet({
  isOpen,
  templates,
  handleAddTemplate,
  handleCloseBottomSheet,
}: ChatTemplatesBottomSheetProps) {
  const handleTemplateClick = () => {
    // TODO: 템플릿 우측 버튼 클릭 시 동작 구현
  }

  return (
    <BottomSheet
      isOpen={isOpen}
      sheetHeight={475}
      handleCloseBottomSheet={handleCloseBottomSheet}
    >
      <div className='flex items-center justify-between py-[2rem]'>
        <span className='heading-sb-18'>자주 쓰는 문구</span>
        <Button
          variant='default'
          buttonStyle='edit'
          handleClickButton={handleAddTemplate}
        >
          + 추가하기
        </Button>
      </div>

      <div className='max-h-[32rem] overflow-y-auto [&::-webkit-scrollbar]:hidden'>
        {templates.map((template, index) => (
          <div
            key={index}
            className={`py-[1.5rem] pl-[0.5rem] ${index === templates.length - 1 ? 'border-none' : 'border-b border-grayscale-100'}`}
          >
            <div className='flex justify-between w-full'>
              <span className='title-sb-14 text-grayscale-700'>
                {String(index + 1).padStart(2, '0')}
              </span>
              <ButtonIcon
                icon='ic_dot'
                iconSize={22}
                className='border-none'
                handleClick={handleTemplateClick}
              />
            </div>
            <span className='body-m-14 text-grayscale-700'>{template}</span>
          </div>
        ))}
      </div>
    </BottomSheet>
  );
}
