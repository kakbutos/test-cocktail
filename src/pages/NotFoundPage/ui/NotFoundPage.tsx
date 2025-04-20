import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFoundPage.scss';

export const NotFoundPage: FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="not-found">
      <div className="not-found__container">
        <h1 className="not-found__code">404</h1>
        <h2 className="not-found__title">Страница не найдена</h2>
        <p className="not-found__text">
          Извините, но запрашиваемая страница не существует или была перемещена.
        </p>
        <button onClick={handleGoHome} className="not-found__button">
          Вернуться на главную
        </button>
      </div>
    </div>
  );
};
