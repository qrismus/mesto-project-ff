export{createCard, deleteCard, likeCard};

const cardTemplate = document.querySelector('#card-template').content;

// функция создания карточки
function createCard(card, deleteFunction, likeFunction, openImage) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const cardLikeButton = cardElement.querySelector('.card__like-button');

    cardImage.src = card.link;
    cardImage.alt = card.name;
    cardTitle.textContent = card.name;

    deleteButton.addEventListener('click', deleteFunction);
    cardLikeButton.addEventListener('click', likeFunction);
    cardImage.addEventListener('click', openImage);
    
    return cardElement;
};

// функция удаления карточки
function deleteCard(evt) {
    const cardDelete = evt.target.closest('.card');
    cardDelete.remove();
};

// функция лайка
function likeCard(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
};
