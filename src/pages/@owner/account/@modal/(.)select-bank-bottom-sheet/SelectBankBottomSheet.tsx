import BottomSheet from '@shared/components/bottom-sheet/BottomSheet';
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
      sheetContent={
        <div className='mt-[2rem] flex flex-col gap-[2rem] px-[0.5rem]'>
          <p className='text-black heading-sb-18'>은행선택</p>
          <div className='flex w-full flex-col'>
            {Object.values(BANK).map(option => (
              <button
                key={option}
                onClick={() => handleChange(option)}
                className='flex w-full items-center justify-between py-[1.5rem] text-grayscale-700 body-m-14'
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
                    color='#F83419'
                    width={22}
                    height={22}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      }
      sheetHeight={500}
    />
  );
}
