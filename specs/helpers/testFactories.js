/* eslint-disable import/prefer-default-export */
import LikeButtonPresenter from '../../src/scripts/utils/LikeButtonPresenter';

const createLikeButtonPresenterWithRestaurant = async (restaurant) => {
  await LikeButtonPresenter.init({
    likeButtonContainer: document.querySelector('#like-button'),
    restaurant,
  });
};

export { createLikeButtonPresenterWithRestaurant };
