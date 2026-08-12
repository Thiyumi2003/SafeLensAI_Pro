import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeftIcon, MapPinIcon } from 'lucide-react';
import { PageHeader } from '../../components/PageHeader';
import { AiAnalysisCard } from '../../components/AiAnalysisCard';
import { HazardTimeline } from '../../components/HazardTimeline';
import { Card, CardHeader } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Field';
import { useApp } from '../../contexts/AppContext';
import { hazardStatusClass } from '../../utils/risk';

export function AiAnalysis() {
  const { id } = useParams();
  const { hazards } = useApp();
  const hazard = hazards.find((h) => h.id === id);

  if (!hazard) {
    return (
      <div className="mx-auto max-w-2xl">
        <Card className="p-6 text-center text-sm text-slate-500">
          Hazard not found.
        </Card>
      </div>);

  }

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        to="/employee/reports"
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-800">
        
        <ArrowLeftIcon className="h-4 w-4" />
        Back to my reports
      </Link>

      <PageHeader
        title={`AI Analysis · ${hazard.id}`}
        subtitle={hazard.title}
        actions={
        <Badge className={`${hazardStatusClass(hazard.status)} px-3 py-1.5`} dot>
            {hazard.status}
          </Badge>
        } />
      

      <div className="space-y-5">
        <Card className="overflow-hidden">
          <div className="flex flex-col gap-4 p-5 sm:flex-row">
            {hazard.imageUrl &&
            <img
              src={hazard.imageUrl}
              alt={hazard.title}
              className="h-32 w-full rounded-xl object-cover sm:w-48" />

            }
            <div>
              <p className="text-sm text-slate-700">{hazard.description}</p>
              <p className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
                <MapPinIcon className="h-3.5 w-3.5" />
                {hazard.location} – {hazard.zone} · Submitted {hazard.submittedAt}
              </p>
            </div>
          </div>
        </Card>

        <AiAnalysisCard ai={hazard.ai} />

        <Card>
          <CardHeader title="What happens next" />
          <div className="px-5 py-5">
            <HazardTimeline status={hazard.status} />
            <p className="mt-5 text-sm text-slate-600">
              Your report is queued for manager review. You will be notified if a
              corrective action is assigned to you.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link to="/employee">
                <Button variant="secondary">Back to dashboard</Button>
              </Link>
              <Link to="/">
                <Button>Switch to Manager view</Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>);

}