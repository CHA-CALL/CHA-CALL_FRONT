import { createBrowserRouter } from 'react-router-dom';
import { ROUTES } from '@router/constant/routes';
import { lazy } from 'react';

import Layout from '@router/Layout';

const Home = lazy(() => import('@pages/home/Home'));
const SetRegionGlobal = lazy(
  () => import('@pages/set-region-global/SetRegion')
);
const Filter = lazy(() => import('@pages/filter/Filter'));
const ChatList = lazy(() => import('@pages/chat-list/ChatList'));
const Reservation = lazy(() => import('@pages/reservation/Reservation'));
const FoodTruckOnboarding = lazy(
  () => import('@pages/@owner/food-truck-onboarding/FoodTruckOnboarding')
);
const MessageList = lazy(
  () => import('@pages/@owner/message-list/MessageList')
);
const MessageForm = lazy(
  () => import('@pages/@owner/message-list/components/MessageForm')
);
const MyPage = lazy(() => import('@pages/mypage/MyPage'));
const ProfileSetting = lazy(
  () => import('@pages/profile-setting/ProfileSetting')
);
const Account = lazy(() => import('@pages/@owner/account/Account'));
const AccountForm = lazy(() => import('@pages/@owner/account/AccountForm'));
const ReservationHistory = lazy(
  () => import('@pages/reservation-history/ReservationHistory')
);
const SaveFoodTruckList = lazy(
  () => import('@pages/save-food-truck-list/SaveFoodTruckList')
);
const UploadFoodTruckImages = lazy(
  () => import('@pages/@owner/upload-food-truck-images/UploadFoodTruckImages')
);
const SetUserInfo = lazy(() => import('@pages/set-user-info/SetUserInfo'));
const ReservationDetail = lazy(
  () => import('@pages/reservation-detail/ReservationDetail')
);
const FoodTruckManagement = lazy(
  () => import('@pages/@owner/food-truck-management/FoodTruckManagement')
);
const MenuList = lazy(() => import('@pages/@owner/menu/MenuList'));
const MenuRegister = lazy(() => import('@pages/@owner/menu/MenuRegister'));
const MenuEdit = lazy(() => import('@pages/@owner/menu/MenuEdit'));
const FoodTruckDetail = lazy(
  () => import('@pages/food-truck-detail/FoodTruckDetail')
);
const FoodTruckForm = lazy(
  () => import('@pages/@owner/food-truck-form/FoodTruckForm')
);
const SetRegion = lazy(() => import('@pages/@owner/set-region/SetRegion'));
const ChatRoom = lazy(() => import('@pages/chat-room/ChatRoom'));
const Estimate = lazy(() => import('@pages/@owner/estimate/Estimate'));

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: ROUTES.HOME,
        element: <Home />,
      },
      {
        path: ROUTES.SET_REGION_GLOBAL,
        element: <SetRegionGlobal />,
      },
      {
        path: ROUTES.FILTER,
        element: <Filter />,
      },
      {
        path: ROUTES.RESERVATION,
        element: <Reservation />,
      },

      {
        path: ROUTES.FOOD_TRUCK_ONBOARDING,
        element: <FoodTruckOnboarding />,
      },
      {
        path: ROUTES.CHATLIST,
        element: <ChatList />,
      },
      {
        path: ROUTES.CHATROOM(':chatRoomId'),
        element: <ChatRoom />,
      },
      {
        path: ROUTES.MESSAGE_LIST,
        element: <MessageList />,
      },
      {
        path: ROUTES.MESSAGE_FORM,
        element: <MessageForm />,
      },
      {
        path: ROUTES.MYPAGE,
        element: <MyPage />,
      },
      {
        path: ROUTES.PROFILE_SETTING,
        element: <ProfileSetting />,
      },
      {
        path: ROUTES.ACCOUNT,
        element: <Account />,
      },
      {
        path: ROUTES.ACCOUNT_FORM + '/:id?',
        element: <AccountForm />,
      },
      {
        path: ROUTES.RESERVATION_HISTORY,
        element: <ReservationHistory />,
      },
      {
        path: ROUTES.RESERVATION_DETAIL(':reservationId'),
        element: <ReservationDetail />,
      },
      {
        path: ROUTES.SAVE_FOOD_TRUCK_LIST,
        element: <SaveFoodTruckList />,
      },
      {
        path: ROUTES.UPLOAD_FOOD_TRUCK_IMAGES(':foodTruckId'),
        element: <UploadFoodTruckImages />,
      },
      {
        path: ROUTES.PROFILE_SETTING_EDIT,
        element: <SetUserInfo />,
      },
      {
        path: ROUTES.FOOD_TRUCK_MANAGEMENT,
        element: <FoodTruckManagement />,
      },
      {
        path: ROUTES.MENU_LIST(':foodTruckId'),
        element: <MenuList />,
      },
      {
        path: ROUTES.MENU_REGISTER(':foodTruckId'),
        element: <MenuRegister />,
      },
      {
        path: ROUTES.MENU_EDIT(':foodTruckId', ':menuId'),
        element: <MenuEdit />,
      },
      {
        path: ROUTES.FOOD_TRUCK_DETAIL(':foodTruckId'),
        element: <FoodTruckDetail />,
      },
      {
        path: ROUTES.FOOD_TRUCK_FORM(':foodTruckId'),
        element: <FoodTruckForm />,
      },
      {
        path: ROUTES.SET_REGION_FORM(':foodTruckId'),
        element: <SetRegion />,
      },
      {
        path: ROUTES.OWNER_ESTIMATE(':chatRoomId'),
        element: <Estimate />,
      },
    ],
  },
]);
