import { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';

interface RouterProviderProps {
  children: ReactNode;
}

export const RouterProvider = ({ children }: RouterProviderProps) => {
  // Добавляем basename для GitHub Pages
  const basename = import.meta.env.DEV ? '/' : '/test-cocktail';
  
  return <BrowserRouter basename={basename}>{children}</BrowserRouter>;
};
