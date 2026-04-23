import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2 } from 'lucide-react';
import { playAudio, cn } from '../lib/utils';
import confetti from 'canvas-confetti';

const wordsList = [
  { word: 'Neat', emoji: '✨', transcription: '/niːt/', translation: 'ұқыпты, таза' },
  { word: 'Sloppy', emoji: '🌪️', transcription: '/ˈslɒpi/', translation: 'ұқыпсыз, салақ' },
  { word: 'Quiet', emoji: '🤫', transcription: '/ˈkwaɪət/', translation: 'тыныш' },
  { word: 'Noisy', emoji: '🔊', transcription: '/ˈnɔɪzi/', translation: 'шулы' },
  { word: 'Stripe', emoji: '🦓', transcription: '/straɪp/', translation: 'жолақ' },
  { word: 'Habit', emoji: '🔁', transcription: '/ˈhæbɪt/', translation: 'әдет' },
  { word: 'Again', emoji: '🔄', transcription: '/əˈɡen/', translation: 'қайтадан' },
  { word: 'Never', emoji: '❌', transcription: '/ˈnevə/', translation: 'ешқашан' }
];

export function NewWords({ onComplete }: { onComplete: () => void }) {
  const [viewedCount, setViewedCount] = React.useState(0);
  const [viewedCards, setViewedCards] = React.useState<Record<number, boolean>>({});

  const handleHearWord = (index: number, word: string) => {
    playAudio(word);
    if (!viewedCards[index]) {
      setViewedCards(prev => ({ ...prev, [index]: true }));
      setViewedCount(prev => {
        const next = prev + 1;
        if (next === wordsList.length) {
          confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        }
        return next;
      });
    }
  };

  return (
    <div className="flex flex-col items-center max-w-4xl w-full mx-auto p-4">
      <h2 className="text-4xl font-black uppercase tracking-tighter text-center text-black mb-8 border-b-4 border-black pb-2 inline-block">
        New words
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full mb-10 max-w-3xl">
        {wordsList.map((item, idx) => (
          <motion.div 
            key={idx} 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className={cn(
              "bento-box p-3 flex justify-between items-center transition-colors duration-300 gap-3",
              viewedCards[idx] ? "bg-bento-green" : "bg-bento-blue"
            )}
          >
            <div className="flex flex-col flex-1 bg-white border-2 border-black rounded-xl p-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-left">
              <span className="text-xl font-black uppercase tracking-tight">{item.word} {item.emoji}</span>
              <span className="text-xs font-mono text-gray-500 font-bold tracking-wider">{item.transcription}</span>
              <span className="text-sm font-bold mt-1 text-bento-red bg-bento-yellow/30 px-2 py-0.5 rounded inline-block self-start leading-tight">{item.translation}</span>
            </div>
            
            <button 
              onClick={() => handleHearWord(idx, item.word)}
              className="w-12 h-12 shrink-0 bg-white text-black rounded-full border-2 border-black flex items-center justify-center hover:bg-black hover:text-white active:scale-95 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            >
              <Volume2 size={20} />
            </button>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {viewedCount >= wordsList.length && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex flex-col items-center bento-box bg-white p-8 border-dashed"
          >
            <p className="text-2xl font-black uppercase tracking-tighter mb-6 bg-bento-green px-4 py-1 border-2 border-black rounded-xl transform -rotate-2">You learned them all!</p>
            <button 
              onClick={onComplete}
              className="bento-button px-8 py-4 bg-bento-yellow text-black text-2xl"
            >
              Play Matching Game 🎮
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
