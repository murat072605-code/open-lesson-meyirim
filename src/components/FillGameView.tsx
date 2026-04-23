import React from 'react';
import { motion } from 'motion/react';
import { playAudio } from '../lib/utils';
import confetti from 'canvas-confetti';

export function FillGameView({ onComplete, onEarnPoints }: { onComplete: () => void, onEarnPoints: (pts: number) => void }) {
  const sentences = [
    { text: "My little sister screams all day. She is very ", answer: "noisy", options: ["noisy", "quiet"] },
    { text: "I lost my favorite toy. I am feeling ", answer: "sad", options: ["happy", "sad"] },
    { text: "He helps his mom clean. He is a ", answer: "good", options: ["good", "bad"] },     { text: " boy.", answer: "", options: [] } // For display
  ];

  const blanks = [0, 1, 2];

  const [filled, setFilled] = React.useState<Record<number, string>>({});

  const isComplete = blanks.every(b => filled[b] === sentences[b].answer);

  React.useEffect(() => {
    if (isComplete) {
      confetti();
      onEarnPoints(30);
      playAudio('Amazing! You finished all the sentences.');
    }
  }, [isComplete]);

  const handleSelect = (qIdx: number, val: string) => {
    setFilled(prev => ({...prev, [qIdx]: val}));
    playAudio(val);
  };

  return (
    <div className="flex flex-col items-center max-w-3xl w-full mx-auto p-4">
      <h2 className="text-4xl font-black uppercase text-center tracking-tighter text-black mb-8 inline-block bg-bento-yellow px-6 py-2 border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -rotate-2">Fill in the Blanks! ✏️</h2>

      <div className="bento-box w-full p-6 lg:p-10 flex flex-col gap-8 bg-white border-b-8">
        
        {blanks.map(idx => {
          const q = sentences[idx];
          const isCorrect = filled[idx] === q.answer;

          return (
            <div key={idx} className="flex flex-col md:flex-row md:items-center gap-4 pb-6 border-b-4 border-dashed border-black/10 last:border-0 last:pb-0">
              <p className="text-2xl font-black text-black leading-loose flex-1 flex flex-wrap items-center gap-2 uppercase tracking-tighter">
                {idx === 2 ? "He helps his mom clean. He is a " : q.text}
                
                <span className="inline-flex gap-2">
                  {q.options.map(opt => (
                    <button 
                      key={opt}
                      onClick={() => handleSelect(idx, opt)}
                      className={`px-4 py-2 rounded-xl border-4 border-black font-black uppercase transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-[2px] active:translate-x-[2px] ${
                        filled[idx] === opt 
                          ? (isCorrect ? "bg-bento-green text-black" : "bg-bento-red text-white")
                          : "bg-white text-black hover:bg-gray-100"
                      }`}
                      style={filled[idx] === opt && !isCorrect ? { animation: 'headShake 0.5s' } : {}}
                    >
                      {opt}
                    </button>
                  ))}
                </span>
                
                {idx === 2 && " boy."}
              </p>
              
              {filled[idx] && (
                <div className="text-4xl bg-white rounded-full p-2 border-4 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  {isCorrect ? '🌟' : '❌'}
                </div>
              )}
            </div>
          )
        })}

      </div>

      {isComplete && (
        <motion.button 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={onComplete}
          className="bento-button mt-12 px-10 py-5 bg-bento-blue text-white text-2xl"
        >
          Let's talk! 🗣️
        </motion.button>
      )}
    </div>
  );
}
