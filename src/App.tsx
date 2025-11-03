import { RouterProvider } from 'react-router-dom';
import { Provider } from 'jotai';

import { router } from '@/router/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ToastContainer from '@components/custom-toast/ToastContainer';

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
        <div className='text-[1.5rem]'>
          <ReactQueryDevtools initialIsOpen={false} />
        </div>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
