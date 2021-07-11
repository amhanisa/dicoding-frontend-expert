/* eslint-disable no-undef */
import FavoriteRestaurantIDB from '../src/scripts/data/FavoriteRestaurantIDB';
import * as TestFactories from './helpers/testFactories';

const addLikeButton = () => {
  document.body.innerHTML = '<div id="like-button"></div>';
};

describe('Unliking a Restaurant', () => {
  beforeEach(async () => {
    addLikeButton();
    await FavoriteRestaurantIDB.putRestaurant({ id: 1 });
  });

  afterEach(async () => {
    await FavoriteRestaurantIDB.deleteRestaurant(1);
  });

  it('should display unlike widget when the restaurant has been liked', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

    expect(document.querySelector('[aria-label="unlike this restaurant"]')).toBeTruthy();
  });

  it('should not display like widget when the restaurant has been liked', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

    expect(document.querySelector('[aria-label="like this restaurant"]')).toBeFalsy();
  });

  it('should be able to remove liked movie from the list', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

    document.querySelector('#like-button').dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantIDB.getAllRestaurants()).toEqual([]);
  });

  it('should not throw error if the unliked movie is not in the list', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

    await FavoriteRestaurantIDB.deleteRestaurant(1);

    document
      .querySelector('[aria-label="unlike this restaurant"]')
      .dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantIDB.getAllRestaurants()).toEqual([]);
  });
});
