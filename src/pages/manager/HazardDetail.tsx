import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeftIcon,
  CheckIcon,
  ClipboardPlusIcon,
  MapPinIcon,
  MicIcon,
  PencilIcon,
  UserIcon,
  XIcon } from
'lucide-react';
import { PageHeader } from '../../components/PageHeader';
import { AiAnalysisCard } from '../../components/AiAnalysisCard';
import { HazardTimeline } from '../../components/HazardTimeline';
import { Card, CardHeader } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button, Input, Label, Select, Textarea } from '../../components/ui/Field';
import { Modal } from '../../components/ui/Modal';
import { useApp } from '../../contexts/AppContext';
import { assignees } from '../../data/mockData';
import { hazardStatusClass } from '../../utils/risk';
import type { HazardCategory, Priority } from '../../types';

const CATEGORIES: HazardCategory[] = [
'Slip / Trip',
'Chemical',
'Electrical',
'Fire / Emergency',
'Machinery',
'Ergonomic',
'Housekeeping'];


export function HazardDetail() {
  const { id } = useParams();
  const { hazards, actions, reviewHazard, assignAction, showToast } = useApp();
  const hazard = hazards.find((h) => h.id === id);

  const [overrideOpen, setOverrideOpen] = useState(false);
  const [overrideCategory, setOverrideCategory] =
  useState<HazardCategory>('Slip / Trip');
  const [overrideReason, setOverrideReason] = useState('');
  const [assignOpen, setAssignOpen] = useState(false);
  const [form, setForm] = useState({
    title: 'Clean spill and inspect leaking forklift',
    description:
    'Clean the oil spill and inspect the leaking forklift. Barrier the area until the floor is dry.',
    assignedTo: assignees[0],
    priority: 'Critical' as Priority,
    dueDate: 'Today – 3:00 PM',
    notes: 'Photograph the area after cleaning for verification.'
  });

  if (!hazard) {
    return (
      <Card className="mx-auto max-w-2xl p-6 text-center text-sm text-slate-500">
        Hazard not found.
      </Card>);

  }

  const action = actions.find((a) => a.hazardId === hazard.id);
  const reviewed = Boolean(hazard.managerReview);

  const handleAssign = (event: React.FormEvent) => {
    event.preventDefault();
    assignAction(hazard.id, form);
    setAssignOpen(false);
    showToast('Corrective Action Assigned Successfully');
  };

  return (
    <div className="mx-auto max-w-7xl">
      <Link
        to="/manager/hazards"
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-800">
        
        <ArrowLeftIcon className="h-4 w-4" />
        Back to hazard reports
      </Link>

      <PageHeader
        title={`Hazard Report ${hazard.id}`}
        subtitle={hazard.title}
        actions={
        <div className="flex flex-wrap items-center gap-2">
            <Badge className={`${hazardStatusClass(hazard.status)} px-3 py-1.5`} dot>
              {hazard.status}
            </Badge>
            <Button onClick={() => setAssignOpen(true)}>
              <ClipboardPlusIcon className="h-4 w-4" />
              Assign Corrective Action
            </Button>
          </div>
        } />
      

      <Card className="mb-5 px-5 py-5">
        <HazardTimeline status={hazard.status} />
      </Card>

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <Card>
            <CardHeader title="Hazard information" />
            <div className="space-y-4 px-5 py-5">
              <p className="text-sm text-slate-800">{hazard.description}</p>
              <div className="grid gap-4 sm:grid-cols-3">
                <Detail
                  label="Location"
                  value={`${hazard.location} – ${hazard.zone}`}
                  icon={MapPinIcon} />
                
                <Detail
                  label="Reported by"
                  value={hazard.anonymous ? 'Anonymous' : hazard.reportedBy}
                  icon={UserIcon} />
                
                <Detail label="Submitted" value={hazard.submittedAt} />
              </div>
              {hazard.imageUrl &&
              <div>
                  <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">
                    Uploaded evidence
                  </p>
                  <img
                  src={hazard.imageUrl}
                  alt={`Photo submitted for ${hazard.id}`}
                  className="h-64 w-full rounded-xl object-cover" />
                
                </div>
              }
              {hazard.voiceNote &&
              <div className="flex items-center gap-3 rounded-xl border border-slate-200 p-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                    <MicIcon className="h-4 w-4" />
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-800">Voice note</p>
                    <div className="mt-1.5 h-1.5 w-full rounded-full bg-slate-100">
                      <div className="h-1.5 w-1/3 rounded-full bg-blue-600" />
                    </div>
                  </div>
                  <span className="text-xs text-slate-500">0:12</span>
                </div>
              }
            </div>
          </Card>

          <AiAnalysisCard ai={hazard.ai} />
        </div>

        <div className="space-y-5">
          <Card>
            <CardHeader
              title="Manager review"
              subtitle="AI supports the decision — a manager must confirm." />
            
            <div className="space-y-3 px-5 py-5">
              {reviewed ?
              <div className="rounded-xl bg-green-50 p-3.5 text-sm text-green-900">
                  <p className="font-semibold">
                    {hazard.managerReview?.decision === 'Accepted' ?
                  'AI classification accepted' :
                  'Classification overridden'}
                  </p>
                  <p className="mt-0.5 text-green-900/80">
                    {hazard.managerReview?.category} ·{' '}
                    {hazard.managerReview?.reviewedAt}
                  </p>
                  {hazard.managerReview?.reason &&
                <p className="mt-1 text-green-900/80">
                      Reason: {hazard.managerReview.reason}
                    </p>
                }
                </div> :

              <>
                  <Button
                  className="w-full"
                  onClick={() => {
                    reviewHazard(hazard.id, 'Accepted', hazard.ai.category);
                    showToast('AI classification accepted. Hazard under review.');
                  }}>
                  
                    <CheckIcon className="h-4 w-4" />
                    Accept AI Classification
                  </Button>
                  <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() => setOverrideOpen((v) => !v)}>
                  
                    <PencilIcon className="h-4 w-4" />
                    Change Classification
                  </Button>
                  <Button
                  variant="ghost"
                  className="w-full text-red-600 hover:bg-red-50"
                  onClick={() => showToast('Report rejected and closed as invalid.')}>
                  
                    <XIcon className="h-4 w-4" />
                    Reject Report
                  </Button>
                </>
              }

              {overrideOpen && !reviewed &&
              <form
                className="space-y-3 rounded-xl border border-slate-200 p-3.5"
                onSubmit={(event) => {
                  event.preventDefault();
                  reviewHazard(
                    hazard.id,
                    'Overridden',
                    overrideCategory,
                    overrideReason
                  );
                  setOverrideOpen(false);
                  showToast('Classification updated by manager review.');
                }}>
                
                  <div>
                    <Label htmlFor="override-category">Hazard category</Label>
                    <Select
                    id="override-category"
                    value={overrideCategory}
                    onChange={(e) =>
                    setOverrideCategory(e.target.value as HazardCategory)
                    }>
                    
                      {CATEGORIES.map((option) =>
                    <option key={option}>{option}</option>
                    )}
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="override-reason">Override reason</Label>
                    <Textarea
                    id="override-reason"
                    rows={3}
                    required
                    value={overrideReason}
                    onChange={(e) => setOverrideReason(e.target.value)}
                    placeholder="Why is the AI classification being changed?" />
                  
                  </div>
                  <Button type="submit" className="w-full">
                    Save Review
                  </Button>
                </form>
              }
            </div>
          </Card>

          {action &&
          <Card>
              <CardHeader title="Corrective action" subtitle={action.id} />
              <div className="space-y-2 px-5 py-5 text-sm">
                <p className="font-semibold text-slate-900">{action.title}</p>
                <p className="text-slate-600">{action.description}</p>
                <p className="text-xs text-slate-500">
                  {action.assignedTo} · {action.assignedToRole} · Due{' '}
                  {action.dueDate}
                </p>
                <Link
                to="/manager/actions"
                className="inline-block pt-1 text-xs font-semibold text-blue-600 hover:text-blue-700">
                
                  Open in corrective actions
                </Link>
              </div>
            </Card>
          }
        </div>
      </div>

      <Modal
        open={assignOpen}
        onClose={() => setAssignOpen(false)}
        title="Assign Corrective Action"
        subtitle={`${hazard.id} · ${hazard.location} – ${hazard.zone}`}>
        
        <form onSubmit={handleAssign} className="space-y-4">
          <div>
            <Label htmlFor="action-title">Action title</Label>
            <Input
              id="action-title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required />
            
          </div>
          <div>
            <Label htmlFor="action-description">Action description</Label>
            <Textarea
              id="action-description"
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required />
            
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="assign-to">Assign to</Label>
              <Select
                id="assign-to"
                value={form.assignedTo}
                onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}>
                
                {assignees.map((person) =>
                <option key={person}>{person}</option>
                )}
              </Select>
            </div>
            <div>
              <Label htmlFor="priority">Priority</Label>
              <Select
                id="priority"
                value={form.priority}
                onChange={(e) =>
                setForm({ ...form, priority: e.target.value as Priority })
                }>
                
                {['Critical', 'High', 'Medium', 'Low'].map((option) =>
                <option key={option}>{option}</option>
                )}
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="due">Due date</Label>
            <Input
              id="due"
              value={form.dueDate}
              onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
            
          </div>
          <div>
            <Label htmlFor="notes" hint="Optional">
              Additional notes
            </Label>
            <Textarea
              id="notes"
              rows={2}
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })} />
            
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setAssignOpen(false)}>
              
              Cancel
            </Button>
            <Button type="submit">Assign Action</Button>
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