import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  AlertTriangleIcon,
  ArrowLeftIcon,
  CalendarClockIcon,
  CameraIcon,
  CheckCircle2Icon,
  MapPinIcon,
  PlayIcon } from
'lucide-react';
import { PageHeader } from '../../components/PageHeader';
import { Card, CardHeader } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button, Label, Textarea } from '../../components/ui/Field';
import { Modal } from '../../components/ui/Modal';
import { useApp } from '../../contexts/AppContext';
import { actionStatusClass, priorityClass } from '../../utils/risk';
import { IMAGES } from '../../data/mockData';

export function AssignedActionDetail() {
  const { id } = useParams();
  const { actions, hazards, startAction, resolveAction, showToast } = useApp();
  const action = actions.find((a) => a.id === id);
  const [open, setOpen] = useState(false);
  const [notes, setNotes] = useState(
    'Spill cleaned and forklift removed for maintenance.'
  );
  const [photoAdded, setPhotoAdded] = useState(true);

  if (!action) {
    return (
      <Card className="mx-auto max-w-2xl p-6 text-center text-sm text-slate-500">
        Action not found.
      </Card>);

  }

  const hazard = hazards.find((h) => h.id === action.hazardId);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    resolveAction(action.id, notes, photoAdded ? IMAGES.oilSpillAfter : undefined);
    setOpen(false);
    showToast('Resolution submitted for Manager verification.');
  };

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        to="/employee/actions"
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-800">
        
        <ArrowLeftIcon className="h-4 w-4" />
        Back to my actions
      </Link>

      <PageHeader
        title={`Corrective Action ${action.id}`}
        subtitle={action.title}
        actions={
        <div className="flex gap-2">
            <Badge className={`${priorityClass(action.priority)} px-3 py-1.5`}>
              {action.priority}
            </Badge>
            <Badge className={`${actionStatusClass(action.status)} px-3 py-1.5`} dot>
              {action.status}
            </Badge>
          </div>
        } />
      

      <div className="space-y-5">
        {action.status === 'Reopened' && action.reopenReason &&
        <div className="flex gap-3 rounded-2xl border border-orange-200 bg-orange-50 p-4">
            <AlertTriangleIcon className="mt-0.5 h-4 w-4 shrink-0 text-orange-600" />
            <div>
              <p className="text-sm font-semibold text-orange-900">
                Reopened by Safety Manager
              </p>
              <p className="text-sm text-orange-900/80">{action.reopenReason}</p>
            </div>
          </div>
        }

        <Card>
          <CardHeader title="Action details" />
          <div className="grid gap-4 px-5 py-5 sm:grid-cols-2">
            <Detail label="Hazard" value={hazard?.title ?? action.hazardTitle} />
            <Detail
              label="Location"
              value={hazard ? `${hazard.location} – ${hazard.zone}` : 'Site'}
              icon={MapPinIcon} />
            
            <Detail label="Priority" value={action.priority} />
            <Detail label="Due" value={action.dueDate} icon={CalendarClockIcon} />
            <div className="sm:col-span-2">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Action
              </p>
              <p className="mt-1 text-sm text-slate-800">{action.description}</p>
            </div>
            {hazard?.imageUrl &&
            <div className="sm:col-span-2">
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">
                  Reported hazard photo
                </p>
                <img
                src={hazard.imageUrl}
                alt={hazard.title}
                className="h-44 w-full rounded-xl object-cover" />
              
              </div>
            }
          </div>
        </Card>

        {action.status === 'Resolved' ?
        <Card className="p-5">
            <div className="flex gap-3">
              <CheckCircle2Icon className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Resolution submitted for Manager verification.
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  {action.resolutionNotes}
                </p>
                {action.evidenceUrl &&
              <img
                src={action.evidenceUrl}
                alt="After photo evidence"
                className="mt-3 h-40 w-full max-w-sm rounded-xl object-cover" />

              }
              </div>
            </div>
          </Card> :
        action.status === 'Verified' ?
        <Card className="flex items-center gap-3 p-5">
            <CheckCircle2Icon className="h-5 w-5 text-green-600" />
            <p className="text-sm font-semibold text-slate-900">
              Verified and closed by the Safety Manager.
            </p>
          </Card> :

        <div className="flex flex-wrap gap-3">
            <Button
            variant="secondary"
            disabled={action.status === 'In Progress'}
            onClick={() => {
              startAction(action.id);
              showToast('Action started. Status set to In Progress.');
            }}>
            
              <PlayIcon className="h-4 w-4" />
              {action.status === 'In Progress' ? 'In Progress' : 'Start Action'}
            </Button>
            <Button onClick={() => setOpen(true)}>
              <CheckCircle2Icon className="h-4 w-4" />
              Mark as Resolved
            </Button>
          </div>
        }
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Submit resolution"
        subtitle={`${action.id} · ${action.title}`}>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="resolution">Resolution notes</Label>
            <Textarea
              id="resolution"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              required />
            
          </div>
          <div>
            <Label>Upload evidence / after photo</Label>
            <button
              type="button"
              onClick={() => setPhotoAdded((v) => !v)}
              className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition ${
              photoAdded ?
              'border-blue-500 bg-blue-50/60' :
              'border-dashed border-slate-300 hover:bg-slate-50'}`
              }>
              
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-blue-600 ring-1 ring-slate-200">
                <CameraIcon className="h-4 w-4" />
              </span>
              <span className="text-xs">
                <span className="block font-semibold text-slate-900">
                  {photoAdded ? 'after-cleanup.jpg attached' : 'Add after photo'}
                </span>
                <span className="text-slate-500">Required for verification</span>
              </span>
            </button>
            {photoAdded &&
            <img
              src={IMAGES.oilSpillAfter}
              alt="After cleanup evidence"
              className="mt-3 h-36 w-full rounded-xl object-cover" />

            }
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setOpen(false)}>
              
              Cancel
            </Button>
            <Button type="submit" disabled={!photoAdded}>
              Submit Resolution
            </Button>
          </div>
        </form>
      </Modal>
    </div>);

}

function Detail({
  label,
  value,
  icon: Icon




}: {label: string;value: string;icon?: React.ComponentType<{className?: string;}>;}) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-slate-900">
        {Icon && <Icon className="h-3.5 w-3.5 text-slate-400" />}
        {value}
      </p>
    </div>);

}