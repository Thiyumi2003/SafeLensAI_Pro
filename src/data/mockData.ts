import type {
  CorrectiveAction,
  Hazard,
  LocationRecord,
  LocationStat,
  Notification,
  UserRecord } from
'../types';

export const IMAGES = {
  oilSpill: "/57b7427f-59a6-458f-a424-c9ff28755b23.jpg",

  oilSpillAfter: "/5aa5953c-1290-47a1-ba75-e8c38e1f6508.jpg",

  chemicalLeak: "/e1a625e8-4379-4058-8e7f-063799e39877.jpg",

  blockedExit: "/8707a0d9-0286-4eff-9e3b-1b3f405e0d68.jpg"

};

export const FEATURED_HAZARD_ID = 'H-1024';

export const hazards: Hazard[] = [
{
  id: 'H-1024',
  title: 'Oil spill near loading bay entrance',
  description:
  'Oil spill near the loading bay entrance. Employees are walking through this area.',
  location: 'Loading Bay',
  zone: 'Zone A',
  category: 'Slip / Trip',
  status: 'Submitted',
  reportedBy: 'Employee #104',
  anonymous: false,
  submittedAt: '10 Aug 2026 – 09:45 AM',
  imageUrl: IMAGES.oilSpill,
  voiceNote: 'voice-note-0:12',
  ai: {
    category: 'Slip / Trip',
    confidence: 94,
    severity: 4,
    likelihood: 4,
    recurrence: 'High',
    environmental: 'Moderate',
    riskScore: 21.1,
    riskLevel: 'Critical',
    recommendation:
    'Immediate cleanup and inspection of the leaking equipment is recommended.',
    sources: ['Image', 'Text description']
  }
},
{
  id: 'H-1023',
  title: 'Chemical leak from storage drum',
  description:
  'Liquid pooling underneath a drum on the lower rack in chemical storage. Strong odour in the room.',
  location: 'Chemical Storage',
  zone: 'Zone D',
  category: 'Chemical',
  status: 'Under Review',
  reportedBy: 'Employee #087',
  anonymous: true,
  submittedAt: '10 Aug 2026 – 08:10 AM',
  imageUrl: IMAGES.chemicalLeak,
  ai: {
    category: 'Chemical',
    confidence: 91,
    severity: 5,
    likelihood: 4,
    recurrence: 'Moderate',
    environmental: 'High',
    riskScore: 23.4,
    riskLevel: 'Critical',
    recommendation:
    'Isolate the storage rack, ventilate the room and arrange specialist containment.',
    sources: ['Image', 'Text description']
  }
},
{
  id: 'H-1022',
  title: 'Blocked emergency exit',
  description:
  'Pallet and cardboard boxes stacked in front of the emergency exit door on the production floor.',
  location: 'Production Line A',
  zone: 'Zone B',
  category: 'Fire / Emergency',
  status: 'Action Assigned',
  reportedBy: 'Employee #112',
  anonymous: false,
  submittedAt: '09 Aug 2026 – 04:20 PM',
  imageUrl: IMAGES.blockedExit,
  actionId: 'A-104',
  ai: {
    category: 'Fire / Emergency',
    confidence: 96,
    severity: 5,
    likelihood: 3,
    recurrence: 'High',
    environmental: 'Low',
    riskScore: 19.8,
    riskLevel: 'Critical',
    recommendation:
    'Clear the exit route immediately and re-brief the shift team on exit keep-clear rules.',
    sources: ['Image', 'Text description']
  }
},
{
  id: 'H-1021',
  title: 'Exposed electrical wiring near rack 12',
  description:
  'Damaged conduit with exposed wiring at floor level beside racking bay 12.',
  location: 'Warehouse',
  zone: 'Zone C',
  category: 'Electrical',
  status: 'Action Assigned',
  reportedBy: 'Employee #045',
  anonymous: false,
  submittedAt: '09 Aug 2026 – 01:05 PM',
  actionId: 'A-105',
  ai: {
    category: 'Electrical',
    confidence: 88,
    severity: 4,
    likelihood: 3,
    recurrence: 'Moderate',
    environmental: 'Low',
    riskScore: 15.2,
    riskLevel: 'High',
    recommendation:
    'Isolate the circuit and schedule a licensed electrician to re-sheath the conduit.',
    sources: ['Text description']
  }
},
{
  id: 'H-1020',
  title: 'Unguarded conveyor pinch point',
  description:
  'Guard panel missing on the in-feed conveyor, exposing a pinch point at operator height.',
  location: 'Production Line A',
  zone: 'Zone B',
  category: 'Machinery',
  status: 'Resolved',
  reportedBy: 'Employee #071',
  anonymous: false,
  submittedAt: '08 Aug 2026 – 11:32 AM',
  actionId: 'A-106',
  ai: {
    category: 'Machinery',
    confidence: 85,
    severity: 4,
    likelihood: 3,
    recurrence: 'Low',
    environmental: 'Low',
    riskScore: 13.6,
    riskLevel: 'High',
    recommendation:
    'Lock out the conveyor and refit the guard panel before the next production run.',
    sources: ['Image']
  }
},
{
  id: 'H-1019',
  title: 'Cluttered walkway near packing station',
  description:
  'Empty pallets and shrink wrap left in the marked walkway beside the packing station.',
  location: 'Warehouse',
  zone: 'Zone C',
  category: 'Housekeeping',
  status: 'Verified',
  reportedBy: 'Employee #104',
  anonymous: false,
  submittedAt: '07 Aug 2026 – 03:48 PM',
  actionId: 'A-101',
  ai: {
    category: 'Housekeeping',
    confidence: 79,
    severity: 2,
    likelihood: 4,
    recurrence: 'High',
    environmental: 'Low',
    riskScore: 9.4,
    riskLevel: 'Moderate',
    recommendation:
    'Reinstate the end-of-shift walkway clearance check for the packing team.',
    sources: ['Text description']
  }
},
{
  id: 'H-1018',
  title: 'Poor lighting in stair well',
  description: 'Two of four lights out in the office area stairwell.',
  location: 'Office Area',
  zone: 'Zone F',
  category: 'Slip / Trip',
  status: 'Verified',
  reportedBy: 'Employee #033',
  anonymous: false,
  submittedAt: '06 Aug 2026 – 09:12 AM',
  actionId: 'A-102',
  ai: {
    category: 'Slip / Trip',
    confidence: 74,
    severity: 2,
    likelihood: 2,
    recurrence: 'Low',
    environmental: 'Low',
    riskScore: 4.8,
    riskLevel: 'Low',
    recommendation: 'Replace the failed lamps during the next maintenance round.',
    sources: ['Text description']
  }
},
{
  id: 'H-1017',
  title: 'Repeated water pooling at bay 3',
  description:
  'Water collecting near the loading bay roller door after rain, creating a slip risk.',
  location: 'Loading Bay',
  zone: 'Zone A',
  category: 'Slip / Trip',
  status: 'Verified',
  reportedBy: 'Employee #058',
  anonymous: false,
  submittedAt: '05 Aug 2026 – 07:55 AM',
  actionId: 'A-103',
  ai: {
    category: 'Slip / Trip',
    confidence: 82,
    severity: 3,
    likelihood: 4,
    recurrence: 'High',
    environmental: 'Moderate',
    riskScore: 14.1,
    riskLevel: 'High',
    recommendation:
    'Improve door seal drainage and place anti-slip matting at the bay entrance.',
    sources: ['Image', 'Text description']
  }
}];


