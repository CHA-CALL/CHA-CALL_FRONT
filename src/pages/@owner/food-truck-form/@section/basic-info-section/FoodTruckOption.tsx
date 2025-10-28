import Textarea from '@shared/components/text-area/Textarea';
import { useBasicInfo } from '@pages/@owner/food-truck-form/hooks/use-basic-info';
import FormLayout from '@pages/@owner/food-truck-form/components/FormLayout';
import { FOOD_TRUCK_MAX_LENGTH } from '@pages/@owner/food-truck-form/constants/food-truck';
import ErrorText from '@shared/components/error-text/ErrorText';

export default function FoodTruckOption() {
  const { option, optionError, updateOption } = useBasicInfo();
  return (
    <FormLayout isRequired={false} title='기타 옵션'>
      <Textarea
        placeholder='텍스트를 입력해주세요.'
        value={option ?? ''}
        handleChange={e => updateOption(e.target.value)}
        maxLength={FOOD_TRUCK_MAX_LENGTH.etc.max}
        className='min-h-[34rem]'
      />
      {optionError && <ErrorText text={optionError} />}
    </FormLayout>
  );
}
