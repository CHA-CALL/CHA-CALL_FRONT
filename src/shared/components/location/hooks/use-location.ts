import { useState } from 'react';

import { type RegionResponse } from 'apis/data-contracts';

import useToast from '@hooks/use-toast';

import { MAX_SELECTED } from '@components/location/constant/location';

interface UseLocationProps {
  initialLocations?: Map<number, RegionResponse>;
}

export default function useLocation({ initialLocations }: UseLocationProps) {
  const [selectedLocations, setSelectedLocations] = useState<
    Map<number, RegionResponse>
  >(initialLocations ?? new Map());
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

  const handleResetLocations = () => {
    setSelectedLocations(new Map());
  };

  return {
    selectedLocations,
    handleSelectLocation,
    handleDeleteLocation,
    handleResetLocations,
  };
}
