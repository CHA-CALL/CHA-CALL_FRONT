import BottomSheet from '@shared/components/bottom-sheet/BottomSheet';
import Overlay from '@shared/components/overlay/Overlay';
import { BANK, type Bank } from '@pages/@owner/account/constants/bank';
import { cn } from '@shared/utils/cn';
import { Icon } from '@shared/components/icon/Icon';

interface SelectBankModalProps {
  isOpen: boolean;
  handleClose: () => void;
  handleChange: (_option: Bank) => void;
  bank: Bank;
}
export default function SelectBankModal({
  isOpen,
  handleClose,
  handleChange,
  bank,
}: SelectBankModalProps) {
  return (
    <Overlay isOpen={isOpen} handleClose={handleClose}>
      <BottomSheet
        isOpen={isOpen}
        handleCloseBottomSheet={handleClose}
        sheetContent={
          <div className='flex flex-col gap-[2rem]'>
            <p className='heading-sb-18 text-black'>은행선택</p>
            <div className='flex w-full flex-col'>
              {Object.values(BANK).map(option => (
                <button
                  key={option}
                  onClick={() => handleChange(option)}
                  className='body-m-14 text-grayscale-700 flex w-full items-center justify-between py-[1.5rem]'
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
    </Overlay>
  );
}
