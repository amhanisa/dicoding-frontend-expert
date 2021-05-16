import restaurantSource from '../../data/restaurantSource';
import URLParser from '../../routes/URLParser';
import LikeButtonInitiator from '../../utils/LikeButtonInitiator';
import RestaurantDetail from '../templates/RestaurantDetail';

const Detail = {
  async render() {
    // TODO: Loading Screen
    return `
      <div id="restaurantContainer"></div>
      <div id="likeButtonContainer"></div>
    `;
  },

  async afterRender() {
    const url = URLParser.parseActiveURLWithoutCombiner();
    const restaurant = await restaurantSource.restaurantDetail(url.id);
    const restaurantContainer = document.querySelector('#restaurantContainer');
    restaurantContainer.appendChild(new RestaurantDetail(restaurant.restaurant));

    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: restaurant.restaurant,
    });
  },
};

export default Detail;
