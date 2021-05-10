import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.scss';
import data from '../DATA.json';
import category from '../category.json';
import App from './views/app';

const app = new App({
  button: document.querySelector('#nav-toggle'),
  drawer: document.querySelector('#nav'),
  content: document.querySelector('#content'),
});

const catalog = document.querySelector('#resto-catalog');

const restaurantList = data.restaurants
  .map(
    (restaurant) =>
      `
      <a href="#" class="card" id="main-content">
          <div class="card-image-wrapper">
            <img src="${restaurant.pictureId}" class="card-image" alt="${restaurant.name}">
          </div>
      <div class="card-body">
          <span class="card-rating">${restaurant.rating} / 5.0</span>
          <h2 class="card-title">${restaurant.name}</h2>
          <p class="card-subtitle">${restaurant.city}</p>
          <p class="card-desc">${restaurant.description}</p>
      </div>
      </a>
      `
  )
  .join('');

catalog.innerHTML = restaurantList;

const foodCategory = document.querySelector('#food-category');

const categoryList = category.category
  .map((category) => {
    return `
  <a href="#" class="card-category">
  <div class="img-wrapper">
      <img src="${'./images/' + category.image}" alt="${category.name}">
  </div>
  <div class="category-body">
      <p class="category-text">${category.name}</p>
  </div>
  </a>`;
  })
  .join('');

foodCategory.innerHTML = categoryList;
