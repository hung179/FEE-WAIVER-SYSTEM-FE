import { Outlet } from 'react-router-dom';
import Header from '../components/header/AdminHeader';
import { Sidebar } from '../components/Sidebar/Sidebar';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';

export default function MainLayout() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 grid grid-cols-[220px_1fr] overflow-x-hidden">
          <Sidebar />
          <div className="overflow-x-auto">
            <Breadcrumb />
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
}
