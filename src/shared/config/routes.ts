import { CocktailCode } from './cocktails';

type RoutePathsType = Record<CocktailCode | 'not_found', string>;

export const RoutePaths: RoutePathsType = {
  margarita: '/margarita',
  mojito: '/mojito',
  a1: '/a1',
  kir: '/kir',
  not_found: '*',
};
