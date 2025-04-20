export type CocktailCode = 'margarita' | 'mojito' | 'a1' | 'kir';

export interface CocktailInfo {
  name: string;
  path: string;
  code: CocktailCode;
}

export const COCKTAILS: CocktailInfo[] = [
  { name: 'Margarita', path: '/margarita', code: 'margarita' },
  { name: 'Mojito', path: '/mojito', code: 'mojito' },
  { name: 'A1', path: '/a1', code: 'a1' },
  { name: 'Kir', path: '/kir', code: 'kir' },
];

export const DEFAULT_COCKTAIL: CocktailCode = 'margarita';
