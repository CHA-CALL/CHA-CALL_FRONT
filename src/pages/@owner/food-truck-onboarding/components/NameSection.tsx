import Button from '@ui/button/Button';
import { OWNER_TEXT } from '@pages/@owner/food-truck-onboarding/constants/owner';
import Input from '@ui/input/Input';
import SectionTitle from '@pages/@owner/food-truck-onboarding/components/SectionTitle';
import type { OwnerFormData } from '@pages/@owner/food-truck-onboarding/hooks/use-food-truck-input';
import ErrorText from '@form/error-text/ErrorText';

interface NameSectionProps {
  isNameVerified?: boolean;
  value: OwnerFormData['name'];
  onChange: (_name: string) => void;
  handleCheckNameDuplicate: () => void;
  error?: string;
}

export default function NameSection({
  isNameVerified,
  value,
  onChange,
  handleCheckNameDuplicate,
  error,
}: NameSectionProps) {
  return (
    <section className='flex w-full flex-col items-start justify-center gap-[1rem]'>
      <SectionTitle title='이름' />
      <Input
        value={value}
        placeholder='푸드트럭 명을 입력하세요.'
        onChange={e => onChange(e.target.value)}
        maxLength={OWNER_TEXT.MAX_LENGTH}
        error={!!error}
        rightComponent={
          <Button
            variant='verify'
            buttonStyle={isNameVerified ? 'disabled' : 'active'}
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
