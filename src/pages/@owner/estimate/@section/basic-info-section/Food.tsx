import FormLayout from '@components/layout/form-layout/FormLayout';
import Textarea from '@components/ui/text-area/Textarea';
import ErrorText from '@form/error-text/ErrorText';
import { ESTIMATE_MAX_LENGTH } from '@pages/@owner/estimate/constants/estimate';

interface FoodProps {
  food: string;
  updateFood: (_food: string) => void;
  error?: string;
}

export default function Food({ food, updateFood, error }: FoodProps) {
  return (
    <FormLayout isRequired={true} title='음식'>
      <Textarea
        placeholder='텍스트를 입력해주세요.'
        maxLength={ESTIMATE_MAX_LENGTH.food.max}
        value={food}
        handleChange={e => updateFood(e.target.value)}
        className='h-[12rem]'
      />
      {error && <ErrorText text={error} />}
    </FormLayout>
  );
}
