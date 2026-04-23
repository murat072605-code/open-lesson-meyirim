import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';

const twisters = [
  "Sloppy, happy, noisy, bad, happy, sloppy, noisy, sad.",
  "Good books, bad pens, bad pens, good books.",
  "There are six sad, sloppy sisters in the zoo with zebra.",
  "There are ten good black pens on the noisy boys' tables."
];

export function TongueTwistersView({ onComplete }: { onComplete: () => void }) {
  const badgeColors = [
    "bg-bento-yellow text-black", 
    "bg-bento-blue text-white", 
    "bg-bento-red text-white", 
    "bg-bento-green text-black"
  ];

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto p-4 relative pt-12 md:pt-4">
      <div className="absolute top-0 right-2 md:top-4 md:right-6 bg-bento-yellow text-black text-xl md:text-2xl font-black px-4 md:px-6 py-2 rounded-2xl border-4 border-black z-10 uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform rotate-3">
        3 points <span className="text-2xl md:text-3xl relative top-1">⭐</span>
      </div>

      <div className="mb-8 self-start pl-4 flex flex-col items-start gap-1">
        <h2 className="text-3xl font-black uppercase text-black bg-bento-yellow px-4 py-1 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">Task 3</h2>
        <h3 className="text-4xl md:text-5xl font-black uppercase mb-1">Tongue-twisters 👅</h3>
      </div>

      <div className="flex flex-col gap-6 w-full">
        {twisters.map((twister, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.15 }}
            className="bento-box bg-white p-6 md:p-8 flex items-center gap-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all cursor-crosshair"
          >
            <div className={cn(
              "w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-3xl md:text-4xl font-black shrink-0 border-4 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
              badgeColors[idx % badgeColors.length]
            )}>
                {idx + 1}
            </div>
            <p className="text-2xl md:text-3xl font-bold leading-tight">
              {twister}
            </p>
          </motion.div>
        ))}
      </div>

      <button 
        onClick={onComplete}
        className="bento-button mt-10 px-8 py-5 bg-bento-green text-black text-2xl flex items-center gap-3 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-[6px] active:translate-x-[6px]"
      >
        <CheckCircle2 size={32} />
        Done! Next Activity ➡️
      </button>
    </div>
  );
}
