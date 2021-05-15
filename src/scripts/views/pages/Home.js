import restaurantSource from '../../data/restaurantSource';
import RestaurantCard from '../templates/RestaurantCard';

const Home = {
  async render() {
    return `
    <section class="hero">
      <h1>Etsuko</h1>
      <p>Search your favorite Japanese restaurant in Indonesia</p>
    </section>
    <section class="explore-section">
      <div class="container">
        <h2 class="title">Explore Restaurant</h2>
        <div class="catalog" id="resto-catalog">
        </div>
      </div>
    </section>
    <section class="category-section">
      <div class="container">
        <h2 class="title">Restaurant Category</h2>
        <div class="catalog" id="food-category">
        </div>
      </div>
    </section>
    `;
  },

  async afterRender() {
    const restaurants = await restaurantSource.restaurantList();
    const restaurantCatalog = document.querySelector('#resto-catalog');
    restaurants.forEach((restaurant) => {
      restaurantCatalog.appendChild(new RestaurantCard(restaurant));
    });
  },
};

export default Home;
