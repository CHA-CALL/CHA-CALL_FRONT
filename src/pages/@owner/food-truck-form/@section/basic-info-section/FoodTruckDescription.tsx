import { useBasicInfo } from '@pages/@owner/food-truck-form/hooks/use-basic-info';
import FormLayout from '@pages/@owner/food-truck-form/components/FormLayout';
import Input from '@shared/components/ui/input/Input';
import { FOOD_TRUCK_MAX_LENGTH } from '@pages/@owner/food-truck-form/constants/food-truck';
import ErrorText from '@shared/components/form/error-text/ErrorText';

export default function FoodTruckDescription() {
  const { description, descriptionError, updateDescription } = useBasicInfo();
  return (
    <FormLayout isRequired={true} title='푸드트럭 한줄 소개'>
      <Input
        placeholder='푸드트럭 한줄소개'
        maxLength={FOOD_TRUCK_MAX_LENGTH.description.max}
        error={!!descriptionError}
        value={description}
        onChange={e => updateDescription(e.target.value)}
        className='whitespace-normal break-words'
      />
      {descriptionError && <ErrorText text={descriptionError} />}
    </FormLayout>
  );
}
