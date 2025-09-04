import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <main className='max-w-[60rem] min-h-dvh mx-auto'>
      <Outlet />
    </main>
  );
}
