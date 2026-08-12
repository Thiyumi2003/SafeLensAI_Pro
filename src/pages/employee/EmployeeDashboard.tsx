import React from 'react';
import { Link } from 'react-router-dom';
import {
  AlertTriangleIcon,
  ArrowRightIcon,
  BellIcon,
  CheckCircle2Icon,
  ClipboardCheckIcon,
  ClockIcon,
  QrCodeIcon } from
'lucide-react';
import { PageHeader } from '../../components/PageHeader';
import { StatCard } from '../../components/ui/StatCard';
import { Card, CardHeader } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Field';
import { useApp } from '../../contexts/AppContext';
import {
  actionStatusClass,
  hazardStatusClass,
  priorityClass,
  riskBadgeClass } from
'../../utils/risk';

export function EmployeeDashboard() {
  const { hazards, actions, notifications } = useApp();
  const myHazards = hazards.filter((h) => h.reportedBy === 'Employee #104');
  const myActions = actions.filter((a) => a.assignedTo === 'Kasun Perera');
  const myNotifications = notifications.filter((n) => n.audience === 'employee');

  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader
        title="My Safety Dashboard"
        subtitle="Report hazards and keep your corrective actions on track."
        actions={
        <Link to="/employee/report">
            <Button>
              <QrCodeIcon className="h-4 w-4" />
              Report Hazard
            </Button>
          </Link>
        } />
      

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          label="Hazards Reported"
          value={myHazards.length}
          icon={AlertTriangleIcon}
          tone="blue" />
        
        <StatCard
          label="Pending Reports"
          value={myHazards.filter((h) => h.status !== 'Verified').length}
          icon={ClockIcon}
          tone="yellow" />
        
        <StatCard
          label="Actions Assigned"
          value={myActions.filter((a) => a.status !== 'Verified').length}
          icon={ClipboardCheckIcon}
          tone="orange" />
        
        <StatCard
          label="Actions Completed"
          value={myActions.filter((a) => a.status === 'Verified').length}
          icon={CheckCircle2Icon}
          tone="green" />
        
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader
            title="Recent hazard reports"
            subtitle="Reports you submitted"
            action={
            <Link
              to="/employee/reports"
              className="text-xs font-semibold text-blue-600 hover:text-blue-700">
              
                View all
              </Link>
            } />
          
          <ul className="divide-y divide-slate-100">
            {myHazards.map((hazard) =>
            <li key={hazard.id} className="flex items-start gap-3 px-5 py-4">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                  <AlertTriangleIcon className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-900">
                    {hazard.title}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500">
                    {hazard.id} · {hazard.location} – {hazard.zone} ·{' '}
                    {hazard.submittedAt}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Badge className={hazardStatusClass(hazard.status)} dot>
                      {hazard.status}
                    </Badge>
                    <Badge className={riskBadgeClass(hazard.ai.riskLevel)}>
                      {hazard.ai.riskLevel} · {hazard.ai.riskScore}
                    </Badge>
                  </div>
                </div>
                <Link
                to={`/employee/analysis/${hazard.id}`}
                className="shrink-0 rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-blue-600"
                aria-label={`View AI analysis for ${hazard.id}`}>
                
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </li>
            )}
          </ul>
        </Card>

        <div className="space-y-5">
          <Card>
            <CardHeader
              title="Assigned corrective actions"
              action={
              <Link
                to="/employee/actions"
                className="text-xs font-semibold text-blue-600 hover:text-blue-700">
                
                  View all
                </Link>
              } />
            
            <ul className="divide-y divide-slate-100">
              {myActions.slice(0, 3).map((action) =>
              <li key={action.id} className="px-5 py-3.5">
                  <Link to={`/employee/actions/${action.id}`} className="block group">
                    <p className="truncate text-sm font-semibold text-slate-900 group-hover:text-blue-700">
                      {action.title}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-500">
                      {action.id} · Due {action.dueDate}
                    </p>
                    <div className="mt-2 flex gap-2">
                      <Badge className={priorityClass(action.priority)}>
                        {action.priority}
                      </Badge>
                      <Badge className={actionStatusClass(action.status)} dot>
                        {action.status}
                      </Badge>
                    </div>
                  </Link>
                </li>
              )}
            </ul>
          </Card>

          <Card>
            <CardHeader
              title="Notifications"
              subtitle={`${myNotifications.filter((n) => !n.read).length} unread`}
              action={
              <Link
                to="/employee/notifications"
                className="text-xs font-semibold text-blue-600 hover:text-blue-700">
                
                  Open
                </Link>
              } />
            
            <ul className="divide-y divide-slate-100">
              {myNotifications.slice(0, 3).map((item) =>
              <li key={item.id} className="flex gap-3 px-5 py-3.5">
                  <BellIcon
                  className={`mt-0.5 h-4 w-4 shrink-0 ${
                  item.read ? 'text-slate-300' : 'text-blue-600'}`
                  } />
                
                  <div>
                    <p className="text-sm font-medium text-slate-800">{item.title}</p>
                    <p className="text-xs text-slate-500">{item.time}</p>
                  </div>
                </li>
              )}
            </ul>
          </Card>
        </div>
      </div>
    </div>);

}