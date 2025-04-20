import { FC, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCurrentCocktail } from '../../../features/drink-list/model/slice/drinkListSlice';
import { ThemeToggler } from '../../../shared/ui/ThemeToggler/ThemeToggler';
import { COCKTAILS, CocktailCode } from '../../../shared/config/cocktails';
import './NavBar.scss';

export const NavBar: FC = () => {
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavLinkClick = (code: CocktailCode) => {
    dispatch(setCurrentCocktail(code));
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <div className="navbar__logo">
          <span>Cocktails</span>
        </div>

        <div className="navbar__mobile-controls">
          <ThemeToggler />
          <button className="navbar__burger" onClick={toggleMenu} aria-label="Открыть меню">
            <span
              className={`navbar__burger-line ${isMenuOpen ? 'navbar__burger-line--active' : ''}`}
            ></span>
          </button>
        </div>

        <ul className={`navbar__list ${isMenuOpen ? 'navbar__list--open' : ''}`}>
          {COCKTAILS.map((cocktail) => (
            <li key={cocktail.code} className="navbar__item">
              <NavLink
                to={cocktail.path}
                className={({ isActive }) =>
                  isActive ? 'navbar__link navbar__link--active' : 'navbar__link'
                }
                onClick={() => handleNavLinkClick(cocktail.code)}
              >
                {cocktail.name}
              </NavLink>
            </li>
          ))}
          <li className="navbar__item navbar__item--theme-toggle navbar__item--desktop">
            <ThemeToggler />
          </li>
        </ul>
      </div>
    </nav>
  );
};
