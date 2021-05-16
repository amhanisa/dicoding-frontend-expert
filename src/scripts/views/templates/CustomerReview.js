import { LitElement, html } from 'lit';

class CustomerReview extends LitElement {
  constructor() {
    super();
    this.reviews = [];
  }

  static get properties() {
    return {
      reviews: { type: Array },
    };
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html` ${this.reviews
      .map(
        (review) =>
          html`
            <div class="review-box">
              <strong class="customer-name">${review.name}</strong>
              <p class="customer-review">${review.review}</p>
              <p class="review-date">${review.date}</p>
            </div>
          `
      )
      .reverse()}`;
  }
}

customElements.define('customer-review', CustomerReview);

export default CustomerReview;
