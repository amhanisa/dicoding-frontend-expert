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
      <div class="container">
        <img
          src="${CONFIG.API_BASE_IMAGE_URL}medium/${this.restaurant.pictureId}"
          class="card-image"
          alt="${this.restaurant.name}"
        />
        <div class="detail-overview">
          <span class="detail-rating">${this.restaurant.rating} / 5.0</span>
          <h2 class="card-title" id="main-content">${this.restaurant.name}</h2>
          <p class="card-subtitle">${this.restaurant.address}</p>
          <p class="card-subtitle">${this.restaurant.city}</p>

          ${this.restaurant.categories.map(
            (category) => html`<span class="restaurant-category">${category.name}</span>`
          )}

          <p class="card-desc">${this.restaurant.description}</p>
        </div>
        <div class="detail-menu">
          <h2 class="detail-title">Menu</h2>

          <div class="menu-wrapper">
            <div>
              <p class="menu-title">
                Foods
              </p>
              <ol class="menu-list">
                ${this.restaurant.menus.foods.map((food) => html`<li>${food.name}</li>`)}
              </ol>
            </div>
            <div>
              <p class="menu-title">
                Drinks
              </p>
              <ol class="menu-list">
                ${this.restaurant.menus.drinks.map((drink) => html`<li>${drink.name}</li>`)}
              </ol>
            </div>
          </div>
        </div>
        <div class="detail-review">
          <h2 class="detail-title">Customer Review</h2>
          
            <form class="form" @submit=${this.sendCustomerReview}>
              <label for="name" class="form-label" >Nama Anda</label>
              <input type="text" name="name" id="name" class="form-input" placeholder="Nama Anda" required>
              <label for="review" class="form-label">Review</label>
              <textarea name="review" id="review" class="form-textarea" placeholder="Tuliskan review anda" required></textarea>
              <input type="submit" class="form-submit">
            </form>

          <customer-review .reviews=${this.reviews}>
        </div>
      </div>
    `;
  }
}

customElements.define('restaurant-detail', RestaurantDetail);

export default RestaurantDetail;
