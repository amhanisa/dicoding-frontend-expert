import Home from '../views/pages/Home';
import Detail from '../views/pages/Detail';
import Favorite from '../views/pages/Favorite';

const routes = {
  '/': Home,
  '/home': Home,
  '/detail/:id': Detail,
  '/favorite': Favorite,
};

export default routes;
