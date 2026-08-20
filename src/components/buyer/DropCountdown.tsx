'use client';

import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

interface DropCountdownProps {
  targetDate: string; // ISO date string or YYYY-MM-DD
  targetTime: string; // e.g. "18:00"
}

export const DropCountdown: React.FC<DropCountdownProps> = ({ targetDate, targetTime }) => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isLive: boolean;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0, isLive: false });

  useEffect(() => {
    const calculateTimeLeft = () => {
      try {
        const targetDateTime = new Date(`${targetDate}T${targetTime}:00`);
        const now = new Date();
        const difference = targetDateTime.getTime() - now.getTime();

        if (difference <= 0) {
          setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isLive: true });
          return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({ days, hours, minutes, seconds, isLive: false });
      } catch {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isLive: false });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate, targetTime]);

  if (timeLeft.isLive) {
    return (
      <div className="inline-flex items-center gap-2 bg-emerald-600 text-[#FAF9F5] text-xs font-extrabold px-4 py-2 rounded-full shadow-sm animate-pulse">
        <span className="w-2 h-2 rounded-full bg-[#FAF9F5]" />
        <span>DROP IS LIVE NOW</span>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-2.5 bg-[#1F201D] text-[#FAF9F5] px-4 py-2 rounded-full shadow-subtle">
      <Clock className="w-4 h-4 text-amber-400 shrink-0" />
      <div className="flex items-center gap-1.5 text-xs font-mono font-bold tracking-wider">
        <div className="bg-[#FAF9F5]/10 px-2 py-0.5 rounded-lg flex flex-col items-center">
          <span>{String(timeLeft.days).padStart(2, '0')}</span>
          <span className="text-[8px] text-[#6E6D68] uppercase font-sans">d</span>
        </div>
        <span className="text-[#6E6D68]">:</span>
        <div className="bg-[#FAF9F5]/10 px-2 py-0.5 rounded-lg flex flex-col items-center">
          <span>{String(timeLeft.hours).padStart(2, '0')}</span>
          <span className="text-[8px] text-[#6E6D68] uppercase font-sans">h</span>
        </div>
        <span className="text-[#6E6D68]">:</span>
        <div className="bg-[#FAF9F5]/10 px-2 py-0.5 rounded-lg flex flex-col items-center">
          <span>{String(timeLeft.minutes).padStart(2, '0')}</span>
          <span className="text-[8px] text-[#6E6D68] uppercase font-sans">m</span>
        </div>
        <span className="text-[#6E6D68]">:</span>
        <div className="bg-[#FAF9F5]/10 px-2 py-0.5 rounded-lg flex flex-col items-center">
          <span className="text-amber-400">{String(timeLeft.seconds).padStart(2, '0')}</span>
          <span className="text-[8px] text-amber-400/80 uppercase font-sans">s</span>
        </div>
      </div>
    </div>
  );
};
