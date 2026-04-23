import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';

export function ReflectionView({ onComplete }: { onComplete: () => void }) {
  const options = [
    {
      id: "joy",
      title: "I understand",
      bgColor: "bg-bento-green/20 hover:bg-bento-green/40",
      borderColor: "border-bento-green-dark",
      textColor: "text-bento-green-dark",
      imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c2/Joy_%28Inside_Out%29.png/250px-Joy_%28Inside_Out%29.png"
    },
    {
      id: "anxiety",
      title: "I understand, but I need help",
      bgColor: "bg-bento-yellow/20 hover:bg-bento-yellow/40",
      borderColor: "border-orange-500",
      textColor: "text-orange-600",
      imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/a/ab/Anxiety_%28Inside_Out%29.png/250px-Anxiety_%28Inside_Out%29.png"
    },
    {
      id: "anger",
      title: "I don't understand",
      bgColor: "bg-bento-red/20 hover:bg-bento-red/40",
      borderColor: "border-bento-red",
      textColor: "text-bento-red",
      imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/5/52/Anger_%28Inside_Out%29.png/250px-Anger_%28Inside_Out%29.png"
    }
  ];

  return (
    <div className="flex flex-col items-center w-full max-w-6xl mx-auto p-4 relative pt-12 md:pt-4">
      <div className="mb-8 self-start pl-4 flex flex-col items-start gap-1">
         <h2 className="text-3xl font-black uppercase text-black bg-bento-yellow px-4 py-1 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">Final Task</h2>
        <h3 className="text-4xl md:text-5xl font-black uppercase mb-1 border-b-4 border-dashed border-black/20 pb-2">Reflection Time 🧠</h3>
        <p className="text-xl font-bold text-gray-600 uppercase">How do you feel about today's lesson?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full px-4 mb-12">
        {options.map((option, idx) => (
          <motion.div
            key={option.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.15 }}
            className={cn(
              "bento-box flex flex-col items-center p-6 border-4 cursor-pointer transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]",
              option.bgColor,
              option.borderColor
            )}
          >
            <h4 className={cn("text-2xl font-black uppercase text-center mb-6 h-16 flex items-center justify-center", option.textColor)}>
              {option.title}
            </h4>
            <div className="w-full relative pt-[120%] rounded-2xl overflow-hidden border-4 border-black bg-white shadow-inner">
               <img 
                 src={option.imageUrl} 
                 alt={option.title} 
                 className="absolute inset-0 w-full h-full object-contain p-2"
               />
            </div>
          </motion.div>
        ))}
      </div>

      <button 
        onClick={onComplete}
        className="bento-button px-10 py-5 bg-bento-blue text-white text-2xl flex items-center gap-3 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-[6px] active:translate-x-[6px]"
      >
        <CheckCircle2 size={32} />
        Finish Lesson 🏆
      </button>
    </div>
  );
}
