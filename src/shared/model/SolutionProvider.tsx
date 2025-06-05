'use client';

import { createContext, useContext, useState, ReactNode, useMemo } from 'react';

interface SolutionState {
  solutionName: string;
  solutionCategory: string;
  solutionPrice: number;
}

interface SolutionContextType extends SolutionState {
  setSolution: (data: Partial<SolutionState>) => void;
}

const SolutionContext = createContext<SolutionContextType | undefined>(
  undefined,
);

function SolutionProvider({ children }: { children: ReactNode }) {
  const [solution, setSolutionState] = useState<SolutionState>({
    solutionName: '',
    solutionCategory: '',
    solutionPrice: 0,
  });

  const setSolution = (data: Partial<SolutionState>) => {
    setSolutionState((prev) => ({ ...prev, ...data }));
  };

  return (
    <SolutionContext.Provider
      value={useMemo(() => ({ ...solution, setSolution }), [solution])}
    >
      {children}
    </SolutionContext.Provider>
  );
}

export const useSolution = (): SolutionContextType => {
  const context = useContext(SolutionContext);
  if (!context) {
    throw new Error('useSolution must be used within a SolutionProvider');
  }
  return context;
};

export default SolutionProvider;
