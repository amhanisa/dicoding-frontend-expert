const createLikeButton = () => `
    <button aria-label="like this restaurant" class="like-button" id="like-button">
        <i class="far fa-heart" aria-hidden="true"></i>
    </button>
    `;

const createUnlikeButton = () => `
    <button aria-label="unlike this restaurant" class="like-button" id="like-button">
        <i class="fas fa-heart" aria-hidden="true"></i>
    </button>
    `;

export { createLikeButton, createUnlikeButton };
