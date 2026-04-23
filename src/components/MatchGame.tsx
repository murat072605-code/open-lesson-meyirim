import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { playAudio, cn } from '../lib/utils';
import confetti from 'canvas-confetti';

const wordPairs = [
  { id: 1, word: 'Happy 😄', expectedMatchId: 1, side: 'left' },
  { id: 2, word: 'Good 👍', expectedMatchId: 2, side: 'left' },
  { id: 3, word: 'Noisy 🔊', expectedMatchId: 3, side: 'left' },
  { id: 4, word: 'Neat ✨', expectedMatchId: 4, side: 'left' },
  { id: 5, word: 'Big 🐘', expectedMatchId: 5, side: 'left' },
  { id: 6, word: 'Fast 🚀', expectedMatchId: 6, side: 'left' },
  { id: 7, word: 'Serious 😐', expectedMatchId: 7, side: 'left' },
  { id: 8, word: 'Hot 🔥', expectedMatchId: 8, side: 'left' },
  { id: 9, word: 'Tall 🦒', expectedMatchId: 9, side: 'left' },
  { id: 10, word: 'Young 🧒', expectedMatchId: 10, side: 'left' },
  { id: 11, word: 'Clean 🧼', expectedMatchId: 11, side: 'left' },
  { id: 12, word: 'Easy 🟢', expectedMatchId: 12, side: 'left' }
];

const oppositeWords = [
  // Round 1 matches (IDs 1-6)
  { id: 6, word: 'Slow 🐢', expectedMatchId: 6, side: 'right' },
  { id: 2, word: 'Bad 👎', expectedMatchId: 2, side: 'right' },
  { id: 4, word: 'Sloppy 🗑️', expectedMatchId: 4, side: 'right' },
  { id: 1, word: 'Sad 😢', expectedMatchId: 1, side: 'right' },
  { id: 3, word: 'Quiet 🤫', expectedMatchId: 3, side: 'right' },
  { id: 5, word: 'Small 🐁', expectedMatchId: 5, side: 'right' },
  // Round 2 matches (IDs 7-12)
  { id: 8, word: 'Cold ❄️', expectedMatchId: 8, side: 'right' },
  { id: 11, word: 'Dirty 💩', expectedMatchId: 11, side: 'right' },
  { id: 9, word: 'Short 🐜', expectedMatchId: 9, side: 'right' },
  { id: 10, word: 'Old 👴', expectedMatchId: 10, side: 'right' },
  { id: 12, word: 'Difficult 🔴', expectedMatchId: 12, side: 'right' },
  { id: 7, word: 'Funny 🤣', expectedMatchId: 7, side: 'right' }
];

