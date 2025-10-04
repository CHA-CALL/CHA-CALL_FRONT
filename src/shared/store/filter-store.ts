import { atom } from 'jotai';
import { isEqual } from 'lodash';

import type { SelectedDate } from '@shared/types/calendar-types';
import {
  ELECTRICITY_USAGE,
  PAYMENT_TYPE,
  SERVING_SIZE,
} from '@pages/filter/constant/filter-option-constants';

export interface FilterState {
  date: SelectedDate[];
  servingSize: typeof SERVING_SIZE | null;
  foodType: string[] | null;
  electricityUsage: typeof ELECTRICITY_USAGE | null;
  paymentType: typeof PAYMENT_TYPE | null;
}

export const initialFilter: FilterState = {
  date: [{ startDate: null, endDate: null }],
  servingSize: null,
  foodType: null,
  electricityUsage: null,
  paymentType: null,
};

export const filtersAtom = atom<FilterState>(initialFilter);

export const setSingleAtom = atom(
  null,
  (
    get,
    set,
    {
      key,
      value,
    }: { key: Exclude<keyof FilterState, 'date' | 'foodType'>; value: string }
  ) => {
    const filters = get(filtersAtom);
    const prev = filters[key] as string | null;
    set(filtersAtom, {
      ...filters,
      [key]: prev === value ? null : value,
    });
  }
);

export const setMultiAtom = atom(
  null,
  (get, set, { key, value }: { key: 'foodType'; value: string }) => {
    const filters = get(filtersAtom);
    const current = filters[key] ?? [];
    const next = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    set(filtersAtom, {
      ...filters,
      [key]: next.length > 0 ? next : null,
    });
  }
);

export const applyDateAtom = atom(
  null,
  (get, set, { date, index }: { date: SelectedDate; index: number }) => {
    const filters = get(filtersAtom);
    const list = filters.date ?? [];
    const next = [...list];
    next[index] = date;
    set(filtersAtom, { ...filters, date: next });
  }
);

export const addScheduleAtom = atom(null, (get, set) => {
  const filters = get(filtersAtom);
  set(filtersAtom, {
    ...filters,
    date: [...(filters.date ?? []), { startDate: null, endDate: null }],
  });
});

export const resetAtom = atom(null, (_, set) => {
  set(filtersAtom, initialFilter);
});

export const notFilteredAtom = atom(get =>
  isEqual(get(filtersAtom), initialFilter)
);
