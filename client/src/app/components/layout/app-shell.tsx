import { NavLink, Outlet } from 'react-router-dom';
import type { ReactNode } from 'react';
import { Button } from '@/app/components/ui/button';
import { useAuth } from '@/app/hooks/use-auth';

export type NavItem = {
  label: string;
  to: string;
};

export type AppShellProps = {
  navItems: NavItem[];
  sidebarFooter?: ReactNode;
  headerContent?: ReactNode;
};

export const AppShell = ({ navItems, sidebarFooter, headerContent }: AppShellProps) => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="grid min-h-screen grid-cols-[260px_1fr]">
        <aside className="flex flex-col border-r border-slate-100 bg-white p-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-primary-600">RegiFlow</p>
            <p className="text-lg font-bold text-slate-900">{user?.organization ?? 'Workspace'}</p>
            <p className="text-xs text-slate-500">{user?.email}</p>
          </div>
          <nav className="mt-8 flex flex-col gap-1 text-sm font-medium text-slate-500">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-xl px-3 py-2 transition ${
                    isActive ? 'bg-primary-50 text-primary-700' : 'hover:bg-slate-100'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="mt-auto space-y-4">
            {sidebarFooter}
            <Button variant="ghost" className="w-full justify-start px-3" onClick={logout}>
              Log out
            </Button>
          </div>
        </aside>
        <main className="flex flex-col gap-8 px-10 py-8">
          <header className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">RegiFlow</p>
              <h1 className="text-2xl font-bold text-slate-900">Operational Console</h1>
            </div>
            {headerContent}
          </header>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
