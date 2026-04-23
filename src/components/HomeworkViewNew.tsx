import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

export function HomeworkViewNew({ onComplete }: { onComplete: () => void }) {
  return (
    <div className="flex flex-col h-full bg-bento-purple/10 -m-4 sm:-m-8 p-4 sm:p-8 overflow-y-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl sm:text-5xl font-black uppercase text-bento-purple tracking-tighter">Homework 📝</h2>
      </div>

      <div className="bento-box bg-white max-w-4xl mx-auto w-full mb-8 relative p-12 bg-opacity-95 text-center flex flex-col items-center min-h-[400px] justify-center">
         <h3 className="text-6xl md:text-8xl font-black mb-4 uppercase tracking-wider text-gray-900 border-b-8 border-gray-900 pb-4">Opposites</h3>
         <h4 className="text-3xl md:text-5xl font-bold mb-8 text-bento-purple uppercase tracking-widest">Crossword Puzzle</h4>
         <p className="text-2xl font-medium text-gray-500 mt-8">Fill the crossword with the opposites of the adjectives below.</p>
      </div>

      <div className="flex justify-center mt-auto pt-8">
        <button
          onClick={onComplete}
          className="bento-button bg-black text-white px-8 py-4 text-xl flex items-center gap-2 hover:scale-105 transition-transform"
        >
          <CheckCircle2 className="w-6 h-6" />
          I got my homework! Finish
        </button>
      </div>
    </div>
  );
}
