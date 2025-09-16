import { createBrowserRouter } from 'react-router-dom';

import { ROUTES } from '@/router/constant/routes';
import Layout from '@/router/Layout';
import Home from '@/pages/home/Home';
import Filter from '@pages/filter/Filter';
import ChatList from '@pages/chat-list/ChatList';
import FoodTruckOnboarding from '@pages/owner-onboarding/FoodTruckOnboarding';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: ROUTES.HOME,
        element: <Home />,
      },
      {
        path: ROUTES.FILTER,
        element: <Filter />,
      },
      {
        path: ROUTES.FOOD_TRUCK_ONBOARDING,
        element: <FoodTruckOnboarding />,
      },
      {
        path: ROUTES.CHATLIST,
        element: <ChatList />,
      },
    ],
  },
]);
