import { Notyf } from 'notyf';
import FavoriteRestaurantIDB from '../data/FavoriteRestaurantIDB';
import { createLikeButton, createUnlikeButton } from '../views/templates/LikeButton';

const LikeButtonPresenter = {
  async init({ likeButtonContainer, restaurant }) {
    this.likeButtonContainer = likeButtonContainer;
    this.restaurant = restaurant;
    await this.renderButton();
  },

  async renderButton() {
    const { id } = this.restaurant;

    if (await this.isRestaurantExist(id)) {
      this.renderUnlike();
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

      const notyf = new Notyf({
        position: {
          x: 'right',
          y: 'top',
        },
      });

      notyf.success('Restaurant ditambahkan ke daftar favorite');

      this.renderButton();
    });
  },

  renderUnlike() {
    this.likeButtonContainer.innerHTML = createUnlikeButton();

    const likeButton = document.querySelector('#like-button');
    likeButton.addEventListener('click', () => {
      FavoriteRestaurantIDB.deleteRestaurant(this.restaurant.id);

      const notyf = new Notyf({
        position: {
          x: 'right',
          y: 'top',
        },
      });

      notyf.success('Restaurant dihapus dari daftar favorite');

      this.renderButton();
    });
  },
};

export default LikeButtonPresenter;
