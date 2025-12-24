export const ROUTES = {
  HOME: '/',
  FILTER: '/filter',
  RESERVATION: '/reservation',
  FOOD_TRUCK_ONBOARDING: '/owner/food-truck-onboarding',
  SET_REGION_GLOBAL: '/set-region',
  CHAT_LIST: '/chat-list',
  CHAT_ROOM: (chatRoomId: string) => `/chat-room/${chatRoomId}`,
  MESSAGE_LIST: '/owner/message-list',
  MESSAGE_FORM: '/owner/message-form',
  MYPAGE: '/mypage',
  ACCOUNT: '/owner/account',
  ACCOUNT_FORM: '/owner/account-form',
  RESERVATION_HISTORY: '/reservation-history',
  RESERVATION_DETAIL: (reservationId: string) =>
    `/reservation-history/detail/${reservationId}`,
  SAVE_FOOD_TRUCK_LIST: '/save-food-truck-list',
  UPLOAD_FOOD_TRUCK_IMAGES: (foodTruckId: string) =>
    `/owner/food-truck-form/upload-food-truck-images/${foodTruckId}`,
  PROFILE_SETTING: '/profile-setting',
  PROFILE_SETTING_EDIT: '/profile-setting/edit',
  FOOD_TRUCK_MANAGEMENT: '/owner/food-truck-management',
  MENU_LIST: (foodTruckId: string) => `/owner/menu-list/${foodTruckId}`,
  MENU_REGISTER: (foodTruckId: string) => `/owner/menu-register/${foodTruckId}`,
  MENU_EDIT: (foodTruckId: string, menuId: string) =>
    `/owner/menu-edit/${foodTruckId}/${menuId}`,
  FOOD_TRUCK_DETAIL: (foodTruckId: string) => `/food-truck/${foodTruckId}`,
  FOOD_TRUCK_FORM: (foodTruckId: string) =>
    `/owner/food-truck-form/${foodTruckId}`,
  SET_REGION_FORM: (foodTruckId: string) =>
    `/owner/food-truck-form/${foodTruckId}/set-region`,
  OWNER_ESTIMATE: (chatRoomId: string) => `/owner/estimate/${chatRoomId}`,
};
