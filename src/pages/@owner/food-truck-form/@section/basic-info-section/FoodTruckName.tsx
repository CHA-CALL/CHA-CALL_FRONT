import { type ChangeEvent } from 'react';
import { FOOD_TRUCK_MAX_LENGTH } from '@pages/@owner/food-truck-form/constants/food-truck';
import { useBasicInfo } from '@pages/@owner/food-truck-form/hooks/use-basic-info';
import FormLayout from '@pages/@owner/food-truck-form/components/FormLayout';
import Input from '@shared/components/input/Input';
import Button from '@shared/components/button/Button';
import ErrorText from '@shared/components/error-text/ErrorText';

export default function FoodTruckNameInput() {
  const {
    name,
    nameError,
    updateName,
    handleCheckNameDuplicate,
    nameDuplicateMessage,
    isCheckingDuplicate,
  } = useBasicInfo();
  return (
    <FormLayout isRequired={true} title='푸드트럭 이름'>
      <Input
        type='text'
        placeholder='푸드트럭 이름'
        maxLength={FOOD_TRUCK_MAX_LENGTH.name.max}
        error={!!nameError}
        value={name}
        handleRightClick={handleCheckNameDuplicate}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          updateName(e.target.value)
        }
        rightComponent={
          <Button
            buttonStyle={!isCheckingDuplicate ? 'active' : 'disabled'}
            variant='verify'
          >
            중복확인
          </Button>
        }
      />
      {nameError && <ErrorText text={nameError} />}
      {nameDuplicateMessage && <ErrorText text={nameDuplicateMessage} />}
    </FormLayout>
  );
}
