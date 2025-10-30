import { useNavigate } from 'react-router-dom';
import useLocation from '@pages/set-location/hooks/use-location';

import { Icon } from '@icon/Icon';
import Navigation from '@layout/navigation/Navigation';
import Location from '@components/location/Location';

export default function SetLocation() {
  const { initialRegions, handleConfirmLocation } = useLocation();
  const navigate = useNavigate();
  const handleClickBack = () => navigate(-1);

  return (
    <>
      <Navigation
        text='위치설정'
        leftIcon={<Icon name='ic_back' />}
        handleLeftClick={handleClickBack}
      />
      <Location
        initialLocations={initialRegions}
        handleConfirmLocation={handleConfirmLocation}
      />
    </>
  );
}
