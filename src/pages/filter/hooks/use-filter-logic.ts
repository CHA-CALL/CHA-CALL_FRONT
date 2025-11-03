import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtomValue, useSetAtom } from 'jotai';
import { isEqual } from 'lodash';

import type { SelectedDate } from '@type/calendar-types';
import {
  filtersAtom,
  initialFilter,
  resetAtom,
} from '@shared/store/filter-store';
import { getCleanedFilters } from '@pages/filter/utils/get-cleaned-filters';
import type {
  AvailableQuantityValue,
  FoodTruckCategoryValue,
  NeedElectricityValue,
  PaymentMethodValue,
} from '@type/category-types';
import { ROUTES } from '@router/constant/routes';

export default function useFilterLogic() {
  const navigate = useNavigate();

  const globalFilters = useAtomValue(filtersAtom);
  const setGlobalFilters = useSetAtom(filtersAtom);
  const resetFilters = useSetAtom(resetAtom);

  const [localFilters, setLocalFilters] = useState(globalFilters);

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [currentDateIndex, setCurrentDateIndex] = useState<number | null>(null);

  useEffect(() => {
    setLocalFilters(globalFilters);
  }, [globalFilters]);

  const cleanedLocalFilters = useMemo(
    () => getCleanedFilters(localFilters),
    [localFilters]
  );

  const notFiltered = isEqual(cleanedLocalFilters, globalFilters);

  const handleGoBack = () => navigate(-1);

  const handleSelectSingle = (
    key: 'availableQuantity' | 'needElectricity' | 'paymentMethod',
    value: AvailableQuantityValue | NeedElectricityValue | PaymentMethodValue
  ) => {
    setLocalFilters(prev => {
      const prevVal = prev[key] as string | null;
      return { ...prev, [key]: prevVal === value ? null : value };
    });
  };

  const handleSelectMulti = (
    key: 'categories',
    value: FoodTruckCategoryValue
  ) => {
    setLocalFilters(prev => {
      const current = prev[key] ?? [];
      const next = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];
      return { ...prev, [key]: next.length > 0 ? next : null };
    });
  };

  const handleApplyDate = (schedules: SelectedDate, index: number) => {
    setLocalFilters(prev => {
      const next = [...prev.schedules];
      next[index] = schedules;
      return { ...prev, schedules: next };
    });
  };

  const handleAddSchedule = () => {
    setLocalFilters(prev => {
      const hasEmptySchedule = prev.schedules.some(
        s => s.startDate === null && s.endDate === null
      );

      if (hasEmptySchedule) return prev;

      return {
        ...prev,
        schedules: [...prev.schedules, { startDate: null, endDate: null }],
      };
    });
  };

  const handleResetFilter = () => {
    resetFilters();
    setLocalFilters(initialFilter);
  };

  const handleOpenCalendar = (index: number) => {
    setCurrentDateIndex(index);
    setIsBottomSheetOpen(true);
  };

  const handleCloseCalendar = () => {
    setIsBottomSheetOpen(false);
    setCurrentDateIndex(null);
  };

  const handleApplyFilter = () => {
    setGlobalFilters(cleanedLocalFilters);
    navigate(ROUTES.RESERVATION);
  };

  const handleDeleteSchedule = (index: number) => {
    setLocalFilters(prev => {
      const newScheduleArray = prev.schedules.filter((_, i) => i !== index);
      if (newScheduleArray.length === 0) {
        newScheduleArray.push({ startDate: null, endDate: null });
      }

      return { ...prev, schedules: newScheduleArray };
    });
  };

  return {
    localFilters,
    isBottomSheetOpen,
    currentDateIndex,
    notFiltered,
    handleGoBack,
    handleSelectSingle,
    handleSelectMulti,
    handleApplyDate,
    handleAddSchedule,
    handleResetFilter,
    handleOpenCalendar,
    handleCloseCalendar,
    handleApplyFilter,
    handleDeleteSchedule,
  };
}
