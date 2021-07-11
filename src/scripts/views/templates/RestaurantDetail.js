/* eslint-disable class-methods-use-this */
import { LitElement, html } from 'lit';
import { Notyf } from 'notyf';
import CONFIG from '../../globals/config';
import './CustomerReview';

class RestaurantDetail extends LitElement {
  static get properties() {
    return {
      restaurant: { type: Object },
      reviews: { type: Array },
    };
  }

  constructor(restaurant) {
    super();
    this.classList.add('card');
    this.restaurant = restaurant;
    this.reviews = restaurant.customerReviews;
  }

  createRenderRoot() {
    return this;
  }

  sendCustomerReview(event) {
    event.preventDefault();
    const newReview = {
      id: this.restaurant.id,
      name: document.getElementById('name').value,
      review: document.getElementById('review').value,
    };

    fetch(`${CONFIG.API_BASE_URL}review`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Auth-Token': '12345',
      },
      method: 'POST',
      body: JSON.stringify(newReview),
    })
      .then((res) => res.json())
      .then((res) => {
        const newCustomerReview = res.customerReviews.pop();
        this.reviews = [...this.reviews, newCustomerReview];
        this.cleanReviewForm();

        const notyf = new Notyf({
          position: {
            x: 'right',
            y: 'top',
          },
        });

        notyf.success('Berhasil menambahkan review');
      })
      .catch(() => {
        const notyf = new Notyf({
          position: {
            x: 'right',
            y: 'top',
          },
        });

        notyf.error('Gagal menambahkan review');
      });
  }

  cleanReviewForm() {
    document.getElementById('name').value = '';
    document.getElementById('review').value = '';
  }

  render() {
    return html`
      <div class="detail-img-wrapper">
        <img
          src="${CONFIG.API_BASE_IMAGE_URL}medium/${this.restaurant.pictureId}"
          class="detail-image"
          alt="${this.restaurant.name}"
        />
        <div class="detail-rating">
          <i class="fas fa-star"></i>
          <span>${this.restaurant.rating}</span>
        </div>
        <div class="detail-overview">
          <h2 class="detail-restaurant-title" id="main-content">${this.restaurant.name}</h2>
          ${this.restaurant.categories.map(
            (category) => html`<span class="restaurant-category">${category.name}</span>`
          )}
        </div>
      </div>
      <div class="container">
        <div class="detail-desc">
          <p class="restaurant-address">${this.restaurant.address}, ${this.restaurant.city}</p>
          <p class="restaurant-desc">${this.restaurant.description}</p>
        </div>
        <div class="detail-menu">
          <h2 class="detail-title">Menu</h2>
          <div class="menu-wrapper">
            <div>
              <p class="menu-title">Foods</p>
              <ul class="menu-list">
                ${this.restaurant.menus.foods.map((food) => html`<li>${food.name}</li>`)}
              </ul>
            </div>
            <div>
              <p class="menu-title">Drinks</p>
              <ul class="menu-list">
                ${this.restaurant.menus.drinks.map((drink) => html`<li>${drink.name}</li>`)}
              </ul>
            </div>
          </div>
        </div>
        <div class="detail-review">
          <h2 class="detail-title">Customer Review</h2>
          <form class="form" @submit=${this.sendCustomerReview}>
            <label for="name" class="form-label">Nama Anda</label>
            <input
              type="text"
              name="name"
              id="name"
              class="form-input"
              placeholder="Nama Anda"
              required
            />
            <label for="review" class="form-label">Review</label>
            <textarea
              name="review"
              id="review"
              class="form-textarea"
              placeholder="Tuliskan review anda"
              required
            ></textarea>
            <input type="submit" class="form-submit" value="SUBMIT" />
          </form>
          <customer-review .reviews=${this.reviews}></customer-review>
        </div>
      </div>
    `;
  }
}

customElements.define('restaurant-detail', RestaurantDetail);

export default RestaurantDetail;
