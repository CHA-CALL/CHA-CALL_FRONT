export const OWNER_GET_MENUS = {
  ALL: ['owner-menus'],
  DETAILS: () => [...OWNER_GET_MENUS.ALL, 'detail'],
  DETAIL: (foodTruckId: number, sort: string) => [
    ...OWNER_GET_MENUS.DETAILS(),
    foodTruckId,
    sort,
  ],
};
