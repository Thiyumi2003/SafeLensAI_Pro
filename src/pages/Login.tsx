import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ActivityIcon,
  ArrowRightIcon,
  BrainCircuitIcon,
  HardHatIcon,
  MapPinnedIcon,
  ShieldCheckIcon,
  UserCogIcon,
  UsersIcon } from
'lucide-react';
import { Logo } from '../components/layout/Logo';
import { Button, Input, Label } from '../components/ui/Field';
import { useApp } from '../contexts/AppContext';
import type { Role } from '../types';

const ROLES: {
  key: Role;
  label: string;
  email: string;
  icon: React.ComponentType<{className?: string;}>;
  blurb: string;
  to: string;
}[] = [
{
  key: 'employee',
  label: 'Employee',
  email: 'employee104@safelens.ai',
  icon: HardHatIcon,
  blurb: 'Report hazards, resolve assigned actions',
  to: '/employee'
},
{
  key: 'manager',
  label: 'Manager',
  email: 'manager@safelens.ai',
  icon: ShieldCheckIcon,
  blurb: 'Review AI analysis, assign & verify actions',
  to: '/manager'
},
{
  key: 'admin',
  label: 'Administrator',
  email: 'admin@safelens.ai',
  icon: UserCogIcon,
  blurb: 'Manage users, locations and QR codes',
  to: '/admin/users'
}];


const HIGHLIGHTS = [
{ icon: BrainCircuitIcon, text: 'AI hazard classification with confidence scoring' },
{ icon: ActivityIcon, text: 'Automated risk scoring across severity & likelihood' },
{ icon: MapPinnedIcon, text: 'Live workplace safety heatmap and hotspots' },
{ icon: UsersIcon, text: 'Corrective actions with manager verification' }];


export function Login() {
  const navigate = useNavigate();
  const { login } = useApp();
  const [role, setRole] = useState<Role>('employee');
  const selected = ROLES.find((r) => r.key === role)!;
  const [password, setPassword] = useState('demo1234');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    login(role);
    navigate(selected.to);
  };

  return (
    <div className="flex min-h-full w-full flex-col bg-white lg:flex-row">
      <div className="relative hidden flex-1 flex-col justify-between bg-slate-900 p-12 lg:flex">
        <Logo inverted />
        <div className="max-w-md">
          <h1 className="text-4xl font-bold leading-tight text-white">
            Move from reactive reporting to proactive prevention.
          </h1>
          <p className="mt-4 text-base text-slate-300">
            SafeLens AI analyses every hazard report, scores the risk, and keeps
            corrective actions moving until a manager verifies the fix.
          </p>
          <ul className="mt-8 space-y-3">
            {HIGHLIGHTS.map((item) =>
            <li key={item.text} className="flex items-center gap-3 text-sm text-slate-300">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-blue-300">
                  <item.icon className="h-4 w-4" />
                </span>
                {item.text}
              </li>
            )}
          </ul>
        </div>
        <div className="flex gap-8 border-t border-white/10 pt-6">
          {[
          { value: '128', label: 'Hazards analysed' },
          { value: '94%', label: 'Avg AI confidence' },
          { value: '34 hrs', label: 'Avg resolution time' }].
          map((stat) =>
          <div key={stat.label}>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-slate-400">{stat.label}</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center px-5 py-10 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md">
          
          <div className="lg:hidden">
            <Logo size="lg" />
          </div>
          <h2 className="mt-8 text-2xl font-bold text-slate-900 lg:mt-0">
            Sign in to SafeLens AI
          </h2>
          <p className="mt-1.5 text-sm text-slate-500">
            AI-Powered Workplace Safety Intelligence
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={selected.email}
                onChange={() => undefined}
                readOnly
                autoComplete="email" />
              
            </div>
            <div>
              <Label htmlFor="password" hint="Demo credentials pre-filled">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password" />
              
            </div>

            <fieldset>
              <legend className="mb-2 text-xs font-semibold text-slate-700">
                Demo role
              </legend>
              <div className="space-y-2">
                {ROLES.map((item) => {
                  const active = item.key === role;
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => setRole(item.key)}
                      aria-pressed={active}
                      className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition ${
                      active ?
                      'border-blue-500 bg-blue-50/60 ring-2 ring-blue-500/15' :
                      'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'}`
                      }>
                      
                      <span
                        className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                        active ?
                        'bg-blue-600 text-white' :
                        'bg-slate-100 text-slate-500'}`
                        }>
                        
                        <item.icon className="h-4 w-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold text-slate-900">
                          {item.label}
                        </span>
                        <span className="block truncate text-xs text-slate-500">
                          {item.blurb}
                        </span>
                      </span>
                      <span
                        className={`h-4 w-4 rounded-full border-2 ${
                        active ?
                        'border-blue-600 bg-blue-600 ring-2 ring-inset ring-white' :
                        'border-slate-300'}`
                        } />
                      
                    </button>);

                })}
              </div>
            </fieldset>

            <Button type="submit" className="w-full">
              Sign In
              <ArrowRightIcon className="h-4 w-4" />
            </Button>
            <p className="text-center text-xs text-slate-400">
              Prototype environment · no real credentials required
            </p>
          </form>
        </motion.div>
      </div>
    </div>);

}