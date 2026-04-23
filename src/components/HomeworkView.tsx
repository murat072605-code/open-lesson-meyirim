import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

export function HomeworkView({ onComplete }: { onComplete: () => void }) {
  const boxWords = ["TV programme", "animal", "game", "team", "singer", "sport", "food", "colour"];

  const ex2Sentences = [
    { num: "e.g.", text: "'What colour is your car?' 'It's red.'" },
    { num: 1, text: "Tomb Raider is a fantastic _________." },
    { num: 2, text: "My favourite _________ is pizza." },
    { num: 3, text: "Ordabasy Shymkent is a great _________." },
    { num: 4, text: "'Who is your favourite _________?' 'Rihanna.'" },
    { num: 5, text: "Is rugby a popular _________ in Kazakhstan?" },
    { num: 6, text: "Your cat is a dangerous _________." },
    { num: 7, text: "My favourite _________ is The Simpsons." }
  ];

  const ex4Sentences = [
    { num: "e.g.", prompt: "you / Are / in a club / at school ?", answer: "Are you in a club at school? No, I'm not." },
    { num: 1, prompt: "good / sport / you / at / Are ?" },
    { num: 2, prompt: "Ruslan / your / Is / name?" },
    { num: 3, prompt: "basketball / Is / popular / your school / at ?" },
    { num: 4, prompt: "your friends / interested / Are / in / drama?" },
    { num: 5, prompt: "best friend / Italy / from / Is / your?" },
    { num: 6, prompt: "you and your friends / at / sport / Are / good?" }
  ];

  return (
    <div className="flex flex-col items-center max-w-6xl w-full mx-auto p-4 relative">
      <div className="absolute top-4 right-6 bg-bento-yellow text-black text-2xl font-black px-6 py-2 rounded-2xl border-4 border-black z-10 uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform rotate-3">
        2 points <span className="text-3xl relative top-1">⭐</span>
      </div>
      <h2 className="text-4xl font-black uppercase tracking-tighter text-center text-black mb-2 border-b-4 border-black pb-2 inline-block">
        Check the Homework 📖
      </h2>
      <div className="bg-bento-yellow px-6 py-2 rounded-xl border-4 border-black mb-8 transform rotate-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <h3 className="text-2xl font-black uppercase text-black">Page 24. Ex 2 & 4</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full mb-8 items-start">
        {/* Left Column - Ex 2 */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bento-box bg-bento-blue p-6 flex flex-col gap-4 relative">
          <div className="absolute -top-4 -left-4 bg-white border-4 border-black rounded-full w-12 h-12 flex items-center justify-center font-black text-2xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            2
          </div>
          <h4 className="text-lg md:text-xl font-bold bg-white px-4 py-2 border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ml-4">
            Complete the sentences with the words in the box.
          </h4>
          <div className="flex flex-wrap gap-2 bg-white border-2 border-black border-dashed rounded-xl p-4 justify-center">
            {boxWords.map(word => (
              <span key={word} className="px-3 py-1 bg-bento-yellow border-2 border-black rounded-md font-bold text-sm shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                {word}
              </span>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            {ex2Sentences.map((item, idx) => (
              <div key={idx} className="flex gap-3 items-start bg-white p-3 border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <span className="font-black bg-bento-yellow w-8 h-8 flex items-center justify-center shrink-0 border-2 border-black rounded-full text-xs">
                  {item.num}
                </span>
                <p className="font-medium text-base md:text-lg leading-snug pt-0.5">{item.text}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Column - Ex 4 */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bento-box bg-bento-green p-6 flex flex-col gap-4 relative">
          <div className="absolute -top-4 -right-4 bg-white border-4 border-black rounded-full w-12 h-12 flex items-center justify-center font-black text-2xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            4
          </div>
          <h4 className="text-lg md:text-xl font-bold bg-white px-4 py-2 border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] mr-4">
            Reorder the words and write questions. Then write true short answers.
          </h4>
          <div className="flex flex-col gap-3">
            {ex4Sentences.map((item, idx) => (
              <div key={idx} className="flex flex-col gap-1 bg-white p-3 border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex gap-3 items-start">
                  <span className="font-black bg-bento-red text-white w-8 h-8 flex items-center justify-center shrink-0 border-2 border-black rounded-full text-xs">
                    {item.num}
                  </span>
                  <div className="flex flex-col pt-0.5 w-full">
                    <p className="font-bold text-gray-600 text-sm mb-1">{item.prompt}</p>
                    {item.answer ? (
                      <p className="font-bold text-base md:text-lg text-green-700 bg-green-50 p-2 border-2 border-green-200 rounded mt-1">
                        {item.answer}
                      </p>
                    ) : (
                      <div className="w-full flex gap-2 items-center mt-2">
                        <div className="text-gray-400 font-bold">A:</div>
                        <div className="flex-1 border-b-2 border-dashed border-gray-300 h-6"></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <button 
        onClick={onComplete}
        className="bento-button px-8 py-4 bg-black text-white text-2xl flex items-center gap-2"
      >
        <CheckCircle2 size={28} />
        Start Next Activity
      </button>
    </div>
  );
}
