import { createBrowserRouter } from 'react-router-dom';
import Home from '@/pages/home/Home';
import { ROUTES } from '@/router/constant/routes';

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Home />,
  },
]);
