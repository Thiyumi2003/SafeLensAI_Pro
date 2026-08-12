import React from 'react';

export function Badge({
  children,
  className = '',
  dot = false




}: {children: React.ReactNode;className?: string;dot?: boolean;}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${className}`}>
      
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
      {children}
    </span>);

}