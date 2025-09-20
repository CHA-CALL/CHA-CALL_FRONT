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
    ],
  },
]);
