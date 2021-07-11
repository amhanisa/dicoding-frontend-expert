import { Notyf } from 'notyf';
import restaurantSource from '../../data/restaurantSource';
import URLParser from '../../routes/URLParser';
import LikeButtonPresenter from '../../utils/LikeButtonPresenter';
import RestaurantDetail from '../templates/RestaurantDetail';

const Detail = {
  async render() {
    return `
      <div class="loading-ring"></div>
      <div id="restaurantContainer"></div>
      <div id="likeButtonContainer"></div>
    `;
  },

  async afterRender() {
    const url = URLParser.parseActiveURLWithoutCombiner();
    try {
      const restaurant = await restaurantSource.restaurantDetail(url.id);
      const restaurantContainer = document.querySelector('#restaurantContainer');
      restaurantContainer.appendChild(new RestaurantDetail(restaurant.restaurant));

      const loading = document.querySelector('.loading-ring');
      loading.classList.add('hide');

      LikeButtonPresenter.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
        restaurant: restaurant.restaurant,
      });
    } catch (err) {
      const notyf = new Notyf({
        position: {
          x: 'right',
          y: 'top',
        },
      });

      notyf.error('Gagal memuat data');
    }
  },
};

export default Detail;
