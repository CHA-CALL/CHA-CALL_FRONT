import { createBrowserRouter } from 'react-router-dom';

import Home from '@/pages/home/Home';
import { ROUTES } from '@/router/constant/routes';
import Layout from '@/router/Layout';
import Filter from '@pages/filter/Filter';
import FoodTruckOnboarding from '@pages/owner-onboarding/FoodTruckOnboarding';
import SetLocation from '@pages/set-location/SetLocation';

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
        path: ROUTES.FOOD_TRUCK_ONBOARDING,
        element: <FoodTruckOnboarding />,
      },
    ],
  },
]);
