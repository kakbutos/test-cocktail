import { api } from '../../../shared/api/api';
import { Drink } from '../../../entities/drink/model/types/drink';

export const getDrinkDetails = async (id: string): Promise<Drink> => {
  const response = await api.get(`/lookup.php?i=${id}`);
  const drinkData = response.data.drinks[0];

  if (!drinkData) {
    throw new Error('Напиток не найден');
  }

  const ingredients: { name: string; measure: string }[] = [];

  for (let i = 1; i <= 15; i++) {
    const ingredient = drinkData[`strIngredient${i}`];
    const measure = drinkData[`strMeasure${i}`];

    if (ingredient) {
      ingredients.push({
        name: ingredient,
        measure: measure || '',
      });
    }
  }

  return {
    id: drinkData.idDrink,
    name: drinkData.strDrink,
    category: drinkData.strCategory,
    isAlcoholic: drinkData.strAlcoholic === 'Alcoholic',
    glass: drinkData.strGlass,
    instructions: drinkData.strInstructions,
    thumb: drinkData.strDrinkThumb,
    ingredients,
  };
};
