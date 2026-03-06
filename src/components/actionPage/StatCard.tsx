import React from "react";

interface StatCardProps {
  icon: React.ReactNode; // Changed to ReactNode to accept SVGs, components, OR strings
  label: string;
  value: string | number;
  className?: string; // Added to allow layout overrides from the parent component
}

export default function StatCard({ icon, label, value, className = "" }: StatCardProps) {
  return (
    <article 
      className={`bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center space-x-4 transition-shadow hover:shadow-md ${className}`}
    >
      {/* aria-hidden ensures screen readers skip decorative icons */}
      <div 
        className="bg-emerald-100 p-3 rounded-full flex items-center justify-center shrink-0"
        aria-hidden="true"
      >
        <span className="text-2xl leading-none flex items-center justify-center">
          {icon}
        </span>
      </div>
      
      <div className="flex-grow">
        {/* Changed to an h4 for slightly better document semantics, though <p> is also fine */}
        <h4 className="text-emerald-600 text-sm font-medium">{label}</h4>
        <p className="text-2xl font-bold text-emerald-800 tracking-tight">
          {/* Automatically format large numbers with commas */}
          {typeof value === 'number' ? value.toLocaleString() : value}
        </p>
      </div>
    </article>
  );
}