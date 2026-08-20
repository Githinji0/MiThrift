import React from 'react';
import { CONDITION_GRADES } from '@/lib/constants';
import { ConditionGrade, ProductStatus } from '@/types';
import { cn } from '@/lib/utils';

interface ConditionBadgeProps {
  grade: ConditionGrade;
  size?: 'sm' | 'md';
}

export const ConditionBadge: React.FC<ConditionBadgeProps> = ({ grade, size = 'sm' }) => {
  const config = CONDITION_GRADES[grade] || CONDITION_GRADES['Good'];
  return (
    <span
      className={cn(
        'inline-flex items-center font-bold rounded-full px-2.5 py-0.5 shadow-subtle',
        config.badgeBg.replace(/border[^\s]*/g, ''),
        size === 'sm' ? 'text-[11px]' : 'text-xs'
      )}
    >
      {grade}
    </span>
  );
};

interface StatusBadgeProps {
  status: ProductStatus;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'sm' }) => {
  let badgeStyle = 'bg-emerald-100 text-emerald-800';
  let label = 'AVAILABLE';

  if (status === 'RESERVED') {
    badgeStyle = 'bg-amber-100 text-amber-800';
    label = 'RESERVED';
  } else if (status === 'SOLD') {
    badgeStyle = 'bg-stone-200 text-stone-700';
    label = 'SOLD OUT';
  }

  return (
    <span
      className={cn(
        'inline-flex items-center font-extrabold tracking-wider rounded-lg uppercase px-2 py-0.5 shadow-subtle',
        badgeStyle,
        size === 'sm' ? 'text-[10px]' : 'text-xs'
      )}
    >
      {label}
    </span>
  );
};
