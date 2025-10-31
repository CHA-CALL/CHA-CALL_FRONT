import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import {
  useDepth1Regions,
  useDepth2Regions,
  useDepth3Regions,
} from '@shared/components/region/hooks/use-region-apis';

import { REGION_QUERY_KEY } from '@shared/querykey/regions';
import { type RegionResponse } from 'apis/data-contracts';
import { DEPTHS } from '@shared/components/region/constant/region';

export const useDepths = () => {
  const [depth1, setDepth1] = useState<RegionResponse | null>(null);
  const [depth2, setDepth2] = useState<RegionResponse | null>(null);

  const queryClient = useQueryClient();

  const { data: depth1List } = useDepth1Regions();
  const { data: depth2List } = useDepth2Regions(
    depth1?.code ?? 0,
    depth1 !== null
  );
  const { data: depth3List } = useDepth3Regions(
    depth1?.code ?? 0,
    depth2?.code ?? 0,
    depth2 !== null
  );

  useEffect(() => {
    if (depth1?.code) {
      queryClient.invalidateQueries({
        queryKey: REGION_QUERY_KEY.DEPTH2(depth1?.code ?? 0),
      });
      queryClient.invalidateQueries({
        queryKey: REGION_QUERY_KEY.DEPTH3(depth1?.code ?? 0, depth2?.code ?? 0),
      });
    }
    if (depth2?.code) {
      queryClient.invalidateQueries({
        queryKey: REGION_QUERY_KEY.DEPTH3(depth1?.code ?? 0, depth2?.code ?? 0),
      });
    }
  }, [depth1?.code, depth2?.code, queryClient]);

  const resetDepths = (depth: number) => {
    if (depth === DEPTHS.ONE) {
      setDepth1(null);
      setDepth2(null);
    }
    if (depth === DEPTHS.TWO) {
      setDepth2(null);
    }
  };

  const handleSelectDepth1 = (depth: RegionResponse) => {
    if (depth1?.code === depth.code) {
      resetDepths(DEPTHS.TWO);
      return;
    }
    setDepth1(depth);
    setDepth2(null);
  };

  const handleSelectDepth2 = (depth2Item: RegionResponse) => {
    if (depth2?.code === depth2Item.code) {
      resetDepths(DEPTHS.TWO);
      return;
    }
    setDepth2(depth2Item);
  };

  return {
    depth1List: depth1List?.data ?? [],
    depth2List: depth2List?.data ?? [],
    depth3List: depth3List?.data ?? [],
    depth1,
    depth2,

    handleSelectDepth1,
    handleSelectDepth2,

    resetDepths,
  };
};
