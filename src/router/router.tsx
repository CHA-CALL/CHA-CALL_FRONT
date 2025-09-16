import { createBrowserRouter } from 'react-router-dom';

import { ROUTES } from '@/router/constant/routes';
import Layout from '@/router/Layout';
import Home from '@/pages/home/Home';
import Filter from '@pages/filter/Filter';
import Reservation from '@/pages/reservation/Reservation';
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
        path: ROUTES.RESERVATION,
        element: <Reservation />,
      },
      {
        path: ROUTES.FOOD_TRUCK_ONBOARDING,
        element: <FoodTruckOnboarding />,
      },
    ],
  },
]);
