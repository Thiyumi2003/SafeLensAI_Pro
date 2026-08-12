import type {
  ActionStatus,
  HazardStatus,
  Priority,
  RiskLevel } from
'../types';

export const RISK_COLORS: Record<RiskLevel, string> = {
  Low: '#16a34a',
  Moderate: '#eab308',
  High: '#f97316',
  Critical: '#dc2626'
};

export function riskBadgeClass(level: RiskLevel): string {
  switch (level) {
    case 'Low':
      return 'bg-green-50 text-green-700 ring-green-600/20';
    case 'Moderate':
      return 'bg-yellow-50 text-yellow-800 ring-yellow-600/20';
    case 'High':
      return 'bg-orange-50 text-orange-700 ring-orange-600/20';
    case 'Critical':
      return 'bg-red-50 text-red-700 ring-red-600/20';
  }
}

export function hazardStatusClass(status: HazardStatus): string {
  switch (status) {
    case 'Submitted':
      return 'bg-slate-100 text-slate-700 ring-slate-500/20';
    case 'Under Review':
      return 'bg-blue-50 text-blue-700 ring-blue-600/20';
    case 'Action Assigned':
      return 'bg-indigo-50 text-indigo-700 ring-indigo-600/20';
    case 'Resolved':
      return 'bg-teal-50 text-teal-700 ring-teal-600/20';
    case 'Verified':
      return 'bg-green-50 text-green-700 ring-green-600/20';
  }
}

export function actionStatusClass(status: ActionStatus): string {
  switch (status) {
    case 'Open':
      return 'bg-slate-100 text-slate-700 ring-slate-500/20';
    case 'In Progress':
      return 'bg-blue-50 text-blue-700 ring-blue-600/20';
    case 'Resolved':
      return 'bg-teal-50 text-teal-700 ring-teal-600/20';
    case 'Verified':
      return 'bg-green-50 text-green-700 ring-green-600/20';
    case 'Reopened':
      return 'bg-orange-50 text-orange-700 ring-orange-600/20';
  }
}

export function priorityClass(priority: Priority): string {
  switch (priority) {
    case 'Low':
      return 'bg-green-50 text-green-700 ring-green-600/20';
    case 'Medium':
      return 'bg-yellow-50 text-yellow-800 ring-yellow-600/20';
    case 'High':
      return 'bg-orange-50 text-orange-700 ring-orange-600/20';
    case 'Critical':
      return 'bg-red-50 text-red-700 ring-red-600/20';
  }
}

export function levelFromScore(score: number): RiskLevel {
  if (score >= 18) return 'Critical';
  if (score >= 12) return 'High';
  if (score >= 6) return 'Moderate';
  return 'Low';
}