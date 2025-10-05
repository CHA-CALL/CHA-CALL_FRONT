import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import _ from 'lodash';

import {
  extractLocationCodes,
  extractLocationName,
} from '@utils/extract-location';
import { formatSelectedDateToSchedules } from '@utils/date-formatter';
import { FOOD_TRUCK_CATEGORIES } from '@shared/constant/food-truck-category';
import { filtersAtom, notFilteredAtom } from '@shared/store/filter-store';
import { confirmedRegionsAtom } from '@shared/store/regions-store';
import useFoodTruckListQuery from '@pages/reservation/hooks/use-food-truck-list-query';

export default function useReservation() {
  const navigate = useNavigate();

  const [isTooltipOpen, setIsTooltipOpen] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    FOOD_TRUCK_CATEGORIES[0]
  );
  const [locationName, setLocationName] = useState<string[]>([]);

  const filters = useAtomValue(filtersAtom);
  const notFiltered = useAtomValue(notFilteredAtom);
  const regions = useAtomValue(confirmedRegionsAtom);

  const categories = (() => {
    if (selectedCategory === '전체보기') return filters.categories ?? [];
    const base = filters.categories ? [...filters.categories] : [];
    if (!base.includes(selectedCategory)) base.push(selectedCategory);
    return base;
  })();

  const queryFilters = {
    regionCodes: extractLocationCodes(regions),
    schedules: formatSelectedDateToSchedules(filters.schedules),
    availableQuantity: filters.availableQuantity,
    categories,
    needElectricity: filters.needElectricity,
    paymentMethod: filters.paymentMethod,
  };

  const { data: foodTruckData, isLoading } =
    useFoodTruckListQuery(queryFilters);

  const handleClickChip = (category: string) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    setLocationName(_.sortBy(extractLocationName(regions)));
  }, [regions]);

  const handleClickBack = () => navigate(-1);
  const handleClickLocation = () => navigate('/set-location');
  const handleClickFilter = () => navigate('/filter');
  const handleClickFoodTruck = (name: string) =>
    navigate(`/food-truck/${name}`);
  const handleClickTooltip = () => setIsTooltipOpen(!isTooltipOpen);

  return {
    isTooltipOpen,
    selectedCategory,
    locationName,
    notFiltered,
    isLoading,
    foodTruckData,
    handleClickBack,
    handleClickLocation,
    handleClickFilter,
    handleClickFoodTruck,
    handleClickTooltip,
    handleClickChip,
  };
}
