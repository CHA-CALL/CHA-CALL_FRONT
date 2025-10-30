import Overlay from '@layout/overlay/Overlay';
import { type AccountFormData } from '@pages/@owner/account/hooks/use-account';

import Button from '@ui/button/Button';

interface SaveAccountModalProps {
  formData: AccountFormData;
  isOpen: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
  handleCancel: () => void;
}

export default function SaveAccountModal({
  formData,
  isOpen,
  handleClose,
  handleConfirm,
  handleCancel,
}: SaveAccountModalProps) {
  return (
    <Overlay isOpen={isOpen} handleClose={handleClose}>
      <div className='flex min-w-[27.4rem] flex-col gap-[1rem] rounded-[1.6rem] bg-white px-[2rem] pb-[2rem] pt-[2.4rem]'>
        <p className='heading-sb-18 text-black'>저장정보 확인</p>
        <div className='bg-grayscale-100 h-[0.1rem] w-full' />
        <div className='flex flex-col gap-[1rem]'>
          <div className='flex items-center justify-between'>
            <p className='title-sb-12 text-grayscale-500'>은행</p>
            <p className='caption-m-12 text-grayscale-900'>{formData.bank}</p>
          </div>
          <div className='flex items-center justify-between'>
            <p className='title-sb-12 text-grayscale-500'>예금주</p>
            <p className='caption-m-12 text-grayscale-900'>{formData.name}</p>
          </div>
          <div className='flex items-center justify-between'>
            <p className='title-sb-12 text-grayscale-500'>계좌번호</p>
            <p className='caption-m-12 text-grayscale-900'>
              {formData.accountNumber}
            </p>
          </div>
        </div>

        <div className='mt-[0.6rem] flex gap-[1rem]'>
          <Button
            variant='cta'
            buttonStyle='sub'
            children='취소'
            handleClickButton={handleCancel}
          />
          <Button
            variant='cta'
            buttonStyle='active'
            children='저장'
            handleClickButton={handleConfirm}
          />
        </div>
      </div>
    </Overlay>
  );
}
