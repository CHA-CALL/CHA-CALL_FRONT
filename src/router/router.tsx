import { createBrowserRouter } from 'react-router-dom';

import Home from '@/pages/home/Home';
import Reservation from '@/pages/reservation/Reservation';
import { ROUTES } from '@/router/constant/routes';
import Layout from '@/router/Layout';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: ROUTES.HOME,
        element: <Home />,
      },
      {
        path: ROUTES.RESERVATION,
        element: <Reservation />,
      },
    ],
  },
]);
