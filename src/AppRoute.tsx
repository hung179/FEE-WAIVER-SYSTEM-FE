import { useRoutes } from 'react-router-dom';
import { routes } from './common/routes/routes';

export default function AppRoutes() {
  const element = useRoutes(routes);
  return element;
}
