import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { isEqual } from 'lodash';

import type { SelectedDate } from '@shared/types/calendar-types';
import {
  filtersAtom,
  initialFilter,
  resetAtom,
} from '@shared/store/filter-store';
import { getCleanedFilters } from '@pages/filter/utils/get-cleaned-filters';

export default function useFilterLogic() {
  const navigate = useNavigate();

  const [globalFilters, setGlobalFilters] = useAtom(filtersAtom);
  const [localFilters, setLocalFilters] = useState(globalFilters);
  const [, resetFilters] = useAtom(resetAtom);

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [currentDateIndex, setCurrentDateIndex] = useState<number | null>(null);

  useEffect(() => {
    setLocalFilters(globalFilters);
  }, [globalFilters]);

  const notFiltered = isEqual(localFilters, initialFilter);

  const handleGoBack = () => navigate(-1);

  const handleSelectSingle = (
    key: 'availableQuantity' | 'needElectricity' | 'paymentMethod',
    value: string
  ) => {
    setLocalFilters(prev => {
      const prevVal = prev[key] as string | null;
      return { ...prev, [key]: prevVal === value ? null : value };
    });
  };

  const handleSelectMulti = (key: 'categories', value: string) => {
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
    setLocalFilters(prev => ({
      ...prev,
      schedules: [...prev.schedules, { startDate: null, endDate: null }],
    }));
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
    const cleaned = getCleanedFilters(localFilters);
    setGlobalFilters(cleaned);
    navigate('/reservation');
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
  };
}
