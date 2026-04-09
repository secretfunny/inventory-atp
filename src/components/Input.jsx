import React from 'react';

export function Input({ label, type = 'text', icon: Icon, rightAction, ...props }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide">
          {label}
        </label>
        {rightAction && rightAction}
      </div>
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-slate-400" />
          </div>
        )}
        <input
          type={type}
          className={`block w-full rounded-md border-0 py-2.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-brand-dark sm:text-sm sm:leading-6 bg-slate-100/50 ${
            Icon ? 'pl-10' : 'pl-3'
          }`}
          {...props}
        />
      </div>
    </div>
  );
}
