import React from 'react';
import { HomeView } from './components/HomeView';
import { WarmUpView } from './components/WarmUpView';
import { GroupsView } from './components/GroupsView';
import { HomeworkView } from './components/HomeworkView';
import { NewWords } from './components/NewWords';
import { MatchGame } from './components/MatchGame';
import { PicturePractice } from './components/PicturePractice';
import { PoemView } from './components/PoemView';
import { TongueTwistersView } from './components/TongueTwistersView';
import { FillGameView } from './components/FillGameView';
import { ReflectionView } from './components/ReflectionView';
import { HomeworkViewNew } from './components/HomeworkViewNew';
import { GeminiChat } from './lib/GeminiChat';
import { Star, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

type Screen = 'home' | 'warmUp' | 'groups' | 'homework' | 'newWords' | 'matchGame' | 'picturePractice' | 'poem' | 'twisters' | 'fillGame' | 'reflection' | 'homework_new' | 'finish';

const timeline: Screen[] = [
  'home', 'warmUp', 'groups', 'homework', 'newWords', 'matchGame', 'picturePractice', 'poem', 'twisters', 'fillGame', 'reflection', 'homework_new', 'finish'
];

export default function App() {
  const [currentScreen, setCurrentScreen] = React.useState<Screen>('home');
  const [score, setScore] = React.useState(0);
  const [teacherMode, setTeacherMode] = React.useState(false);

  const currentIndex = timeline.indexOf(currentScreen);

  const nextScreen = () => {
    if (currentIndex < timeline.length - 1) {
      setCurrentScreen(timeline[currentIndex + 1]);
    }
  };

  const prevScreen = () => {
    if (currentIndex > 0) {
      setCurrentScreen(timeline[currentIndex - 1]);
    }
  };

  const handleEarnPoints = (pts: number) => {
    setScore(s => s + pts);
  };

  return (
    <div className="min-h-screen bg-bento-bg text-[#2D3436] font-sans overflow-x-hidden selection:bg-bento-yellow flex flex-col items-center relative p-2 md:p-6 lg:p-8">

      {/* Header Panel */}
      {currentScreen !== 'home' && (
        <header className="w-full max-w-6xl p-4 flex justify-between items-center z-40 bg-white rounded-3xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-bento-red rounded-full border-2 border-black flex items-center justify-center font-bold text-white text-xl">A</div>
            <div className="hidden sm:block">
              <h1 className="text-xl md:text-2xl font-black uppercase tracking-tighter">Welcome to the lesson!</h1>
              <p className="text-xs md:text-sm font-bold text-gray-500 uppercase">5th grade</p>
            </div>
          </div>

          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-2 font-black text-2xl tracking-tighter text-black">
              <Star fill="#FFD93D" stroke="black" strokeWidth={2} size={32} className="relative -top-0.5" />
              <span>{score}</span>
            </div>

            <div className="hidden md:block text-sm font-black uppercase bg-bento-yellow px-4 py-2 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              {currentIndex} / {timeline.length - 1}
            </div>

            <button 
              onClick={() => setTeacherMode(!teacherMode)}
              className="p-2 bg-bento-green hover:bg-bento-green-dark text-black rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:translate-x-[2px] active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center outline-none"
              title="Teacher Mode"
            >
              <LayoutDashboard size={24} />
            </button>
          </div>
        </header>
      )}

      {/* Teacher Mode Control Panel (Optional) */}
      <AnimatePresence>
        {teacherMode && currentScreen !== 'home' && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="w-full max-w-6xl mb-6 bg-bento-blue text-black border-4 border-black rounded-2xl p-4 z-40 overflow-hidden flex flex-wrap gap-2 justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            {timeline.map((s, i) => (
              <button 
                key={s}
                onClick={() => setCurrentScreen(s)}
                className={`px-4 py-2 text-sm font-black uppercase rounded-xl border-2 border-black transition-all ${currentScreen === s ? 'bg-bento-yellow shadow-none translate-y-[2px] translate-x-[2px]' : 'bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-100'}`}
              >
                {s}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main View Area */}
      <main className="flex-1 w-full flex items-center justify-center relative z-10 py-4 px-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-full flex justify-center"
          >
            {currentScreen === 'home' && <HomeView onStart={nextScreen} />}
            {currentScreen === 'warmUp' && <WarmUpView onComplete={nextScreen} onEarnPoints={handleEarnPoints} />}
            {currentScreen === 'groups' && <GroupsView onComplete={nextScreen} />}
            {currentScreen === 'homework' && <HomeworkView onComplete={nextScreen} />}
            {currentScreen === 'newWords' && <NewWords onComplete={nextScreen} />}
            {currentScreen === 'matchGame' && <MatchGame onComplete={nextScreen} onEarnPoints={handleEarnPoints} />}
            {currentScreen === 'picturePractice' && <PicturePractice onComplete={nextScreen} onEarnPoints={handleEarnPoints} />}
            {currentScreen === 'poem' && <PoemView onComplete={nextScreen} />}
            {currentScreen === 'twisters' && <TongueTwistersView onComplete={nextScreen} />}
            {currentScreen === 'fillGame' && <FillGameView onComplete={nextScreen} onEarnPoints={handleEarnPoints} />}
            {currentScreen === 'reflection' && <ReflectionView onComplete={nextScreen} />}
            {currentScreen === 'homework_new' && <HomeworkViewNew onComplete={nextScreen} />}
            
            {currentScreen === 'finish' && (
              <div className="text-center bento-box p-12 md:p-16 max-w-2xl w-full flex flex-col items-center">
                <span className="text-8xl mb-8 inline-block animate-bounce relative z-10">🌟</span>
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8 text-bento-green-dark">The lesson is over.</h2>
                <div className="flex flex-col gap-4 text-center border-t-4 border-dashed border-gray-200 pt-8 w-full">
                  <p className="text-2xl md:text-3xl font-bold text-gray-800">Thank you for your hard work.</p>
                  <p className="text-2xl md:text-3xl font-bold text-bento-purple">Have a nice day!</p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <GeminiChat />

    </div>
  );
}
