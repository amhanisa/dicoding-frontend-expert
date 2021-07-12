import { LitElement, html } from 'lit';
import CONFIG from '../../globals/config';

class RestaurantCard extends LitElement {
  static get properties() {
    return {
      restaurant: { type: Object },
    };
  }

  constructor(restaurant) {
    super();
    this.classList.add('card');
    this.id = restaurant.id;
    this.name = restaurant.name;
    this.description = restaurant.description;
    this.city = restaurant.city;
    this.pictureId = restaurant.pictureId;
    this.rating = restaurant.rating;
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <a href="#/detail/${this.id}" class="card-content">
        <div class="card-image-wrapper">
          <img
            src="images/placeholder.png"
            data-src="${CONFIG.API_BASE_IMAGE_URL}small/${this.pictureId}"
            class="card-image lazyload"
            alt="${this.name}"
          />
          <span class="card-rating">
            <i class="fas fa-star"></i>
            <span>${this.rating}</span>
          </span>
        </div>
        <div class="card-body">
          <h2 class="card-title">${this.name}</h2>
          <p class="card-subtitle">${this.city}</p>
          <p class="card-desc">${this.description}</p>
        </div>
      </a>
    `;
  }
}

customElements.define('restaurant-card', RestaurantCard);

export default RestaurantCard;
