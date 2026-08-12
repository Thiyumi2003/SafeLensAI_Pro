import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { XIcon } from 'lucide-react';
import { PageHeader } from '../../components/PageHeader';
import { Card, CardHeader } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Field';
import { locationStats } from '../../data/mockData';
import { RISK_COLORS, riskBadgeClass } from '../../utils/risk';
import type { LocationStat } from '../../types';

export function Heatmap() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<LocationStat | null>(null);

  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader
        title="Workplace Safety Heatmap"
        subtitle="Risk level by zone across the plant floor plan." />
      

      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader
            title="Plant floor plan"
            subtitle="Select a zone marker for details"
            action={
            <div className="hidden gap-3 sm:flex">
                {(['Low', 'Moderate', 'High', 'Critical'] as const).map((level) =>
              <span
                key={level}
                className="flex items-center gap-1.5 text-[11px] font-medium text-slate-600">
                
                    <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ background: RISK_COLORS[level] }} />
                
                    {level}
                  </span>
              )}
              </div>
            } />
          
          <div className="p-5">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-slate-200 bg-[repeating-linear-gradient(0deg,#f8fafc,#f8fafc_23px,#eef2f7_24px),repeating-linear-gradient(90deg,#f8fafc,#f8fafc_23px,#eef2f7_24px)]">
              {locationStats.map((zone) => {
                const color = RISK_COLORS[zone.riskLevel];
                const active = selected?.id === zone.id;
                return (
                  <button
                    key={zone.id}
                    type="button"
                    onClick={() => setSelected(zone)}
                    aria-label={`${zone.name}, ${zone.riskLevel} risk`}
                    className="absolute rounded-xl border-2 bg-white/70 p-2 text-left transition hover:shadow-pop"
                    style={{
                      left: `${zone.x}%`,
                      top: `${zone.y}%`,
                      width: `${zone.w}%`,
                      height: `${zone.h}%`,
                      borderColor: color,
                      background: `${color}12`,
                      boxShadow: active ? `0 0 0 3px ${color}40` : undefined
                    }}>
                    
                    <span className="flex items-start gap-2">
                      <span className="relative mt-0.5 flex h-3.5 w-3.5 shrink-0">
                        <span
                          className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                          style={{
                            background: color,
                            animationDuration: zone.riskLevel === 'Critical' ? '1.4s' : '3s'
                          }} />
                        
                        <span
                          className="relative inline-flex h-3.5 w-3.5 rounded-full ring-2 ring-white"
                          style={{ background: color }} />
                        
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-[11px] font-bold text-slate-900">
                          {zone.name}
                        </span>
                        <span className="block text-[10px] text-slate-500">
                          {zone.zone} · {zone.open} open
                        </span>
                      </span>
                    </span>
                  </button>);

              })}

              {selected &&
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-3 left-1/2 w-64 -translate-x-1/2 rounded-xl border border-slate-200 bg-white p-4 shadow-pop">
                
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        {selected.name}
                      </p>
                      <p className="text-xs text-slate-500">{selected.zone}</p>
                    </div>
                    <button
                    type="button"
                    onClick={() => setSelected(null)}
                    aria-label="Close popup"
                    className="rounded-md p-1 text-slate-400 hover:bg-slate-100">
                    
                      <XIcon className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <dl className="mt-3 grid grid-cols-2 gap-2 text-xs">
                    <Stat label="Total hazards" value={selected.total} />
                    <Stat label="Open" value={selected.open} />
                    <Stat label="Critical" value={selected.critical} />
                    <Stat label="Avg risk score" value={selected.avgRisk} />
                  </dl>
                  <Button
                  className="mt-3 w-full"
                  onClick={() => navigate('/manager/hazards')}>
                  
                    View Hazards
                  </Button>
                </motion.div>
              }
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader title="Zone risk ranking" />
          <ul className="divide-y divide-slate-100">
            {[...locationStats].
            sort((a, b) => b.avgRisk - a.avgRisk).
            map((zone) =>
            <li key={zone.id}>
                  <button
                type="button"
                onClick={() => setSelected(zone)}
                className="flex w-full items-center gap-3 px-5 py-3.5 text-left transition hover:bg-slate-50">
                
                    <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ background: RISK_COLORS[zone.riskLevel] }} />
                
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold text-slate-900">
                        {zone.name}
                      </span>
                      <span className="block text-xs text-slate-500">
                        {zone.total} hazards · {zone.open} open · avg {zone.avgRisk}
                      </span>
                    </span>
                    <Badge className={riskBadgeClass(zone.riskLevel)}>
                      {zone.riskLevel}
                    </Badge>
                  </button>
                </li>
            )}
          </ul>
        </Card>
      </div>
    </div>);

}

function Stat({ label, value }: {label: string;value: number;}) {
  return (
    <div className="rounded-lg bg-slate-50 p-2">
      <dt className="text-[11px] text-slate-500">{label}</dt>
      <dd className="text-sm font-bold text-slate-900">{value}</dd>
    </div>);

}