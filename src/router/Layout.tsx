import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <main className='max-w-[60rem] max-h-[100vh] mx-auto'>
      <Outlet />
    </main>
  );
}
