import FavoriteRestaurantIDB from '../data/FavoriteRestaurantIDB';
import { createLikeButton, createLikedButton } from '../views/templates/LikeButton';

const LikeButtonInitiator = {
  async init({ likeButtonContainer, restaurant }) {
    this.likeButtonContainer = likeButtonContainer;
    this.restaurant = restaurant;
    await this.renderButton();
  },

  async renderButton() {
    const { id } = this.restaurant;

    if (await this.isRestaurantExist(id)) {
      this.renderLiked();
    } else {
      this.renderLike();
    }
  },

  async isRestaurantExist(id) {
    const restaurant = await FavoriteRestaurantIDB.getRestaurant(id);
    return !!restaurant;
  },

  renderLike() {
    this.likeButtonContainer.innerHTML = createLikeButton();

    const likeButton = document.querySelector('#like-button');
    likeButton.addEventListener('click', () => {
      FavoriteRestaurantIDB.putRestaurant(this.restaurant);
      this.renderButton();
    });
  },

  renderLiked() {
    this.likeButtonContainer.innerHTML = createLikedButton();

    const likeButton = document.querySelector('#like-button');
    likeButton.addEventListener('click', () => {
      FavoriteRestaurantIDB.deleteRestaurant(this.restaurant.id);
      this.renderButton();
    });
  },
};

export default LikeButtonInitiator;
