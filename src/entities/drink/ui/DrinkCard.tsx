import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Drink } from '../model/types/drink';
import { LazyImage } from './LazyImage/LazyImage';
import './DrinkCard.scss';

interface DrinkCardProps {
  drink: Drink;
  className?: string;
}

export const DrinkCard: FC<DrinkCardProps> = ({ drink, className = '' }) => {
  return (
    <div className={`drink-card ${className}`} data-testid="drink-card">
      <div className="drink-card__image-container">
        <LazyImage src={drink.thumb} alt={drink.name} className="drink-card__image" />
      </div>
      <div className="drink-card__content">
        <h3 className="drink-card__title" data-testid="drink-card-title">
          {drink.name}
        </h3>
        <p className="drink-card__category">{drink.category}</p>
        <p className="drink-card__type">{drink.isAlcoholic ? 'Алкогольный' : 'Безалкогольный'}</p>
        <p className="drink-card__glass">{drink.glass}</p>
        <Link
          to={`/drink/${drink.id}`}
          className="drink-card__link"
          data-testid="drink-card-link"
          aria-label={`Подробнее о ${drink.name}`}
        >
          Подробнее
        </Link>
      </div>
    </div>
  );
};
