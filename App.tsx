import React, { useState } from 'react';
import { GameState, NoButtonPhase } from './types';
import { ASSETS, MESSAGES } from './constants';
import FloatingButton from './components/FloatingButton';
import Confetti from './components/Confetti';

// Simple Heart Icon Component
const HeartIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
  </svg>
);

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.ASKING);
  const [noButtonPhase, setNoButtonPhase] = useState<NoButtonPhase>(NoButtonPhase.INITIAL);
  const [triggerMove, setTriggerMove] = useState(false);

  // Handle "Yes" click
  const handleYesClick = () => {
    setGameState(GameState.CELEBRATING);
  };

  // Handle "No" click
  const handleNoClick = () => {
    if (noButtonPhase === NoButtonPhase.INITIAL) {
      setNoButtonPhase(NoButtonPhase.REALLY);
      setTriggerMove(!triggerMove); // Toggle to trigger useEffect in button
    } else if (noButtonPhase === NoButtonPhase.REALLY) {
      setNoButtonPhase(NoButtonPhase.SERIOUSLY);
      setTriggerMove(!triggerMove);
    } else if (noButtonPhase === NoButtonPhase.SERIOUSLY) {
      // Third click: Forced love scene
      setGameState(GameState.FORCED_LOVE);
    }
  };

  // Get current text for No button
  const getNoButtonText = () => {
    switch (noButtonPhase) {
      case NoButtonPhase.INITIAL: return MESSAGES.NO_BTN_INITIAL;
      case NoButtonPhase.REALLY: return MESSAGES.NO_BTN_REALLY;
      case NoButtonPhase.SERIOUSLY: return MESSAGES.NO_BTN_SERIOUSLY;
      default: return MESSAGES.NO_BTN_INITIAL;
    }
  };

  // Render Happy Celebration
  if (gameState === GameState.CELEBRATING) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center animate-fade-in relative overflow-hidden">
        <Confetti />
        <div className="z-10 flex flex-col items-center gap-8">
            <h1 className="text-4xl md:text-6xl font-bold text-pink-600 drop-shadow-sm mb-4">
            {MESSAGES.CELEBRATION}
            </h1>
            <div className="relative">
                <img 
                    src={ASSETS.KISSING_GIF} 
                    alt="Bears Kissing" 
                    className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-2xl shadow-2xl border-4 border-white"
                />
                <HeartIcon className="absolute -top-6 -right-6 w-12 h-12 text-red-500 animate-bounce" />
                <HeartIcon className="absolute -bottom-6 -left-6 w-12 h-12 text-red-500 animate-bounce delay-100" />
            </div>
            <p className="text-xl text-pink-500 mt-4 max-w-md">
            I promise to make you the happiest person in the world! 💖
            </p>
        </div>
      </div>
    );
  }

  // Render Forced Love Scene
  if (gameState === GameState.FORCED_LOVE) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center animate-fade-in bg-red-50 overflow-hidden relative">
        <Confetti />
        
        {/* Simulating debris/impact lines in background */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="w-[800px] h-[800px] bg-red-100 absolute clip-starburst opacity-50 animate-spin-slow"></div>
        </div>

        <div className="flex flex-col items-center gap-8 z-10">
             <h1 className="text-3xl md:text-5xl font-bold text-red-600 drop-shadow-sm mb-8 animate-bounce">
                {MESSAGES.FORCED_TITLE}
            </h1>
            
            <div className="relative group">
                {/* The 'Hole' in the wall */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] bg-gray-800 clip-starburst animate-burst z-0 shadow-2xl"></div>
                
                {/* The Bear Bursting Out */}
                <div className="relative z-10 animate-burst">
                  <img 
                      src={ASSETS.KISSING_GIF} 
                      alt="Bears Kissing Finale" 
                      className="w-72 h-72 md:w-96 md:h-96 object-contain drop-shadow-2xl"
                  />
                  {/* Decorative hearts exploding out */}
                  <HeartIcon className="absolute -top-10 -right-10 w-16 h-16 text-red-600 animate-pulse" />
                  <HeartIcon className="absolute -bottom-5 -left-10 w-12 h-12 text-pink-500 animate-bounce delay-75" />
                </div>
            </div>

             <p className="text-xl text-red-500 mt-8 font-bold italic animate-pulse">
                (There was never really a choice 😉)
            </p>
        </div>
      </div>
    );
  }

  // Render Asking Scene
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative bg-pink-100">
      
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <HeartIcon className="absolute top-10 left-10 w-8 h-8 text-pink-300 opacity-50 animate-pulse" />
        <HeartIcon className="absolute bottom-10 right-10 w-12 h-12 text-pink-300 opacity-50 animate-bounce" />
        <HeartIcon className="absolute top-1/3 right-1/4 w-6 h-6 text-pink-200 opacity-60" />
      </div>

      <div className="z-10 flex flex-col items-center gap-8 w-full max-w-lg">
        <img 
          src={noButtonPhase === NoButtonPhase.SERIOUSLY ? ASSETS.ANGRY_GIF : ASSETS.ASKING_GIF} 
          alt="Cute Bear" 
          className="w-48 h-48 md:w-64 md:h-64 object-contain filter drop-shadow-xl transition-all duration-300"
        />

        <h1 className="text-3xl md:text-5xl font-bold text-pink-600 text-center leading-tight">
          {MESSAGES.TITLE}
        </h1>

        <div className="flex flex-col md:flex-row gap-6 items-center justify-center w-full mt-4">
          <button 
            onClick={handleYesClick}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full text-xl shadow-lg transform transition hover:scale-110 hover:-translate-y-1 w-40 md:w-auto"
          >
            {MESSAGES.YES_BTN}
          </button>
          
          <FloatingButton
            text={getNoButtonText()}
            onClick={handleNoClick}
            isMoving={triggerMove}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-full text-xl shadow-lg w-40 md:w-auto transition-colors duration-300"
          />
        </div>
      </div>
    </div>
  );
};

export default App;