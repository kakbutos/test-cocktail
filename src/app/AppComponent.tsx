import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { RoutePaths } from '../shared/config/routes';
import { Loader } from '../shared/ui/Loader/Loader';
import { NavBar } from '../widgets/NavBar/ui/NavBar';
import '../shared/assets/styles/global.scss';

const DrinkDetailsPage = lazy(() =>
  import('../features/drink-details/ui/DrinkDetailsPage').then((module) => ({
    default: module.DrinkDetailsPage,
  }))
);
const DrinkListPage = lazy(() =>
  import('../pages/DrinkListPage/ui/DrinkListPage').then((module) => ({
    default: module.DrinkListPage,
  }))
);
const NotFoundPage = lazy(() =>
  import('../pages/NotFoundPage').then((module) => ({ default: module.NotFoundPage }))
);

export const App = () => {
  return (
    <div className="app">
      <NavBar />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Navigate to={RoutePaths.margarita} replace />} />

          <Route path="/drink/:id" element={<DrinkDetailsPage />} />

          <Route path="/:cocktailCode" element={<DrinkListPage />} />

          <Route path={RoutePaths.not_found} element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
};
