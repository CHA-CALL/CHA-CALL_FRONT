import { Icon } from '@components/icon/Icon';
import type { AgreementItemType } from '@components/agree-to-terms/constants/agreement';

interface AgreementItemProps {
  agreementItem: AgreementItemType;
  handleToggleAgree: () => void;
}

export default function AgreementItem({
  agreementItem,
  handleToggleAgree,
}: AgreementItemProps) {
  const handleToDetailsPage = () => {
    window.open(agreementItem.viewDetails, '_blank');
  };

  return (
    <div className='flex flex-row items-center gap-[1rem]'>
      <button
        type='button'
        className='flex cursor-pointer items-center'
        onClick={handleToggleAgree}
      >
        <Icon
          name='ic_check_agreement'
          className={
            agreementItem.isAgreed ? 'text-primary-700' : 'text-grayscale-300'
          }
          width={26}
          height={26}
        />
      </button>

      <div className='flex flex-1 flex-row items-center justify-between py-[0.5rem]'>
        <span className='text-grayscale-900 body-m-14'>
          {agreementItem.label}
        </span>
        <button
          type='button'
          className='flex cursor-pointer items-center'
          onClick={handleToDetailsPage}
        >
          <Icon name='ic_next' className='text-grayscale-500' />
        </button>
      </div>
    </div>
  );
}
