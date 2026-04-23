import React from 'react';
import { Play } from 'lucide-react';

export function HomeView({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto flex-1 p-6 z-10 w-full h-[80vh]">
      <div className="bento-box p-8 md:p-16 relative flex flex-col items-center bg-white">
        <span className="text-8xl mb-6 inline-block rotate-[-5deg] hover:rotate-[5deg] transition-transform duration-300">
          ✨
        </span>
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 leading-tight">
          Welcome to the <br /> lesson!
        </h1>
        <p className="text-xl md:text-2xl font-bold mb-12 max-w-md mx-auto text-gray-700 uppercase">
          5th grade
        </p>
        
        <button 
          onClick={onStart}
          className="bento-button px-10 py-5 text-2xl text-white bg-bento-green-dark flex items-center justify-center"
        >
          Start Lesson
          <Play fill="white" className="ml-3" size={28} />
        </button>
      </div>
      
      {/* Decorative characters */}
      <div className="absolute bottom-10 left-10 text-7xl animate-bounce" style={{ animationDelay: '0ms', animationDuration: '3s' }}>🦁</div>
      <div className="absolute top-20 right-10 text-6xl animate-bounce" style={{ animationDelay: '500ms', animationDuration: '4s' }}>🦄</div>
      <div className="absolute bottom-20 right-20 text-7xl animate-bounce" style={{ animationDelay: '1000ms', animationDuration: '3.5s' }}>🦓</div>
    </div>
  );
}
