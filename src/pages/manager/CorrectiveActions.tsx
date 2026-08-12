import React, { useMemo, useState } from 'react';
import {
  AlertTriangleIcon,
  CheckCircle2Icon,
  ClipboardCheckIcon,
  ClockIcon,
  Loader2Icon,
  RotateCcwIcon,
  ShieldCheckIcon,
  SlidersHorizontalIcon } from
'lucide-react';
import { PageHeader } from '../../components/PageHeader';
import { Card } from '../../components/ui/Card';
import { StatCard } from '../../components/ui/StatCard';
import { Badge } from '../../components/ui/Badge';
import { Button, Input, Label, Select, Textarea } from '../../components/ui/Field';
import { Modal } from '../../components/ui/Modal';
import { useApp } from '../../contexts/AppContext';
import { actionStatusClass, priorityClass } from '../../utils/risk';
import type { CorrectiveAction } from '../../types';

const ALL = 'All';

export function CorrectiveActions() {
  const { actions, hazards, verifyAction, reopenAction, showToast } = useApp();
  const [status, setStatus] = useState(ALL);
  const [priority, setPriority] = useState(ALL);
  const [assignee, setAssignee] = useState(ALL);
  const [due, setDue] = useState('');
  const [selected, setSelected] = useState<CorrectiveAction | null>(null);
  const [reopenMode, setReopenMode] = useState(false);
  const [reopenReason, setReopenReason] = useState(
    'Oil leak still visible near equipment.'
  );

  const filtered = useMemo(
    () =>
    actions.filter(
      (a) =>
      (status === ALL || a.status === status) && (
      priority === ALL || a.priority === priority) && (
      assignee === ALL || a.assignedTo === assignee)
    ),
    [actions, status, priority, assignee]
  );

  const assignees = Array.from(new Set(actions.map((a) => a.assignedTo)));
  const count = (value: string) => actions.filter((a) => a.status === value).length;
  const hazard = selected ?
  hazards.find((h) => h.id === selected.hazardId) :
  undefined;

  const closeModal = () => {
    setSelected(null);
    setReopenMode(false);
  };

  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader
        title="Corrective Actions"
        subtitle="Track assignment, resolution and verification of every action." />
      

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        <StatCard label="Open" value={count('Open')} icon={ClipboardCheckIcon} />
        <StatCard
          label="In Progress"
          value={count('In Progress')}
          icon={Loader2Icon}
          tone="blue" />
        
        <StatCard
          label="Resolved"
          value={count('Resolved')}
          icon={CheckCircle2Icon}
          tone="green" />
        
        <StatCard
          label="Waiting Verification"
          value={count('Resolved')}
          icon={ShieldCheckIcon}
          tone="yellow" />
        
        <StatCard
          label="Overdue"
          value={actions.filter((a) => a.overdue && a.status !== 'Verified').length}
          icon={ClockIcon}
          tone="red" />
        
      </div>

      <Card className="my-5 p-4">
        <div className="flex items-center gap-2 pb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
          <SlidersHorizontalIcon className="h-3.5 w-3.5" />
          Filters
        </div>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <Select
            aria-label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}>
            
            {[ALL, 'Open', 'In Progress', 'Resolved', 'Verified', 'Reopened'].map(
              (option) =>
              <option key={option}>{option}</option>

            )}
          </Select>
          <Select
            aria-label="Priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}>
            
            {[ALL, 'Critical', 'High', 'Medium', 'Low'].map((option) =>
            <option key={option}>{option}</option>
            )}
          </Select>
          <Select
            aria-label="Assigned employee"
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}>
            
            {[ALL, ...assignees].map((option) =>
            <option key={option}>{option}</option>
            )}
          </Select>
          <Input
            type="date"
            aria-label="Due date"
            value={due}
            onChange={(e) => setDue(e.target.value)} />
          
        </div>
      </Card>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-500">
                {[
                'Action ID',
                'Hazard',
                'Assigned To',
                'Priority',
                'Due Date',
                'Status',
                'Action'].
                map((heading) =>
                <th key={heading} className="whitespace-nowrap px-5 py-3 font-semibold">
                    {heading}
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((item) => {
                const overdue = item.overdue && item.status !== 'Verified';
                return (
                  <tr
                    key={item.id}
                    className={overdue ? 'bg-red-50/50 hover:bg-red-50' : 'hover:bg-slate-50'}>
                    
                    <td className="px-5 py-3.5 font-semibold text-slate-500">
                      {item.id}
                    </td>
                    <td className="max-w-[260px] px-5 py-3.5">
                      <p className="truncate font-medium text-slate-900">
                        {item.hazardTitle}
                      </p>
                      <p className="text-xs text-slate-500">{item.title}</p>
                    </td>
                    <td className="whitespace-nowrap px-5 py-3.5">
                      <p className="font-medium text-slate-800">{item.assignedTo}</p>
                      <p className="text-xs text-slate-500">{item.assignedToRole}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <Badge className={priorityClass(item.priority)}>
                        {item.priority}
                      </Badge>
                    </td>
                    <td className="whitespace-nowrap px-5 py-3.5 text-xs">
                      <span className={overdue ? 'font-semibold text-red-700' : 'text-slate-600'}>
                        {item.dueDate}
                      </span>
                      {overdue &&
                      <span className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-red-700">
                          <AlertTriangleIcon className="h-3 w-3" />
                          Overdue
                        </span>
                      }
                    </td>
                    <td className="px-5 py-3.5">
                      <Badge className={actionStatusClass(item.status)} dot>
                        {item.status}
                      </Badge>
                    </td>
                    <td className="whitespace-nowrap px-5 py-3.5">
                      <button
                        type="button"
                        onClick={() => setSelected(item)}
                        className="text-xs font-semibold text-blue-600 hover:text-blue-700">
                        
                        {item.status === 'Resolved' ? 'Verify' : 'View'}
                      </button>
                    </td>
                  </tr>);

              })}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal
        open={Boolean(selected)}
        onClose={closeModal}
        wide
        title={selected ? `Verify Corrective Action ${selected.id}` : ''}
        subtitle={selected?.title}>
        
        {selected &&
        <div className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <figure>
                <figcaption className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Before
                </figcaption>
                {hazard?.imageUrl ?
              <img
                src={hazard.imageUrl}
                alt="Hazard before corrective action"
                className="h-44 w-full rounded-xl object-cover" /> :


              <div className="flex h-44 items-center justify-center rounded-xl bg-slate-100 text-xs text-slate-500">
                    No photo submitted
                  </div>
              }
              </figure>
              <figure>
                <figcaption className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  After
                </figcaption>
                {selected.evidenceUrl ?
              <img
                src={selected.evidenceUrl}
                alt="Evidence after corrective action"
                className="h-44 w-full rounded-xl object-cover" /> :


              <div className="flex h-44 items-center justify-center rounded-xl bg-slate-100 text-xs text-slate-500">
                    Awaiting employee evidence
                  </div>
              }
              </figure>
            </div>

            <div className="grid gap-4 rounded-xl bg-slate-50 p-4 sm:grid-cols-2">
              <Info label="Corrective action" value={selected.title} />
              <Info
              label="Assigned employee"
              value={`${selected.assignedTo} · ${selected.assignedToRole}`} />
            
              <Info
              label="Completed date"
              value={selected.completedAt ?? 'Not yet completed'} />
            
              <Info label="Status" value={selected.status} />
              <div className="sm:col-span-2">
                <Info
                label="Resolution notes"
                value={selected.resolutionNotes ?? 'No notes submitted yet.'} />
              
              </div>
            </div>

            {selected.status === 'Verified' ?
          <div className="flex items-center gap-2.5 rounded-xl bg-green-50 p-4 text-sm font-semibold text-green-800">
                <CheckCircle2Icon className="h-5 w-5" />
                Corrective Action Verified · Hazard status: Verified / Closed
              </div> :
          reopenMode ?
          <form
            className="space-y-3"
            onSubmit={(event) => {
              event.preventDefault();
              reopenAction(selected.id, reopenReason);
              closeModal();
              showToast('Action reopened and returned to the assignee.');
            }}>
            
                <div>
                  <Label htmlFor="reopen">Reopen reason</Label>
                  <Textarea
                id="reopen"
                rows={3}
                required
                value={reopenReason}
                onChange={(e) => setReopenReason(e.target.value)} />
              
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                type="button"
                variant="secondary"
                onClick={() => setReopenMode(false)}>
                
                    Cancel
                  </Button>
                  <Button type="submit" variant="danger">
                    Confirm Reopen
                  </Button>
                </div>
              </form> :

          <div className="flex flex-wrap justify-end gap-2">
                <Button
              variant="secondary"
              onClick={() => setReopenMode(true)}
              disabled={selected.status !== 'Resolved'}>
              
                  <RotateCcwIcon className="h-4 w-4" />
                  Reopen Action
                </Button>
                <Button
              variant="success"
              disabled={selected.status !== 'Resolved'}
              onClick={() => {
                verifyAction(selected.id);
                closeModal();
                showToast('Corrective Action Verified · Hazard closed.');
              }}>
              
                  <CheckCircle2Icon className="h-4 w-4" />
                  Verify Resolution
                </Button>
              </div>
          }
          </div>
        }
      </Modal>
    </div>);

}

function Info({ label, value }: {label: string;value: string;}) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-1 text-sm text-slate-800">{value}</p>
    </div>);

}