export type Role = 'employee' | 'manager' | 'admin';

export type RiskLevel = 'Low' | 'Moderate' | 'High' | 'Critical';

export type HazardStatus =
'Submitted' |
'Under Review' |
'Action Assigned' |
'Resolved' |
'Verified';

export type ActionStatus =
'Open' |
'In Progress' |
'Resolved' |
'Verified' |
'Reopened';

export type Priority = 'Low' | 'Medium' | 'High' | 'Critical';

export type HazardCategory =
'Slip / Trip' |
'Chemical' |
'Electrical' |
'Fire / Emergency' |
'Machinery' |
'Ergonomic' |
'Housekeeping';

export interface AiAnalysis {
  category: HazardCategory;
  confidence: number;
  severity: number;
  likelihood: number;
  recurrence: 'Low' | 'Moderate' | 'High';
  environmental: 'Low' | 'Moderate' | 'High';
  riskScore: number;
  riskLevel: RiskLevel;
  recommendation: string;
  sources: string[];
}

export interface Hazard {
  id: string;
  title: string;
  description: string;
  location: string;
  zone: string;
  category: HazardCategory;
  status: HazardStatus;
  reportedBy: string;
  anonymous: boolean;
  submittedAt: string;
  imageUrl?: string;
  afterImageUrl?: string;
  voiceNote?: string;
  ai: AiAnalysis;
  managerReview?: {
    decision: 'Accepted' | 'Overridden';
    category: HazardCategory;
    reason?: string;
    reviewedAt: string;
  };
  actionId?: string;
}

export interface CorrectiveAction {
  id: string;
  hazardId: string;
  hazardTitle: string;
  title: string;
  description: string;
  assignedTo: string;
  assignedToRole: string;
  priority: Priority;
  dueDate: string;
  status: ActionStatus;
  notes?: string;
  resolutionNotes?: string;
  evidenceUrl?: string;
  completedAt?: string;
  reopenReason?: string;
  overdue?: boolean;
}

export interface Notification {
  id: string;
  audience: Role;
  title: string;
  body: string;
  time: string;
  read: boolean;
  tone: 'critical' | 'warning' | 'info' | 'success';
  link?: string;
}

export interface LocationStat {
  id: string;
  name: string;
  zone: string;
  total: number;
  open: number;
  critical: number;
  avgRisk: number;
  riskLevel: RiskLevel;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Invited' | 'Disabled';
}

export interface LocationRecord {
  id: string;
  name: string;
  zone: string;
  qr: string;
  status: 'Active' | 'Inactive';
}