const createLikeButton = () => `
    <button class="like-button" id="like-button">
        <i class="far fa-heart" aria-hidden="true"></i>
    </button>
    `;

const createLikedButton = () => `
    <button class="like-button" id="like-button">
        <i class="fas fa-heart" aria-hidden="true"></i>
    </button>
    `;

export { createLikeButton, createLikedButton };
