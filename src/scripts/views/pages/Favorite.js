import FavoriteRestaurantIDB from '../../data/FavoriteRestaurantIDB';
import RestaurantCard from '../templates/RestaurantCard';

const Favorite = {
  async render() {
    return `
    <section class="explore-section">
      <div class="container">
        <h2 class="title">Favorite Restaurant</h2>
        <div class="catalog" id="resto-catalog">
        </div>
      </div>
    </section>
    `;
  },

  async afterRender() {
    const restaurants = await FavoriteRestaurantIDB.getAllRestaurants();
    console.log(restaurants);
    const restaurantCatalog = document.querySelector('#resto-catalog');
    restaurants.forEach((restaurant) => {
      restaurantCatalog.appendChild(new RestaurantCard(restaurant));
    });
  },
};

export default Favorite;
