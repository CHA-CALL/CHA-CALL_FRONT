import { useBasicInfo } from '@pages/@owner/food-truck-form/hooks/use-basic-info';
import FormLayout from '@pages/@owner/food-truck-form/components/FormLayout';
import Textarea from '@shared/components/ui/text-area/Textarea';
import { FOOD_TRUCK_MAX_LENGTH } from '@pages/@owner/food-truck-form/constants/food-truck';
import ErrorText from '@shared/components/form/error-text/ErrorText';

export default function FoodTruckOperatingInfo() {
  const { operatingInfo, operatingInfoError, updateOperatingInfo } =
    useBasicInfo();
  return (
    <FormLayout isRequired={false} title='운영정보 기입'>
      <Textarea
        placeholder='텍스트를 입력해주세요.'
        value={operatingInfo ?? ''}
        handleChange={e => updateOperatingInfo(e.target.value)}
        maxLength={FOOD_TRUCK_MAX_LENGTH.operationalInformation.max}
        className='min-h-[34rem]'
      />
      {operatingInfoError && <ErrorText text={operatingInfoError} />}
    </FormLayout>
  );
}
