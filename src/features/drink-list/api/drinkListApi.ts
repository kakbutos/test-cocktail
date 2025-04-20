import { api } from '../../../shared/api/api';
import { Drink } from '../../../entities/drink/model/types/drink';
import { CocktailCode } from '../../../shared/config/cocktails';

interface DrinkDTO {
  idDrink: string;
  strDrink: string;
  strCategory: string;
  strAlcoholic: string;
  strGlass: string;
  strInstructions: string;
  strDrinkThumb: string;
  [key: string]: string | null;
}

export const getDrinkList = async (cocktailCode: CocktailCode): Promise<Drink[]> => {
  const response = await api.get(`/search.php?s=${cocktailCode}`);
  const drinkData = response.data.drinks as DrinkDTO[];

  if (!drinkData) {
    return [];
  }

  return drinkData.map((drink) => {
    const ingredients: { name: string; measure: string }[] = [];

    for (let i = 1; i <= 15; i++) {
      const ingredient = drink[`strIngredient${i}`];
      const measure = drink[`strMeasure${i}`];

      if (ingredient) {
        ingredients.push({
          name: ingredient,
          measure: measure || '',
        });
      }
    }

    return {
      id: drink.idDrink,
      name: drink.strDrink,
      category: drink.strCategory,
      isAlcoholic: drink.strAlcoholic === 'Alcoholic',
      glass: drink.strGlass,
      instructions: drink.strInstructions,
      thumb: drink.strDrinkThumb,
      ingredients,
    };
  });
};