export function MatchGame({ onComplete, onEarnPoints }: { onComplete: () => void, onEarnPoints: (pt: number) => void }) {
  const [round, setRound] = React.useState(0);
  const [selectedLeft, setSelectedLeft] = React.useState<number | null>(null);
  const [selectedRight, setSelectedRight] = React.useState<number | null>(null);
  const [matchedPairs, setMatchedPairs] = React.useState<number[]>([]);
  const [wrongPair, setWrongPair] = React.useState<boolean>(false);
  const [celebration, setCelebration] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (selectedLeft !== null && selectedRight !== null) {
      const leftItem = wordPairs.find(w => w.id === selectedLeft);
      const rightItem = oppositeWords.find(w => w.id === selectedRight);

      if (leftItem?.expectedMatchId === rightItem?.expectedMatchId) {
        // Match!
        playAudio("Correct!");
        setMatchedPairs(prev => [...prev, leftItem!.expectedMatchId]);
        onEarnPoints(2);
        setSelectedLeft(null);
        setSelectedRight(null);
        setCelebration(true);
        setTimeout(() => setCelebration(false), 1500);

        
        if (matchedPairs.length + 1 === wordPairs.length) {
          confetti({ particleCount: 150, zIndex: 9999 });
        } else if ((matchedPairs.length + 1) === (round + 1) * 6) {
          confetti({ particleCount: 100, zIndex: 9999 });
        }
      } else {
        // Wrong!
        playAudio("Oops, try again!");
        setWrongPair(true);
        setTimeout(() => {
          setSelectedLeft(null);
          setSelectedRight(null);
          setWrongPair(false);
        }, 800);
      }
    }
  }, [selectedLeft, selectedRight]);

  const handleSelect = (id: number, side: 'left' | 'right') => {
    if (side === 'left') setSelectedLeft(id);
    if (side === 'right') setSelectedRight(id);
    playAudio(side === 'left' ? wordPairs.find(w => w.id === id)?.word || '' : oppositeWords.find(w => w.id === id)?.word || '');
  };

  const currentWordPairs = wordPairs.slice(round * 6, (round + 1) * 6);
  const currentOppositeWords = oppositeWords.slice(round * 6, (round + 1) * 6);

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto p-4">
      <div className="bg-bento-blue px-6 py-2 rounded-2xl border-4 border-black mb-6 transform -rotate-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:rotate-1 transition-transform">
        <h2 className="text-3xl font-black uppercase tracking-tighter text-white">Task 1 🧩</h2>
      </div>
      <p className="text-xl text-black mb-8 text-center font-bold bg-white px-4 py-2 border-2 border-black rounded-lg">Click a word on the left, then click its opposite on the right!</p>

      <div className="flex w-full justify-between sm:justify-center sm:gap-16 mb-12 relative px-4">
        {/* Left Column */}
        <div className="flex flex-col gap-2 sm:gap-4 w-1/2 sm:w-auto pr-2 sm:pr-0">
          {currentWordPairs.map((item) => {
            const isMatched = matchedPairs.includes(item.expectedMatchId);
            const isSelected = selectedLeft === item.id;
            return (
              <motion.button
                key={`l-${item.id}`}
                onClick={() => !isMatched && handleSelect(item.id, 'left')}
                whileTap={{ scale: isMatched ? 1 : 0.95 }}
                animate={wrongPair && isSelected ? { x: [-10, 10, -10, 10, 0] } : {}}
                transition={{ duration: 0.4 }}
                className={cn(
                  "bento-button p-2 sm:p-4 text-sm sm:text-lg min-w-[120px]",
                  isMatched ? "bg-bento-green text-black opacity-50 cursor-default shadow-none translate-y-[4px] translate-x-[4px]" :
                  isSelected ? "bg-black text-white" :
                  "bg-white hover:bg-gray-100 text-black"
                )}
                disabled={isMatched}
              >
                {item.word}
              </motion.button>
            )
          })}
        </div>
        
        {/* Right Column */}
        <div className="flex flex-col gap-2 sm:gap-4 w-1/2 sm:w-auto pl-2 sm:pl-0">
          {currentOppositeWords.map((item) => {
            const isMatched = matchedPairs.includes(item.expectedMatchId);
            const isSelected = selectedRight === item.id;
            return (
              <motion.button
                key={`r-${item.id}`}
                onClick={() => !isMatched && handleSelect(item.id, 'right')}
                whileTap={{ scale: isMatched ? 1 : 0.95 }}
                animate={wrongPair && isSelected ? { x: [-10, 10, -10, 10, 0] } : {}}
                transition={{ duration: 0.4 }}
                className={cn(
                   "bento-button p-2 sm:p-4 text-sm sm:text-lg min-w-[120px]",
                  isMatched ? "bg-bento-green text-black opacity-50 cursor-default shadow-none translate-y-[4px] translate-x-[4px]" :
                  isSelected ? "bg-black text-white" :
                  "bg-white hover:bg-gray-100 text-black"
                )}
                disabled={isMatched}
              >
                {item.word}
              </motion.button>
            )
          })}
        </div>
      </div>

      <AnimatePresence>
        {celebration && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: -20, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none"
          >
            <div className="bg-bento-yellow text-black text-4xl sm:text-6xl font-black uppercase px-8 py-4 rounded-3xl border-8 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center transform -rotate-3">
              Excellent! <br/> <span className="text-bento-red">+2 Points</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {matchedPairs.length === (round + 1) * 6 && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mt-8 flex justify-center w-full">
             <button 
              onClick={() => {
                if (round === 0) {
                  setRound(1);
                  setSelectedLeft(null);
                  setSelectedRight(null);
                } else {
                  onComplete();
                }
              }}
              className="bento-button px-8 py-4 bg-bento-yellow text-black text-2xl"
            >
              {round === 0 ? "Next Round ➡️" : "Great Job! Next Activity 🚀"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
