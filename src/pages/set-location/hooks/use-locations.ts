import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { useRegions } from '@pages/set-location/hooks/use-regions';

import { REGION_QUERY_KEY } from '@shared/querykey/regions';
import { type RegionResponse } from '@../../apis/data-contracts';

import {
  MAX_SELECTED,
  SELECT_ALL_ID_LENGTH,
  DEPTHS,
} from '@pages/set-location/constant/location';

export const useLocations = () => {
  const [selectedDepth1Id, setSelectedDepth1Id] = useState<number | null>(null);
  const [selectedDepth2Id, setSelectedDepth2Id] = useState<number | null>(null);
  const [selectedLocations, setSelectedLocations] = useState<
    Map<number, RegionResponse>
  >(new Map());

  const queryClient = useQueryClient();

  const { data: depth1List } = useRegions(1);
  const { data: depth2List } = useRegions(2, {
    enabled: selectedDepth1Id !== null,
    depth1Code: selectedDepth1Id ?? 0,
  });
  const { data: depth3List } = useRegions(3, {
    enabled: selectedDepth2Id !== null,
    depth1Code: selectedDepth1Id ?? 0,
    depth2Code: selectedDepth2Id ?? 0,
  });

  useEffect(() => {
    if (selectedDepth1Id) {
      queryClient.invalidateQueries({
        queryKey: REGION_QUERY_KEY.DEPTH2(selectedDepth1Id),
      });
      queryClient.invalidateQueries({
        queryKey: REGION_QUERY_KEY.DEPTH3(
          selectedDepth1Id,
          selectedDepth2Id ?? 0
        ),
      });
    }
  }, [selectedDepth1Id, selectedDepth2Id, queryClient]);

  useEffect(() => {
    if (selectedDepth2Id) {
      queryClient.invalidateQueries({
        queryKey: REGION_QUERY_KEY.DEPTH3(
          selectedDepth1Id ?? 0,
          selectedDepth2Id
        ),
      });
    }
  }, [selectedDepth2Id, selectedDepth1Id, queryClient]);

  const getSelectedLocations = () => {
    if (!depth3List || !depth3List?.data) return [];
    return depth3List?.data?.filter((location: RegionResponse) =>
      selectedLocations.has(location.code ?? 0)
    );
  };

  const [searchText, setSearchText] = useState('');
  const handleClearSearchBar = () => setSearchText('');

  const clearCategory = (depth: number) => {
    if (depth === DEPTHS.ONE) {
      setSelectedDepth1Id(null);
      setSelectedDepth2Id(null);
    }
    if (depth === DEPTHS.TWO) {
      setSelectedDepth2Id(null);
    }
  };

  const handleSelectDepth1 = (depth1Id: number) => {
    if (selectedDepth1Id === depth1Id) {
      clearCategory(DEPTHS.ONE);
      return;
    }
    setSelectedDepth1Id(depth1Id);
    setSelectedDepth2Id(null);
  };

  const handleSelectDepth2 = (depth2Id: number) => {
    if (selectedDepth2Id === depth2Id) {
      clearCategory(DEPTHS.TWO);
      return;
    }
    setSelectedDepth2Id(depth2Id);
  };

  const handleToggleLocation = (location: RegionResponse) => {
    setSelectedLocations(prev => {
      const clickedId = location.code ?? 0;
      if (prev.has(clickedId)) {
        const newMap = new Map(prev);
        newMap.delete(clickedId);
        return newMap;
      }

      const newMap = new Map(prev);
      /** 전체 지역 버튼을 누른 경우 */
      const isAllButton = clickedId.toString().length === SELECT_ALL_ID_LENGTH;
      if (isAllButton) {
        for (const key of newMap.keys()) {
          if (
            key.toString().startsWith(clickedId.toString()) &&
            key.toString().length > clickedId.toString().length
          ) {
            newMap.delete(key);
          }
        }
        newMap.set(clickedId, location);
        return newMap;
      }
      /** 이미 5개 길이의 id를 갖고 있을 때, 일반 지역이 선택된 경우.
      일반 지역의 앞 5개 길이와 비교하여 일치하는 id를 제거.*/
      const parentKey = [...newMap.keys()].find(
        key =>
          clickedId.toString().startsWith(key.toString()) &&
          key.toString().length === SELECT_ALL_ID_LENGTH
      );
      if (parentKey) {
        newMap.delete(parentKey);
      }
      if (newMap.size >= MAX_SELECTED)
        // TODO: 추후 toast등으로 더 선택할 수 없음을 안내.
        return newMap;
      newMap.set(clickedId, location);
      return newMap;
    });
  };

  const handleClearLocations = () => {
    setSelectedLocations(new Map());
    setSelectedDepth1Id(null);
    setSelectedDepth2Id(null);
  };

  const handleDeleteLocation = (location: RegionResponse) => {
    setSelectedLocations(prev => {
      const newMap = new Map(prev);
      newMap.delete(location.code ?? 0);
      return newMap;
    });
  };

  const handleConfirmLocation = () => {};

  return {
    depth1List,
    depth2List,
    depth3List,
    selectedDepth1Id,
    selectedDepth2Id,
    selectedLocations,
    searchText,
    setSearchText,
    getSelectedLocations,
    handleClearSearchBar,
    handleSelectDepth1,
    handleSelectDepth2,
    handleToggleLocation,
    handleClearLocations,
    handleDeleteLocation,
    handleConfirmLocation,
  };
};
