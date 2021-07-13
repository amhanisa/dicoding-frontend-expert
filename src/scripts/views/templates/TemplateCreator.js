/* eslint-disable import/prefer-default-export */
const createSkeletonCatalogTemplate = (count) => {
  let template = '';

  for (let i = 0; i < count; i += 1) {
    template += `
    <div class="card">
      <div class="card-content">
        <div class="card-image-wrapper">
        <img src="images/placeholder.png" class="card-image" alt="placeholder" />
        <span class="card-rating">
            <i class="fas fa-star"></i>
            <span>5</span>
        </span>
        </div>
        <div class="card-body">
          <h2 class="card-title">Restaurant Name</h2>
          <p class="card-subtitle">Lorem Ipsum</p>
          <p class="card-desc">Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet</p>
        </div>
      </div>
    </div>`;
  }

  return template;
};

export { createSkeletonCatalogTemplate };
