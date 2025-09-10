import { createBrowserRouter } from 'react-router-dom';

import Home from '@/pages/home/Home';
import { ROUTES } from '@/router/constant/routes';
import Layout from '@/router/Layout';
import OwnerOnboarding from '@pages/owner-onboarding/OwnerOnboarding';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: ROUTES.HOME,
        element: <Home />,
      },
      {
        path: ROUTES.OWNER_ONBOARDING,
        element: <OwnerOnboarding />,
      },
    ],
  },
]);