export const correctiveActions: CorrectiveAction[] = [
{
  id: 'A-104',
  hazardId: 'H-1022',
  hazardTitle: 'Blocked emergency exit',
  title: 'Clear emergency exit route and re-brief shift team',
  description:
  'Remove pallet and stacked boxes from the exit route, then brief the production shift on keep-clear rules.',
  assignedTo: 'Nimal Fernando',
  assignedToRole: 'Production Supervisor',
  priority: 'Critical',
  dueDate: '09 Aug 2026 – 06:00 PM',
  status: 'In Progress',
  overdue: true
},
{
  id: 'A-105',
  hazardId: 'H-1021',
  hazardTitle: 'Exposed electrical wiring near rack 12',
  title: 'Isolate circuit and re-sheath damaged conduit',
  description:
  'Isolate the affected circuit and arrange a licensed electrician to repair the conduit.',
  assignedTo: 'Kasun Perera',
  assignedToRole: 'Maintenance Officer',
  priority: 'High',
  dueDate: '11 Aug 2026 – 12:00 PM',
  status: 'Open'
},
{
  id: 'A-106',
  hazardId: 'H-1020',
  hazardTitle: 'Unguarded conveyor pinch point',
  title: 'Refit conveyor guard panel',
  description: 'Lock out the conveyor and refit the missing guard panel.',
  assignedTo: 'Kasun Perera',
  assignedToRole: 'Maintenance Officer',
  priority: 'High',
  dueDate: '10 Aug 2026 – 05:00 PM',
  status: 'Resolved',
  resolutionNotes:
  'Guard panel refitted and fasteners torqued. Conveyor test-run with supervisor present.',
  completedAt: '10 Aug 2026 – 10:20 AM'
},
{
  id: 'A-101',
  hazardId: 'H-1019',
  hazardTitle: 'Cluttered walkway near packing station',
  title: 'Clear walkway and reinstate shift checks',
  description: 'Clear pallets from the walkway and restart end-of-shift checks.',
  assignedTo: 'Dilani Silva',
  assignedToRole: 'Warehouse Lead',
  priority: 'Medium',
  dueDate: '08 Aug 2026 – 05:00 PM',
  status: 'Verified',
  resolutionNotes: 'Walkway cleared, checklist added to shift handover.',
  completedAt: '08 Aug 2026 – 02:40 PM'
},
{
  id: 'A-102',
  hazardId: 'H-1018',
  hazardTitle: 'Poor lighting in stair well',
  title: 'Replace failed stairwell lamps',
  description: 'Replace two failed lamps in the office stairwell.',
  assignedTo: 'Kasun Perera',
  assignedToRole: 'Maintenance Officer',
  priority: 'Low',
  dueDate: '07 Aug 2026 – 05:00 PM',
  status: 'Verified',
  resolutionNotes: 'Both lamps replaced and light levels checked.',
  completedAt: '07 Aug 2026 – 11:15 AM'
},
{
  id: 'A-103',
  hazardId: 'H-1017',
  hazardTitle: 'Repeated water pooling at bay 3',
  title: 'Install anti-slip matting at bay 3',
  description: 'Fit anti-slip matting and check door seal drainage.',
  assignedTo: 'Dilani Silva',
  assignedToRole: 'Warehouse Lead',
  priority: 'High',
  dueDate: '06 Aug 2026 – 05:00 PM',
  status: 'Reopened',
  resolutionNotes: 'Matting placed at entrance.',
  completedAt: '06 Aug 2026 – 04:10 PM',
  reopenReason: 'Water still pooling behind the matting during heavy rain.',
  overdue: true
}];


