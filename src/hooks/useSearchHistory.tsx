import { useState } from 'react';

export const useSearchHistory = () => {
  const [history, setHistory] = useState<string[]>([]);

  const addTerm = (term: string) => {
    const cleanTerm = term.trim();
    if (!cleanTerm) return;

    // Evitar chips duplicados en el historial[cite: 1]
    setHistory((prevHistory) => {
      const exists = prevHistory.some(
        (item) => item.toLowerCase() === cleanTerm.toLowerCase()
      );
      if (exists) return prevHistory;
      return [cleanTerm, ...prevHistory];
    });
  };

  return { history, addTerm };
};