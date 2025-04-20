import { FC } from 'react';
import { useTheme } from '../../../app/providers/useTheme';
import './ThemeToggler.scss';

import sunIconUrl from '../../assets/icons/sun.svg';
import moonIconUrl from '../../assets/icons/moon.svg';

export const ThemeToggler: FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="theme-toggler"
      onClick={toggleTheme}
      title={theme === 'light' ? 'Переключить на темную тему' : 'Переключить на светлую тему'}
    >
      <img
        src={theme === 'light' ? sunIconUrl : moonIconUrl}
        className="theme-toggler__icon"
        alt={theme === 'light' ? 'Светлая тема' : 'Темная тема'}
      />
    </button>
  );
};
