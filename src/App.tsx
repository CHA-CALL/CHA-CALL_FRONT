import { RouterProvider } from 'react-router-dom';

import { router } from '@/router/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';

import '@styles/global.css';

import SvgSprite from '@assets/svg/SvgSprite';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SvgSprite />
      <RouterProvider router={router} />
      <ToastContainer
        position='bottom-center'
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme='light'
        icon={false}
        style={{
          bottom: '8rem',
        }}
        toastStyle={{
          background: 'transparent',
          boxShadow: 'none',
          padding: 0,
          margin: 0,
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
