/* eslint-disable no-undef */
import { itActsAsFavoriteRestaurantModel } from './contract/favoriteRestaurantContract';
import FavoriteRestaurantIDB from '../src/scripts/data/FavoriteRestaurantIDB';

describe('Favorite Restaurant IDB Contract Test Implementation', () => {
  afterEach(async () => {
    (await FavoriteRestaurantIDB.getAllRestaurants()).forEach(async (restaurant) => {
      await FavoriteRestaurantIDB.deleteRestaurant(restaurant.id);
    });
  });

  itActsAsFavoriteRestaurantModel(FavoriteRestaurantIDB);
});
