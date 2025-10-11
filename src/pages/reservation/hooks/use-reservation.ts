import { useEffect, useRef, useState } from 'react';
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
import {
  useFoodTruckListQuery,
  useUpdateFoodTruckSaveStatus,
} from '@pages/reservation/hooks/use-food-truck-list-query';

export default function useReservation() {
  const navigate = useNavigate();
  const listBottomRef = useRef<HTMLDivElement | null>(null);

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

  const {
    foodTruckResponse,
    isPending,
    hasNextFoodTrucks,
    isFetchingNextPage,
    loadMoreFoodTrucks,
  } = useFoodTruckListQuery(queryFilters);

  const foodTruckData = foodTruckResponse;

  const { mutate: updateSaveStatus } = useUpdateFoodTruckSaveStatus();

  const handleClickChip = (category: string) => {
    setSelectedCategory(category);
  };

  const handleUpdateFoodTruckSaveStatus = (
    foodTruckId: number,
    isSavedRequest: boolean
  ) => {
    updateSaveStatus({ foodTruckId, isSavedRequest });
  };

  useEffect(() => {
    setLocationName(_.sortBy(extractLocationName(regions)));
  }, [regions]);

  useEffect(() => {
    const el = listBottomRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      entries => {
        const [entry] = entries;
        if (entry.isIntersecting && hasNextFoodTrucks && !isFetchingNextPage) {
          loadMoreFoodTrucks();
        }
      },
      {
        root: null,
        rootMargin: '0px 0px 50px 0px',
        threshold: 0,
      }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [hasNextFoodTrucks, isFetchingNextPage, loadMoreFoodTrucks]);

  const handleClickBack = () => navigate(-1);
  const handleClickLocation = () => navigate('/set-location');
  const handleClickFilter = () => navigate('/filter');
  const handleClickFoodTruck = (id: number) => navigate(`/food-truck/${id}`);
  const handleClickTooltip = () => setIsTooltipOpen(!isTooltipOpen);

  return {
    listBottomRef,
    isTooltipOpen,
    selectedCategory,
    locationName,
    notFiltered,
    isPending,
    foodTruckData,
    hasNextFoodTrucks,
    isFetchingNextPage,
    handleClickBack,
    handleClickLocation,
    handleClickFilter,
    handleClickFoodTruck,
    handleClickTooltip,
    handleClickChip,
    handleUpdateFoodTruckSaveStatus,
    loadMoreFoodTrucks,
  };
}
