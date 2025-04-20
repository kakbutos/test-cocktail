import { ReactNode } from 'react';
import { RouterProvider } from './RouterProvider';
import { StoreProvider } from './StoreProvider';
import { ThemeProvider } from './ThemeProvider';

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <StoreProvider>
      <RouterProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </RouterProvider>
    </StoreProvider>
  );
};
