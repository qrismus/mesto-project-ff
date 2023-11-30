import './pages/index.css';
// import {initialCards} from './components/cards.js';
import * as global from './components/global.js';
import {createCard, changeLike} from './components/card.js';
import {closeModal, openModal, closeModalOverlay} from './components/modal.js';
import {enableValidation, clearValidation} from './components/validation.js';
import {getUserInfo, getInitialCards, updateUserInfo, updateNewCard, deleteCard, updateUserAvatar, dislikeCard, likeCard} from './components/api.js';

// добавление в контейнер карточки, проверка карточки на ее местоположение
function renderCard(cardItem, container, place = 'end') {
    if (place === 'end') {
        container.append(createCard(cardItem, handleOpenDeletePopup, handleLikeCard, handleOpenImage, myId));
    } else {
        container.prepend(createCard(cardItem, handleOpenDeletePopup, handleLikeCard, handleOpenImage, myId));
    }
};

let myId = null;
// вывод карточек на страницу
Promise.all([getUserInfo(), getInitialCards()])
.then(([user, cards]) => {
    myId = user['_id'];
    global.profileName.textContent = user.name;
    global.profileJob.textContent = user.about;
    global.profileImage.style.backgroundImage = `url('${user.avatar}')`;
    //обработка данных пользователя и карточек
    cards.forEach((element) => {
        renderCard(element, global.cardContainer);
    })
})
.catch((err) => {
    console.error(err)
});

// открытие попапа редактирования аватарки
global.avatarButtonOpenForm.addEventListener('click', () => {
    global.avatarForm.reset();
    clearValidation(global.avatarForm, global.validationConfig);
    openModal(global.popupTypeAvatar);
});

// открытие попапа профиля с именем и описанием
global.profileEditButton.addEventListener('click', () => {
    global.profileNameInput.value = global.profileName.textContent;
    global.profileJobInput.value = global.profileJob.textContent;
    clearValidation(global.profileForm, global.validationConfig);
    openModal(global.popupTypeEditProfile);
});

// открытие попапа "добавить карточку"
global.profileAddButton.addEventListener('click', () => {
    global.cardForm.reset();
    clearValidation(global.cardForm, global.validationConfig);
    openModal(global.popupTypeNewCard);
});

let cardToDelete = null;
//открытие попапа подтверждения удаления карточки
function handleOpenDeletePopup(id, card) {
    cardToDelete = card;
    openModal(global.popupTypeDeleteCard);
};

// открытие картинки 
function handleOpenImage(evt){
    global.popupImage.src = evt.target.src;
    global.popupImage.alt = global.popupCaption.textContent = evt.target.alt;
    openModal(poputTypeImage);
};

// закрытие попапов
document.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__close')) {
        closeModal(evt.target.closest('.popup'));
    }
});

// закрытие через оверлей
global.popupTypeEditProfile.addEventListener('click', closeModalOverlay)
global.popupTypeNewCard.addEventListener('click', closeModalOverlay);
global.poputTypeImage.addEventListener('click', closeModalOverlay);
global.popupTypeDeleteCard.addEventListener('click', closeModalOverlay);
global.popupTypeAvatar.addEventListener('click', closeModalOverlay);

// функция редактирования профиля с сохранением данных и закрытием попапа
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    global.profileSaveButton.textContent = 'Сохранение...';
    updateUserInfo(global.profileNameInput.value, global.profileJobInput.value)
    .then((data) => {
        global.profileName.textContent = data.name;
        global.profileJob.textContent = data.about;
        closeModal(global.popupTypeEditProfile);
    })
    .catch((err) => {
        console.error(err)
    })
    .finally(() =>{
        global.profileSaveButton.textContent = 'Сохранить';
    })
};
global.profileForm.addEventListener('submit', handleProfileFormSubmit);

// функция редактирования аватарки
function handleAvatar(evt) {
    evt.preventDefault();
    global.avatarSaveButton.textContent = 'Сохранение...';
    updateUserAvatar(global.avatarUrlInput.value)
    .then((data) => {
        global.profileImage.style.backgroundImage = `url('${data.avatar}')`;
        closeModal(global.popupTypeAvatar);
    })
    .catch((err) => {
        console.error(err)
    })
    .finally(() => {
        global.avatarSaveButton.textContent = 'Сохранить';
    })
};
global.avatarForm.addEventListener('submit', handleAvatar);

// добавление новой карточки 
function handleCardFormSubmit(evt) {
    evt.preventDefault();
    global.cardSaveButton.textContent = 'Сохранение...';
    const card = {
        name: global.cardNameInput.value,
        link: global.cardUrlInput.value,
    };
    updateNewCard(card.name, card.link)
    .then((data) => {
        renderCard(data, global.cardContainer, 'start');
        closeModal(global.popupTypeNewCard);
        global.cardForm.reset();
    })
    .catch((err) => {
        console.error(err)
    })
    .finally(() =>{
        global.cardSaveButton.textContent = 'Сохранить';
    })
};
global.cardForm.addEventListener('submit', handleCardFormSubmit);

// функция удаления карточки
function removeCard(evt) {
    evt.preventDefault();
    const cardId = cardToDelete.id;
    deleteCard(cardId)
    .then(() => {
        cardToDelete.remove();
        closeModal(global.popupTypeDeleteCard);
    })
    .catch((err) => {
        console.error(err);
    })
    .finally(() => {
        cardToDelete = null;
    })
};
global.deleteCardForm.addEventListener('submit', removeCard);

// функция лайка
function handleLikeCard(likeButton, like, cardId, status) {
    if(!status) {
        likeCard(cardId)
        .then((res) => {
            changeLike(res, likeButton, like);
        })
        .catch((err) => {
            console.error(err);
        });
    } else {
        dislikeCard(cardId)
        .then((res) => {
            changeLike(res, likeButton, like);
        })
        .catch((err) => {
            console.error(err);
        });
    }
};

enableValidation(global.validationConfig);