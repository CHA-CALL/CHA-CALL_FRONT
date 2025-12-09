import { useNavigate } from 'react-router-dom';
import { FormProvider } from 'react-hook-form';

import Navigation from '@components/layout/navigation/Navigation';
import { Icon } from '@components/icon/Icon';
import Button from '@components/ui/button/Button';
import {
  useEstimateForm,
  useEstimateTime,
  useEstimateDate,
} from '@pages/@owner/estimate/hooks';
import {
  Food,
  Price,
  RegionSection,
  NeedElectricity,
  Etc,
} from '@pages/@owner/estimate/@section';
import ActiveTime from '@components/active-time/ActiveTime';
import ActiveDate from '@components/active-date/ActiveDate';

export default function Estimate() {
  const navigate = useNavigate();
  const {
    methods,
    handleSubmit,
    formData,
    errors,
    isValid,
    updateLocation,
    updateDetailLocation,
    updateFood,
    updatePrice,
    updateNeedElectricity,
    updateEtc,
  } = useEstimateForm();

  const handleNavigateBack = () => {
    navigate(-1);
  };
  return (
    <FormProvider {...methods}>
      <Navigation
        centerContent='예약 견적서 작성'
        leftIcon={<Icon name='ic_back' />}
        handleLeftClick={handleNavigateBack}
      />
      <div className='flex w-full flex-col gap-[2rem] px-[2rem] pb-[10rem]'>
        <RegionSection
          location={formData.location}
          detailLocation={formData.detailLocation ?? ''}
          updateLocation={updateLocation}
          updateDetailLocation={updateDetailLocation}
          error={errors.location || errors.detailLocation}
        />
        <ActiveDate useActiveDateHook={useEstimateDate} />
        <ActiveTime useActiveTimeHook={useEstimateTime} />
        <Food
          food={formData.food}
          updateFood={updateFood}
          error={errors.food}
        />
        <Price
          price={formData.price}
          updatePrice={updatePrice}
          error={errors.price}
        />
        <NeedElectricity
          needElectricity={formData.needElectricity}
          updateNeedElectricity={updateNeedElectricity}
          error={errors.needElectricity}
        />
        <Etc etc={formData.etc} updateEtc={updateEtc} error={errors.etc} />
      </div>
      <footer className='fixed bottom-[0] mx-auto w-full max-w-[60rem] bg-white px-[2rem] py-[1.7rem]'>
        <Button
          variant='cta'
          buttonStyle={isValid ? 'active' : 'disabled'}
          handleClickButton={handleSubmit}
          disabled={!isValid}
        >
          저장하기
        </Button>
      </footer>
    </FormProvider>
  );
}
