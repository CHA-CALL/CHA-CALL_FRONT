import Button from '@shared/components/button/Button';
import { OWNER_TEXT } from '@pages/@owner/food-truck-onboarding/constants/owner';
import SearchBar from '@shared/components/search-bar/SearchBar';
import SectionTitle from '@pages/@owner/food-truck-onboarding/components/SectionTitle';
import type { OwnerFormData } from '@pages/@owner/food-truck-onboarding/hooks/useFoodTruckInput';
import ErrorText from '@shared/components/error-text/ErrorText';

interface NameSectionProps {
  value: OwnerFormData['name'];
  onChange: (_name: string) => void;
  handleCheckNameDuplicate: (_name: string) => void;
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
      <SectionTitle title='이름' />
      <SearchBar
        value={value}
        onChange={e => onChange(e.target.value)}
        maxLength={OWNER_TEXT.MAX_LENGTH}
        error={!!error}
        rightComponent={
          <Button
            variant='verify'
            buttonStyle={'active'}
            handleClickButton={() => handleCheckNameDuplicate(value)}
          >
            중복확인
          </Button>
        }
      />
      {error && <ErrorText text={error} />}
    </section>
  );
}
