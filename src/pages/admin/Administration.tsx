import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { PlusIcon, QrCodeIcon } from 'lucide-react';
import { PageHeader } from '../../components/PageHeader';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Field';
import { useApp } from '../../contexts/AppContext';
import { locationRecords, users } from '../../data/mockData';

const TABS = [
{ key: 'users', label: 'Users', to: '/admin/users' },
{ key: 'locations', label: 'Locations', to: '/admin/locations' },
{ key: 'qr', label: 'QR Codes', to: '/admin/qr' },
{ key: 'roles', label: 'Roles', to: '/admin/roles' }];


const ROLES = [
{
  name: 'Employee',
  permissions: 'Report hazards, view own reports, resolve assigned actions',
  members: 42
},
{
  name: 'Manager',
  permissions: 'Review AI classification, assign & verify actions, view analytics',
  members: 6
},
{
  name: 'Administrator',
  permissions: 'Manage users, locations, QR codes and roles',
  members: 2
}];


const statusClass = (status: string) =>
status === 'Active' ?
'bg-green-50 text-green-700 ring-green-600/20' :
status === 'Invited' ?
'bg-yellow-50 text-yellow-800 ring-yellow-600/20' :
'bg-slate-100 text-slate-600 ring-slate-500/20';

export function Administration() {
  const { tab = 'users' } = useParams();
  const { showToast } = useApp();

  const action =
  tab === 'users' ?
  <Button onClick={() => showToast('New user invitation sent.')}>
        <PlusIcon className="h-4 w-4" />
        Add User
      </Button> :
  tab === 'locations' ?
  <Button onClick={() => showToast('Location added to the site plan.')}>
        <PlusIcon className="h-4 w-4" />
        Add Location
      </Button> :
  tab === 'qr' ?
  <Button onClick={() => showToast('QR code generated and ready to print.')}>
        <QrCodeIcon className="h-4 w-4" />
        Generate QR Code
      </Button> :
  undefined;

  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader
        title="Administration"
        subtitle="Manage users, workplace locations, QR codes and roles."
        actions={action} />
      

      <nav
        className="mb-5 flex gap-1 overflow-x-auto rounded-xl border border-slate-200 bg-white p-1"
        aria-label="Administration sections">
        
        {TABS.map((item) =>
        <NavLink
          key={item.key}
          to={item.to}
          className={({ isActive }) =>
          `whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition ${
          isActive ?
          'bg-slate-900 text-white' :
          'text-slate-600 hover:bg-slate-100'}`

          }>
          
            {item.label}
          </NavLink>
        )}
      </nav>

      {tab === 'users' &&
      <Card>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-500">
                  {['Name', 'Email', 'Role', 'Status', 'Action'].map((heading) =>
                <th key={heading} className="px-5 py-3 font-semibold">
                      {heading}
                    </th>
                )}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map((user) =>
              <tr key={user.id} className="hover:bg-slate-50">
                    <td className="px-5 py-3.5 font-medium text-slate-900">
                      {user.name}
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">{user.email}</td>
                    <td className="px-5 py-3.5 text-slate-600">{user.role}</td>
                    <td className="px-5 py-3.5">
                      <Badge className={statusClass(user.status)} dot>
                        {user.status}
                      </Badge>
                    </td>
                    <td className="px-5 py-3.5">
                      <button
                    type="button"
                    onClick={() => showToast(`${user.name} updated.`)}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700">
                    
                        Edit
                      </button>
                    </td>
                  </tr>
              )}
              </tbody>
            </table>
          </div>
        </Card>
      }

      {tab === 'locations' &&
      <Card>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-500">
                  {['Location', 'Zone', 'QR Code', 'Status'].map((heading) =>
                <th key={heading} className="px-5 py-3 font-semibold">
                      {heading}
                    </th>
                )}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {locationRecords.map((location) =>
              <tr key={location.id} className="hover:bg-slate-50">
                    <td className="px-5 py-3.5 font-medium text-slate-900">
                      {location.name}
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">{location.zone}</td>
                    <td className="px-5 py-3.5 font-mono text-xs text-slate-600">
                      {location.qr}
                    </td>
                    <td className="px-5 py-3.5">
                      <Badge className={statusClass(location.status)} dot>
                        {location.status}
                      </Badge>
                    </td>
                  </tr>
              )}
              </tbody>
            </table>
          </div>
        </Card>
      }

      {tab === 'qr' &&
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {locationRecords.map((location) =>
        <Card key={location.id} className="p-5 text-center">
              <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-xl bg-slate-900 text-white">
                <QrCodeIcon className="h-16 w-16" />
              </div>
              <p className="mt-3 text-sm font-semibold text-slate-900">
                {location.name}
              </p>
              <p className="text-xs text-slate-500">
                {location.zone} · {location.qr}
              </p>
              <Button
            variant="secondary"
            className="mt-3 w-full"
            onClick={() => showToast(`${location.qr} sent to printer.`)}>
            
                Print QR
              </Button>
            </Card>
        )}
        </div>
      }

      {tab === 'roles' &&
      <Card>
          <ul className="divide-y divide-slate-100">
            {ROLES.map((role) =>
          <li key={role.name} className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-center">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-900">{role.name}</p>
                  <p className="text-xs text-slate-500">{role.permissions}</p>
                </div>
                <span className="text-xs font-semibold text-slate-600">
                  {role.members} members
                </span>
              </li>
          )}
          </ul>
        </Card>
      }
    </div>);

}