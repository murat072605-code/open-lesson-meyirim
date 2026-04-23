import React from 'react';
import { motion } from 'motion/react';
import { playAudio } from '../lib/utils';
import confetti from 'canvas-confetti';

const questions = [
  {
    image: "⚽",
    text: "He plays football every day. He is very ___.",
    options: ["happy", "sad", "good"],
    answer: "good"
  },
  {
    image: "🎸",
    text: "The music is so loud! It is very ___.",
    options: ["quiet", "neat", "noisy"],
    answer: "noisy"
  },
  {
    image: "🌪️",
    text: "Toys are on the floor, the bed is not made. The room is ___.",
    options: ["sloppy", "good", "happy"],
    answer: "sloppy"
  }
];

export function PicturePractice({ onComplete, onEarnPoints }: { onComplete: () => void, onEarnPoints: (pt: number) => void }) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [feedback, setFeedback] = React.useState<'correct' | 'wrong' | null>(null);

  const q = questions[currentIndex];

  const handleAnswer = (opt: string) => {
    if (opt === q.answer) {
      setFeedback('correct');
      playAudio('Correct! ' + opt);
      onEarnPoints(15);
      confetti({ particleCount: 50, origin: { y: 0.7 } });
      
      setTimeout(() => {
        if (currentIndex < questions.length - 1) {
          setCurrentIndex(c => c + 1);
          setFeedback(null);
        } else {
          onComplete();
        }
      }, 1500);
    } else {
      setFeedback('wrong');
      playAudio('Try again!');
      setTimeout(() => setFeedback(null), 1000);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-3xl mx-auto p-4 text-center">
      <h2 className="text-4xl font-black uppercase tracking-tighter text-black mb-4 inline-block bg-bento-red text-white px-4 py-2 border-4 border-black rounded-xl transform rotate-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">Picture Practice 🖼️</h2>
      <p className="text-xl font-bold mb-10 mt-4 bg-white px-4 py-2 border-2 border-black rounded shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">Choose the best adjective for the picture!</p>

      <motion.div 
        key={currentIndex}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        className="w-full flex flex-col items-center bento-box p-8 bg-bento-bg"
      >
        <div className="text-8xl mb-6 bg-white p-6 border-4 border-black rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">{q.image}</div>
        <p className="text-2xl font-black text-black uppercase tracking-tighter leading-snug mb-10 pb-6 border-b-4 border-dashed border-black/20 w-full">{q.text}</p>
        
        <div className="flex justify-center gap-4 w-full flex-wrap">
          {q.options.map(opt => (
            <motion.button
              key={opt}
              whileHover={{ scale: 1.05 }}
              onClick={() => handleAnswer(opt)}
              className="bento-button px-8 py-4 text-2xl bg-white text-black hover:bg-black hover:text-white w-full sm:w-auto min-w-[120px]"
            >
              {opt}
            </motion.button>
          ))}
        </div>

        {feedback === 'correct' && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mt-8 text-3xl font-black uppercase text-white bg-bento-green border-4 border-black px-6 py-2 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            Yes! {q.answer}!
          </motion.div>
        )}
        {feedback === 'wrong' && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mt-8 text-3xl font-black uppercase text-white bg-bento-red border-4 border-black px-6 py-2 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            Oops, try again!
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
