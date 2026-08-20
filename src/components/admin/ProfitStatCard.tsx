import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ProfitStatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  trend?: string;
  bgHex?: string;
}

export const ProfitStatCard: React.FC<ProfitStatCardProps> = ({
  title,
  value,
  subtitle,
  icon: IconComponent,
}) => {
  return (
    <div className="bg-canvas p-5 rounded-2xl border border-oatmeal shadow-subtle flex flex-col justify-between">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold text-muted-clay uppercase tracking-wider">
          {title}
        </span>
        <div className="p-2 rounded-xl bg-sage-light text-olive">
          <IconComponent className="w-4 h-4" />
        </div>
      </div>

      <div>
        <div className="text-2xl font-extrabold text-charcoal font-heading leading-none">
          {value}
        </div>
        {subtitle && <p className="text-xs text-muted-clay mt-1.5">{subtitle}</p>}
      </div>
    </div>
  );
};
