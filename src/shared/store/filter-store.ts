import { create } from 'zustand';
import { isEqual } from 'lodash';

import type { SelectedDate } from '@shared/types/calendar-types';

export interface FilterState {
  date: SelectedDate[];
  servingSize: string | null;
  foodType: string[] | null;
  electricityUsage: string | null;
  paymentType: string | null;
}

export const initialFilter: FilterState = {
  date: [{ startDate: null, endDate: null }],
  servingSize: null,
  foodType: null,
  electricityUsage: null,
  paymentType: null,
};

type SingleKey = Exclude<keyof FilterState, 'date' | 'foodType'>;
type MultiKey = 'foodType';

interface FilterStore {
  filters: FilterState;
  setSingle: (_key: SingleKey, _value: string) => void;
  setMulti: (_key: MultiKey, _value: string) => void;
  applyDate: (_date: SelectedDate, _index: number) => void;
  addSchedule: () => void;
  reset: () => void;
  isInitialState: () => boolean;
  getCleanedFilters: () => FilterState;
}

export const useFilterStore = create<FilterStore>()((set, get) => ({
  filters: initialFilter,

  setSingle: (key, value) =>
    set(state => {
      const prev = state.filters[key] as string | null;
      return {
        filters: {
          ...state.filters,
          [key]: prev === value ? null : value,
        },
      };
    }),

  setMulti: (key, value) =>
    set(state => {
      const current = state.filters[key] ?? [];
      const next = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];
      return {
        filters: {
          ...state.filters,
          [key]: next.length > 0 ? next : null,
        },
      };
    }),

  applyDate: (date, index) =>
    set(state => {
      const list = state.filters.date ?? [];
      const next = [...list];
      next[index] = date;
      return { filters: { ...state.filters, date: next } };
    }),

  addSchedule: () =>
    set(state => ({
      filters: {
        ...state.filters,
        date: [
          ...(state.filters.date ?? []),
          { startDate: null, endDate: null },
        ],
      },
    })),

  reset: () => set({ filters: initialFilter }),

  isInitialState: () => isEqual(get().filters, initialFilter),

  // 날짜 중 startDate 없는 항목 제거
  getCleanedFilters: () => {
    const f = get().filters;
    return { ...f, date: f.date.filter(d => d.startDate !== null) };
  },
}));