export const notifications: Notification[] = [
{
  id: 'N-1',
  audience: 'manager',
  title: 'Critical hazard reported at Chemical Storage',
  body: 'H-1023 · AI risk score 23.4 · awaiting your review.',
  time: '12 min ago',
  read: false,
  tone: 'critical',
  link: '/manager/hazards/H-1023'
},
{
  id: 'N-2',
  audience: 'manager',
  title: 'Corrective Action A-104 is overdue',
  body: 'Blocked emergency exit · due 09 Aug, 06:00 PM.',
  time: '1 hr ago',
  read: false,
  tone: 'warning',
  link: '/manager/actions'
},
{
  id: 'N-3',
  audience: 'manager',
  title: 'Corrective Action A-106 resolved — verification required',
  body: 'Conveyor guard refitted by Kasun Perera.',
  time: '3 hrs ago',
  read: false,
  tone: 'info',
  link: '/manager/actions'
},
{
  id: 'N-4',
  audience: 'manager',
  title: 'New high-risk hazard reported at Loading Bay',
  body: 'H-1017 recurrence detected in the same zone this month.',
  time: 'Yesterday',
  read: true,
  tone: 'info',
  link: '/manager/hazards'
},
{
  id: 'N-10',
  audience: 'employee',
  title: 'New corrective action assigned',
  body: 'A-105 · Isolate circuit and re-sheath damaged conduit.',
  time: '2 hrs ago',
  read: false,
  tone: 'info',
  link: '/employee/actions'
},
{
  id: 'N-11',
  audience: 'employee',
  title: 'Corrective action due soon',
  body: 'A-105 is due tomorrow at 12:00 PM.',
  time: '4 hrs ago',
  read: false,
  tone: 'warning',
  link: '/employee/actions'
},
{
  id: 'N-12',
  audience: 'employee',
  title: 'Corrective action reopened by Manager',
  body: 'A-103 · Oil leak still visible near equipment.',
  time: 'Yesterday',
  read: true,
  tone: 'warning',
  link: '/employee/actions'
},
{
  id: 'N-20',
  audience: 'admin',
  title: 'New QR code generated',
  body: 'QR-LB-A activated for Loading Bay – Zone A.',
  time: '2 days ago',
  read: true,
  tone: 'success',
  link: '/admin'
}];


