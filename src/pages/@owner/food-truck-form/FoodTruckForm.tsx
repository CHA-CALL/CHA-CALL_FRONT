import { useNavigate, useParams } from 'react-router-dom';
import type { ChangeEvent } from 'react';

import Navigation from '@shared/components/navigation/Navigation';
import { Icon } from '@shared/components/icon/Icon';

import Input from '@shared/components/input/Input';
import Button from '@shared/components/button/Button';
import Textarea from '@shared/components/text-area/Textarea';
import { FOOD_CATEGORIES } from '@shared/constant/food';
import FormLayout from '@pages/@owner/food-truck-form/components/FormLayout';
import { FOOD_TRUCK_MAX_LENGTH } from '@pages/@owner/food-truck-form/constants/food-truck';
import { useFoodTruckForm } from '@pages/@owner/food-truck-form/hooks/use-food-truck-form';
import { AVAILABLE_QUANTITY } from '@shared/constant/available-quantity';
import { NEED_ELECTRICITY } from '@shared/constant/need-electricity';
import { PAYMENT_METHOD } from '@shared/constant/payment-method';
import Calendar from '@shared/components/calendar/Calendar';
import DateInput from '@pages/@owner/food-truck-form/components/DateInput';
import { useState } from 'react';
import { dateFormatter } from '@shared/utils/date-formatter';
import type { SelectedDate } from '@shared/types/calendar-types';
import BottomSheet from '@shared/components/bottom-sheet/BottomSheet';
import PageSwitchButton from '@pages/@owner/food-truck-form/components/PageSwitchButton';
import { ROUTES } from '@/router/constant/routes';

