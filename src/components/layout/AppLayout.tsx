import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  BellIcon,
  ClipboardCheckIcon,
  ClipboardListIcon,
  FileBarChartIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  MapIcon,
  MenuIcon,
  QrCodeIcon,
  ShieldAlertIcon,
  TrendingUpIcon,
  UsersIcon,
  XIcon } from
'lucide-react';
import { Logo } from './Logo';
import { Toast } from './Toast';
import { useApp } from '../../contexts/AppContext';
import type { Role } from '../../types';

interface NavItem {
  label: string;
  to: string;
  icon: React.ComponentType<{className?: string;}>;
  end?: boolean;
}

const NAV: Record<Role, NavItem[]> = {
  employee: [
  { label: 'Dashboard', to: '/employee', icon: LayoutDashboardIcon, end: true },
  { label: 'Report Hazard', to: '/employee/report', icon: QrCodeIcon },
  { label: 'My Reports', to: '/employee/reports', icon: ClipboardListIcon },
  {
    label: 'My Corrective Actions',
    to: '/employee/actions',
    icon: ClipboardCheckIcon
  },
  { label: 'Notifications', to: '/employee/notifications', icon: BellIcon }],

  manager: [
  { label: 'Dashboard', to: '/manager', icon: LayoutDashboardIcon, end: true },
  { label: 'Hazard Reports', to: '/manager/hazards', icon: ShieldAlertIcon },
  {
    label: 'Corrective Actions',
    to: '/manager/actions',
    icon: ClipboardCheckIcon
  },
  { label: 'Safety Analytics', to: '/manager/analytics', icon: TrendingUpIcon },
  { label: 'Heatmap', to: '/manager/heatmap', icon: MapIcon },
  { label: 'Notifications', to: '/manager/notifications', icon: BellIcon },
  { label: 'Reports', to: '/manager/reports', icon: FileBarChartIcon }],

  admin: [
  { label: 'Users', to: '/admin/users', icon: UsersIcon },
  { label: 'Locations', to: '/admin/locations', icon: MapIcon },
  { label: 'QR Codes', to: '/admin/qr', icon: QrCodeIcon },
  { label: 'Roles', to: '/admin/roles', icon: ShieldAlertIcon }]

};

const PROFILE: Record<Role, {name: string;role: string;initials: string;}> = {
  employee: {
    name: 'Kasun Perera',
    role: 'Maintenance Officer · #104',
    initials: 'KP'
  },
  manager: { name: 'Safety Manager', role: 'EHS Lead', initials: 'SM' },
  admin: { name: 'System Admin', role: 'Administrator', initials: 'SA' }
};

export function AppLayout({ role }: {role: Role;}) {
  const { logout, notifications } = useApp();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const profile = PROFILE[role];
  const unread = notifications.filter(
    (n) => n.audience === role && !n.read
  ).length;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const nav =
  <nav className="flex flex-1 flex-col gap-1 px-3" aria-label="Main navigation">
      {NAV[role].map((item) =>
    <NavLink
      key={item.to}
      to={item.to}
      end={item.end}
      onClick={() => setMobileOpen(false)}
      className={({ isActive }) =>
      `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
      isActive ?
      'bg-blue-50 text-blue-700' :
      'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`

      }>
      
          <item.icon className="h-[18px] w-[18px]" />
          <span className="flex-1">{item.label}</span>
          {item.label === 'Notifications' && unread > 0 &&
      <span className="rounded-full bg-red-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
              {unread}
            </span>
      }
        </NavLink>
    )}
      <button
      type="button"
      onClick={handleLogout}
      className="mt-1 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900">
      
        <LogOutIcon className="h-[18px] w-[18px]" />
        Logout
      </button>
    </nav>;


  return (
    <div className="flex min-h-full w-full bg-[#f4f6f9]">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-slate-200 bg-white py-5 lg:flex">
        <div className="px-5 pb-6">
          <Logo />
        </div>
        {nav}
        <div className="mt-4 px-3">
          <div className="rounded-xl bg-slate-50 p-3">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              Signed in as
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-900">
              {profile.name}
            </p>
            <p className="text-xs text-slate-500">{profile.role}</p>
          </div>
        </div>
      </aside>

      {mobileOpen &&
      <div className="fixed inset-0 z-40 lg:hidden">
          <div
          className="absolute inset-0 bg-slate-900/40"
          onClick={() => setMobileOpen(false)} />
        
          <div className="relative flex h-full w-72 flex-col bg-white py-5">
            <div className="flex items-center justify-between px-5 pb-6">
              <Logo />
              <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100">
              
                <XIcon className="h-5 w-5" />
              </button>
            </div>
            {nav}
          </div>
        </div>
      }

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur lg:px-8">
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden">
            
            <MenuIcon className="h-5 w-5" />
          </button>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-slate-900">
              {role === 'manager' ?
              'Good Morning, Safety Manager' :
              role === 'employee' ?
              'Hello, Kasun Perera' :
              'Administration Console'}
            </p>
            <p className="truncate text-xs text-slate-500">
              Monday, 10 August 2026 · Colombo Plant
            </p>
          </div>
          <button
            type="button"
            onClick={() =>
            navigate(
              role === 'manager' ?
              '/manager/notifications' :
              role === 'employee' ?
              '/employee/notifications' :
              '/admin/users'
            )
            }
            aria-label={`Notifications, ${unread} unread`}
            className="relative rounded-xl border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50">
            
            <BellIcon className="h-[18px] w-[18px]" />
            {unread > 0 &&
            <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                {unread}
              </span>
            }
          </button>
          <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 py-1.5 pl-1.5 pr-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-900 text-[11px] font-bold text-white">
              {profile.initials}
            </span>
            <span className="hidden leading-tight sm:block">
              <span className="block text-xs font-semibold text-slate-900">
                {profile.name}
              </span>
              <span className="block text-[11px] text-slate-500">
                {profile.role}
              </span>
            </span>
          </div>
        </header>
        <main className="flex-1 px-4 py-6 lg:px-8">
          <Outlet />
        </main>
      </div>
      <Toast />
    </div>);

}