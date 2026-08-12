import React from 'react';
import { CheckIcon } from 'lucide-react';
import type { HazardStatus } from '../types';

const STEPS = [
'Reported',
'AI Classified',
'Manager Review',
'Action Assigned',
'Resolved',
'Verified'];


function activeIndex(status: HazardStatus): number {
  switch (status) {
    case 'Submitted':
      return 1;
    case 'Under Review':
      return 2;
    case 'Action Assigned':
      return 3;
    case 'Resolved':
      return 4;
    case 'Verified':
      return 5;
  }
}

export function HazardTimeline({ status }: {status: HazardStatus;}) {
  const current = activeIndex(status);
  return (
    <ol className="flex flex-col gap-0 sm:flex-row sm:items-start">
      {STEPS.map((step, index) => {
        const done = index < current;
        const active = index === current;
        return (
          <li
            key={step}
            className="relative flex flex-1 items-start gap-3 pb-5 sm:flex-col sm:items-center sm:gap-2 sm:pb-0 sm:text-center">
            
            {index < STEPS.length - 1 &&
            <span
              className={`absolute left-[13px] top-7 h-[calc(100%-1.75rem)] w-0.5 sm:left-auto sm:top-[13px] sm:h-0.5 sm:w-full sm:translate-x-1/2 ${
              done ? 'bg-blue-500' : 'bg-slate-200'}`
              } />

            }
            <span
              className={`relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 text-[11px] font-bold ${
              done ?
              'border-blue-600 bg-blue-600 text-white' :
              active ?
              'border-blue-600 bg-white text-blue-700' :
              'border-slate-200 bg-white text-slate-400'}`
              }>
              
              {done ? <CheckIcon className="h-3.5 w-3.5" /> : index + 1}
            </span>
            <span
              className={`text-xs font-medium ${
              done || active ? 'text-slate-900' : 'text-slate-400'}`
              }>
              
              {step}
            </span>
          </li>);

      })}
    </ol>);

}