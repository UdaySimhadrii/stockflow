import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: '🏠' },
  { to: '/products', label: 'Products', icon: '📦' },
  { to: '/settings', label: 'Settings', icon: '⚙️' },
];

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  const navLinkClass = (isActive) =>
    `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-colors ${
      isActive ? 'bg-brand-50 text-brand-700' : 'text-muted hover:bg-ink/5 hover:text-ink'
    }`;

  return (
    <> 
      <aside className="hidden lg:flex h-screen w-72 flex-shrink-0 flex-col border-r border-border bg-surface">
        <div className="flex items-center gap-3 px-6 py-6">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-500 font-mono text-base font-semibold text-white">
            SF
          </span>
          <div>
            <p className="font-display text-lg font-semibold text-ink">StockFlow</p>
            <p className="text-xs text-muted">Inventory made simple</p>
          </div>
        </div>

        <nav className="flex-1 space-y-2 px-4">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => navLinkClass(isActive)}>
              <span className="text-base">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-border px-4 py-5">
          <p className="truncate text-sm font-semibold text-ink">{user?.organization?.name}</p>
          <p className="truncate text-xs text-muted">{user?.email}</p>
          <button
            onClick={logout}
            className="mt-3 w-full rounded-2xl border border-border bg-surface px-4 py-2 text-xs font-semibold text-muted transition hover:bg-ink/5 hover:text-ink"
          >
            Log out
          </button>
        </div>
      </aside>

      <aside className="hidden md:flex lg:hidden h-screen w-20 flex-shrink-0 flex-col items-center border-r border-border bg-surface py-6">
        <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500 font-mono text-base font-semibold text-white">
          SF
        </div>
        <nav className="flex flex-1 flex-col items-center gap-3">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={closeMenu}
              className={({ isActive }) =>
                `flex h-12 w-12 items-center justify-center rounded-2xl text-base transition ${
                  isActive ? 'bg-brand-50 text-brand-700' : 'text-muted hover:bg-ink/5 hover:text-ink'
                }`
              }
            >
              <span>{item.icon}</span>
              <span className="sr-only">{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <button
          onClick={logout}
          className="mt-8 flex h-12 w-12 items-center justify-center rounded-2xl border border-border text-muted transition hover:bg-ink/5 hover:text-ink"
          aria-label="Log out"
        >
          ⏻
        </button>
      </aside>

      <div className="fixed inset-x-0 top-0 z-40 flex items-center justify-between border-b border-border bg-surface px-4 py-3 lg:hidden">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsOpen(true)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-border text-ink transition hover:bg-ink/5"
            aria-label="Open navigation"
          >
            ☰
          </button>
          <div className="flex h-11 items-center gap-3 rounded-2xl bg-brand-500 px-3 text-white">
            <span className="font-mono">SF</span>
            <span className="text-sm font-semibold">StockFlow</span>
          </div>
        </div>
        <button
          onClick={logout}
          className="inline-flex h-11 items-center rounded-2xl border border-border px-4 text-sm font-semibold text-muted transition hover:bg-ink/5 hover:text-ink"
        >
          Log out
        </button>
      </div>

      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 transform border-r border-border bg-surface transition duration-300 lg:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-500 font-mono text-base font-semibold text-white">
              SF
            </span>
            <div>
              <p className="font-display text-base font-semibold text-ink">StockFlow</p>
              <p className="text-xs text-muted">Inventory tool</p>
            </div>
          </div>
          <button
            onClick={closeMenu}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-border text-ink transition hover:bg-ink/5"
            aria-label="Close navigation"
          >
            ✕
          </button>
        </div>
        <nav className="px-4 py-6 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={closeMenu}
              className={({ isActive }) => navLinkClass(isActive)}
            >
              <span className="text-base">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto border-t border-border px-4 py-5">
          <p className="truncate text-sm font-semibold text-ink">{user?.organization?.name}</p>
          <p className="truncate text-xs text-muted">{user?.email}</p>
        </div>
      </div>

      {isOpen && <div className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden" onClick={closeMenu} />}
    </>
  );
};

export default Navbar;
