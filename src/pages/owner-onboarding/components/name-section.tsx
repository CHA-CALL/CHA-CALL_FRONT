import Button from '@shared/components/button/Button';
import { OWNER_TEXT } from '@pages/owner-onboarding/constants/owner';
import SearchBar from '@shared/components/search-bar/SearchBar';
import Title from '@pages/owner-onboarding/components/Title';
import type { OwnerFormData } from '@pages/owner-onboarding/hooks/useOwnerInput';
import ErrorText from '@shared/components/error-text/ErrorText';

interface NameSectionProps {
  value: OwnerFormData['name'];
  onChange: (name: string) => void;
  handleCheckNameDuplicate: () => void;
  error?: string;
}

export default function NameSection({
  value,
  onChange,
  handleCheckNameDuplicate,
  error,
}: NameSectionProps) {
  return (
    <section className='flex w-full flex-col items-start justify-center gap-[1rem]'>
      <Title title='이름' />
      <SearchBar
        value={value}
        onChange={e => onChange(e.target.value)}
        maxLength={OWNER_TEXT.MAX_LENGTH}
        rightComponent={
          <Button
            variant='verify'
            buttonStyle={'active'}
            handleClickButton={handleCheckNameDuplicate}
          >
            중복확인
          </Button>
        }
      />
      {error && <ErrorText text={error} />}
    </section>
  );
}
