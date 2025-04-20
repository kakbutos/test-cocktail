export interface Ingredient {
  name: string;
  measure: string;
}

export interface Drink {
  id: string;
  name: string;
  category: string;
  isAlcoholic: boolean;
  glass: string;
  instructions: string;
  thumb: string;
  ingredients: Ingredient[];
}
