import { Notyf } from 'notyf';
import restaurantSource from '../../data/restaurantSource';
import RestaurantCard from '../templates/RestaurantCard';
import { createSkeletonCatalogTemplate } from '../templates/TemplateCreator';

const Home = {
  async render() {
    return `
      <section class="hero"> 
        <h1>ETSUKO</h1>
        <p>Search your favorite Japanese restaurant in Indonesia</p>
      </section>
      <section class="explore-section" id="main-content">
        <div class="container">
          <h2 class="title">Explore Restaurant</h2>
          <div class="loading-ring"></div>
          <div class="catalog" id="resto-catalog">
          ${createSkeletonCatalogTemplate(20)}
          </div>
        </div>
      </section>
    `;
  },

  async afterRender() {
    try {
      const restaurants = await restaurantSource.restaurantList();
      const restaurantCatalog = document.querySelector('#resto-catalog');
      restaurantCatalog.innerHTML = '';

      const loading = document.querySelector('.loading-ring');
      loading.classList.add('hide');

      restaurants.forEach((restaurant) => {
        restaurantCatalog.appendChild(new RestaurantCard(restaurant));
      });
    } catch (err) {
      const notyf = new Notyf({
        position: {
          x: 'right',
          y: 'top',
        },
      });

      notyf.error('Gagal Memuat Data');
    }
  },
};

export default Home;
