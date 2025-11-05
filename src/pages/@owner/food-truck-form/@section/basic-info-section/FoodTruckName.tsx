import { FOOD_TRUCK_MAX_LENGTH } from '@pages/@owner/food-truck-form/constants/food-truck';
import { useBasicInfo } from '@pages/@owner/food-truck-form/hooks/use-basic-info';
import FormLayout from '@pages/@owner/food-truck-form/components/FormLayout';
import Input from '@ui/input/Input';
import Button from '@ui/button/Button';
import ErrorText from '@form/error-text/ErrorText';
import { Icon } from '@icon/Icon';

export default function FoodTruckNameInput() {
  const {
    name,
    nameError,
    updateName,
    checkNameDuplicated,
    canCheckNameDuplicate,
    nameDuplicate,
  } = useBasicInfo();
  return (
    <FormLayout isRequired={true} title='푸드트럭 이름'>
      <Input
        type='text'
        placeholder='푸드트럭 이름'
        maxLength={FOOD_TRUCK_MAX_LENGTH.name.max}
        error={!!nameError}
        value={name}
        handleRightClick={checkNameDuplicated}
        onChange={e => updateName(e.target.value)}
        rightComponent={
          <Button
            buttonStyle={canCheckNameDuplicate ? 'active' : 'disabled'}
            variant='verify'
          >
            중복확인
          </Button>
        }
      />
      {nameError && <ErrorText text={nameError} />}
      {nameDuplicate && (
        <div className='flex w-full items-center gap-[0.2rem]'>
          <Icon name='ic_check' />
          <p className='caption-m-12 text-green-500'>사용 가능한 이름입니다.</p>
        </div>
      )}
    </FormLayout>
  );
}
