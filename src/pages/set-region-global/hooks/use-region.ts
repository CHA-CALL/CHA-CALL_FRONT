import { useNavigate } from 'react-router-dom';
import { useAtomValue, useSetAtom } from 'jotai';
import { type RegionResponse } from 'apis/data-contracts';
import { ROUTES } from '@router/constant/routes';
import { regionsAtom } from '@shared/store/regions-store';

export default function useRegion() {
  const navigate = useNavigate();

  const initialRegions = useAtomValue(regionsAtom).values();
  const setRegions = useSetAtom(regionsAtom);

  const handleConfirmRegion = (regions: RegionResponse[]) => {
    setRegions(new Map(regions.map(region => [region.code ?? 0, region])));
    navigate(ROUTES.RESERVATION);
  };

  return {
    initialRegions,
    handleConfirmRegion,
  };
}
