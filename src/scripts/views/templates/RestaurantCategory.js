import { LitElement, html } from 'lit';

class RestaurantCategory extends LitElement {
  static get properties() {
    return {
      category: { type: Object },
    };
  }

  constructor(category) {
    super();
    this.classList.add('card-category');
    this.id = category.id;
    this.name = category.name;
    this.image = category.image;
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <a href="#" class="card-category">
        <div class="img-wrapper">
          <img src="./images/${this.image}" alt="${this.name}" />
        </div>
        <div class="category-body">
          <p class="category-text">${this.name}</p>
        </div>
      </a>
    `;
  }
}

customElements.define('restaurant-category', RestaurantCategory);

export default RestaurantCategory;
