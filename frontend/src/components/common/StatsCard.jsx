import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export const StatsCard = ({ title, value, subtitle, icon: Icon, trend, isPositive = true, color = 'brand' }) => {
  const colorMap = {
    brand: {
      bg: 'bg-brand-50 text-brand-700 border-brand-100',
      iconBg: 'bg-brand-600 text-white',
      trendBg: 'bg-brand-50 text-brand-700'
    },
    lavender: {
      bg: 'bg-purple-50 text-purple-700 border-purple-100',
      iconBg: 'bg-purple-600 text-white',
      trendBg: 'bg-purple-50 text-purple-700'
    },
    emerald: {
      bg: 'bg-emerald-50 text-emerald-700 border-emerald-100',
      iconBg: 'bg-emerald-600 text-white',
      trendBg: 'bg-emerald-50 text-emerald-700'
    },
    amber: {
      bg: 'bg-amber-50 text-amber-700 border-amber-100',
      iconBg: 'bg-amber-600 text-white',
      trendBg: 'bg-amber-50 text-amber-700'
    }
  };

  const scheme = colorMap[color] || colorMap.brand;

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-soft hover:shadow-soft-lg transition-all duration-200 card-hover-effect">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            {title}
          </span>
          <div className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
            {value}
          </div>
        </div>

        <div className={`p-3 rounded-2xl ${scheme.iconBg} shadow-sm shadow-purple-900/10`}>
          {Icon && <Icon className="w-5 h-5" />}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-50 flex items-center justify-between text-xs">
        <span className="text-slate-500 font-medium truncate">{subtitle}</span>

        {trend && (
          <div className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded-full font-semibold ${
            isPositive ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
          }`}>
            {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            <span>{trend}</span>
          </div>
        )}
      </div>
    </div>
  );
};
