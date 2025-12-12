import { useLocation, useNavigate, useParams } from 'react-router-dom';

import Navigation from '@components/layout/navigation/Navigation';
import { Icon } from '@components/icon/Icon';
import Button from '@components/ui/button/Button';
import { useEstimateForm } from '@pages/@owner/estimate/hooks';
import {
  Food,
  Price,
  RegionSection,
  ActiveDate,
  ActiveTime,
  NeedElectricity,
  Etc,
} from '@pages/@owner/estimate/@section';
import { ROUTES } from '@router/constant/routes';

export default function Estimate() {
  const navigate = useNavigate();
  const { chatRoomId } = useParams();
  const { state } = useLocation();

  const {
    handleSubmit,
    formData,
    errors,
    activeTime,
    isValid,
    updateLocation,
    updateDetailLocation,
    updateAvailableDateById,
    removeAvailableDateById,
    updateStartActiveTime,
    updateEndActiveTime,
    updateFood,
    updatePrice,
    updateNeedElectricity,
    updateEtc,
    handleAddAvailableDate,
  } = useEstimateForm();

  if (!chatRoomId) {
    navigate(ROUTES.CHATLIST);
    return;
  }
  if (
    state.foodTruckId === undefined ||
    state.reservationUserId === undefined
  ) {
    navigate(ROUTES.CHATROOM(chatRoomId));
  }

  const handleNavigateBack = () => {
    navigate(ROUTES.CHATROOM(chatRoomId));
  };

  return (
    <>
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
        <ActiveDate
          availableDates={formData.availableDates}
          updateAvailableDateById={updateAvailableDateById}
          removeAvailableDateById={removeAvailableDateById}
          handleAddAvailableDate={handleAddAvailableDate}
          error={errors.availableDates}
        />
        <ActiveTime
          activeTime={activeTime}
          updateStartActiveTime={updateStartActiveTime}
          updateEndActiveTime={updateEndActiveTime}
          error={errors.activeTime}
        />
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
    </>
  );
}