export const locationStats: LocationStat[] = [
{
  id: 'loading-bay',
  name: 'Loading Bay',
  zone: 'Zone A',
  total: 24,
  open: 7,
  critical: 3,
  avgRisk: 18.4,
  riskLevel: 'Critical',
  x: 4,
  y: 6,
  w: 30,
  h: 40
},
{
  id: 'chemical-storage',
  name: 'Chemical Storage',
  zone: 'Zone D',
  total: 16,
  open: 5,
  critical: 2,
  avgRisk: 17.1,
  riskLevel: 'Critical',
  x: 68,
  y: 6,
  w: 28,
  h: 30
},
{
  id: 'warehouse',
  name: 'Warehouse',
  zone: 'Zone C',
  total: 31,
  open: 6,
  critical: 1,
  avgRisk: 13.2,
  riskLevel: 'High',
  x: 36,
  y: 6,
  w: 30,
  h: 40
},
{
  id: 'production-line',
  name: 'Production Line A',
  zone: 'Zone B',
  total: 28,
  open: 4,
  critical: 1,
  avgRisk: 9.6,
  riskLevel: 'Moderate',
  x: 4,
  y: 50,
  w: 46,
  h: 44
},
{
  id: 'emergency-exit',
  name: 'Emergency Exit',
  zone: 'Zone E',
  total: 9,
  open: 2,
  critical: 0,
  avgRisk: 11.8,
  riskLevel: 'High',
  x: 68,
  y: 40,
  w: 28,
  h: 16
},
{
  id: 'office-area',
  name: 'Office Area',
  zone: 'Zone F',
  total: 6,
  open: 0,
  critical: 0,
  avgRisk: 4.2,
  riskLevel: 'Low',
  x: 52,
  y: 50,
  w: 44,
  h: 44
}];


export const hazardsByCategory = [
{ name: 'Slip / Trip', value: 38 },
{ name: 'Chemical', value: 21 },
{ name: 'Electrical', value: 18 },
{ name: 'Machinery', value: 16 },
{ name: 'Fire / Emergency', value: 12 },
{ name: 'Housekeeping', value: 23 }];


export const hazardTrend = [
{ day: '12 Jul', hazards: 3, resolved: 2 },
{ day: '17 Jul', hazards: 5, resolved: 3 },
{ day: '22 Jul', hazards: 4, resolved: 4 },
{ day: '27 Jul', hazards: 7, resolved: 5 },
{ day: '01 Aug', hazards: 6, resolved: 6 },
{ day: '05 Aug', hazards: 9, resolved: 6 },
{ day: '08 Aug', hazards: 8, resolved: 7 },
{ day: '10 Aug', hazards: 11, resolved: 7 }];


