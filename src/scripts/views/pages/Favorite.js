import FavoriteRestaurantIDB from '../../data/FavoriteRestaurantIDB';
import RestaurantCard from '../templates/RestaurantCard';

const Favorite = {
  async render() {
    return `
    <section class="explore-section">
      <div class="container">
        <h2 class="title">Favorite Restaurant</h2>
        <div id="no-favorite">Belum ada restoran favorit</div>
        <div class="catalog" id="resto-catalog">
        </div>
      </div>
    </section>
    `;
  },

  async afterRender() {
    const restaurants = await FavoriteRestaurantIDB.getAllRestaurants();

    if (restaurants.length > 0) {
      const noFavorite = document.querySelector('#no-favorite');
      noFavorite.style.display = 'none';

      const restaurantCatalog = document.querySelector('#resto-catalog');
      restaurants.forEach((restaurant) => {
        restaurantCatalog.appendChild(new RestaurantCard(restaurant));
      });
    }
  },
};

export default Favorite;
