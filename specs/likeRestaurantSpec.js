/* eslint-disable no-undef */
import FavoriteRestaurantIDB from '../src/scripts/data/FavoriteRestaurantIDB';
import * as TestFactories from './helpers/testFactories';

describe('Liking a Restaurant', () => {
  const addLikeButton = () => {
    document.body.innerHTML = '<div id="like-button"></div>';
  };

  beforeEach(() => {
    addLikeButton();
  });

  it('should show the like button when the restaurant has not been liked before', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

    expect(document.querySelector('[aria-label="like this restaurant"]')).toBeTruthy();
  });

  it('should not show the unlike button when the restaurant has not been liked before', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

    expect(document.querySelector('[aria-label="unlike this restaurant"]')).toBeFalsy();
  });

  it('should be able to like the restaurant', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

    document.querySelector('#like-button').dispatchEvent(new Event('click'));
    const restaurant = await FavoriteRestaurantIDB.getRestaurant(1);

    expect(restaurant).toEqual({ id: 1 });

    FavoriteRestaurantIDB.deleteRestaurant(1);
  });

  it('should not add a restaurant again when its already liked', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

    await FavoriteRestaurantIDB.putRestaurant({ id: 1 });
    document.querySelector('#like-button').dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantIDB.getAllRestaurants()).toEqual([{ id: 1 }]);

    FavoriteRestaurantIDB.deleteRestaurant(1);
  });

  it('should not add a restaurant when it has no id', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({});

    document.querySelector('#like-button').dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantIDB.getAllRestaurants()).toEqual([]);
  });
});
