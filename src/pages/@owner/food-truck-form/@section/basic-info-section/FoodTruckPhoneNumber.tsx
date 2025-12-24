import { useBasicInfo } from '@pages/@owner/food-truck-form/hooks/use-basic-info';
import FormLayout from '@components/layout/form-layout/FormLayout';
import Input from '@ui/input/Input';
import ErrorText from '@form/error-text/ErrorText';
import { FOOD_TRUCK_MAX_LENGTH } from '@pages/@owner/food-truck-form/constants/food-truck';

export default function FoodTruckPhoneNumber() {
  const { phoneNumber, phoneNumberError, updatePhoneNumber } = useBasicInfo();
  return (
    <FormLayout isRequired={true} title='전화번호'>
      <Input
        placeholder='000-0000-0000'
        error={!!phoneNumberError}
        value={phoneNumber}
        onChange={e => updatePhoneNumber(e.target.value)}
        maxLength={FOOD_TRUCK_MAX_LENGTH.phoneNumber.max}
      />
      {phoneNumberError && <ErrorText text={phoneNumberError} />}
    </FormLayout>
  );
}
