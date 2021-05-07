import "regenerator-runtime"; /* for async await transpile */
import "../styles/main.scss";
import data from "../DATA.json";
import category from "../category.json";

const navigationElement = document.querySelector("#nav");
const navToggle = document.querySelector("#nav-toggle");

navToggle.addEventListener("click", (event) => {
  navigationElement.classList.toggle("open");
  event.stopPropagation;
});

const catalog = document.querySelector("#resto-catalog");

const truncateString = (str, num) => {
  if (str.length > num) {
    return str.slice(0, num) + "...";
  } else {
    return str;
  }
};

const restaurantList = data.restaurants
  .map((restaurant) => {
    return `
  <div class="card">
      <div class="card-image-wrapper">
        <img src="${restaurant.pictureId}" class="card-image" alt="${
      restaurant.name
    }">
      </div>
  <div class="card-body">
      <span class="card-rating">${restaurant.rating} / 5.0</span>
      <h2 class="card-title">${restaurant.name}</h2>
      <p class="card-subtitle">${restaurant.city}</p>
      <p class="card-desc">${truncateString(restaurant.description, 100)}</p>
  </div>
  </div>`;
  })
  .join("");

catalog.innerHTML = restaurantList;

const foodCategory = document.querySelector("#food-category");

const categoryList = category.category
  .map((category) => {
    return `
  <div class="card-category">
  <div class="img-wrapper">
      <img src="${"./images/" + category.image}" alt="${category.name}">
  </div>
  <div class="category-body">
      <p class="category-text">${category.name}</p>
  </div>
  </div>`;
  })
  .join("");

foodCategory.innerHTML = categoryList;