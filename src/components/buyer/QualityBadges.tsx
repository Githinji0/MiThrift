'use client';

import React from 'react';
import { SearchCheck, Sparkles, Camera, Store, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/MotionWrapper';

export const QualityBadges: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Source',
      description: 'We acquire pre-loved student essentials directly.',
      icon: Store,
    },
    {
      step: '02',
      title: 'Inspect',
      description: 'Rigorous testing of condition, buttons & functionality.',
      icon: SearchCheck,
    },
    {
      step: '03',
      title: 'Prepare',
      description: 'Deep cleaning, sanitization & high-res photography.',
      icon: Camera,
    },
    {
      step: '04',
      title: 'Curate',
      description: 'Only verified 1-of-1 quality items reach the drops.',
      icon: Sparkles,
    },
    {
      step: '05',
      title: 'Campus Pickup',
      description: 'Simple reservation with convenient campus gates pickup.',
      icon: MapPin,
    },
  ];

  return (
    <FadeIn className="my-12 py-10 px-6 bg-sandstone rounded-[2.5rem] shadow-subtle relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center mb-10">
        <span className="text-xs font-extrabold uppercase tracking-widest text-olive bg-olive/10 px-3.5 py-1.5 rounded-full">
          Quality Guaranteed
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-charcoal font-heading mt-3">
          We check it before you get it.
        </h2>
        <p className="text-sm text-muted-clay max-w-xl mx-auto mt-2">
          MiThrift is a curated campus store — not an unverified marketplace. Every single item goes through our 5-step quality pipeline.
        </p>
      </div>

      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {steps.map((s) => {
          const IconComponent = s.icon;
          return (
            <StaggerItem key={s.step}>
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="bg-canvas p-5 rounded-2xl flex flex-col justify-between shadow-subtle hover:shadow-card transition-all h-full"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-olive bg-sage-light px-2 py-0.5 rounded">
                      {s.step}
                    </span>
                    <IconComponent className="w-5 h-5 text-olive" />
                  </div>
                  <h3 className="text-base font-bold text-charcoal font-heading mb-1">
                    {s.title}
                  </h3>
                  <p className="text-xs text-muted-clay leading-relaxed">{s.description}</p>
                </div>
              </motion.div>
            </StaggerItem>
          );
        })}
      </StaggerContainer>
    </FadeIn>
  );
};
