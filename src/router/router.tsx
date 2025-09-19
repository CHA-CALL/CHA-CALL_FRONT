import { createBrowserRouter } from 'react-router-dom';

import Home from '@/pages/home/Home';
import { ROUTES } from '@/router/constant/routes';
import Layout from '@/router/Layout';
import Filter from '@pages/filter/Filter';
import ChatList from '@pages/chat-list/ChatList';
import Reservation from '@/pages/reservation/Reservation';
import FoodTruckOnboarding from '@pages/owner-onboarding/FoodTruckOnboarding';
import SetLocation from '@pages/set-location/SetLocation';
import Account from '@pages/@owner/account/Account';
import AccountForm from '@pages/@owner/account/AccountForm';

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
        path: ROUTES.ACCOUNT_FORM + '/:id?',
        element: <AccountForm />,
      },
      {
        path: ROUTES.ACCOUNT,
        element: <Account />,
      },
    ],
  },
]);
