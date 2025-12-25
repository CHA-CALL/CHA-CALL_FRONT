import { useNavigate } from 'react-router-dom';
import useRegion from '@pages/set-region-global/hooks/use-region';

import { Icon } from '@icon/Icon';
import Navigation from '@layout/navigation/Navigation';
import Region from '@shared/components/region/Region';

export default function SetRegion() {
  const { initialRegions, handleConfirmRegion, handleResetRegionGlobal } =
    useRegion();
  const navigate = useNavigate();
  const handleClickBack = () => navigate(-1);

  return (
    <>
      <Navigation
        centerContent='위치설정'
        leftIcon={<Icon name='ic_back' />}
        handleLeftClick={handleClickBack}
      />
      <Region
        initialRegions={Array.from(initialRegions)}
        handleConfirmRegion={handleConfirmRegion}
        handleResetRegion={handleResetRegionGlobal}
      />
    </>
  );
}
