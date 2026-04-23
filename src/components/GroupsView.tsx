import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users } from 'lucide-react';
import confetti from 'canvas-confetti';

const allStudents = [
  "1. Arsen", "2. Khazret", "3. Ayaulym", "4. Ernur",
  "5. S. Aizere", "6. O. Aizere", "7. Anel", "8. Malika",
  "9. Aruna", "10. Aisana", "11. Beknur", "12. Aliyar"
];

const group1 = ["Arsen", "Aliyar", "Beknur", "Aruna", "Malika", "O. Aizere"];
const group2 = ["Ernur", "Khazret", "Ayaulym", "Aisana", "Anel", "S. Aizere"];

export function GroupsView({ onComplete }: { onComplete: () => void }) {
  const [isDivided, setIsDivided] = useState(false);

  const handleDivide = () => {
    setIsDivided(true);
    confetti({ particleCount: 150, zIndex: 9999, spread: 80, origin: { y: 0.5 } });
  };

  return (
    <div className="flex flex-col items-center max-w-4xl w-full mx-auto p-4">
      <h2 className="text-4xl font-black uppercase tracking-tighter text-center text-black mb-8 border-b-4 border-black pb-2 inline-block">
        Dividing into groups 👥
      </h2>

      <AnimatePresence mode="wait">
        {!isDivided ? (
          <motion.div
            key="all"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full flex justify-center mb-8"
          >
            <div className="bento-box bg-white p-8 w-full">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {allStudents.map((student, idx) => (
                  <div key={idx} className="bg-bento-blue text-black border-2 border-black rounded-xl p-3 font-bold uppercase text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    {student}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="split"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full flex flex-col md:flex-row gap-8 mb-8"
          >
            {/* Group 1 */}
            <div className="bento-box bg-bento-yellow p-6 flex-1 transform -rotate-1 relative">
              <div className="absolute -top-4 -left-4 bg-white border-4 border-black rounded-full w-12 h-12 flex items-center justify-center font-black text-2xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                1
              </div>
              <h3 className="text-3xl font-black uppercase text-center mb-6 pt-2">1st Group</h3>
              <div className="flex flex-col gap-3">
                {group1.map((student, idx) => (
                  <div key={idx} className="bg-white border-2 border-black rounded-xl p-3 font-bold uppercase text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    {student}
                  </div>
                ))}
              </div>
            </div>

            {/* Group 2 */}
            <div className="bento-box bg-bento-green p-6 flex-1 transform rotate-1 relative">
              <div className="absolute -top-4 -right-4 bg-white border-4 border-black rounded-full w-12 h-12 flex items-center justify-center font-black text-2xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                2
              </div>
              <h3 className="text-3xl font-black uppercase text-center mb-6 pt-2">2nd Group</h3>
              <div className="flex flex-col gap-3">
                {group2.map((student, idx) => (
                  <div key={idx} className="bg-white border-2 border-black rounded-xl p-3 font-bold uppercase text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    {student}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex gap-4 mt-4">
        {!isDivided ? (
          <button 
            onClick={handleDivide}
            className="bento-button px-8 py-4 bg-bento-red text-white text-2xl flex items-center gap-2"
          >
            <Users size={28} />
            Into two groups
          </button>
        ) : (
          <button 
            onClick={onComplete}
            className="bento-button px-8 py-4 bg-black text-white text-2xl"
          >
            Start Next Activity 🚀
          </button>
        )}
      </div>
    </div>
  );
}
