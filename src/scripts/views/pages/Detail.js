import restaurantSource from '../../data/restaurantSource';
import URLParser from '../../routes/URLParser';
import RestaurantDetail from '../templates/RestaurantDetail';

const Detail = {
  async render() {
    // TODO: Loading Screen
    return '';
  },

  async afterRender() {
    const url = URLParser.parseActiveURLWithoutCombiner();
    const restaurant = await restaurantSource.restaurantDetail(url.id);
    const content = document.querySelector('#content');
    content.appendChild(new RestaurantDetail(restaurant.restaurant));
  },
};

export default Detail;
