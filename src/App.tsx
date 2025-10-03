import { RouterProvider } from 'react-router-dom';
import { Provider } from 'jotai';

import { router } from '@/router/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ToastContainer from '@shared/components/custom-toast/ToastContainer';

import '@styles/global.css';

import SvgSprite from '@assets/svg/SvgSprite';

const queryClient = new QueryClient();

function App() {
  return (
    <Provider>
      <ToastContainer />
      <QueryClientProvider client={queryClient}>
        <SvgSprite />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
