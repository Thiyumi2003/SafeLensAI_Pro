import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangleIcon, CalendarClockIcon, MapPinIcon } from 'lucide-react';
import { PageHeader } from '../../components/PageHeader';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Field';
import { useApp } from '../../contexts/AppContext';
import { actionStatusClass, priorityClass } from '../../utils/risk';

export function MyActions() {
  const { actions, hazards } = useApp();
  const myActions = actions.filter((a) => a.assignedTo === 'Kasun Perera');

  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader
        title="My Corrective Actions"
        subtitle="Actions assigned to you by the safety manager." />
      
      <div className="space-y-4">
        {myActions.map((action) => {
          const hazard = hazards.find((h) => h.id === action.hazardId);
          return (
            <Card key={action.id} className="p-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-slate-400">
                  {action.id}
                </span>
                <Badge className={priorityClass(action.priority)}>
                  {action.priority}
                </Badge>
                <Badge className={actionStatusClass(action.status)} dot>
                  {action.status}
                </Badge>
                {action.overdue && action.status !== 'Verified' &&
                <Badge className="bg-red-50 text-red-700 ring-red-600/20">
                    <AlertTriangleIcon className="h-3 w-3" />
                    Overdue
                  </Badge>
                }
              </div>
              <h2 className="mt-2 text-base font-semibold text-slate-900">
                {action.title}
              </h2>
              <p className="mt-1 text-sm text-slate-600">{action.description}</p>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <MapPinIcon className="h-3.5 w-3.5" />
                  {hazard ? `${hazard.location} – ${hazard.zone}` : 'Site'}
                </span>
                <span className="flex items-center gap-1.5">
                  <CalendarClockIcon className="h-3.5 w-3.5" />
                  Due {action.dueDate}
                </span>
                <span>Hazard {action.hazardId}</span>
              </div>
              <div className="mt-4">
                <Link to={`/employee/actions/${action.id}`}>
                  <Button variant="secondary">Open action</Button>
                </Link>
              </div>
            </Card>);

        })}
      </div>
    </div>);

}