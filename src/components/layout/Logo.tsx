import React from 'react';
import { ScanEyeIcon } from 'lucide-react';

export function Logo({
  size = 'md',
  inverted = false



}: {size?: 'md' | 'lg';inverted?: boolean;}) {
  return (
    <div className="flex items-center gap-2.5">
      <span
        className={`flex items-center justify-center rounded-xl bg-blue-600 text-white ${
        size === 'lg' ? 'h-11 w-11' : 'h-9 w-9'}`
        }>
        
        <ScanEyeIcon className={size === 'lg' ? 'h-6 w-6' : 'h-5 w-5'} />
      </span>
      <span className="leading-tight">
        <span
          className={`block font-bold tracking-tight ${
          size === 'lg' ? 'text-xl' : 'text-base'} ${
          inverted ? 'text-white' : 'text-slate-900'}`}>
          
          SafeLens <span className="text-blue-600">AI</span>
        </span>
        <span
          className={`block text-[10px] font-medium uppercase tracking-[0.16em] ${
          inverted ? 'text-slate-400' : 'text-slate-400'}`
          }>
          
          Safety Intelligence
        </span>
      </span>
    </div>);

}