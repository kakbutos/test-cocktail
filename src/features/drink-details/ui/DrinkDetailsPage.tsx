import { FC, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store';
import { fetchDrinkDetails, clearDrinkDetails } from '../model/slice/drinkDetailsSlice';
import { LazyImage } from '../../../entities/drink/ui/LazyImage/LazyImage';
import { Loader } from '../../../shared/ui/Loader/Loader';
import './DrinkDetailsPage.scss';

export const DrinkDetailsPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { data: drink, isLoading, error } = useSelector((state: RootState) => state.drinkDetails);

  useEffect(() => {
    if (id) {
      dispatch(fetchDrinkDetails(id));
    }

    return () => {
      dispatch(clearDrinkDetails());
    };
  }, [dispatch, id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="drink-details-error">
        <h2>Ошибка</h2>
        <p>{error}</p>
        <button onClick={handleGoBack} className="drink-details-error__button">
          Назад
        </button>
      </div>
    );
  }

  if (!drink) {
    return <Loader />;
  }

  return (
    <div className="drink-details">
      <button onClick={handleGoBack} className="drink-details__back-button">
        &larr; Назад
      </button>

      <div className="drink-details__content">
        <div className="drink-details__image-container">
          <LazyImage src={drink.thumb} alt={drink.name} className="drink-details__image" />
        </div>

        <div className="drink-details__info">
          <h1 className="drink-details__title">{drink.name}</h1>

          <div className="drink-details__meta">
            <p className="drink-details__category">
              <span className="drink-details__label">Категория:</span> {drink.category}
            </p>
            <p className="drink-details__type">
              <span className="drink-details__label">Тип:</span>{' '}
              {drink.isAlcoholic ? 'Алкогольный' : 'Безалкогольный'}
            </p>
            <p className="drink-details__glass">
              <span className="drink-details__label">Стекло:</span> {drink.glass}
            </p>
          </div>

          <div className="drink-details__section">
            <h2 className="drink-details__section-title">Инструкция приготовления</h2>
            <p className="drink-details__instructions">{drink.instructions}</p>
          </div>

          <div className="drink-details__section">
            <h2 className="drink-details__section-title">Ингредиенты</h2>
            <ul className="drink-details__ingredients">
              {drink.ingredients.map((ingredient, index) => (
                <li key={index} className="drink-details__ingredient">
                  <span className="drink-details__ingredient-name">{ingredient.name}</span>
                  {ingredient.measure && (
                    <span className="drink-details__ingredient-measure">
                      {' '}
                      - {ingredient.measure}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
