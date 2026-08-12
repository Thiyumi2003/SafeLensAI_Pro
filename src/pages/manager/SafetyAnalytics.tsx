import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis } from
'recharts';
import {
  AlertTriangleIcon,
  BrainCircuitIcon,
  MapPinIcon,
  RepeatIcon,
  TrendingUpIcon } from
'lucide-react';
import { PageHeader } from '../../components/PageHeader';
import { Card, CardHeader } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import {
  actionStatusBreakdown,
  hazardTrend,
  hazardsByCategory,
  hazardsByLocation,
  recurringHazards,
  resolutionTime,
  riskDistribution,
  riskHotspots } from
'../../data/mockData';
import { RISK_COLORS } from '../../utils/risk';
import type { RiskLevel } from '../../types';

const axis = { fontSize: 11, fill: '#64748b' };

const INSIGHTS = [
{
  icon: TrendingUpIcon,
  tone: 'bg-orange-50 text-orange-600',
  text: 'Slip hazards increased by 18% this month.'
},
{
  icon: MapPinIcon,
  tone: 'bg-red-50 text-red-600',
  text: 'Loading Bay has the highest number of critical reports.'
},
{
  icon: AlertTriangleIcon,
  tone: 'bg-yellow-50 text-yellow-600',
  text: '4 corrective actions are overdue.'
}];


export function SafetyAnalytics() {
  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader
        title="Safety Analytics"
        subtitle="Where hazards happen, how fast they close, and what is trending." />
      

      <div className="grid gap-4 lg:grid-cols-3">
        {INSIGHTS.map((insight) =>
        <div
          key={insight.text}
          className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-card">
          
            <span className={`rounded-lg p-2 ${insight.tone}`}>
              <insight.icon className="h-4 w-4" />
            </span>
            <p className="text-sm font-medium text-slate-800">{insight.text}</p>
          </div>
        )}
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader title="Hazards by category" />
          <div className="h-64 px-3 py-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hazardsByCategory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" vertical={false} />
                <XAxis dataKey="name" tick={axis} axisLine={false} tickLine={false} />
                <YAxis tick={axis} axisLine={false} tickLine={false} width={28} />
                <Tooltip cursor={{ fill: '#f1f5f9' }} />
                <Bar dataKey="value" fill="#2563eb" radius={[6, 6, 0, 0]} name="Hazards" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <CardHeader title="Hazards by risk level" />
          <div className="h-64 px-3 py-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskDistribution}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={86}
                  paddingAngle={2}>
                  
                  {riskDistribution.map((entry) =>
                  <Cell key={entry.name} fill={RISK_COLORS[entry.name as RiskLevel]} />
                  )}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <CardHeader title="Hazards over time" />
          <div className="h-64 px-3 py-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={hazardTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" vertical={false} />
                <XAxis dataKey="day" tick={axis} axisLine={false} tickLine={false} />
                <YAxis tick={axis} axisLine={false} tickLine={false} width={28} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="hazards"
                  stroke="#2563eb"
                  strokeWidth={2.5}
                  dot={false}
                  name="Reported" />
                
                <Line
                  type="monotone"
                  dataKey="resolved"
                  stroke="#16a34a"
                  strokeWidth={2.5}
                  dot={false}
                  name="Resolved" />
                
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <CardHeader title="Hazards by location" />
          <div className="h-64 px-3 py-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hazardsByLocation} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" horizontal={false} />
                <XAxis type="number" tick={axis} axisLine={false} tickLine={false} />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={axis}
                  axisLine={false}
                  tickLine={false}
                  width={120} />
                
                <Tooltip cursor={{ fill: '#f1f5f9' }} />
                <Bar dataKey="value" fill="#0f172a" radius={[0, 6, 6, 0]} name="Hazards" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <CardHeader title="Corrective action status" />
          <div className="h-56 px-3 py-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={actionStatusBreakdown}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" vertical={false} />
                <XAxis dataKey="name" tick={axis} axisLine={false} tickLine={false} />
                <YAxis tick={axis} axisLine={false} tickLine={false} width={28} />
                <Tooltip cursor={{ fill: '#f1f5f9' }} />
                <Bar dataKey="value" fill="#0ea5e9" radius={[6, 6, 0, 0]} name="Actions" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <CardHeader title="Average resolution time" subtitle="Hours from report to verification" />
          <div className="h-56 px-3 py-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={resolutionTime}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" vertical={false} />
                <XAxis dataKey="month" tick={axis} axisLine={false} tickLine={false} />
                <YAxis tick={axis} axisLine={false} tickLine={false} width={28} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="hours"
                  stroke="#16a34a"
                  strokeWidth={2.5}
                  dot={{ r: 3 }}
                  name="Hours" />
                
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <CardHeader title="Top recurring hazards" />
          <ul className="divide-y divide-slate-100">
            {recurringHazards.map((item) =>
            <li key={item.name} className="flex items-center gap-3 px-5 py-3.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                  <RepeatIcon className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-slate-900">{item.name}</p>
                  <p className="text-xs text-slate-500">{item.location}</p>
                </div>
                <span className="text-sm font-bold text-slate-900">{item.count}</span>
              </li>
            )}
          </ul>
        </Card>

        <Card>
          <div className="flex items-center gap-2.5 border-b border-slate-100 px-5 py-4">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
              <BrainCircuitIcon className="h-4 w-4" />
            </span>
            <div>
              <h2 className="text-sm font-semibold text-slate-900">
                Potential Risk Hotspots
              </h2>
              <p className="text-xs text-slate-500">AI Safety Insights</p>
            </div>
          </div>
          <ol className="divide-y divide-slate-100">
            {riskHotspots.map((hotspot, index) =>
            <li key={hotspot.name} className="px-5 py-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600">
                    {index + 1}
                  </span>
                  <p className="flex-1 text-sm font-semibold text-slate-900">
                    {hotspot.name}
                  </p>
                  <Badge
                  className={
                  hotspot.level === 'Critical Risk' ?
                  'bg-red-50 text-red-700 ring-red-600/20' :
                  'bg-orange-50 text-orange-700 ring-orange-600/20'
                  }>
                  
                    {hotspot.level}
                  </Badge>
                  <span className="text-sm font-bold text-slate-900">
                    {hotspot.score}%
                  </span>
                </div>
                <div className="mt-2 h-1.5 w-full rounded-full bg-slate-100">
                  <div
                  className="h-1.5 rounded-full"
                  style={{
                    width: `${hotspot.score}%`,
                    background:
                    hotspot.level === 'Critical Risk' ? '#dc2626' : '#f97316'
                  }} />
                
                </div>
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {hotspot.factors.map((factor) =>
                <li
                  key={factor}
                  className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-slate-600">
                  
                      {factor}
                    </li>
                )}
                </ul>
              </li>
            )}
          </ol>
          <p className="border-t border-slate-100 px-5 py-3 text-xs text-slate-500">
            AI-generated predictive insight based on historical safety patterns.
          </p>
        </Card>
      </div>
    </div>);

}