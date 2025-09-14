import { createBrowserRouter } from 'react-router-dom';

import Home from '@/pages/home/Home';
import { ROUTES } from '@/router/constant/routes';
import Layout from '@/router/Layout';
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
        path: ROUTES.FOOD_TRUCK_ONBOARDING,
        element: <FoodTruckOnboarding />,
      },
    ],
  },
]);
