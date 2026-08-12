import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { SearchIcon, SlidersHorizontalIcon } from 'lucide-react';
import { PageHeader } from '../../components/PageHeader';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Input, Select } from '../../components/ui/Field';
import { useApp } from '../../contexts/AppContext';
import { hazardStatusClass, riskBadgeClass } from '../../utils/risk';

const ALL = 'All';

export function HazardReports() {
  const { hazards } = useApp();
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState(ALL);
  const [risk, setRisk] = useState(ALL);
  const [category, setCategory] = useState(ALL);
  const [location, setLocation] = useState(ALL);
  const [date, setDate] = useState('');

  const filtered = useMemo(
    () =>
    hazards.filter((h) => {
      const matchesQuery =
      !query ||
      h.title.toLowerCase().includes(query.toLowerCase()) ||
      h.id.toLowerCase().includes(query.toLowerCase());
      return (
        matchesQuery && (
        status === ALL || h.status === status) && (
        risk === ALL || h.ai.riskLevel === risk) && (
        category === ALL || h.category === category) && (
        location === ALL || h.location === location));

    }),
    [hazards, query, status, risk, category, location]
  );

  const locations = Array.from(new Set(hazards.map((h) => h.location)));
  const categories = Array.from(new Set(hazards.map((h) => h.category)));

  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader
        title="Hazard Reports"
        subtitle={`${filtered.length} of ${hazards.length} reports shown`} />
      

      <Card className="mb-5 p-4">
        <div className="flex items-center gap-2 pb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
          <SlidersHorizontalIcon className="h-3.5 w-3.5" />
          Filters
        </div>
        <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-6">
          <div className="relative md:col-span-3 xl:col-span-1">
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              className="pl-9"
              placeholder="Search hazard"
              aria-label="Search hazard"
              value={query}
              onChange={(e) => setQuery(e.target.value)} />
            
          </div>
          <Select
            aria-label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}>
            
            {[ALL, 'Submitted', 'Under Review', 'Action Assigned', 'Resolved', 'Verified'].map(
              (option) =>
              <option key={option}>{option}</option>

            )}
          </Select>
          <Select
            aria-label="Risk level"
            value={risk}
            onChange={(e) => setRisk(e.target.value)}>
            
            {[ALL, 'Low', 'Moderate', 'High', 'Critical'].map((option) =>
            <option key={option}>{option}</option>
            )}
          </Select>
          <Select
            aria-label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}>
            
            {[ALL, ...categories].map((option) =>
            <option key={option}>{option}</option>
            )}
          </Select>
          <Select
            aria-label="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}>
            
            {[ALL, ...locations].map((option) =>
            <option key={option}>{option}</option>
            )}
          </Select>
          <Input
            type="date"
            aria-label="Date"
            value={date}
            onChange={(e) => setDate(e.target.value)} />
          
        </div>
      </Card>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-500">
                {[
                'Report ID',
                'Hazard',
                'Location',
                'Category',
                'AI Confidence',
                'Risk Score',
                'Risk Level',
                'Status',
                'Submitted',
                'Action'].
                map((heading) =>
                <th key={heading} className="whitespace-nowrap px-5 py-3 font-semibold">
                    {heading}
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((hazard) =>
              <tr key={hazard.id} className="hover:bg-slate-50">
                  <td className="px-5 py-3.5 font-semibold text-slate-500">
                    {hazard.id}
                  </td>
                  <td className="max-w-[240px] truncate px-5 py-3.5 font-medium text-slate-900">
                    {hazard.title}
                  </td>
                  <td className="whitespace-nowrap px-5 py-3.5 text-slate-600">
                    {hazard.location}
                  </td>
                  <td className="whitespace-nowrap px-5 py-3.5 text-slate-600">
                    {hazard.category}
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-14 overflow-hidden rounded-full bg-slate-100">
                        <span
                        className="block h-full rounded-full bg-green-500"
                        style={{ width: `${hazard.ai.confidence}%` }} />
                      
                      </span>
                      <span className="text-xs font-semibold text-slate-700">
                        {hazard.ai.confidence}%
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 font-semibold text-slate-900">
                    {hazard.ai.riskScore}
                  </td>
                  <td className="px-5 py-3.5">
                    <Badge className={riskBadgeClass(hazard.ai.riskLevel)}>
                      {hazard.ai.riskLevel}
                    </Badge>
                  </td>
                  <td className="px-5 py-3.5">
                    <Badge className={hazardStatusClass(hazard.status)} dot>
                      {hazard.status}
                    </Badge>
                  </td>
                  <td className="whitespace-nowrap px-5 py-3.5 text-xs text-slate-500">
                    {hazard.submittedAt}
                  </td>
                  <td className="whitespace-nowrap px-5 py-3.5">
                    <Link
                    to={`/manager/hazards/${hazard.id}`}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700">
                    
                      View Details
                    </Link>
                  </td>
                </tr>
              )}
              {filtered.length === 0 &&
              <tr>
                  <td colSpan={10} className="px-5 py-10 text-center text-sm text-slate-500">
                    No hazards match the current filters.
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </Card>
    </div>);

}