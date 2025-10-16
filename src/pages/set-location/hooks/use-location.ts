import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtomValue, useSetAtom } from 'jotai';

import { type RegionResponse } from 'apis/data-contracts';

import { ROUTES } from '@router/constant/routes';
import useToast from '@hooks/use-toast';
import { confirmedRegionsAtom } from '@shared/store/regions-store';
import { MAX_SELECTED } from '@pages/set-location/constant/location';

export default function useLocation() {
  const navigate = useNavigate();

  const comfirmedRegions = useAtomValue(confirmedRegionsAtom);
  const setConfirmedRegions = useSetAtom(confirmedRegionsAtom);
  const [selectedLocations, setSelectedLocations] =
    useState<Map<number, RegionResponse>>(comfirmedRegions);
  const toast = useToast();

  const handleSelectLocation = (location: RegionResponse) => {
    setSelectedLocations(prev => {
      if (!location.code) {
        return prev;
      }
      const clickedId = location.code;
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
    navigate(ROUTES.RESERVATION);
  };

  const handleResetLocations = () => {
    setSelectedLocations(new Map());
    setConfirmedRegions(new Map());
  };

  return {
    selectedLocations,
    handleSelectLocation,
    handleDeleteLocation,
    handleConfirmLocation,
    handleResetLocations,
  };
}
