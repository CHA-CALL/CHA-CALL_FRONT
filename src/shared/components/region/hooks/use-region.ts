import { useState } from 'react';

import { type RegionResponse } from 'apis/data-contracts';
import useToast from '@hooks/use-toast';
import { MAX_SELECTED } from '@shared/components/region/constant/region';

interface UseRegionProps {
  initialRegions?: RegionResponse[];
  handleResetRegion: () => void;
}

export default function useRegion({
  initialRegions,
  handleResetRegion,
}: UseRegionProps) {
  const [selectedRegions, setSelectedRegions] = useState<RegionResponse[]>(
    initialRegions ?? []
  );
  const toast = useToast();

  const handleSelectRegion = (region: RegionResponse) => {
    if (selectedRegions.length >= MAX_SELECTED) {
      toast.error('최대 선택 개수를 초과했습니다.');
      return;
    }
    setSelectedRegions(prev => [...prev, region]);
  };
  const handleDeleteRegion = (region: RegionResponse) => {
    setSelectedRegions(prev => prev.filter(r => r.code !== region.code));
  };

  const handleResetRegions = () => {
    setSelectedRegions([]);
    handleResetRegion();
  };

  return {
    selectedRegions,
    handleSelectRegion,
    handleDeleteRegion,
    handleResetRegions,
  };
}
