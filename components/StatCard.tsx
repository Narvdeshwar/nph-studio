import React from 'react';

export function StatCard({ 
  title, 
  icon, 
  value, 
  description, 
  iconColorClass 
}: { 
  title: string, 
  icon: React.ReactNode, 
  value: number | string, 
  description: string, 
  iconColorClass: string 
}) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-slate-400 font-medium">{title}</h3>
        <div className={`p-2 bg-slate-800 rounded-lg ${iconColorClass}`}>
          {icon}
        </div>
      </div>
      <p className="text-4xl font-bold">{value}</p>
      <p className="text-sm text-slate-500 mt-2">{description}</p>
    </div>
  );
}
