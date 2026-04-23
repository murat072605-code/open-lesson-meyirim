import React from 'react';
import { motion } from 'motion/react';
import { playAudio } from '../lib/utils';
import confetti from 'canvas-confetti';

const questions = [
  { text: "How are you today?", answers: ["Happy", "Sad", "Sleepy", "Energetic"] },
  { text: "Are you feeling good or bad?", answers: ["Good", "Bad", "Super Good!"] },
];

export function WarmUpView({ onComplete, onEarnPoints }: { onComplete: () => void, onEarnPoints: (pts: number) => void }) {
  const [currentQ, setCurrentQ] = React.useState(0);

  const handleAnswer = (ans: string) => {
    playAudio(`You are ${ans}! That's interesting.`);
    onEarnPoints(5);
    if (currentQ < questions.length - 1) {
      setCurrentQ(c => c + 1);
    } else {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
      onComplete();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-center w-full max-w-2xl mx-auto p-4 z-10">
      <h2 className="text-4xl font-black text-black mb-6 uppercase tracking-tighter">Warm up Time 🔥</h2>
      
      <motion.div 
        key={currentQ}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        className="bento-box bg-bento-yellow w-full p-8 md:p-12 relative overflow-hidden"
      >
        <div className="absolute top-4 right-6 bg-bento-blue text-white text-xs font-black px-3 py-1 rounded-full border-2 border-black uppercase">Question</div>
        
        <p className="text-3xl font-black text-black mb-10 leading-snug tracking-tighter border-b-4 border-dashed border-black/20 pb-6 mt-4">
          {questions[currentQ].text}
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-4">
          {questions[currentQ].answers.map(ans => (
            <button
              key={ans}
              onClick={() => handleAnswer(ans)}
              className="bento-button px-6 py-4 bg-white text-black text-xl hover:bg-black hover:text-white"
            >
              {ans}
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
