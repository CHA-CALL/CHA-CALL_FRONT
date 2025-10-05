import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import {
  useDepth1Regions,
  useDepth2Regions,
  useDepth3Regions,
} from '@pages/set-location/hooks/use-regions';

import { REGION_QUERY_KEY } from '@shared/querykey/regions';
import { type RegionResponse } from '@../../apis/data-contracts';

import {
  MAX_SELECTED,
  SELECT_ALL_ID_LENGTH,
  DEPTHS,
} from '@pages/set-location/constant/location';
import { useAtom } from 'jotai';
import { confirmedRegionsAtom } from '@shared/store/regions-store';

export const useLocations = () => {
  const [depth1Code, setDepth1Code] = useState<number | null>(null);
  const [depth2Code, setDepth2Code] = useState<number | null>(null);
  const [selectedLocations, setSelectedLocations] = useState<
    Map<number, RegionResponse>
  >(new Map());
  const [_, setConfirmedRegions] = useAtom(confirmedRegionsAtom);

  const queryClient = useQueryClient();

  const { data: depth1List } = useDepth1Regions();
  const { data: depth2List } = useDepth2Regions(
    depth1Code ?? 0,
    depth1Code !== null
  );
  const { data: depth3List } = useDepth3Regions(
    depth1Code ?? 0,
    depth2Code ?? 0,
    depth2Code !== null
  );

  useEffect(() => {
    if (depth1Code) {
      queryClient.invalidateQueries({
        queryKey: REGION_QUERY_KEY.DEPTH2(depth1Code),
      });
      queryClient.invalidateQueries({
        queryKey: REGION_QUERY_KEY.DEPTH3(depth1Code, depth2Code ?? 0),
      });
    }
  }, [depth1Code, depth2Code, queryClient]);

  useEffect(() => {
    if (depth2Code) {
      queryClient.invalidateQueries({
        queryKey: REGION_QUERY_KEY.DEPTH3(depth1Code ?? 0, depth2Code),
      });
    }
  }, [depth2Code, depth1Code, queryClient]);

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
      setDepth1Code(null);
      setDepth2Code(null);
    }
    if (depth === DEPTHS.TWO) {
      setDepth2Code(null);
    }
  };

  const handleSelectDepth1 = (depth1Id: number) => {
    if (depth1Code === depth1Id) {
      clearCategory(DEPTHS.ONE);
      return;
    }
    setDepth1Code(depth1Id);
    setDepth2Code(null);
  };

  const handleSelectDepth2 = (depth2Id: number) => {
    if (depth2Code === depth2Id) {
      clearCategory(DEPTHS.TWO);
      return;
    }
    setDepth2Code(depth2Id);
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
    setDepth1Code(null);
    setDepth2Code(null);
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

  return {
    depth1List,
    depth2List,
    depth3List,
    depth1Code,
    depth2Code,
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
