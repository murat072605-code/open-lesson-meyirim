import React from 'react';
import { motion } from 'motion/react';
import { playAudio, cn } from '../lib/utils';
import { PlayCircle } from 'lucide-react';

const poemLines = [
  { text: "I asked the zebra," },
  { text: "Are you black with white stripes?" },
  { text: "Or white with black stripes?" },
  { text: "And the zebra asked me," },
  { text: "Are you good with bad habits?" },
  { prefix: "Or are you bad with ", gapId: 1, gapLabel: "1....", answer: "1 good", suffix: " habits?" },
  { prefix: "Are you noisy with ", gapId: 2, gapLabel: "2...", answer: "2 quiet", suffix: " times?" },
  { prefix: "Or are you quiet with ", gapId: 3, gapLabel: "3...", answer: "3 noisy", suffix: " times?" },
  { prefix: "Are you happy with ", gapId: 4, gapLabel: "4...", answer: "4 sad", suffix: " days?" },
  { prefix: "Or are you sad with ", gapId: 5, gapLabel: "5...", answer: "5 happy", suffix: " days?" },
  { prefix: "Are you neat with some ", gapId: 6, gapLabel: "6...", answer: "6 sloppy", suffix: " ways?" },
  { prefix: "Or are you sloppy with some ", gapId: 7, gapLabel: "'7'...", answer: "7 neat", suffix: " ways?" },
  { text: "And on and on and on and on" },
  { text: "And on and on he went." },
  { text: "I'll never ask a zebra" },
  { text: "About stripes" },
  { text: "Again" },
];

export function PoemView({ onComplete }: { onComplete: () => void }) {
  const [showPlayer, setShowPlayer] = React.useState(false);
  const [revealedGaps, setRevealedGaps] = React.useState<Record<number, boolean>>({});

  const toggleGap = (id: number) => {
    setRevealedGaps(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="flex flex-col items-center w-full max-w-3xl mx-auto p-4 relative">
      <div className="absolute top-4 right-6 bg-bento-yellow text-black text-2xl font-black px-6 py-2 rounded-2xl border-4 border-black z-10 uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform rotate-3">
        3 points <span className="text-3xl relative top-1">⭐</span>
      </div>
      <div className="mb-6 self-start pl-4 flex flex-col items-start gap-1">
        <h2 className="text-3xl font-black uppercase text-black bg-bento-yellow px-4 py-1 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">Task 2</h2>
        <h3 className="text-2xl font-black uppercase mb-1">THE ZEBRA QUESTION</h3>
        <p className="text-lg font-bold text-gray-500 uppercase">SHEL SILVERSTEIN</p>
      </div>

      <div className="bento-box bg-white w-full p-6 sm:p-8 font-sans font-bold text-lg sm:text-2xl leading-relaxed text-black space-y-2 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        {poemLines.map((line, idx) => {
          if ('text' in line) {
            return (
              <motion.p key={idx} className="transition-all duration-300 text-black">
                {line.text}
              </motion.p>
            );
          }

          const isRevealed = revealedGaps[line.gapId];

          return (
            <motion.p key={idx} className="transition-all duration-300 text-black">
              {line.prefix}
              <span 
                onClick={() => toggleGap(line.gapId)}
                className={cn(
                  "px-2 rounded mx-1 cursor-pointer font-black transition-all border-b-4",
                  isRevealed 
                    ? "text-bento-green-dark bg-bento-green/30 border-bento-green-dark" 
                    : "text-bento-red bg-bento-red/10 hover:bg-bento-red/20 border-dashed border-bento-red"
                )}
              >
                {isRevealed ? line.answer : line.gapLabel}
              </span>
              {line.suffix}
            </motion.p>
          );
        })}
      </div>

      {showPlayer && (
        <div className="w-full mt-8 border-4 border-black rounded-xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-black aspect-video max-w-2xl">
          <iframe 
            width="100%" 
            height="100%" 
            src="https://www.youtube.com/embed/FicJ75azP_k?autoplay=1" 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowFullScreen>
          </iframe>
        </div>
      )}

      <div className="w-full flex justify-between items-center mt-8 px-2 gap-4 flex-wrap">
        <button 
          onClick={() => setShowPlayer(!showPlayer)}
          className="bg-white hover:bg-gray-100 p-4 rounded-2xl border-4 border-black flex items-center gap-2 font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-[4px] active:translate-x-[4px] transition-all"
        >
          <PlayCircle size={24} /> {showPlayer ? "Hide Audio" : "Listen"}
        </button>
        <button 
          onClick={onComplete}
          className="bento-button px-8 py-4 bg-bento-green text-black"
        >
          I read it! Next ➡️
        </button>
      </div>
    </div>
  );
}
