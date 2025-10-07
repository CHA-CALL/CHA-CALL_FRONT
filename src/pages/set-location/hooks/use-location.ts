import { useState } from 'react';
import { useAtom } from 'jotai';

import { type RegionResponse } from '@../../apis/data-contracts';
import { confirmedRegionsAtom } from '@shared/store/regions-store';
import { MAX_SELECTED } from '@pages/set-location/constant/location';
import useToast from '@shared/hooks/use-toast';

export const useLocation = () => {
  const [_, setConfirmedRegions] = useAtom(confirmedRegionsAtom);
  const [selectedLocations, setSelectedLocations] = useState<
    Map<number, RegionResponse>
  >(new Map());
  const toast = useToast();

  const handleSelectLocation = (location: RegionResponse) => {
    setSelectedLocations(prev => {
      const clickedId = location.code ?? 0;
      const newMap = new Map(prev);

      if (prev.has(clickedId)) {
        newMap.delete(clickedId);
        return newMap;
      }

      if (newMap.size >= MAX_SELECTED) {
        toast.error('최대 선택 개수를 초과했습니다.');
        return newMap;
      }

      newMap.set(clickedId, location);
      return newMap;
    });
  };

  const handleDeleteLocation = (location: RegionResponse) => {
    setSelectedLocations(prev => {
      const newMap = new Map(prev);
      newMap.delete(location.code ?? 0);
      return newMap;
    });
  };

  const handleConfirmLocation = () => {
    setConfirmedRegions(selectedLocations);
  };

  const handleResetLocations = () => {
    setSelectedLocations(new Map());
  };

  return {
    selectedLocations,
    handleSelectLocation,
    handleDeleteLocation,
    handleConfirmLocation,
    handleResetLocations,
  };
};
