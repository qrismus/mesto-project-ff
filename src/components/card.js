const cardTemplate = document.querySelector('#card-template').content;

// функция создания карточки
function createCard(card, openDeleteFunc, likeFunction, openImage, myId) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const cardLikeButton = cardElement.querySelector('.card__like-button');
    const cardLike = cardElement.querySelector('.card__like');
    
    cardImage.src = card.link;
    cardImage.alt = card.name;
    cardTitle.textContent = card.name;
    cardLike.textContent = card.likes.length;

    cardImage.addEventListener('click', openImage);

    if (card.owner['_id'] != myId) {
        deleteButton.style.display = 'none';
    } else {
        deleteButton.style.display = 'block';
    };
    deleteButton.addEventListener('click', () => {
        openDeleteFunc(card['_id'], cardElement);
    });

    const searchId = card.likes.some((like) => like['_id'] === myId);
    if (searchId) {
        cardLikeButton.classList.add('card__like-button_is-active');
    }
    cardLikeButton.addEventListener('click', () => {
        likeFunction(cardLikeButton, cardLike, card['_id'], checkStatusLike(cardLikeButton));
    })

    cardElement.id = card['_id'];

    return cardElement;
};

function checkStatusLike(likeButton) {
    let status = false;
    if (likeButton.classList.contains('card__like-button_is-active')) {
        status = true;
    }
    return status;
};

function changeLike(res, likeButton, like) {
    likeButton.classList.toggle('card__like-button_is-active');
    like.textContent = res.likes.length;
};

export{createCard, changeLike};