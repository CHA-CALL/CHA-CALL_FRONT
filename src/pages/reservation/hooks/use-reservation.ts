import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { useInView } from 'react-intersection-observer';
import _ from 'lodash';

import {
  extractLocationCodes,
  extractLocationName,
} from '@utils/extract-location';
import { FOOD_TRUCK_CATEGORIES } from '@constant/food-truck-categories';
import { filtersAtom, notFilteredAtom } from '@shared/store/filter-store';
import { regionsAtom } from '@shared/store/regions-store';
import {
  useFoodTruckListQuery,
  useUpdateFoodTruckSaveStatus,
} from '@pages/reservation/hooks/use-food-truck-list-query';
import type { FoodTruckCategoryValue } from '@type/category-types';
import { ROUTES } from '@router/constant/routes';
import { formatSelectedDateToSchedules } from '@utils/date/date-formatter';

export default function useReservation() {
  const navigate = useNavigate();
  const { ref: listBottomRef, inView } = useInView();

  const [isTooltipOpen, setIsTooltipOpen] = useState(true);
  const [selectedCategory, setSelectedCategory] =
    useState<FoodTruckCategoryValue>(FOOD_TRUCK_CATEGORIES.ALL);
  const [locationName, setLocationName] = useState<string[]>([]);

  const filters = useAtomValue(filtersAtom);
  const notFiltered = useAtomValue(notFilteredAtom);
  const regions = useAtomValue(regionsAtom);

  const selectedCategories = (() => {
    if (selectedCategory === FOOD_TRUCK_CATEGORIES.ALL)
      return filters.categories ?? [];
    const base = filters.categories ? [...filters.categories] : [];
    if (!base.includes(selectedCategory)) base.push(selectedCategory);
    return base;
  })();

  const queryFilters = {
    regionCodes: extractLocationCodes(regions),
    schedules: formatSelectedDateToSchedules(filters.schedules),
    availableQuantity: filters.availableQuantity,
    categories: selectedCategories,
    needElectricity: filters.needElectricity,
    paymentMethod: filters.paymentMethod,
  };

  const {
    foodTruckData,
    isPending,
    hasNextFoodTrucks,
    isFetchingNextPage,
    fetchNextPage,
  } = useFoodTruckListQuery(queryFilters);

  const { mutate: updateSaveStatus } = useUpdateFoodTruckSaveStatus();

  const handleClickChip = (category: FoodTruckCategoryValue) => {
    setSelectedCategory(category);
  };

  const handleUpdateFoodTruckSaveStatus = (
    foodTruckId: number,
    isSavedRequest: boolean
  ) => {
    updateSaveStatus({ foodTruckId, isSavedRequest });
  };

  const handleClickBack = () => navigate(-1);
  const handleClickLocation = () => navigate(ROUTES.SET_REGION_GLOBAL);
  const handleClickFilter = () => navigate(ROUTES.FILTER);
  // TODO: 머지 후 경로 수정
  const handleClickFoodTruck = (id: number) => navigate(`/food-truck/${id}`);
  const handleClickTooltip = () => setIsTooltipOpen(!isTooltipOpen);

  useEffect(() => {
    setLocationName(_.sortBy(extractLocationName(regions)));
  }, [regions]);

  useEffect(() => {
    if (inView && hasNextFoodTrucks && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextFoodTrucks, isFetchingNextPage, fetchNextPage]);

  return {
    listBottomRef,
    isTooltipOpen,
    selectedCategory,
    locationName,
    notFiltered,
    isPending,
    foodTruckData,
    isFetchingNextPage,
    handleClickBack,
    handleClickLocation,
    handleClickFilter,
    handleClickFoodTruck,
    handleClickTooltip,
    handleClickChip,
    handleUpdateFoodTruckSaveStatus,
    fetchNextPage,
  };
}
