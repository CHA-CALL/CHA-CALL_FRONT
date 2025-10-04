import type { RegionResponse } from '@/../apis/data-contracts';

/**
 * Map<number, RegionResponse> → string[]
 * code 값을 문자열 배열로 변환
 */
export const extractLocationCodes = (
  map: Map<number, RegionResponse>
): string[] => {
  return Array.from(map.values())
    .map(item => item.code)
    .filter((code): code is number => code !== undefined && code !== null)
    .map(code => String(code));
};

/**
 * Map<number, RegionResponse> → string[]
 * name 값을 문자열 배열로 변환
 */
export const extractLocationName = (
  map: Map<number, RegionResponse>
): string[] => {
  return Array.from(map.values())
    .map(item => item.name)
    .filter((name): name is string => name !== undefined && name !== null)
    .map(name => name);
};
