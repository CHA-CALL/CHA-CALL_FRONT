import Overlay from '@layout/overlay/Overlay';
import { type AccountFormData } from '@pages/@owner/account/schema/account.schema';

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
        <p className='text-black heading-sb-18'>저장정보 확인</p>
        <div className='h-[0.1rem] w-full bg-grayscale-100' />
        <div className='flex flex-col gap-[1rem]'>
          <div className='flex items-center justify-between'>
            <p className='text-grayscale-500 title-sb-12'>은행</p>
            <p className='text-grayscale-900 caption-m-12'>
              {formData.bankName}
            </p>
          </div>
          <div className='flex items-center justify-between'>
            <p className='text-grayscale-500 title-sb-12'>예금주</p>
            <p className='text-grayscale-900 caption-m-12'>
              {formData.accountHolderName}
            </p>
          </div>
          <div className='flex items-center justify-between'>
            <p className='text-grayscale-500 title-sb-12'>계좌번호</p>
            <p className='text-grayscale-900 caption-m-12'>
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
            type='submit'
          />
        </div>
      </div>
    </Overlay>
  );
}
