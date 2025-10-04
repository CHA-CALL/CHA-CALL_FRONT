import { atom } from 'jotai';
import { isEqual } from 'lodash';

import type { SelectedDate } from '@shared/types/calendar-types';
import {
  AVAILABLE_QUANTITY,
  NEED_ELECTRICITY,
  PAYMENT_METHOD,
} from '@pages/filter/constant/filter-option-constants';

export interface FilterState {
  schedules: SelectedDate[];
  availableQuantity: typeof AVAILABLE_QUANTITY | null;
  categories: string[] | null;
  needElectricity: typeof NEED_ELECTRICITY | null;
  paymentMethod: typeof PAYMENT_METHOD | null;
}

export const initialFilter: FilterState = {
  schedules: [{ startDate: null, endDate: null }],
  availableQuantity: null,
  categories: null,
  needElectricity: null,
  paymentMethod: null,
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
    }: {
      key: Exclude<keyof FilterState, 'schedules' | 'categories'>;
      value: string;
    }
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
  (get, set, { key, value }: { key: 'categories'; value: string }) => {
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
  (
    get,
    set,
    { schedules, index }: { schedules: SelectedDate; index: number }
  ) => {
    const filters = get(filtersAtom);
    const list = filters.schedules ?? [];
    const next = [...list];
    next[index] = schedules;
    set(filtersAtom, { ...filters, schedules: next });
  }
);

export const addScheduleAtom = atom(null, (get, set) => {
  const filters = get(filtersAtom);
  set(filtersAtom, {
    ...filters,
    schedules: [
      ...(filters.schedules ?? []),
      { startDate: null, endDate: null },
    ],
  });
});

export const resetAtom = atom(null, (_, set) => {
  set(filtersAtom, initialFilter);
});

export const notFilteredAtom = atom(get =>
  isEqual(get(filtersAtom), initialFilter)
);
