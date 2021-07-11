/* eslint-disable no-undef */
const assert = require('assert');

Feature('Liking Restaurants');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty liked restaurant', ({ I }) => {
  I.see('Belum ada restoran favorit', '#no-favorite');
});

Scenario('liking a restaurant', async ({ I }) => {
  I.see('Belum ada restoran favorit', '#no-favorite');

  I.amOnPage('/');
  I.seeElement('.card-title');
  const firstRestaurant = locate('.card-title').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.seeElement('#like-button');
  I.click('#like-button');

  I.amOnPage('/#/favorite');
  I.seeElement('restaurant-card');

  const likedRestaurantTitle = await I.grabTextFrom('.card-title');

  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);
});

Scenario('unliking a restaurant', async ({ I }) => {
  I.see('Belum ada restoran favorit', '#no-favorite');

  I.amOnPage('/');
  I.seeElement('.card-title');
  const firstRestaurant = locate('.card-title').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.seeElement('#like-button');
  I.click('#like-button');

  I.amOnPage('/#/favorite');
  I.seeElement('restaurant-card');

  const likedRestaurantTitle = await I.grabTextFrom('.card-title');

  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);

  I.click(likedRestaurantTitle);

  I.seeElement('#like-button');
  I.click('#like-button');

  I.amOnPage('/#/favorite');
  I.see('Belum ada restoran favorit', '#no-favorite');
});

Scenario('add customer review', async ({ I }) => {
  I.see('Belum ada restoran favorit', '#no-favorite');

  I.amOnPage('/');
  I.seeElement('.card-title');
  I.click(locate('.card-title').first());

  const name = 'Azka';
  const review = 'E2E Testing';

  I.fillField('#name', name);
  I.fillField('#review', review);

  I.click('.form-submit');

  I.see('Berhasil menambahkan review', '.notyf-announcer');

  const submittedName = await I.grabTextFrom(locate('.customer-name').first());
  const submittedReview = await I.grabTextFrom(locate('.customer-review').first());

  assert.strictEqual(name, submittedName);
  assert.strictEqual(review, submittedReview);
});
