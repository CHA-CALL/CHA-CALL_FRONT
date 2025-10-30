import BottomSheet from '@shared/components/ui/bottom-sheet/BottomSheet';
import { BANK, type Bank } from '@pages/@owner/account/constants/bank';
import { cn } from '@shared/utils/cn';
import { Icon } from '@shared/components/icon/Icon';

interface SelectBankBottomSheetProps {
  isOpen: boolean;
  handleClose: () => void;
  handleChange: (_option: Bank) => void;
  bank: Bank;
}
export default function SelectBankBottomSheet({
  isOpen,
  handleClose,
  handleChange,
  bank,
}: SelectBankBottomSheetProps) {
  return (
    <BottomSheet
      isOpen={isOpen}
      handleCloseBottomSheet={handleClose}
      sheetHeight={500}
    >
      <div className='flex flex-col'>
        <p className='heading-sb-18 py-[2rem] text-black'>은행선택</p>
        <div className='flex w-full flex-col'>
          {Object.values(BANK).map(option => (
            <button
              key={option}
              onClick={() => handleChange(option)}
              className='text-grayscale-700 body-m-14 flex w-full items-center justify-between py-[1.5rem]'
            >
              <p
                className={cn(
                  'text-grayscale-700',
                  bank === option && 'text-primary-700'
                )}
              >
                {option}
              </p>

              {bank === option && (
                <Icon
                  name='ic_check'
                  className='text-primary-700'
                  width={22}
                  height={22}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </BottomSheet>
  );
}
