import { createBrowserRouter } from 'react-router-dom';

import Home from '@/pages/home/Home';
import { ROUTES } from '@/router/constant/routes';
import Layout from '@/router/Layout';
import Filter from '@pages/filter/Filter';
import ChatList from '@pages/chat-list/ChatList';
import Reservation from '@/pages/reservation/Reservation';
import FoodTruckOnboarding from '@pages/@owner/food-truck-onboarding/FoodTruckOnboarding';
import SetLocation from '@pages/set-location/SetLocation';
import MessageList from '@pages/@owner/message-list/MessageList';
import MessageForm from '@pages/@owner/message-list/components/MessageForm';
import MyPage from '@pages/mypage/MyPage';
import ProfileSetting from '@pages/profile-setting/ProfileSetting';
import Account from '@pages/@owner/account/Account';
import AccountForm from '@pages/@owner/account/AccountForm';
import ReservationHistory from '@pages/reservation-history/ReservationHistory';
import SaveFoodTruckList from '@pages/save-food-truck-list/SaveFoodTruckList';
import UploadFoodTruck from '@pages/@owner/upload-food-truck/UploadFoodTruck';
import SetUserInfo from '@pages/set-user-info/SetUserInfo';
import FoodTruckManagement from '@pages/@owner/food-truck-management/FoodTruckManagement';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: ROUTES.HOME,
        element: <Home />,
      },
      {
        path: ROUTES.SET_LOCATION,
        element: <SetLocation />,
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
        path: ROUTES.SAVE_FOOD_TRUCK_LIST,
        element: <SaveFoodTruckList />,
      },
      {
        path: ROUTES.UPLOAD_FOOD_TRUCK,
        element: <UploadFoodTruck />,
      },
      {
        path: ROUTES.PROFILE_SETTING_DETAIL(':field'),
        element: <SetUserInfo />,
      },
      {
        path: ROUTES.FOOD_TRUCK_MANAGEMENT,
        element: <FoodTruckManagement />,
      },
    ],
  },
]);