export default function FoodTruckForm() {
  const { id } = useParams();
  const isEditMode = !!id;
  const {
    formData,
    errors,
    updateName,
    handleCheckNameDuplicate,
    checkNameDuplicate,
    updatePhoneNumber,
    updateFoodCategories,
    updateDescription,
    updateNeedElectricity,
    updateAvailableQuantity,
    updatePaymentMethod,
    updateOperationalInformation,
    updateEtc,
    handleSubmit,
    isFormValid,
    updateDate,
  } = useFoodTruckForm(undefined);
  //:TODO: id 값이 있을 시푸드트럭 정보 가져오기
  const navigate = useNavigate();

  const [isDateInputOpen, setIsDateInputOpen] = useState(false);

  const handleClickDate = () => {
    setIsDateInputOpen(true);
  };

  const handleNavigateBack = () => {
    navigate(-1);
  };

  const handleApplyDate = (date: SelectedDate) => {
    updateDate(date);
  };

  const handleCloseDateInput = () => {
    setIsDateInputOpen(false);
  };

  return (
    <>
      <BottomSheet
        isOpen={isDateInputOpen}
        handleCloseBottomSheet={handleCloseDateInput}
        sheetHeight={490}
      >
        <Calendar
          selectedDate={{
            startDate: formData.date?.startDate ?? null,
            endDate: formData.date?.endDate ?? null,
          }}
          handleApplyDate={handleApplyDate}
          handleCloseBottomSheet={handleCloseDateInput}
          isOpen={isDateInputOpen}
        />
      </BottomSheet>
      <Navigation
        text={isEditMode ? '나의 푸드트럭 수정' : '나의 푸드트럭 등록'}
        leftIcon={<Icon name='ic_back' />}
        handleLeftClick={handleNavigateBack}
      />
      <div className='flex flex-col px-[2rem] pb-[12rem]'>
        <FormLayout isRequired={true} title='푸드트럭 이름'>
          <Input
            type='text'
            placeholder='푸드트럭 이름'
            maxLength={FOOD_TRUCK_MAX_LENGTH.name.max}
            error={!!errors.name}
            value={formData.name}
            handleRightClick={handleCheckNameDuplicate}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              updateName(e.target.value)
            }
            rightComponent={
              <Button
                buttonStyle={checkNameDuplicate ? 'active' : 'disabled'}
                variant='verify'
              >
                중복확인
              </Button>
            }
          />
        </FormLayout>
        <FormLayout isRequired={true} title='푸드트럭 한줄 소개'>
          <Input
            placeholder='푸드트럭 한줄소개'
            maxLength={FOOD_TRUCK_MAX_LENGTH.description.max}
            error={!!errors.description}
            value={formData.description}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              updateDescription(e.target.value)
            }
            className='whitespace-normal break-words'
          />
        </FormLayout>
        <FormLayout isRequired={true} title='전화번호'>
          <Input
            placeholder='000-0000-0000'
            error={!!errors.phoneNumber}
            value={formData.phoneNumber}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              updatePhoneNumber(e.target.value)
            }
          />
        </FormLayout>
        <FormLayout isRequired={true} title='운영 가능 시간대'>
          .
        </FormLayout>
        <FormLayout isRequired={true} title='활동 가능 지역'>
          ,
        </FormLayout>
        <FormLayout
          isRequired={true}
          title='판매음식 카테고리'
          description='중복 선택 가능'
        >
          <div className='flex flex-wrap gap-[0.8rem]'>
            {Object.values(FOOD_CATEGORIES).map(foodCategory => (
              <Button
                buttonStyle={
                  formData.foodCategories.some(
                    (category: string) => category === foodCategory
                  )
                    ? 'selected2'
                    : 'default'
                }
                handleClickButton={() => updateFoodCategories(foodCategory)}
                variant='chip'
                key={foodCategory}
                className='w-fit'
              >
                {foodCategory}
              </Button>
            ))}
          </div>
        </FormLayout>
        <FormLayout isRequired={true} title='제조 가능 수량'>
          <div className='flex flex-wrap gap-[0.8rem]'>
            {Object.values(AVAILABLE_QUANTITY).map(item => (
              <Button
                buttonStyle={
                  formData.availableQuantity === item ? 'selected2' : 'default'
                }
                handleClickButton={() => updateAvailableQuantity(item)}
                variant='chip'
              >
                {item}
              </Button>
            ))}
          </div>
        </FormLayout>
        <FormLayout isRequired={true} title='전기 사용 여부'>
          <div className='flex flex-wrap gap-[0.8rem]'>
            {Object.values(NEED_ELECTRICITY).map(item => (
              <Button
                buttonStyle={
                  formData.needElectricity === item ? 'selected2' : 'default'
                }
                handleClickButton={() => updateNeedElectricity(item)}
                variant='chip'
              >
                {item}
              </Button>
            ))}
          </div>
        </FormLayout>
        <FormLayout isRequired={true} title='결제 방법'>
          <div className='flex flex-wrap gap-[0.8rem]'>
            {Object.values(PAYMENT_METHOD).map(item => (
              <Button
                buttonStyle={
                  formData.paymentMethod === item ? 'selected2' : 'default'
                }
                handleClickButton={() => updatePaymentMethod(item)}
                variant='chip'
              >
                {item}
              </Button>
            ))}
          </div>
        </FormLayout>
        <FormLayout isRequired={true} title='메뉴 정보'>
          <PageSwitchButton
            isSelected={true}
            text='메뉴를 등록해주세요.'
            handleClick={() => navigate(ROUTES.MENU_LIST)}
          />
        </FormLayout>
        <FormLayout isRequired={true} title='푸드트럭 사진'>
          <div></div>
        </FormLayout>
        <FormLayout isRequired={true} title='가능한 일정대'>
          <DateInput
            startDate={
              formData.date?.startDate
                ? dateFormatter(formData.date.startDate)
                : ''
            }
            endDate={
              formData.date?.endDate ? dateFormatter(formData.date.endDate) : ''
            }
            handleClick={handleClickDate}
          />
        </FormLayout>
        <FormLayout isRequired={true} title='운영 정보'>
          <Textarea
            placeholder='운영 정보'
            value={formData.operationalInformation ?? ''}
            handleChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              updateOperationalInformation(e.target.value)
            }
            maxLength={FOOD_TRUCK_MAX_LENGTH.operationalInformation}
            className='min-h-[34rem]'
          />
        </FormLayout>
        <FormLayout isRequired={true} title='기타'>
          <Textarea
            placeholder='기타'
            value={formData.etc ?? ''}
            handleChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              updateEtc(e.target.value)
            }
            maxLength={FOOD_TRUCK_MAX_LENGTH.etc}
            className='min-h-[34rem]'
          />
        </FormLayout>
      </div>

      <footer className='fixed bottom-[0] mx-auto w-full max-w-[60rem] bg-white px-[2rem] py-[1.7rem]'>
        <Button
          variant='cta'
          buttonStyle={isFormValid ? 'active' : 'disabled'}
          handleClickButton={handleSubmit}
          disabled={!isFormValid}
        >
          저장하기
        </Button>
      </footer>
    </>
  );
}
