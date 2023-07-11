import Header from '../components/Header';
import { Outlet } from 'react-router-dom';

const DefaultLayout = () => {
  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col">
        <div className="mx-auto max-h-screen max-w-screen-2xl p-4 md:p-6 2xl:p-10 flex-grow flex flex-col">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DefaultLayout;