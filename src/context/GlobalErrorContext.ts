import { createContext } from 'react';
import { ErrorHandlingContext } from '../types';

export const GlobalErrorContext = createContext<ErrorHandlingContext>({
  handleGlobalError: () => {},
  dismissGlobalError: () => {},
  hasGlobalErrors: false,
});