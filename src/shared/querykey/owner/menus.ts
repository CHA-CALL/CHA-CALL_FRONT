export const MENUS_QUERY_KEY = {
  ALL: ['menus'],
  LIST: (foodTruckId: number) => [
    ...MENUS_QUERY_KEY.ALL,
    foodTruckId,
  ],
  SORTED_LIST: (foodTruckId: number, sort: string) => [
    ...MENUS_QUERY_KEY.LIST(foodTruckId),
    { sort },
  ],
  MENU: (menuId: number) => [...MENUS_QUERY_KEY.MENUS(), menuId],
  MENUS: () => [...MENUS_QUERY_KEY.ALL, 'menus'],
};
