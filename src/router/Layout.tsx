import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Loading from '@layout/loading/Loading';

export default function Layout() {
  return (
    <main className='mx-auto min-h-dvh max-w-[60rem] pt-[4.8rem]'>
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
    </main>
  );
}
