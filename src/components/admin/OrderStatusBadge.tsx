import React from 'react';
import { OrderStatus } from '@/types';

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

export const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({ status }) => {
  let badgeStyle = 'bg-amber-100 text-amber-900 border-amber-300';

  if (status === 'CONFIRMED') {
    badgeStyle = 'bg-blue-100 text-blue-900 border-blue-300';
  } else if (status === 'READY_FOR_PICKUP') {
    badgeStyle = 'bg-indigo-100 text-indigo-900 border-indigo-300 animate-pulse';
  } else if (status === 'COMPLETED') {
    badgeStyle = 'bg-emerald-100 text-emerald-900 border-emerald-300';
  } else if (status === 'CANCELLED' || status === 'EXPIRED') {
    badgeStyle = 'bg-rose-100 text-rose-900 border-rose-300';
  }

  return (
    <span
      className={`inline-flex items-center text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full border ${badgeStyle}`}
    >
      {status.replace(/_/g, ' ')}
    </span>
  );
};
