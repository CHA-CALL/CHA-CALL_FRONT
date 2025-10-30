import { atom } from 'jotai';
import type { RegionResponse } from 'apis/data-contracts';

export const regionsAtom = atom<Map<number, RegionResponse>>(new Map());
