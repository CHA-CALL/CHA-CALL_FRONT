import { useNavigate } from 'react-router-dom';
import { useAtomValue, useSetAtom } from 'jotai';
import { type RegionResponse } from 'apis/data-contracts';
import { ROUTES } from '@router/constant/routes';
import { regionsAtom } from '@shared/store/regions-store';

export default function useLocation() {
  const navigate = useNavigate();

  const initialRegions = useAtomValue(regionsAtom);
  const setRegions = useSetAtom(regionsAtom);

  const handleConfirmLocation = (locations: Map<number, RegionResponse>) => {
    setRegions(locations);
    navigate(ROUTES.RESERVATION);
  };

  return {
    initialRegions,
    handleConfirmLocation,
  };
}
