import React, { createContext, useContext, useState, ReactNode } from 'react';

// Définissez le type pour le contexte d'erreur
interface ErrorContextType {
  error: number | null;
  setError: React.Dispatch<React.SetStateAction<number | null>>;
}

// Créez un contexte d'erreur avec une valeur par défaut
const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

// Fournissez un hook personnalisé pour utiliser le contexte d'erreur
export const useError = (): ErrorContextType => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error('useError must be used within an ErrorProvider');
  }
  return context;
};

// Créez un fournisseur de contexte d'erreur
export const ErrorProvider = ({ children }: { children: ReactNode }) => {
  const [error, setError] = useState<number | null>(null);

  return (
    <ErrorContext.Provider value={{ error, setError }}>
      {children}
    </ErrorContext.Provider>
  );
};
