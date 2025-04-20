import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { DrinkCard } from '../../entities/drink/ui/DrinkCard';

const mockDrink = {
  id: '11007',
  name: 'Margarita',
  category: 'Ordinary Drink',
  isAlcoholic: true,
  glass: 'Cocktail glass',
  thumb: 'https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg',
  ingredients: [
    { name: 'Tequila', measure: '1 1/2 oz' },
    { name: 'Triple sec', measure: '1/2 oz' },
    { name: 'Lime juice', measure: '1 oz' },
    { name: 'Salt', measure: '' },
  ],
  instructions: 'Rub the rim of the glass with the lime slice to make the salt stick to it.',
};

const renderWithRouter = (ui: React.ReactElement) => {
  return render(ui, { wrapper: BrowserRouter });
};

it('renders drink card with correct data', () => {
  renderWithRouter(<DrinkCard drink={mockDrink} />);

  const cardElement = screen.getByTestId('drink-card');
  expect(cardElement).toBeInTheDocument();

  const titleElement = screen.getByTestId('drink-card-title');
  expect(titleElement).toHaveTextContent('Margarita');

  const linkElement = screen.getByTestId('drink-card-link');
  expect(linkElement).toHaveAttribute('href', '/drink/11007');
});
