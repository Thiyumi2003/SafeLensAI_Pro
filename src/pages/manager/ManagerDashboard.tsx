import React from 'react';
import { Link } from 'react-router-dom';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis } from
'recharts';
import {
  AlertOctagonIcon,
  AlertTriangleIcon,
  CheckCircle2Icon,
  ChevronRightIcon,
  ClipboardCheckIcon,
  ClockIcon,
  LayersIcon,
  ShieldAlertIcon } from
'lucide-react';
import { PageHeader } from '../../components/PageHeader';
import { StatCard } from '../../components/ui/StatCard';
import { Card, CardHeader } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { useApp } from '../../contexts/AppContext';
import {
  hazardTrend,
  hazardsByCategory,
  riskDistribution } from
'../../data/mockData';
import { RISK_COLORS, hazardStatusClass, riskBadgeClass } from '../../utils/risk';
import type { RiskLevel } from '../../types';

const chartAxis = { fontSize: 11, fill: '#64748b' };

export function ManagerDashboard() {
  const { stats, hazards } = useApp();
  const criticalAlerts = hazards.
  filter(
    (h) =>
    (h.ai.riskLevel === 'Critical' || h.ai.riskLevel === 'High') &&
    h.status !== 'Verified'
  ).
  slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader
        title="Safety Overview"
        subtitle="Live hazard, risk and corrective action status across the Colombo plant." />
      

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-6">
        <StatCard label="Total Hazards" value={stats.totalHazards} icon={LayersIcon} />
        <StatCard
          label="Open Hazards"
          value={stats.openHazards}
          icon={ShieldAlertIcon}
          tone="blue" />
        
        <StatCard
          label="Critical"
          value={stats.criticalHazards}
          icon={AlertOctagonIcon}
          tone="red" />
        
        <StatCard
          label="Resolved"
          value={stats.resolvedHazards}
          icon={CheckCircle2Icon}
          tone="green" />
        
        <StatCard
          label="Open Actions"
          value={stats.openActions}
          icon={ClipboardCheckIcon}
          tone="yellow" />
        
        <StatCard
          label="Overdue"
          value={stats.overdueActions}
          icon={ClockIcon}
          tone="orange" />
        
      </div>

      <Card className="mt-5 border-red-200">
        <div className="flex items-center gap-2.5 border-b border-red-100 bg-red-50/70 px-5 py-4">
          <AlertTriangleIcon className="h-4 w-4 text-red-600" />
          <h2 className="text-sm font-semibold text-red-900">
            Critical Safety Alerts
          </h2>
          <span className="rounded-full bg-red-600 px-2 py-0.5 text-[11px] font-bold text-white">
            {criticalAlerts.length}
          </span>
        </div>
        <ul className="divide-y divide-slate-100">
          {criticalAlerts.map((hazard) =>
          <li key={hazard.id}>
              <Link
              to={`/manager/hazards/${hazard.id}`}
              className="flex items-center gap-3 px-5 py-3.5 transition hover:bg-slate-50">
              
                <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ background: RISK_COLORS[hazard.ai.riskLevel] }} />
              
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-900">
                    {hazard.title}
                  </p>
                  <p className="text-xs text-slate-500">
                    {hazard.location} · {hazard.id} · Risk {hazard.ai.riskScore}
                  </p>
                </div>
                <Badge className={riskBadgeClass(hazard.ai.riskLevel)}>
                  {hazard.ai.riskLevel}
                </Badge>
                <ChevronRightIcon className="h-4 w-4 shrink-0 text-slate-400" />
              </Link>
            </li>
          )}
        </ul>
      </Card>

      <Card className="mt-5">
        <CardHeader
          title="Recent hazard reports"
          action={
          <Link
            to="/manager/hazards"
            className="text-xs font-semibold text-blue-600 hover:text-blue-700">
            
              View all
            </Link>
          } />
        
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-500">
                <th className="px-5 py-3 font-semibold">ID</th>
                <th className="px-5 py-3 font-semibold">Hazard</th>
                <th className="px-5 py-3 font-semibold">Location</th>
                <th className="px-5 py-3 font-semibold">Category</th>
                <th className="px-5 py-3 font-semibold">Risk</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Date</th>
                <th className="px-5 py-3 font-semibold">View</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {hazards.slice(0, 6).map((hazard) =>
              <tr key={hazard.id} className="hover:bg-slate-50">
                  <td className="px-5 py-3 font-semibold text-slate-500">
                    {hazard.id}
                  </td>
                  <td className="max-w-[220px] truncate px-5 py-3 font-medium text-slate-900">
                    {hazard.title}
                  </td>
                  <td className="px-5 py-3 text-slate-600">{hazard.location}</td>
                  <td className="px-5 py-3 text-slate-600">{hazard.category}</td>
                  <td className="px-5 py-3">
                    <Badge className={riskBadgeClass(hazard.ai.riskLevel)}>
                      {hazard.ai.riskLevel}
                    </Badge>
                  </td>
                  <td className="px-5 py-3">
                    <Badge className={hazardStatusClass(hazard.status)} dot>
                      {hazard.status}
                    </Badge>
                  </td>
                  <td className="whitespace-nowrap px-5 py-3 text-xs text-slate-500">
                    {hazard.submittedAt}
                  </td>
                  <td className="px-5 py-3">
                    <Link
                    to={`/manager/hazards/${hazard.id}`}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700">
                    
                      View
                    </Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Hazard trend – last 30 days" />
          <div className="h-64 px-3 py-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hazardTrend}>
                <defs>
                  <linearGradient id="hazardFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563eb" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" vertical={false} />
                <XAxis dataKey="day" tick={chartAxis} axisLine={false} tickLine={false} />
                <YAxis tick={chartAxis} axisLine={false} tickLine={false} width={28} />
                <Tooltip cursor={{ stroke: '#cbd5e1' }} />
                <Area
                  type="monotone"
                  dataKey="hazards"
                  stroke="#2563eb"
                  strokeWidth={2.5}
                  fill="url(#hazardFill)"
                  name="Hazards reported" />
                
                <Area
                  type="monotone"
                  dataKey="resolved"
                  stroke="#16a34a"
                  strokeWidth={2}
                  fill="transparent"
                  name="Resolved" />
                
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <CardHeader title="Risk distribution" />
          <div className="h-64 px-3 py-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskDistribution}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={52}
                  outerRadius={80}
                  paddingAngle={2}>
                  
                  {riskDistribution.map((entry) =>
                  <Cell
                    key={entry.name}
                    fill={RISK_COLORS[entry.name as RiskLevel]} />

                  )}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 px-5 pb-5 text-xs">
            {riskDistribution.map((entry) =>
            <span key={entry.name} className="flex items-center gap-2 text-slate-600">
                <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ background: RISK_COLORS[entry.name as RiskLevel] }} />
              
                {entry.name} · {entry.value}
              </span>
            )}
          </div>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader title="Hazards by category" />
          <div className="h-64 px-3 py-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hazardsByCategory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" vertical={false} />
                <XAxis dataKey="name" tick={chartAxis} axisLine={false} tickLine={false} />
                <YAxis tick={chartAxis} axisLine={false} tickLine={false} width={28} />
                <Tooltip cursor={{ fill: '#f1f5f9' }} />
                <Bar dataKey="value" fill="#2563eb" radius={[6, 6, 0, 0]} name="Hazards" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>);

}