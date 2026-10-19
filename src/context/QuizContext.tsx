'use client';

import React, { createContext, useContext, useState } from 'react';
import { DoshaQuizModal } from '../components/DoshaQuizModal';

interface QuizContextType {
  openQuiz: () => void;
  closeQuiz: () => void;
  isQuizOpen: boolean;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  return (
    <QuizContext.Provider
      value={{
        openQuiz: () => setIsQuizOpen(true),
        closeQuiz: () => setIsQuizOpen(false),
        isQuizOpen
      }}
    >
      {children}
      <DoshaQuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};
