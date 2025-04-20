import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DrinkCard } from '../../../entities/drink/ui/DrinkCard';
import { Loader } from '../../../shared/ui/Loader/Loader';
import {
  fetchDrinkList,
  setCurrentCocktail,
} from '../../../features/drink-list/model/slice/drinkListSlice';
import { AppDispatch, RootState } from '../../../app/store';
import { CocktailCode, DEFAULT_COCKTAIL } from '../../../shared/config/cocktails';
import './DrinkListPage.scss';

export const DrinkListPage: FC = () => {
  const { cocktailCode = DEFAULT_COCKTAIL } = useParams<{ cocktailCode?: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { data, isLoading, error } = useSelector((state: RootState) => state.drinkList);

  useEffect(() => {
    dispatch(setCurrentCocktail(cocktailCode as CocktailCode));

    if (!data[cocktailCode as CocktailCode]) {
      dispatch(fetchDrinkList(cocktailCode as CocktailCode));
    }
  }, [cocktailCode, dispatch, data]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="drink-list-error">
        <h2>Ошибка</h2>
        <p>{error}</p>
      </div>
    );
  }

  const drinks = data[cocktailCode as CocktailCode] || [];

  if (drinks.length === 0 && !isLoading) {
    return (
      <div className="drink-list-empty">
        <h2>Напитки не найдены</h2>
        <p>Пожалуйста, выберите другую категорию или повторите попытку позже.</p>
        <button
          onClick={() => dispatch(fetchDrinkList(cocktailCode as CocktailCode))}
          className="drink-list-empty__retry"
        >
          Повторить запрос
        </button>
      </div>
    );
  }

  return (
    <div className="drink-list">
      <h1 className="drink-list__title">
        {cocktailCode.charAt(0).toUpperCase() + cocktailCode.slice(1)}
      </h1>
      <div className="drink-list__grid">
        {drinks.map((drink) => (
          <DrinkCard key={drink.id} drink={drink} className="drink-list__card" />
        ))}
      </div>
    </div>
  );
};
