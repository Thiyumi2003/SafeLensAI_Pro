import React from 'react';
import {
  BrainCircuitIcon,
  FileTextIcon,
  ImageIcon,
  InfoIcon,
  LightbulbIcon } from
'lucide-react';
import { Badge } from './ui/Badge';
import { riskBadgeClass } from '../utils/risk';
import type { AiAnalysis } from '../types';

function Meter({ label, value, max = 5 }: {label: string;value: number;max?: number;}) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-slate-600">{label}</span>
        <span className="font-semibold text-slate-900">
          {value} / {max}
        </span>
      </div>
      <div className="mt-1.5 h-1.5 w-full rounded-full bg-slate-100">
        <div
          className="h-1.5 rounded-full bg-blue-600"
          style={{ width: `${value / max * 100}%` }} />
        
      </div>
    </div>);

}

export function AiAnalysisCard({ ai }: {ai: AiAnalysis;}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card">
      <div className="flex items-center gap-2.5 border-b border-slate-100 bg-slate-50/70 px-5 py-4">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
          <BrainCircuitIcon className="h-4 w-4" />
        </span>
        <div>
          <h2 className="text-sm font-semibold text-slate-900">AI Classification</h2>
          <p className="text-xs text-slate-500">Automated hazard analysis</p>
        </div>
      </div>

      <div className="grid gap-5 px-5 py-5 md:grid-cols-2">
        <div className="space-y-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Detected hazard
            </p>
            <p className="mt-1 text-lg font-bold text-slate-900">{ai.category}</p>
          </div>
          <div>
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-slate-600">Confidence</span>
              <span className="font-semibold text-slate-900">{ai.confidence}%</span>
            </div>
            <div className="mt-1.5 h-2 w-full rounded-full bg-slate-100">
              <div
                className="h-2 rounded-full bg-green-500"
                style={{ width: `${ai.confidence}%` }} />
              
            </div>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Detected from
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {ai.sources.map((source) =>
              <Badge
                key={source}
                className="bg-slate-100 text-slate-700 ring-slate-500/20">
                
                  {source === 'Image' ?
                <ImageIcon className="h-3 w-3" /> :

                <FileTextIcon className="h-3 w-3" />
                }
                  {source}
                </Badge>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-3 rounded-xl bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Risk analysis
          </p>
          <Meter label="Severity" value={ai.severity} />
          <Meter label="Likelihood" value={ai.likelihood} />
          <div className="grid grid-cols-2 gap-3 pt-1 text-xs">
            <div>
              <p className="text-slate-500">Recurrence</p>
              <p className="font-semibold text-slate-900">{ai.recurrence}</p>
            </div>
            <div>
              <p className="text-slate-500">Environmental factor</p>
              <p className="font-semibold text-slate-900">{ai.environmental}</p>
            </div>
          </div>
          <div className="flex items-end justify-between rounded-xl border border-slate-200 bg-white p-3">
            <div>
              <p className="text-xs text-slate-500">Risk score</p>
              <p className="text-2xl font-bold text-slate-900">{ai.riskScore}</p>
            </div>
            <Badge className={`${riskBadgeClass(ai.riskLevel)} px-3 py-1.5 text-sm uppercase`} dot>
              {ai.riskLevel}
            </Badge>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-100 px-5 py-4">
        <div className="flex gap-3 rounded-xl bg-blue-50 p-3.5">
          <LightbulbIcon className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
          <div>
            <p className="text-xs font-semibold text-blue-900">AI Recommendation</p>
            <p className="mt-0.5 text-sm text-blue-900/80">{ai.recommendation}</p>
          </div>
        </div>
        <p className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
          <InfoIcon className="h-3.5 w-3.5" />
          AI-generated assessment. Manager review required.
        </p>
      </div>
    </div>);

}