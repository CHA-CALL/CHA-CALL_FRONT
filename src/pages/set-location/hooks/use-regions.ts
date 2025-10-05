import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtomValue, useSetAtom } from 'jotai';
import type { RegionResponse } from 'apis/data-contracts';

import { ROUTES } from '@router/constant/routes';
import useToast from '@shared/hooks/use-toast';
import { confirmedRegionsAtom } from '@shared/store/regions-store';
import {
  MAX_SELECTED,
  SELECT_ALL_ID_LENGTH,
} from '@pages/set-location/constant/set-location';
import {
  useDepth1Query,
  useDepth2Query,
  useDepth3Query,
  useSearchRegionQuery,
} from '@pages/set-location/hooks/use-regions-query';

export default function useRegions() {
  const navigate = useNavigate();
  const toast = useToast();

  const [selectedDepth1Code, setSelectedDepth1Code] = useState<number>();
  const [selectedDepth2Code, setSelectedDepth2Code] = useState<number>();
  const [selectedLocations, setSelectedLocations] = useState<
    Map<number, RegionResponse>
  >(new Map());

  const [searchText, setSearchText] = useState('');

  const confirmedRegions = useAtomValue(confirmedRegionsAtom);
  const setConfirmedRegions = useSetAtom(confirmedRegionsAtom);

  useEffect(() => {
    if (confirmedRegions.size > 0) {
      setSelectedLocations(new Map(confirmedRegions));
    }
  }, [confirmedRegions]);

  const {
    data: depth1List = [],
    isLoading: isLoadingDepth1,
    isError: isErrorDepth1,
  } = useDepth1Query();

  const {
    data: depth2List = [],
    isLoading: isLoadingDepth2,
    isError: isErrorDepth2,
  } = useDepth2Query(selectedDepth1Code);

  const {
    data: locationList = [],
    isLoading: isLoadingLocationList,
    isError: isErrorLocationList,
  } = useDepth3Query(selectedDepth2Code);

  const {
    data: searchRegionsList = [],
    isLoading: isLoadingSearch,
    isError: isErrorSearch,
  } = useSearchRegionQuery(searchText);

  const handleClearSearchBar = () => setSearchText('');

  const handleSelectDepth1 = (depth1Code: number) => {
    if (selectedDepth1Code === depth1Code) {
      setSelectedDepth1Code(undefined);
      setSelectedDepth2Code(undefined);
      return;
    }
    setSelectedDepth1Code(depth1Code);
    setSelectedDepth2Code(undefined);
  };

  const handleSelectDepth2 = (depth2Code: number) => {
    if (selectedDepth2Code === depth2Code) {
      setSelectedDepth2Code(undefined);
      return;
    }
    setSelectedDepth2Code(depth2Code);
  };

  const handleSelectLocations = (location: RegionResponse) => {
    if (!location.code) return;
    setSelectedLocations(prev => {
      const clickedCode = location.code!;
      const newMap = new Map(prev);

      if (newMap.has(clickedCode)) {
        newMap.delete(clickedCode);
        return newMap;
      }

      const isAllButton = String(clickedCode).length === SELECT_ALL_ID_LENGTH;
      if (isAllButton) {
        for (const key of newMap.keys()) {
          if (
            String(key).startsWith(String(clickedCode)) &&
            String(key).length > String(clickedCode).length
          ) {
            newMap.delete(key);
          }
        }

        const depth1Name =
          depth1List.find(s => s.code === selectedDepth1Code)?.name ?? '';
        const fullName = [depth1Name, location.name].filter(Boolean).join(' ');

        newMap.set(clickedCode, { ...location, name: fullName });
        return newMap;
      }

      const parentKey = [...newMap.keys()].find(
        key =>
          String(clickedCode).startsWith(String(key)) &&
          String(key).length === SELECT_ALL_ID_LENGTH
      );
      if (parentKey) {
        newMap.delete(parentKey);
      }

      if (newMap.size >= MAX_SELECTED) {
        toast.error(`최대 ${MAX_SELECTED}개까지만 선택 가능합니다.`);
        return newMap;
      }

      const depth1Name =
        depth1List.find(s => s.code === selectedDepth1Code)?.name ?? '';
      const depth2Name =
        depth2List.find(s => s.code === selectedDepth2Code)?.name ?? '';
      const fullName = [depth1Name, depth2Name, location.name]
        .filter(Boolean)
        .join(' ');

      newMap.set(clickedCode, { ...location, name: fullName });
      return newMap;
    });
  };

  const handleClearLocations = () => {
    const empty = new Map();
    setSelectedLocations(empty);
    setSelectedDepth1Code(undefined);
    setSelectedDepth2Code(undefined);
    setConfirmedRegions(empty);
  };

  const handleDeleteLocation = (location: RegionResponse) => {
    if (!location.code) return;
    setSelectedLocations(prev => {
      const newMap = new Map(prev);
      newMap.delete(location.code!);
      return newMap;
    });
  };

  const handleConfirmLocation = () => {
    setConfirmedRegions(new Map(selectedLocations));
    toast.success('위치 설정이 완료되었습니다.');
    navigate(ROUTES.RESERVATION);
  };

  return {
    depth1List,
    depth2List,
    locationList,
    searchRegionsList,

    isLoadingDepth1,
    isLoadingDepth2,
    isLoadingLocationList,
    isLoadingSearch,

    isErrorDepth1,
    isErrorDepth2,
    isErrorLocationList,
    isErrorSearch,

    selectedDepth1Code,
    selectedDepth2Code,
    selectedLocations,
    confirmedRegions,

    searchText,
    setSearchText,
    handleClearSearchBar,

    handleSelectDepth1,
    handleSelectDepth2,
    handleSelectLocations,
    handleClearLocations,
    handleDeleteLocation,
    handleConfirmLocation,
  };
}
