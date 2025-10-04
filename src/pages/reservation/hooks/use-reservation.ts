import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import _ from 'lodash';

import {
  extractLocationCodes,
  extractLocationName,
} from '@utils/extract-location';
import { formatSelectedDateToSchedules } from '@utils/date-formatter';
import { FOOD_TRUCK_CATEGORIES } from '@shared/constant/foodTruckCategory';
import { filtersAtom, notFilteredAtom } from '@shared/store/filter-store';
import { confirmedLocationsAtom } from '@shared/store/location-filter-store';
import useFoodTrucksQuery from '@pages/reservation/hooks/use-food-truck-list-query';

export default function useReservation() {
  const navigate = useNavigate();

  const [isTooltipOpen, setIsTooltipOpen] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    FOOD_TRUCK_CATEGORIES[0]
  );
  const [locationName, setLocationName] = useState<string[]>([]);

  const [filters] = useAtom(filtersAtom);
  const [notFiltered] = useAtom(notFilteredAtom);
  const [locations] = useAtom(confirmedLocationsAtom);

  const categories = (() => {
    if (selectedCategory === '전체보기') return filters.foodType ?? [];
    const base = filters.foodType ? [...filters.foodType] : [];
    if (!base.includes(selectedCategory)) base.push(selectedCategory);
    return base;
  })();

  const queryFilters = {
    regionCodes: extractLocationCodes(locations),
    schedules: formatSelectedDateToSchedules(filters.date),
    availableQuantity: filters.servingSize,
    categories,
    needElectricity: filters.electricityUsage,
    paymentMethod: filters.paymentType,
  };

  const { data: foodTruckData, isLoading } = useFoodTrucksQuery(queryFilters);

  const handleClickChip = (category: string) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    setLocationName(_.sortBy(extractLocationName(locations)));
  }, [locations]);

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
