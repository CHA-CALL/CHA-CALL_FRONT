import { useState } from 'react';

import BottomSheet from '@components/layout/bottom-sheet/BottomSheet';
import Button from '@components/ui/button/Button';
import ButtonCheck from '@components/ui/button-check/ButtonCheck';
import AgreementItem from '@components/agree-to-terms/AgreementItem';
import {
  MEMBER_AGREEMENT_INITIAL_ITEMS,
  OWNER_AGREEMENT_INITIAL_ITEMS,
  type AgreementItemType,
} from '@components/agree-to-terms/constants/agreement';

interface AgreeToTermsBottomSheetProps {
  isAgreed: boolean;
  isForOwner?: boolean;
  handleCloseBottomSheet: () => void;
}

export default function AgreeToTermsBottomSheet({
  isAgreed,
  isForOwner = false,
  handleCloseBottomSheet,
}: AgreeToTermsBottomSheetProps) {
  const initialItems = isForOwner
    ? OWNER_AGREEMENT_INITIAL_ITEMS
    : MEMBER_AGREEMENT_INITIAL_ITEMS;

  const [agreementItems, setAgreementItems] =
    useState<AgreementItemType[]>(initialItems);
  const [isAgreeToAll, setIsAgreeToAll] = useState(false);

  const isAllRequiredAgreed = agreementItems
    .filter(item => item.isRequired)
    .every(item => item.isAgreed);

  const handleToggleAgreeToAll = () => {
    setIsAgreeToAll(!isAgreeToAll);
    setAgreementItems(prev =>
      prev.map(item => ({
        ...item,
        isAgreed: !isAgreeToAll,
      }))
    );
  };

  const handleToggleAgree = (id: string) => {
    setAgreementItems(prev => {
      const updated = prev.map(item =>
        item.id === id ? { ...item, isAgreed: !item.isAgreed } : item
      );

      const allAgreed = updated.every(item => item.isAgreed);

      setIsAgreeToAll(allAgreed);

      return updated;
    });
  };

  // TODO : 서버에 동의하기 정보 보내도록 api 연동
  const handleConfirmAgreement = () => {
    console.info(agreementItems);
    handleCloseBottomSheet();
  };

  return (
    <BottomSheet isOpen={!isAgreed} sheetHeight={300}>
      <div className='flex flex-col'>
        <h2 className='py-[1rem] text-grayscale-900 heading-sb-18'>
          {isForOwner && <span className='text-primary-700'>사장님 </span>}
          서비스 이용을 위한 동의가 필요해요.
        </h2>
        <div className='flex flex-col gap-[1.4rem] py-[0.6rem]'>
          <div className='flex flex-row items-center gap-[1rem] px-[0.5rem]'>
            <ButtonCheck
              isChecked={isAgreeToAll}
              handleToggle={handleToggleAgreeToAll}
            />
            <span className='py-[0.5rem] text-grayscale-900 body-m-14'>
              전체동의
            </span>
          </div>
          <div className='h-[0.1rem] w-full bg-grayscale-100' />
          <div className='flex flex-col gap-[1rem] px-[0.5rem]'>
            {agreementItems.map(item => (
              <AgreementItem
                key={item.id}
                agreementItem={item}
                handleToggleAgree={() => handleToggleAgree(item.id)}
              />
            ))}
          </div>
        </div>
        <div className='pt-[2rem]'>
          <Button
            variant='cta'
            buttonStyle={isAllRequiredAgreed ? 'active' : 'disabled'}
            handleClickButton={handleConfirmAgreement}
            disabled={!isAllRequiredAgreed}
          >
            동의하기
          </Button>
        </div>
      </div>
    </BottomSheet>
  );
}
