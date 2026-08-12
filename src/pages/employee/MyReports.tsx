import React from 'react';
import { Link } from 'react-router-dom';
import { QrCodeIcon } from 'lucide-react';
import { PageHeader } from '../../components/PageHeader';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Field';
import { useApp } from '../../contexts/AppContext';
import { hazardStatusClass, riskBadgeClass } from '../../utils/risk';

export function MyReports() {
  const { hazards } = useApp();
  const myHazards = hazards.filter((h) => h.reportedBy === 'Employee #104');

  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        title="My Reports"
        subtitle="Every hazard you have reported and its current status."
        actions={
        <Link to="/employee/report">
            <Button>
              <QrCodeIcon className="h-4 w-4" />
              Report Hazard
            </Button>
          </Link>
        } />
      
      <div className="space-y-4">
        {myHazards.map((hazard) =>
        <Card key={hazard.id} className="p-4 sm:p-5">
            <div className="flex flex-col gap-4 sm:flex-row">
              {hazard.imageUrl &&
            <img
              src={hazard.imageUrl}
              alt={hazard.title}
              className="h-28 w-full rounded-xl object-cover sm:w-40" />

            }
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold text-slate-400">
                    {hazard.id}
                  </span>
                  <Badge className={hazardStatusClass(hazard.status)} dot>
                    {hazard.status}
                  </Badge>
                  <Badge className={riskBadgeClass(hazard.ai.riskLevel)}>
                    {hazard.ai.riskLevel} · {hazard.ai.riskScore}
                  </Badge>
                </div>
                <h2 className="mt-1.5 text-base font-semibold text-slate-900">
                  {hazard.title}
                </h2>
                <p className="mt-1 line-clamp-2 text-sm text-slate-600">
                  {hazard.description}
                </p>
                <p className="mt-2 text-xs text-slate-500">
                  {hazard.location} – {hazard.zone} · {hazard.submittedAt} · AI{' '}
                  {hazard.ai.category} ({hazard.ai.confidence}%)
                </p>
              </div>
              <div className="shrink-0 self-start">
                <Link to={`/employee/analysis/${hazard.id}`}>
                  <Button variant="secondary">View AI Analysis</Button>
                </Link>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>);

}