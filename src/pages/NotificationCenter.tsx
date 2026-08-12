import React from 'react';
import { Link } from 'react-router-dom';
import {
  AlertTriangleIcon,
  BellIcon,
  CheckCircle2Icon,
  ClockIcon,
  InfoIcon } from
'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Field';
import { useApp } from '../contexts/AppContext';
import type { Notification, Role } from '../types';

const TONE: Record<
  Notification['tone'],
  {icon: React.ComponentType<{className?: string;}>;className: string;}> =
{
  critical: { icon: AlertTriangleIcon, className: 'bg-red-50 text-red-600' },
  warning: { icon: ClockIcon, className: 'bg-orange-50 text-orange-600' },
  info: { icon: InfoIcon, className: 'bg-blue-50 text-blue-600' },
  success: { icon: CheckCircle2Icon, className: 'bg-green-50 text-green-600' }
};

export function NotificationCenter({ audience }: {audience: Role;}) {
  const { notifications, markNotificationRead, markAllRead } = useApp();
  const list = notifications.filter((n) => n.audience === audience);
  const unread = list.filter((n) => !n.read).length;

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        title="Notification Center"
        subtitle={`${unread} unread of ${list.length} notifications`}
        actions={
        <Button variant="secondary" onClick={() => markAllRead(audience)}>
            Mark all as read
          </Button>
        } />
      

      <Card>
        <ul className="divide-y divide-slate-100">
          {list.map((item) => {
            const tone = TONE[item.tone];
            return (
              <li
                key={item.id}
                className={`flex gap-3 px-5 py-4 transition ${
                item.read ? 'bg-white' : 'bg-blue-50/40'}`
                }>
                
                <span className={`h-9 w-9 shrink-0 rounded-lg p-2.5 ${tone.className}`}>
                  <tone.icon className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p
                    className={`text-sm ${
                    item.read ?
                    'font-medium text-slate-700' :
                    'font-semibold text-slate-900'}`
                    }>
                    
                    {item.title}
                  </p>
                  <p className="mt-0.5 text-sm text-slate-600">{item.body}</p>
                  <div className="mt-2 flex items-center gap-3">
                    <span className="text-xs text-slate-400">{item.time}</span>
                    {item.link &&
                    <Link
                      to={item.link}
                      onClick={() => markNotificationRead(item.id)}
                      className="text-xs font-semibold text-blue-600 hover:text-blue-700">
                      
                        Open
                      </Link>
                    }
                    {!item.read &&
                    <button
                      type="button"
                      onClick={() => markNotificationRead(item.id)}
                      className="text-xs font-semibold text-slate-500 hover:text-slate-700">
                      
                        Mark as read
                      </button>
                    }
                  </div>
                </div>
                {!item.read &&
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-600" />
                }
              </li>);

          })}
          {list.length === 0 &&
          <li className="flex flex-col items-center gap-2 px-5 py-12 text-center">
              <BellIcon className="h-6 w-6 text-slate-300" />
              <p className="text-sm text-slate-500">No notifications yet.</p>
            </li>
          }
        </ul>
      </Card>
    </div>);

}