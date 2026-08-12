import React from 'react';

const baseInput =
'w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20';

export function Label({
  htmlFor,
  children,
  hint




}: {htmlFor?: string;children: React.ReactNode;hint?: string;}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 flex items-center justify-between text-xs font-semibold text-slate-700">
      
      <span>{children}</span>
      {hint && <span className="font-normal text-slate-400">{hint}</span>}
    </label>);

}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const { className = '', ...rest } = props;
  return <input {...rest} className={`${baseInput} ${className}`} />;
}

export function Textarea(
props: React.TextareaHTMLAttributes<HTMLTextAreaElement>)
{
  const { className = '', ...rest } = props;
  return <textarea {...rest} className={`${baseInput} ${className}`} />;
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  const { className = '', children, ...rest } = props;
  return (
    <select {...rest} className={`${baseInput} ${className}`}>
      {children}
    </select>);

}

export function Button({
  variant = 'primary',
  className = '',
  children,
  ...rest


}: React.ButtonHTMLAttributes<HTMLButtonElement> & {variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';}) {
  const variants: Record<string, string> = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-600/30',
    secondary:
    'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 focus-visible:ring-slate-400/30',
    ghost: 'text-slate-600 hover:bg-slate-100 focus-visible:ring-slate-400/30',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600/30',
    success:
    'bg-green-600 text-white hover:bg-green-700 focus-visible:ring-green-600/30'
  };
  return (
    <button
      {...rest}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition focus:outline-none focus-visible:ring-4 disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}>
      
      {children}
    </button>);

}