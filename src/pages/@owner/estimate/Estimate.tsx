import { useLocation, useNavigate, useParams } from 'react-router-dom';

import Navigation from '@components/layout/navigation/Navigation';
import { Icon } from '@components/icon/Icon';
import Button from '@components/ui/button/Button';
import {
  useEstimateTime,
  useEstimateDate,
  useEstimateForm,
} from '@pages/@owner/estimate/hooks';
import {
  Food,
  Price,
  RegionSection,
  NeedElectricity,
  Etc,
} from '@pages/@owner/estimate/@section';

import { ROUTES } from '@router/constant/routes';
import {
  ESTIMATE_ERROR_MESSAGE,
  ESTIMATE_MAX_LENGTH,
} from '@pages/@owner/estimate/constants/estimate';
import ActiveTime from '@components/active-time/ActiveTime';
import ActiveDate from '@components/active-date/ActiveDate';

export default function Estimate() {
  const navigate = useNavigate();
  const { chatRoomId } = useParams();
  const { state } = useLocation();

  const {
    methods,
    handleCreate,
    formData,
    errors,
    isValid,
    updateLocation,
    updateDetailLocation,
    updateFood,
    updatePrice,
    updateNeedElectricity,
    updateEtc,
  } = useEstimateForm(chatRoomId, state.foodTruckId, state.reservationUserId);

  const { formActiveTime, activeTimeError, handleActiveTimeSetValue } =
    useEstimateTime(methods);

  const {
    formAvailableDates,
    availableDatesError,
    handleActiveDateSetValue,
    handleActiveDateError,
  } = useEstimateDate(methods);

  if (!chatRoomId) {
    navigate(ROUTES.CHATLIST);
    return null;
  }
  if (
    state.foodTruckId === undefined ||
    state.reservationUserId === undefined
  ) {
    navigate(ROUTES.CHATROOM(chatRoomId));
    return null;
  }

  const handleNavigateBack = () => {
    navigate(ROUTES.CHATROOM(chatRoomId));
    return null;
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
          locationError={errors.location}
          detailLocationError={errors.detailLocation}
        />
        <ActiveDate
          formAvailableDates={formAvailableDates}
          availableDatesError={availableDatesError}
          errorMessages={ESTIMATE_ERROR_MESSAGE.availableDates}
          maxLength={ESTIMATE_MAX_LENGTH.availableDates.max}
          handleActiveDateSetValue={handleActiveDateSetValue}
          handleActiveDateError={handleActiveDateError}
        />
        <ActiveTime
          formActiveTime={formActiveTime}
          activeTimeError={activeTimeError}
          handleActiveTimeSetValue={handleActiveTimeSetValue}
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
          handleClickButton={handleCreate}
          disabled={!isValid}
        >
          대화창에 보내기
        </Button>
      </footer>
    </>
  );
}
