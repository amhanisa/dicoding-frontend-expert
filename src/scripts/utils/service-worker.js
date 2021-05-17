/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-globals */
import 'regenerator-runtime'; /* for async await transpile */
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, NetworkFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { skipWaiting, clientsClaim } from 'workbox-core';

skipWaiting();
clientsClaim();

precacheAndRoute(
  [
    ...self.__WB_MANIFEST,
    {
      url: 'https://fonts.googleapis.com/css2?family=Kanit:wght@300;500&display=swap',
      revision: '1',
    },
    {
      url: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css',
      revision: '1',
    },
  ],
  {
    ignoreURLParametersMatching: [/.*/],
  }
);

registerRoute(
  /https:\/\/restaurant-api.dicoding.dev\/images/,
  new StaleWhileRevalidate({
    cacheName: 'restaurant-images',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
      }),
    ],
  })
);

registerRoute(
  /https:\/\/restaurant-api.dicoding.dev\/?(list|detail)/,
  new NetworkFirst({
    cacheName: 'restaurant-api',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
      }),
    ],
  })
);