export const riskDistribution = [
{ name: 'Low', value: 42 },
{ name: 'Moderate', value: 48 },
{ name: 'High', value: 31 },
{ name: 'Critical', value: 7 }];


export const hazardsByLocation = [
{ name: 'Warehouse', value: 31 },
{ name: 'Production Line A', value: 28 },
{ name: 'Loading Bay', value: 24 },
{ name: 'Chemical Storage', value: 16 },
{ name: 'Emergency Exit', value: 9 },
{ name: 'Office Area', value: 6 }];


export const actionStatusBreakdown = [
{ name: 'Open', value: 7 },
{ name: 'In Progress', value: 6 },
{ name: 'Resolved', value: 5 },
{ name: 'Verified', value: 22 },
{ name: 'Reopened', value: 2 }];


export const resolutionTime = [
{ month: 'Apr', hours: 62 },
{ month: 'May', hours: 55 },
{ month: 'Jun', hours: 48 },
{ month: 'Jul', hours: 41 },
{ month: 'Aug', hours: 34 }];


export const recurringHazards = [
{ name: 'Oil / liquid spill', count: 14, location: 'Loading Bay' },
{ name: 'Blocked walkway', count: 11, location: 'Warehouse' },
{ name: 'Missing machine guard', count: 8, location: 'Production Line A' },
{ name: 'Drum leakage', count: 6, location: 'Chemical Storage' }];


export const riskHotspots = [
{
  name: 'Loading Bay',
  level: 'Critical Risk',
  score: 87,
  factors: ['3 repeated spill hazards', 'Avg risk score 18.4', '2 unresolved actions']
},
{
  name: 'Chemical Storage',
  level: 'High Risk',
  score: 76,
  factors: ['Drum leakage recurrence', 'Avg risk score 17.1', 'High environmental factor']
},
{
  name: 'Warehouse',
  level: 'High Risk',
  score: 68,
  factors: ['Highest hazard volume', 'Housekeeping frequency', '1 overdue action']
}];


export const users: UserRecord[] = [
{ id: 'U-01', name: 'Safety Manager', email: 'manager@safelens.ai', role: 'Manager', status: 'Active' },
{ id: 'U-02', name: 'Kasun Perera', email: 'kasun@safelens.ai', role: 'Maintenance Officer', status: 'Active' },
{ id: 'U-03', name: 'Dilani Silva', email: 'dilani@safelens.ai', role: 'Warehouse Lead', status: 'Active' },
{ id: 'U-04', name: 'Nimal Fernando', email: 'nimal@safelens.ai', role: 'Production Supervisor', status: 'Active' },
{ id: 'U-05', name: 'Ayesha Jayawardena', email: 'ayesha@safelens.ai', role: 'Employee', status: 'Invited' },
{ id: 'U-06', name: 'Ravi Kumar', email: 'ravi@safelens.ai', role: 'Employee', status: 'Disabled' },
{ id: 'U-07', name: 'System Admin', email: 'admin@safelens.ai', role: 'Administrator', status: 'Active' }];


export const locationRecords: LocationRecord[] = [
{ id: 'L-01', name: 'Loading Bay', zone: 'Zone A', qr: 'QR-LB-A', status: 'Active' },
{ id: 'L-02', name: 'Production Line A', zone: 'Zone B', qr: 'QR-PLA-B', status: 'Active' },
{ id: 'L-03', name: 'Warehouse', zone: 'Zone C', qr: 'QR-WH-C', status: 'Active' },
{ id: 'L-04', name: 'Chemical Storage', zone: 'Zone D', qr: 'QR-CS-D', status: 'Active' },
{ id: 'L-05', name: 'Emergency Exit', zone: 'Zone E', qr: 'QR-EE-E', status: 'Inactive' },
{ id: 'L-06', name: 'Office Area', zone: 'Zone F', qr: 'QR-OA-F', status: 'Active' }];


export const assignees = [
'Kasun Perera – Maintenance Officer',
'Dilani Silva – Warehouse Lead',
'Nimal Fernando – Production Supervisor',
'Ayesha Jayawardena – Safety Officer'];