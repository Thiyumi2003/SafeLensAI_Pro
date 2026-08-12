import React, { useState } from 'react';
import {
  CalendarDaysIcon,
  DownloadIcon,
  FileBarChartIcon,
  FileTextIcon,
  SlidersHorizontalIcon } from
'lucide-react';
import { PageHeader } from '../../components/PageHeader';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button, Input, Label, Select } from '../../components/ui/Field';
import { useApp } from '../../contexts/AppContext';
import { locationRecords } from '../../data/mockData';

const REPORTS = [
{
  title: 'Daily Safety Summary',
  description: 'Hazards reported, actions raised and closed in the last 24 hours.',
  meta: 'Generated daily at 6:00 PM',
  icon: FileTextIcon
},
{
  title: 'Weekly Hazard Report',
  description: 'Hazard volume, risk mix and outstanding actions by zone.',
  meta: 'Week 32 · 04–10 Aug 2026',
  icon: FileBarChartIcon
},
{
  title: 'Monthly Safety Performance',
  description: 'Resolution times, verification rate and recurring hazard themes.',
  meta: 'July 2026 · published',
  icon: CalendarDaysIcon
}];


export function SafetyReports() {
  const { showToast } = useApp();
  const [from, setFrom] = useState('2026-08-01');
  const [to, setTo] = useState('2026-08-10');

  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader
        title="Safety Reports"
        subtitle="Generate and export safety performance reports." />
      

      <Card className="mb-5 p-5">
        <div className="flex items-center gap-2 pb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
          <SlidersHorizontalIcon className="h-3.5 w-3.5" />
          Report filters
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <div>
            <Label htmlFor="from">Date from</Label>
            <Input
              id="from"
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)} />
            
          </div>
          <div>
            <Label htmlFor="to">Date to</Label>
            <Input
              id="to"
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)} />
            
          </div>
          <div>
            <Label htmlFor="location">Location</Label>
            <Select id="location">
              <option>All locations</option>
              {locationRecords.map((location) =>
              <option key={location.id}>{location.name}</option>
              )}
            </Select>
          </div>
          <div>
            <Label htmlFor="category">Hazard category</Label>
            <Select id="category">
              {[
              'All categories',
              'Slip / Trip',
              'Chemical',
              'Electrical',
              'Fire / Emergency',
              'Machinery',
              'Housekeeping'].
              map((option) =>
              <option key={option}>{option}</option>
              )}
            </Select>
          </div>
          <div>
            <Label htmlFor="risk">Risk level</Label>
            <Select id="risk">
              {['All levels', 'Low', 'Moderate', 'High', 'Critical'].map((option) =>
              <option key={option}>{option}</option>
              )}
            </Select>
          </div>
        </div>
      </Card>

      <div className="grid gap-5 lg:grid-cols-3">
        {REPORTS.map((report) =>
        <Card key={report.title} className="flex flex-col p-5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <report.icon className="h-5 w-5" />
            </span>
            <h2 className="mt-3 text-base font-semibold text-slate-900">
              {report.title}
            </h2>
            <p className="mt-1 flex-1 text-sm text-slate-600">{report.description}</p>
            <p className="mt-3 text-xs text-slate-500">{report.meta}</p>
            <div className="mt-4 flex gap-2">
              <Button
              className="flex-1"
              onClick={() => showToast(`${report.title} generated.`)}>
              
                Generate Report
              </Button>
              <Button
              variant="secondary"
              aria-label={`Export ${report.title} as PDF`}
              onClick={() => showToast(`${report.title} exported as PDF.`)}>
              
                <DownloadIcon className="h-4 w-4" />
                PDF
              </Button>
            </div>
          </Card>
        )}
      </div>

      <Card className="mt-5">
        <CardHeader title="Recently generated" />
        <ul className="divide-y divide-slate-100">
          {[
          'Daily Safety Summary · 09 Aug 2026',
          'Weekly Hazard Report · Week 31',
          'Monthly Safety Performance · July 2026'].
          map((item) =>
          <li key={item} className="flex items-center gap-3 px-5 py-3.5">
              <FileTextIcon className="h-4 w-4 text-slate-400" />
              <span className="flex-1 text-sm text-slate-700">{item}</span>
              <button
              type="button"
              onClick={() => showToast('Report downloaded.')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700">
              
                Download
              </button>
            </li>
          )}
        </ul>
      </Card>
    </div>);

}