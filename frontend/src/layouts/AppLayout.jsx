import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';

const AppLayout = () => {
  return (
    <div className="flex min-h-screen bg-paper">
      <Navbar />
      <main className="flex min-h-screen flex-1 flex-col overflow-y-auto px-4 py-4 pt-20 lg:pt-8 lg:px-8">
        <div className="mx-auto flex-1 max-w-5xl">
          <Outlet />
        </div>

        <footer className="mx-auto mt-8 w-full max-w-5xl border-t border-border pt-5 text-sm text-muted">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 StockFlow. All rights reserved.</p>
            <div className="flex flex-wrap items-center gap-4">
              <a href="#" className="hover:text-ink">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-ink">
                Terms of Service
              </a>
              <a href="#" className="hover:text-ink">
                Help Center
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default AppLayout;
