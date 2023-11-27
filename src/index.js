import './pages/index.css';
// import {initialCards} from './components/cards.js';
import {createCard, handleLikeCard} from './components/card.js';
import {closeModal, openModal, closeModalOverlay} from './components/modal.js';
import {enableValidation, clearValidation} from './components/validation.js';
import {getUserInfo, getInitialCards, updateUserInfo, updateNewCard, deleteCard, updateUserAvatar} from './components/api.js';


// профиль
const profileName = document.querySelector('.profile__title');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileJob = document.querySelector('.profile__description');
const profileAddButton = document.querySelector('.profile__add-button');

// контейнер карточек
const cardContainer = document.querySelector('.places__list');

// попап редактирование профиля
const popupTypeEditProfile = document.querySelector('.popup_type_edit');
const profileForm = document.forms['edit-profile'];
const profileNameInput = profileForm.querySelector('.popup__input_type_name');
const profileJobInput = profileForm.querySelector('.popup__input_type_description');
const profileImage = document.querySelector('.profile__image');
const profileSaveButton = profileForm.querySelector('.popup__button')

// попап добавление новой карточки
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const cardForm = document.forms['new-place'];
const cardNameInput = cardForm.querySelector('.popup__input_type_card-name');
const cardUrlInput = cardForm.querySelector('.popup__input_type_url');
const cardSaveButton = cardForm.querySelector('.popup__button');

// картинка
const poputTypeImage = document.querySelector('.popup_type_image');
const popupImage = poputTypeImage.querySelector('.popup__image');
const popupCaption = poputTypeImage.querySelector('.popup__caption');

// попал удаления карточки
const popupTypeDeleteCard = document.querySelector('.popup_type_delete-card');
const deleteCardForm = document.forms['delete-card'];
const deleteCardButton = deleteCardForm.querySelector('.popup__button');

//попап редактирования аватара
const popupTypeAvatar = document.querySelector('.popup_type_avatar');
const avatarForm = document.forms['edit-avatar'];
const avatarButtonOpenForm = document.querySelector('.profile__image-button');
const avatarUrlInput = avatarForm.querySelector('.popup__input_type_url');
const avatarSaveButton = avatarForm.querySelector('.popup__button');

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  };

// добавление в контейнер карточки, проверка карточки на ее местоположение
function renderCard(cardItem, container, place = 'end') {
    if (place === 'end') {
        container.append(createCard(cardItem, handleOpenDeletePopup, handleLikeCard, handleOpenImage, myId));
    } else {
        container.prepend(createCard(cardItem, handleOpenDeletePopup, handleLikeCard, handleOpenImage, myId));
    }
};

let myId = null;
const promises = [getUserInfo, getInitialCards];
// вывод карточек на страницу
Promise.all(promises)
.then(() => {
    getUserInfo()
    .then((data) => {
            myId = data['_id'];
            profileName.textContent = data.name;
            profileJob.textContent = data.about;
            profileImage.style.backgroundImage = `url('${data.avatar}')`;
    })
    .catch((err) => {
        console.error(err)
    });
    getInitialCards()
    .then((data) => {
        data.forEach((element) => {
            renderCard(element, cardContainer)
        })
    })
    .catch((err) => {
        console.error(err)
    });
});

// открытие попапа редактирования аватарки
avatarButtonOpenForm.addEventListener('click', () => {
    avatarForm.reset();
    clearValidation(avatarForm, validationConfig);
    openModal(popupTypeAvatar);
});

// открытие попапа профиля с именем и описанием
profileEditButton.addEventListener('click', () => {
    profileNameInput.value = profileName.textContent;
    profileJobInput.value = profileJob.textContent;
    clearValidation(profileForm, validationConfig);
    openModal(popupTypeEditProfile);
});

// открытие попапа "добавить карточку"
profileAddButton.addEventListener('click', () => {
    cardForm.reset();
    clearValidation(cardForm, validationConfig);
    openModal(popupTypeNewCard);
});

let cardToDelete = null;
//открытие попапа подтверждения удаления карточки
function handleOpenDeletePopup(id, card) {
    deleteCardButton.setAttribute('data-card-id', id);
    cardToDelete = card;
    openModal(popupTypeDeleteCard);
};

// открытие картинки 
function handleOpenImage(evt){
    popupImage.src = evt.target.src;
    popupImage.alt = popupCaption.textContent = evt.target.alt;
    openModal(poputTypeImage);
};

// закрытие попапов
document.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__close')) {
        closeModal(evt.target.closest('.popup'));
    }
});

// закрытие через оверлей
popupTypeEditProfile.addEventListener('click', closeModalOverlay)
popupTypeNewCard.addEventListener('click', closeModalOverlay);
poputTypeImage.addEventListener('click', closeModalOverlay);
popupTypeDeleteCard.addEventListener('click', closeModalOverlay);
popupTypeAvatar.addEventListener('click', closeModalOverlay);

// функция редактирования профиля с сохранением данных и закрытием попапа
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileSaveButton.textContent = 'Сохранение...';
    updateUserInfo(profileNameInput.value, profileJobInput.value)
    .then((data) => {
        profileName.textContent = data.name;
        profileJob.textContent = data.about;
        closeModal(popupTypeEditProfile);
    })
    .catch((err) => {
        console.error(err)
    })
    .finally(() =>{
        profileSaveButton.textContent = 'Сохранить';
    })
    
};
profileForm.addEventListener('submit', handleProfileFormSubmit);

// функция редактирования аватарки
function handleAvatar(evt) {
    evt.preventDefault();
    avatarSaveButton.textContent = 'Сохранение...';
    updateUserAvatar(avatarUrlInput.value)
    .then((data) => {
        profileImage.style.backgroundImage = `url('${data.avatar}')`;
        closeModal(popupTypeAvatar);
    })
    .catch((err) => {
        console.error(err)
    })
    .finally(() => {
        avatarSaveButton.textContent = 'Сохранить';
    })
};
avatarForm.addEventListener('submit', handleAvatar);

// добавление новой карточки 
function handleCardFormSubmit(evt) {
    evt.preventDefault();
    cardSaveButton.textContent = 'Сохранение...';
    const card = {
        name: cardNameInput.value,
        link: cardUrlInput.value,
    };
    updateNewCard(card.name, card.link)
    .then((data) => {
        renderCard(data, cardContainer, 'start');
        closeModal(popupTypeNewCard);
        cardForm.reset();
    })
    .catch((err) => {
        console.error(err)
    })
    .finally(() =>{
        cardSaveButton.textContent = 'Сохранить'
    })
};
cardForm.addEventListener('submit', handleCardFormSubmit);

// функция удаления карточки
function removeCard(evt) {
    evt.preventDefault();
    const cardId = deleteCardButton.getAttribute('data-card-id');
    deleteCard(cardId)
        .then(() => {
            cardToDelete.remove();
            closeModal(popupTypeDeleteCard);
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
            cardToDelete = null;
        })
};
deleteCardForm.addEventListener('submit', removeCard);

enableValidation(validationConfig);